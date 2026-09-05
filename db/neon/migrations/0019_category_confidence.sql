ALTER TABLE products ADD COLUMN IF NOT EXISTS category_source text NOT NULL DEFAULT 'HEURISTIC';
ALTER TABLE products ADD COLUMN IF NOT EXISTS category_confidence numeric(5,4);
ALTER TABLE products ADD COLUMN IF NOT EXISTS category_reasoning text;

CREATE INDEX IF NOT EXISTS idx_products_category_confidence
  ON products (category_confidence)
  WHERE category_confidence IS NOT NULL;
