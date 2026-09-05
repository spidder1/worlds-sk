-- The starter Neon deployment temporarily omitted these secondary indexes so
-- the normalized schema could be bootstrapped. Storage has been upgraded;
-- restore the read and import paths that benefit from them.
CREATE INDEX IF NOT EXISTS idx_products_source_extra_gin
  ON products USING gin (source_extra);
CREATE INDEX IF NOT EXISTS idx_products_title_trgm
  ON products USING gin (title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_products_mpn_trgm
  ON products USING gin (mpn gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_products_brand_trgm
  ON products USING gin (brand gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_products_attributes_gin
  ON products USING gin (attributes);
CREATE INDEX IF NOT EXISTS idx_products_category_confidence
  ON products (category_confidence);
CREATE INDEX IF NOT EXISTS idx_products_last_import_batch
  ON products (last_import_batch);
CREATE INDEX IF NOT EXISTS idx_products_index_codes
  ON products (index_code_1, index_code_2);
CREATE INDEX IF NOT EXISTS idx_products_ean_not_null
  ON products (ean) WHERE ean IS NOT NULL AND ean <> '';
CREATE INDEX IF NOT EXISTS idx_products_brand
  ON products (brand);
CREATE INDEX IF NOT EXISTS idx_products_storefront_sellable
  ON products (status, final_price, category_slug, is_in_stock);
CREATE INDEX IF NOT EXISTS idx_products_storefront_price
  ON products (final_price, id) WHERE status = 'ACTIVE' AND final_price > 0;
CREATE INDEX IF NOT EXISTS idx_products_storefront_stock
  ON products (is_in_stock, final_price, id) WHERE status = 'ACTIVE' AND final_price > 0;
CREATE INDEX IF NOT EXISTS idx_products_mpn
  ON products (mpn);
CREATE INDEX IF NOT EXISTS idx_products_is_in_stock_price
  ON products (is_in_stock, final_price);
CREATE INDEX IF NOT EXISTS idx_products_ean
  ON products (ean);
CREATE INDEX IF NOT EXISTS idx_products_cat_slug
  ON products (category_slug);
CREATE INDEX IF NOT EXISTS idx_products_status
  ON products (status);
CREATE INDEX IF NOT EXISTS idx_supplier_product_attributes_filter
  ON supplier_product_attribute_values (attribute_code, value_code, supplier_product_id);
