CREATE TABLE IF NOT EXISTS product_change_log (
  id bigserial PRIMARY KEY,
  product_id text NOT NULL,
  supplier_code text NOT NULL,
  import_batch_id uuid,
  change_kind text NOT NULL CHECK (change_kind IN ('CREATED', 'UPDATED')),
  previous_content_hash text,
  content_hash text,
  previous_price_hash text,
  price_hash text,
  previous_inventory_hash text,
  inventory_hash text,
  changed_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_product_change_log_product_time
  ON product_change_log (product_id, changed_at DESC);
CREATE INDEX IF NOT EXISTS idx_product_change_log_batch
  ON product_change_log (import_batch_id, changed_at DESC);
