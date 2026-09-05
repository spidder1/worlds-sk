ALTER TABLE orders ADD COLUMN IF NOT EXISTS gopay_payment_id text;
CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_gopay_payment ON orders (gopay_payment_id) WHERE gopay_payment_id IS NOT NULL;
