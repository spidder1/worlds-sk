CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE,
  session_token text,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  billing_address jsonb NOT NULL DEFAULT '{}'::jsonb,
  shipping_address jsonb NOT NULL DEFAULT '{}'::jsonb,
  currency text NOT NULL DEFAULT 'EUR',
  subtotal numeric(12,2) NOT NULL CHECK (subtotal >= 0),
  total numeric(12,2) NOT NULL CHECK (total >= 0),
  status text NOT NULL DEFAULT 'NEW',
  payment_status text NOT NULL DEFAULT 'PENDING',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id bigserial PRIMARY KEY,
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id text NOT NULL,
  sku text NOT NULL,
  title text NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price numeric(12,2) NOT NULL CHECK (unit_price >= 0),
  line_total numeric(12,2) NOT NULL CHECK (line_total >= 0),
  currency text NOT NULL DEFAULT 'EUR'
);

CREATE INDEX IF NOT EXISTS idx_orders_status_created ON orders (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items (order_id);
