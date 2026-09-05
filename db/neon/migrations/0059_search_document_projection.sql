CREATE TABLE IF NOT EXISTS search_documents (
  product_id text PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
  catalog_version text,
  title text NOT NULL DEFAULT '',
  search_text text NOT NULL DEFAULT '',
  brand text,
  sku text,
  mpn text,
  ean text,
  category_slug text,
  category_path jsonb NOT NULL DEFAULT '[]'::jsonb,
  final_price numeric(19,4) NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'EUR',
  is_in_stock boolean NOT NULL DEFAULT false,
  stock_count numeric(19,4) NOT NULL DEFAULT 0,
  attributes jsonb NOT NULL DEFAULT '{}'::jsonb,
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  content_hash text,
  indexed_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_search_documents_category
  ON search_documents (category_slug, final_price, product_id);
CREATE INDEX IF NOT EXISTS idx_search_documents_brand
  ON search_documents (brand, final_price, product_id);
CREATE INDEX IF NOT EXISTS idx_search_documents_stock
  ON search_documents (is_in_stock, final_price, product_id);
CREATE INDEX IF NOT EXISTS idx_search_documents_text
  ON search_documents USING gin (to_tsvector('simple', search_text));

CREATE OR REPLACE FUNCTION worlds_refresh_search_document()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO search_documents
    (product_id, catalog_version, title, search_text, brand, sku, mpn, ean, category_slug,
     category_path, final_price, currency, is_in_stock, stock_count, attributes, images, content_hash, updated_at)
  VALUES
    (NEW.id, NEW.last_import_batch::text,
     COALESCE(NULLIF(NEW.name_b2c, ''), NEW.title),
     concat_ws(' ', NEW.title, NEW.name_b2c, NEW.brand, NEW.sku, NEW.mpn, NEW.ean, NEW.short_description,
               NEW.commodity_name, NEW.category_slug),
     NEW.brand, NEW.sku, NEW.mpn, NEW.ean, NEW.category_slug,
     COALESCE(NEW.category_hierarchy, '[]'::jsonb), GREATEST(COALESCE(NEW.final_price, 0), 0),
     COALESCE(NEW.currency, 'EUR'), COALESCE(NEW.is_in_stock, false), GREATEST(COALESCE(NEW.stock_count, 0), 0),
     COALESCE(NEW.attributes, '{}'::jsonb), COALESCE(NEW.images, '[]'::jsonb), NEW.content_hash, now())
  ON CONFLICT (product_id) DO UPDATE SET
    catalog_version = EXCLUDED.catalog_version, title = EXCLUDED.title, search_text = EXCLUDED.search_text,
    brand = EXCLUDED.brand, sku = EXCLUDED.sku, mpn = EXCLUDED.mpn, ean = EXCLUDED.ean,
    category_slug = EXCLUDED.category_slug, category_path = EXCLUDED.category_path,
    final_price = EXCLUDED.final_price, currency = EXCLUDED.currency, is_in_stock = EXCLUDED.is_in_stock,
    stock_count = EXCLUDED.stock_count, attributes = EXCLUDED.attributes, images = EXCLUDED.images,
    content_hash = EXCLUDED.content_hash, updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS products_search_document ON products;
CREATE TRIGGER products_search_document
AFTER INSERT OR UPDATE OF title, name_b2c, brand, sku, mpn, ean, short_description, commodity_name,
  category_slug, category_hierarchy, final_price, currency, is_in_stock, stock_count, attributes, images, content_hash
ON products
FOR EACH ROW EXECUTE FUNCTION worlds_refresh_search_document();

INSERT INTO search_documents
  (product_id, catalog_version, title, search_text, brand, sku, mpn, ean, category_slug, category_path,
   final_price, currency, is_in_stock, stock_count, attributes, images, content_hash)
SELECT p.id, p.last_import_batch::text, COALESCE(NULLIF(p.name_b2c, ''), p.title),
       concat_ws(' ', p.title, p.name_b2c, p.brand, p.sku, p.mpn, p.ean, p.short_description, p.commodity_name, p.category_slug),
       p.brand, p.sku, p.mpn, p.ean, p.category_slug, COALESCE(p.category_hierarchy, '[]'::jsonb),
       GREATEST(COALESCE(p.final_price, 0), 0), COALESCE(p.currency, 'EUR'), COALESCE(p.is_in_stock, false),
       GREATEST(COALESCE(p.stock_count, 0), 0), COALESCE(p.attributes, '{}'::jsonb), COALESCE(p.images, '[]'::jsonb), p.content_hash
  FROM products p
ON CONFLICT (product_id) DO UPDATE SET
  title = EXCLUDED.title, search_text = EXCLUDED.search_text, final_price = EXCLUDED.final_price,
  is_in_stock = EXCLUDED.is_in_stock, stock_count = EXCLUDED.stock_count,
  attributes = EXCLUDED.attributes, images = EXCLUDED.images, updated_at = now();
