ALTER TABLE staging_products
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

CREATE INDEX IF NOT EXISTS idx_staging_products_batch_status
  ON staging_products (batch_id, validation_status, created_at DESC);
