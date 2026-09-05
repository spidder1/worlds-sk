ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS supplier_order_status text NOT NULL DEFAULT 'NOT_SENT',
  ADD COLUMN IF NOT EXISTS supplier_order_symbol text,
  ADD COLUMN IF NOT EXISTS supplier_order_error text,
  ADD COLUMN IF NOT EXISTS supplier_order_sent_at timestamptz;
CREATE INDEX IF NOT EXISTS idx_orders_supplier_queue ON orders (supplier_order_status, payment_status, created_at);
