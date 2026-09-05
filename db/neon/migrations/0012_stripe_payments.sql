ALTER TABLE orders ADD COLUMN IF NOT EXISTS stripe_session_id text;
CREATE UNIQUE INDEX IF NOT EXISTS uq_orders_stripe_session_id ON orders (stripe_session_id) WHERE stripe_session_id IS NOT NULL;
