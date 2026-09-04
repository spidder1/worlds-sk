import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { getNeonPool } from '../../../lib/neon-client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      sessionToken?: string; customerName?: string; customerEmail?: string;
      customerPhone?: string; shippingAddress?: Record<string, string>; idempotencyKey?: string;
      paymentMethod?: string;
    };
    if (!body.sessionToken || !/^[a-zA-Z0-9-]{16,100}$/.test(body.sessionToken)) return NextResponse.json({ error: 'Neplatná relácia košíka.' }, { status: 400 });
    if (!body.customerName?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.customerEmail || '')) return NextResponse.json({ error: 'Vyplňte meno a platný e-mail.' }, { status: 400 });
    const customerName = body.customerName.trim();
    const customerEmail = body.customerEmail!.trim().toLowerCase();
    const shippingAddress = body.shippingAddress && typeof body.shippingAddress === 'object' ? body.shippingAddress : {};
    const requiredAddressFields = ['street', 'city', 'postalCode', 'country'] as const;
    if (requiredAddressFields.some((field) => !shippingAddress[field]?.trim() || shippingAddress[field].trim().length > 200)) {
      return NextResponse.json({ error: 'Vyplňte úplnú dodaciu adresu.' }, { status: 400 });
    }
    const paymentMethod = body.paymentMethod === 'COD' ? 'COD' : 'BANK_TRANSFER';
    const idempotencyKey = body.idempotencyKey?.trim() || randomUUID();
    if (!/^[a-zA-Z0-9-]{16,100}$/.test(idempotencyKey)) return NextResponse.json({ error: 'Neplatný idempotency kľúč.' }, { status: 400 });
    const client = await getNeonPool().connect();
    try {
      await client.query('BEGIN');
      const existing = await client.query<{ id: string; order_number: string; total: string; payment_status: string }>(
        'SELECT id, order_number, total, payment_status FROM orders WHERE idempotency_key = $1 LIMIT 1', [idempotencyKey]);
      if (existing.rows.length) {
        await client.query('COMMIT');
        return NextResponse.json({ orderId: existing.rows[0].id, orderNumber: existing.rows[0].order_number, status: 'NEW', paymentStatus: existing.rows[0].payment_status, total: existing.rows[0].total, currency: 'EUR' }, { status: 200 });
      }
      const cart = await client.query<{ id: string }>('SELECT id FROM carts WHERE session_token = $1 LIMIT 1 FOR UPDATE', [body.sessionToken]);
      if (!cart.rows.length) {
        await client.query('ROLLBACK');
        return NextResponse.json({ error: 'Košík je prázdny.' }, { status: 400 });
      }
      const items = await client.query<{ product_id: string; quantity: number; sku: string; title: string; final_price: string; currency: string }>(
        `SELECT ci.product_id, ci.quantity, p.sku, p.title, p.final_price, p.currency
           FROM cart_items ci JOIN storefront_products p ON p.id = ci.product_id
          WHERE ci.cart_id = $1`, [cart.rows[0].id]);
      if (!items.rows.length) {
        await client.query('ROLLBACK');
        return NextResponse.json({ error: 'Košík je prázdny.' }, { status: 400 });
      }
      const subtotal = items.rows.reduce((sum, item) => sum + Number(item.final_price) * item.quantity, 0);
      const orderId = randomUUID();
      const orderNumber = `W-${new Date().getFullYear()}-${orderId.slice(0, 8).toUpperCase()}`;
      await client.query(
        `INSERT INTO orders (id, order_number, idempotency_key, session_token, customer_name, customer_email, customer_phone, shipping_address, payment_method, subtotal, total)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10, $10)`,
        [orderId, orderNumber, idempotencyKey, body.sessionToken, customerName, customerEmail, body.customerPhone?.trim() || null, JSON.stringify(shippingAddress), paymentMethod, subtotal.toFixed(2)],
      );
      for (const item of items.rows) {
        await client.query(
          `INSERT INTO order_items (order_id, product_id, sku, title, quantity, unit_price, line_total, currency)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [orderId, item.product_id, item.sku, item.title, item.quantity, item.final_price, (Number(item.final_price) * item.quantity).toFixed(2), item.currency],
        );
      }
      await client.query('DELETE FROM cart_items WHERE cart_id = $1', [cart.rows[0].id]);
      await client.query('COMMIT');
      return NextResponse.json({ orderId, orderNumber, status: 'NEW', paymentStatus: 'PENDING', total: subtotal.toFixed(2), currency: 'EUR' }, { status: 201 });
    } catch (transactionError) {
      await client.query('ROLLBACK').catch(() => undefined);
      if (transactionError && typeof transactionError === 'object' && 'code' in transactionError && transactionError.code === '23505') {
        const existingAfterRace = await client.query<{ id: string; order_number: string; total: string; payment_status: string }>(
          'SELECT id, order_number, total, payment_status FROM orders WHERE idempotency_key = $1 LIMIT 1', [idempotencyKey]);
        if (existingAfterRace.rows.length) {
          return NextResponse.json({
            orderId: existingAfterRace.rows[0].id,
            orderNumber: existingAfterRace.rows[0].order_number,
            status: 'NEW',
            paymentStatus: existingAfterRace.rows[0].payment_status,
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
