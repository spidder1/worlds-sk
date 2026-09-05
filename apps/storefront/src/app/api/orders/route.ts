import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { getNeonPool } from '../../../lib/neon-client';
import { normalizeVatId, validateVatId } from '../../../lib/vies';
import { createComgatePayment } from '../../../lib/comgate';
import { createGoPayPayment } from '../../../lib/gopay';
import Stripe from 'stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function validIco(value: string | null): boolean {
  if (!value || !/^\d{8}$/.test(value)) return false;
  const digits = value.split('').map(Number);
  const weighted = digits.slice(0, 7).reduce((sum, digit, index) => sum + digit * (8 - index), 0);
  const remainder = weighted % 11;
  const check = remainder === 0 ? 1 : remainder === 1 ? 0 : 11 - remainder;
  return check === digits[7];
}

function validDic(value: string | null): boolean {
  return Boolean(value && /^\d{10}$/.test(value));
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      sessionToken?: string; customerName?: string; customerEmail?: string;
      customerPhone?: string; shippingAddress?: Record<string, string>; idempotencyKey?: string;
      paymentMethod?: string; customerType?: 'PRIVATE' | 'LEGAL'; customerIco?: string; customerDic?: string; customerIcDph?: string;
    };
    if (!body.sessionToken || !/^[a-zA-Z0-9-]{16,100}$/.test(body.sessionToken)) return NextResponse.json({ error: 'Neplatná relácia košíka.' }, { status: 400 });
    if (!body.customerName?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.customerEmail || '')) return NextResponse.json({ error: 'Vyplňte meno a platný e-mail.' }, { status: 400 });
    const customerName = body.customerName.trim();
    const customerEmail = body.customerEmail!.trim().toLowerCase();
    const customerType = body.customerType === 'LEGAL' ? 'LEGAL' : 'PRIVATE';
    const customerIco = body.customerIco?.trim() || null;
    const customerDic = body.customerDic?.trim() || null;
    const customerIcDph = body.customerIcDph?.trim().toUpperCase() || null;
    const shippingAddress = body.shippingAddress && typeof body.shippingAddress === 'object' ? body.shippingAddress : {};
    const requiredAddressFields = ['street', 'city', 'postalCode', 'country'] as const;
    if (requiredAddressFields.some((field) => !shippingAddress[field]?.trim() || shippingAddress[field].trim().length > 200)) {
      return NextResponse.json({ error: 'Vyplňte úplnú dodaciu adresu.' }, { status: 400 });
    }
    const paymentMethod = body.paymentMethod === 'CARD' ? 'CARD' : body.paymentMethod === 'COMGATE' ? 'COMGATE' : body.paymentMethod === 'GOPAY' ? 'GOPAY' : body.paymentMethod === 'COD' ? 'COD' : 'BANK_TRANSFER';
    const idempotencyKey = body.idempotencyKey?.trim() || randomUUID();
    if (!/^[a-zA-Z0-9-]{16,100}$/.test(idempotencyKey)) return NextResponse.json({ error: 'Neplatný idempotency kľúč.' }, { status: 400 });
    const client = await getNeonPool().connect();
    try {
      await client.query('BEGIN');
      const privateSetting = await client.query<{ value: { value?: boolean } }>("SELECT value FROM store_settings WHERE key = 'checkout.allow_private_purchase' LIMIT 1");
      const allowPrivatePurchase = privateSetting.rows[0]?.value?.value !== false;
      if (!allowPrivatePurchase && customerType !== 'LEGAL') {
        await client.query('ROLLBACK');
        return NextResponse.json({ error: 'Nákup je momentálne povolený iba právnickým osobám.' }, { status: 403 });
      }
      if (customerType === 'LEGAL' && (!customerIco || !customerDic)) {
        await client.query('ROLLBACK');
        return NextResponse.json({ error: 'Pre právnickú osobu vyplňte IČO a DIČ.' }, { status: 400 });
      }
      if (customerType === 'LEGAL' && (!validIco(customerIco) || !validDic(customerDic))) {
        await client.query('ROLLBACK');
        return NextResponse.json({ error: 'IČO musí byť platné 8-miestne slovenské IČO a DIČ 10-miestne číslo.' }, { status: 400 });
      }
      if (customerIcDph && !/^[A-Z]{2}\d{8,12}$/.test(customerIcDph)) {
        await client.query('ROLLBACK');
        return NextResponse.json({ error: 'IČ DPH musí mať formát krajiny a 8 až 12 číslic, napríklad SK2022595311.' }, { status: 400 });
      }
      const vatSetting = await client.query<{ value: { value?: number } }>("SELECT value FROM store_settings WHERE key = 'pricing.vat_rate' LIMIT 1");
      const vatRate = Number(vatSetting.rows[0]?.value?.value ?? 20);
      const vatId = normalizeVatId(customerIcDph);
      let reverseCharge = false;
      let vatValidationStatus: 'NOT_CHECKED' | 'VALID' | 'INVALID' | 'UNAVAILABLE' = 'NOT_CHECKED';
      if (customerIcDph && vatId && vatId.countryCode !== 'SK') {
        if (customerType !== 'LEGAL') {
          await client.query('ROLLBACK');
          return NextResponse.json({ error: 'IČ DPH pre režim prenesenia daňovej povinnosti môže uviesť iba právnická osoba.' }, { status: 400 });
        }
        const vies = await validateVatId(customerIcDph);
        vatValidationStatus = vies.status === 'VALID' ? 'VALID' : vies.status === 'INVALID' ? 'INVALID' : 'UNAVAILABLE';
        if (vies.status === 'INVALID') {
          await client.query('ROLLBACK');
          return NextResponse.json({ error: 'IČ DPH sa nepodarilo overiť ako platné vo VIES.' }, { status: 400 });
        }
        if (vies.status === 'UNAVAILABLE') {
          await client.query('ROLLBACK');
          return NextResponse.json({ error: 'Overenie IČ DPH vo VIES je momentálne nedostupné. Skúste objednávku neskôr.' }, { status: 503 });
        }
        reverseCharge = true;
      } else if (customerIcDph && vatId?.countryCode === 'SK') {
        vatValidationStatus = 'NOT_CHECKED';
      }
      const existing = await client.query<{ id: string; order_number: string; status: string; total: string; payment_status: string; payment_method: string }>(
        'SELECT id, order_number, status, total, payment_status, payment_method FROM orders WHERE idempotency_key = $1 LIMIT 1', [idempotencyKey]);
      if (existing.rows.length) {
        await client.query('COMMIT');
        return NextResponse.json({ orderId: existing.rows[0].id, orderNumber: existing.rows[0].order_number, status: existing.rows[0].status, paymentStatus: existing.rows[0].payment_status, paymentMethod: existing.rows[0].payment_method, total: existing.rows[0].total, currency: 'EUR' }, { status: 200 });
      }
      const cart = await client.query<{ id: string }>('SELECT id FROM carts WHERE session_token = $1 LIMIT 1 FOR UPDATE', [body.sessionToken]);
      if (!cart.rows.length) {
        await client.query('ROLLBACK');
        return NextResponse.json({ error: 'Košík je prázdny.' }, { status: 400 });
      }
      const items = await client.query<{ product_id: string; quantity: number; sku: string; title: string; final_price: string; currency: string; stock_count: string }>(
        `SELECT ci.product_id, ci.quantity, p.sku, p.title, p.final_price, p.currency, p.stock_count
           FROM cart_items ci JOIN products p ON p.id = ci.product_id
          WHERE ci.cart_id = $1 AND p.status = 'ACTIVE' AND p.final_price > 0
          FOR UPDATE OF p`, [cart.rows[0].id]);
      if (!items.rows.length) {
        await client.query('ROLLBACK');
        return NextResponse.json({ error: 'Košík je prázdny.' }, { status: 400 });
      }
      const stockLimitedItem = items.rows.find((item) => {
        const stockCount = Number(item.stock_count);
        return Number.isFinite(stockCount) && stockCount > 0 && item.quantity > Math.floor(stockCount);
      });
      if (stockLimitedItem) {
        await client.query('ROLLBACK');
        return NextResponse.json({ error: `Produkt ${stockLimitedItem.title} už nemá požadované množstvo na sklade.` }, { status: 409 });
      }
      const grossSubtotal = items.rows.reduce((sum, item) => sum + Number(item.final_price) * item.quantity, 0);
      const netSubtotal = grossSubtotal / (1 + vatRate / 100);
      const subtotal = reverseCharge ? netSubtotal : grossSubtotal;
      const vatTotal = reverseCharge ? 0 : grossSubtotal - netSubtotal;
      const orderId = randomUUID();
      const orderNumber = `W-${new Date().getFullYear()}-${orderId.slice(0, 8).toUpperCase()}`;
      let stripeSessionId: string | null = null;
      let comgateTransactionId: string | null = null;
      let gopayPaymentId: string | null = null;
      let checkoutUrl: string | null = null;
      if (paymentMethod === 'CARD') {
        const secret = process.env.STRIPE_SECRET_KEY?.trim();
        if (!secret) {
          await client.query('ROLLBACK');
          return NextResponse.json({ error: 'Platba kartou nie je momentálne nakonfigurovaná.' }, { status: 503 });
        }
        const stripe = new Stripe(secret);
        const session = await stripe.checkout.sessions.create({
          mode: 'payment',
          line_items: items.rows.map((item) => ({ price_data: { currency: item.currency.toLowerCase(), product_data: { name: item.title.slice(0, 500) }, unit_amount: Math.round((reverseCharge ? Number(item.final_price) / (1 + vatRate / 100) : Number(item.final_price)) * 100) }, quantity: item.quantity })),
          customer_email: customerEmail,
          success_url: `${process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin}/kosik?stripe=success&order=${encodeURIComponent(orderNumber)}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin}/kosik?stripe=cancelled`,
          metadata: { orderId, orderNumber },
        });
        stripeSessionId = session.id;
        checkoutUrl = session.url;
      }
      if (paymentMethod === 'COMGATE') {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
        const payment = await createComgatePayment({ orderNumber, amount: subtotal, currency: 'EUR', email: customerEmail, fullName: customerName, returnUrl: `${siteUrl}/kosik?comgate=return&order=${encodeURIComponent(orderNumber)}`, notifyUrl: `${siteUrl}/api/payments/comgate/notify` });
        if (!payment.configured) {
          await client.query('ROLLBACK');
          return NextResponse.json({ error: 'Platba Comgate nie je momentálne nakonfigurovaná.' }, { status: 503 });
        }
        comgateTransactionId = payment.transId;
        checkoutUrl = payment.redirect;
      }
      if (paymentMethod === 'GOPAY') {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
        const payment = await createGoPayPayment({
          orderNumber,
          amount: subtotal,
          currency: 'EUR',
          email: customerEmail,
          fullName: customerName,
          returnUrl: `${siteUrl}/kosik?gopay=return&order=${encodeURIComponent(orderNumber)}`,
          notifyUrl: `${siteUrl}/api/payments/gopay/notify`,
          items: items.rows.map((item) => ({ name: item.title, amount: (reverseCharge ? Number(item.final_price) / (1 + vatRate / 100) : Number(item.final_price)), count: item.quantity })),
        });
        if (!payment.configured) {
          await client.query('ROLLBACK');
          return NextResponse.json({ error: 'Platba GoPay nie je momentálne nakonfigurovaná.' }, { status: 503 });
        }
        gopayPaymentId = payment.paymentId;
        checkoutUrl = payment.redirect;
      }
      await client.query(
        `INSERT INTO orders (id, order_number, idempotency_key, session_token, customer_name, customer_email, customer_phone, customer_type, customer_ico, customer_dic, customer_ic_dph, shipping_address, payment_method, stripe_session_id, comgate_transaction_id, gopay_payment_id, subtotal, total, vat_rate, subtotal_net, vat_total, reverse_charge, vat_validation_status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12::jsonb, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)`,
        [orderId, orderNumber, idempotencyKey, body.sessionToken, customerName, customerEmail, body.customerPhone?.trim() || null, customerType, customerIco, customerDic, customerIcDph, JSON.stringify(shippingAddress), paymentMethod, stripeSessionId, comgateTransactionId, gopayPaymentId, subtotal.toFixed(2), subtotal.toFixed(2), vatRate.toFixed(2), netSubtotal.toFixed(2), vatTotal.toFixed(2), reverseCharge, vatValidationStatus],
      );
      for (const item of items.rows) {
        await client.query(
          `INSERT INTO order_items (order_id, product_id, sku, title, quantity, unit_price, line_total, currency)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [orderId, item.product_id, item.sku, item.title, item.quantity, (reverseCharge ? Number(item.final_price) / (1 + vatRate / 100) : Number(item.final_price)).toFixed(2), ((reverseCharge ? Number(item.final_price) / (1 + vatRate / 100) : Number(item.final_price)) * item.quantity).toFixed(2), item.currency],
        );
      }
      await client.query('DELETE FROM cart_items WHERE cart_id = $1', [cart.rows[0].id]);
      await client.query('COMMIT');
      return NextResponse.json({ orderId, orderNumber, status: 'NEW', paymentStatus: 'PENDING', paymentMethod, checkoutUrl, total: subtotal.toFixed(2), vatTotal: vatTotal.toFixed(2), reverseCharge, currency: 'EUR' }, { status: 201 });
    } catch (transactionError) {
      await client.query('ROLLBACK').catch(() => undefined);
      if (transactionError && typeof transactionError === 'object' && 'code' in transactionError && transactionError.code === '23505') {
        const existingAfterRace = await client.query<{ id: string; order_number: string; status: string; total: string; payment_status: string; payment_method: string }>(
          'SELECT id, order_number, status, total, payment_status, payment_method FROM orders WHERE idempotency_key = $1 LIMIT 1', [idempotencyKey]);
        if (existingAfterRace.rows.length) {
          return NextResponse.json({
            orderId: existingAfterRace.rows[0].id,
            orderNumber: existingAfterRace.rows[0].order_number,
            status: existingAfterRace.rows[0].status,
            paymentStatus: existingAfterRace.rows[0].payment_status,
            paymentMethod: existingAfterRace.rows[0].payment_method,
            total: existingAfterRace.rows[0].total,
            currency: 'EUR',
          }, { status: 200 });
        }
      }
      throw transactionError;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('[orders] create failed:', error);
    return NextResponse.json({ error: 'Objednávku sa nepodarilo vytvoriť.' }, { status: 500 });
  }
}
