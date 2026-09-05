ALTER TABLE orders ADD COLUMN IF NOT EXISTS comgate_transaction_id text;
CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_comgate_transaction ON orders (comgate_transaction_id) WHERE comgate_transaction_id IS NOT NULL;
