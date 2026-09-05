-- Extensible source payload for eD logistics, packaging and commercial flags.
-- Keep these feed fields lossless while the public product model remains stable.
ALTER TABLE products ADD COLUMN IF NOT EXISTS source_extra jsonb NOT NULL DEFAULT '{}'::jsonb;

CREATE INDEX IF NOT EXISTS idx_products_source_extra_gin
  ON products USING gin (source_extra);
