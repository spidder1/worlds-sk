ALTER TABLE orders ADD COLUMN IF NOT EXISTS idempotency_key text;
CREATE UNIQUE INDEX IF NOT EXISTS uq_orders_idempotency_key
  ON orders (idempotency_key)
  WHERE idempotency_key IS NOT NULL;
