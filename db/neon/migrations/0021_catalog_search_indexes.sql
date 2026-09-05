-- Query indexes for the normalized catalog and storefront browse paths.
-- Kept idempotent because the Neon migration runner may be re-run safely.
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS idx_products_attributes_gin
  ON products USING gin (attributes);

CREATE INDEX IF NOT EXISTS idx_products_storefront_price
  ON products (status, final_price, category_slug)
  WHERE status = 'ACTIVE' AND final_price > 0;

CREATE INDEX IF NOT EXISTS idx_products_storefront_stock
  ON products (status, is_in_stock, stock_count)
  WHERE status = 'ACTIVE';

CREATE INDEX IF NOT EXISTS idx_products_ean_not_null
  ON products (ean)
  WHERE ean IS NOT NULL AND ean <> '';
