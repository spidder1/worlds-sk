-- Search and storefront indexes for the normalized Neon catalog.
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS idx_products_title_trgm
  ON products USING gin (title gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_products_mpn_trgm
  ON products USING gin (mpn gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_products_ean
  ON products (ean)
  WHERE ean IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_products_attributes_gin
  ON products USING gin (attributes);

CREATE INDEX IF NOT EXISTS idx_products_storefront_price
  ON products (status, final_price, category_slug)
  WHERE status = 'ACTIVE' AND final_price > 0;

CREATE INDEX IF NOT EXISTS idx_products_storefront_stock
  ON products (status, is_in_stock, stock_count)
  WHERE status = 'ACTIVE';
