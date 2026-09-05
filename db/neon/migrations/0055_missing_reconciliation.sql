ALTER TABLE products
  ADD COLUMN IF NOT EXISTS missing_streak integer NOT NULL DEFAULT 0 CHECK (missing_streak >= 0),
  ADD COLUMN IF NOT EXISTS missing_candidate_at timestamptz,
  ADD COLUMN IF NOT EXISTS discontinued_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_products_missing_reconciliation
  ON products (missing_streak, missing_candidate_at)
  WHERE missing_streak > 0;
