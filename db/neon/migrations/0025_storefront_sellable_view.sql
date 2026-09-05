-- Public catalogue projection. Keep this in the active Neon migration set;
-- the storefront intentionally excludes inactive, discontinued and unpriced
-- products without duplicating the filter in every query.
CREATE OR REPLACE VIEW storefront_products AS
SELECT *
  FROM products
 WHERE status = 'ACTIVE'
   AND final_price > 0;

CREATE INDEX IF NOT EXISTS idx_products_storefront_sellable
  ON products (status, final_price, category_slug, id)
  WHERE status = 'ACTIVE' AND final_price > 0;
