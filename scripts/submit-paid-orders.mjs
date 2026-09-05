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
    const { rows: orders } = await pool.query(`SELECT id, order_number, customer_name, customer_email, customer_phone, customer_type, customer_ico, customer_dic, customer_ic_dph, shipping_address, total, payment_method
    FROM orders WHERE payment_status = 'PAID' AND supplier_order_status = 'QUEUED' ORDER BY created_at FOR UPDATE SKIP LOCKED LIMIT 10`);
  for (const order of orders) {
    const claimed = await pool.query(`UPDATE orders SET supplier_order_status = 'PROCESSING', supplier_order_error = NULL, updated_at = NOW() WHERE id = $1 AND supplier_order_status = 'QUEUED'`, [order.id]);
    if (!claimed.rowCount) continue;
    const { rows: attemptRows } = await pool.query(
      `INSERT INTO supplier_order_attempts (order_id, attempt_no, status, test_mode, request_payload)
       SELECT $1, COALESCE(MAX(attempt_no), 0) + 1, 'RUNNING', $2, '{}'::jsonb
         FROM supplier_order_attempts WHERE order_id = $1
       RETURNING id, attempt_no`,
      [order.id, isTest],
    );
    const attemptId = attemptRows[0]?.id;
    try {
      await pool.query(
        `INSERT INTO supplier_order_events (order_id, attempt_id, event_type, payload)
         VALUES ($1, $2, 'ATTEMPT_STARTED', $3::jsonb)`,
        [order.id, attemptId || null, JSON.stringify({ testMode: isTest })],
      );
      const { rows: items } = await pool.query(`SELECT oi.sku, oi.quantity, oi.unit_price,
          COALESCE(p.vat_rate, 20) AS vat_rate,
          COALESCE(o.reverse_charge, false) AS reverse_charge
        FROM order_items oi
        JOIN orders o ON o.id = oi.order_id
        LEFT JOIN products p ON p.id = oi.product_id
       WHERE oi.order_id = $1
       ORDER BY oi.id`, [order.id]);
      const address = order.shipping_address || {};
      const isLegalCustomer = String(order.customer_type || '').toUpperCase() === 'LEGAL';
      const edItems = items.map((item) => {
        const vatMultiplier = item.reverse_charge ? 1 : 1 + Number(item.vat_rate || 20) / 100;
        const priceVat = Number(item.unit_price);
        const price = priceVat / vatMultiplier;
        return { ProductCode: item.sku, Qty: Number(item.quantity), Price: Number(price.toFixed(2)), PriceVat: Number(priceVat.toFixed(2)), VatRate: Number(vatMultiplier.toFixed(4)) };
      });
      const b2bItems = edItems.map((item) => ({ ProductCode: item.ProductCode, Qty: item.Qty }));
      const orderMode = isLegalCustomer ? 'B2B' : 'B2C';
      const safeRequest = { mode: orderMode, itemCodes: edItems.map((item) => ({ code: item.ProductCode, qty: item.Qty })), transportCode: defaultTransportCode, testMode: isTest };
      if (attemptId) {
        await pool.query(
          `UPDATE supplier_order_attempts SET request_payload = $1::jsonb WHERE id = $2`,
          [JSON.stringify(safeRequest), attemptId],
        );
        await pool.query(
          `INSERT INTO supplier_order_requests (order_id, attempt_id, request_payload, status, submitted_at)
           VALUES ($1, $2, $3::jsonb, 'SUBMITTED', NOW())
           ON CONFLICT (attempt_id) DO UPDATE SET request_payload = EXCLUDED.request_payload,
             status = EXCLUDED.status, submitted_at = EXCLUDED.submitted_at, updated_at = NOW()`,
          [order.id, attemptId, JSON.stringify(safeRequest)],
        );
      }
      const shippingAddress = { name: order.customer_name, street: String(address.street || ''), city: String(address.city || ''), zipCode: String(address.postalCode || ''), countryCode: String(address.country || 'SK').slice(0, 2).toUpperCase(), phone: order.customer_phone || undefined, email: order.customer_email };
      const result = isLegalCustomer
        ? await client.createNewOrder({
          NewOrderItems: b2bItems,
          ShippingAddress: shippingAddress,
          OrderSymbolCustomer: order.order_number,
          OrderNote: [order.customer_ico ? `IČO: ${order.customer_ico}` : '', order.customer_dic ? `DIČ: ${order.customer_dic}` : '', order.customer_ic_dph ? `IČ DPH: ${order.customer_ic_dph}` : ''].filter(Boolean).join('; '),
          email: order.customer_email,
          telephone: order.customer_phone || undefined,
          TransportCode: defaultTransportCode ? Number(defaultTransportCode) : 0,
        }, isTest)
        : await client.createNewOrderCustomer({
          NewOrderCustomerItems: edItems,
          ShippingAddress: shippingAddress,
          OrderSymbolCustomer: order.order_number,
          customerName: order.customer_name,
          custumerInvoiceCode: order.order_number,
          email: order.customer_email,
          telephone: order.customer_phone || '',
          price: Number((edItems.reduce((sum, item) => sum + item.Price * item.Qty, 0)).toFixed(2)),
          priceVat: Number(order.total),
          noCashOnDelivery: order.payment_method !== 'COD',
          TransportCode: defaultTransportCode ? Number(defaultTransportCode) : 0,
        }, isTest);
      if (result.Status.StatusCode !== 'DONE') throw new Error(result.Status.ErrorText || 'eD objednávka bola odmietnutá');
      if (attemptId) {
        await pool.query(
          `UPDATE supplier_order_attempts SET status = 'SENT', supplier_order_symbol = $1,
             response_payload = $2::jsonb, completed_at = NOW() WHERE id = $3`,
          [result.OrderSymbol || null, JSON.stringify({ statusCode: result.Status.StatusCode, orderSymbol: result.OrderSymbol || null }), attemptId],
        );
        await pool.query(
          `UPDATE supplier_order_requests SET status = 'SUCCEEDED', response_received_at = NOW(), updated_at = NOW() WHERE attempt_id = $1`,
          [attemptId],
        );
        await pool.query(
          `INSERT INTO supplier_order_events (order_id, attempt_id, event_type, payload)
           VALUES ($1, $2, 'SUBMITTED', $3::jsonb)`,
          [order.id, attemptId, JSON.stringify({ statusCode: result.Status.StatusCode, orderSymbol: result.OrderSymbol || null })],
        );
      }
      await pool.query(`UPDATE orders SET supplier_order_status = 'SENT', supplier_order_symbol = $1, supplier_order_sent_at = NOW(), updated_at = NOW() WHERE id = $2`, [result.OrderSymbol || null, order.id]);
      console.log(`[supplier-orders] ${order.order_number} sent${isTest ? ' (test)' : ''}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (attemptId) {
        await pool.query(
          `UPDATE supplier_order_attempts SET status = 'FAILED', error_message = $1, completed_at = NOW() WHERE id = $2`,
          [message.slice(0, 2000), attemptId],
        );
        await pool.query(
          `UPDATE supplier_order_requests SET status = 'FAILED', response_received_at = NOW(), updated_at = NOW() WHERE attempt_id = $1`,
          [attemptId],
        );
        await pool.query(
          `INSERT INTO supplier_order_events (order_id, attempt_id, event_type, payload)
           VALUES ($1, $2, 'FAILED', $3::jsonb)`,
          [order.id, attemptId, JSON.stringify({ message: message.slice(0, 2000) })],
        );
      }
      await pool.query(`UPDATE orders SET supplier_order_status = 'FAILED', supplier_order_error = $1, updated_at = NOW() WHERE id = $2`, [message.slice(0, 2000), order.id]);
      console.error(`[supplier-orders] ${order.order_number} failed: ${message}`);
    }
  }
} finally {
  await pool.end();
}
