import pg from 'pg';
import { EDSystemClient } from '@worlds/ed-client';

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL?.trim();
const endpointUrl = process.env.ED_ENDPOINT_URL?.trim();
const login = process.env.ED_LOGIN?.trim();
const password = process.env.ED_PASSWORD?.trim();
if (!connectionString || !endpointUrl || !login || !password) throw new Error('DATABASE_URL, ED_ENDPOINT_URL, ED_LOGIN and ED_PASSWORD are required');
const isTest = process.env.ED_ORDER_TEST !== 'false';
const configuredTransportCode = process.env.ED_TRANSPORT_CODE?.trim() || null;
const pool = new Pool({ connectionString, max: 2 });
const client = new EDSystemClient({ endpointUrl, login, password });
try {
  const { rows: configured } = await pool.query(`SELECT value->>'value' AS code FROM store_settings WHERE key = 'orders.default_transport_code' LIMIT 1`);
  const defaultTransportCode = configuredTransportCode || configured[0]?.code || null;
  if (!defaultTransportCode) {
    console.warn('[supplier-orders] no transport code configured; eD will receive TransportCode=0');
  }
  const { rows: orders } = await pool.query(`SELECT id, order_number, customer_name, customer_email, customer_phone, shipping_address, total, payment_method
    FROM orders WHERE payment_status = 'PAID' AND supplier_order_status = 'QUEUED' ORDER BY created_at FOR UPDATE SKIP LOCKED LIMIT 10`);
  for (const order of orders) {
    const claimed = await pool.query(`UPDATE orders SET supplier_order_status = 'PROCESSING', supplier_order_error = NULL, updated_at = NOW() WHERE id = $1 AND supplier_order_status = 'QUEUED'`, [order.id]);
    if (!claimed.rowCount) continue;
    try {
      const { rows: items } = await pool.query(`SELECT oi.sku, oi.quantity, oi.unit_price,
          COALESCE(p.vat_rate, 20) AS vat_rate,
          COALESCE(o.reverse_charge, false) AS reverse_charge
        FROM order_items oi
        JOIN orders o ON o.id = oi.order_id
        LEFT JOIN products p ON p.id = oi.product_id
       WHERE oi.order_id = $1
       ORDER BY oi.id`, [order.id]);
      const address = order.shipping_address || {};
      const edItems = items.map((item) => {
        const vatMultiplier = item.reverse_charge ? 1 : 1 + Number(item.vat_rate || 20) / 100;
        const priceVat = Number(item.unit_price);
        const price = priceVat / vatMultiplier;
        return { ProductCode: item.sku, Qty: Number(item.quantity), Price: Number(price.toFixed(2)), PriceVat: Number(priceVat.toFixed(2)), VatRate: Number(vatMultiplier.toFixed(4)) };
      });
      const priceVat = Number(order.total);
      const result = await client.createNewOrderCustomer({
        NewOrderCustomerItems: edItems,
        ShippingAddress: { name: order.customer_name, street: String(address.street || ''), city: String(address.city || ''), zipCode: String(address.postalCode || ''), countryCode: String(address.country || 'SK').slice(0, 2).toUpperCase(), phone: order.customer_phone || undefined, email: order.customer_email },
        OrderSymbolCustomer: order.order_number,
        customerName: order.customer_name,
        custumerInvoiceCode: order.order_number,
        email: order.customer_email,
        telephone: order.customer_phone || '',
        price: Number((edItems.reduce((sum, item) => sum + item.Price * item.Qty, 0)).toFixed(2)),
        priceVat,
        noCashOnDelivery: order.payment_method !== 'COD',
        TransportCode: defaultTransportCode ? Number(defaultTransportCode) : 0,
      }, isTest);
      if (result.Status.StatusCode !== 'DONE') throw new Error(result.Status.ErrorText || 'eD objednávka bola odmietnutá');
      await pool.query(`UPDATE orders SET supplier_order_status = 'SENT', supplier_order_symbol = $1, supplier_order_sent_at = NOW(), updated_at = NOW() WHERE id = $2`, [result.OrderSymbol || null, order.id]);
      console.log(`[supplier-orders] ${order.order_number} sent${isTest ? ' (test)' : ''}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await pool.query(`UPDATE orders SET supplier_order_status = 'FAILED', supplier_order_error = $1, updated_at = NOW() WHERE id = $2`, [message.slice(0, 2000), order.id]);
      console.error(`[supplier-orders] ${order.order_number} failed: ${message}`);
    }
  }
} finally {
  await pool.end();
}
