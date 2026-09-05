CREATE TABLE IF NOT EXISTS product_localizations (
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  locale text NOT NULL,
  title text NOT NULL DEFAULT '',
  short_description text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  seo_title text,
  seo_description text,
  source text NOT NULL DEFAULT 'IMPORT',
  approved boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (product_id, locale)
);

CREATE INDEX IF NOT EXISTS idx_product_localizations_locale
  ON product_localizations (locale, approved, updated_at DESC);

CREATE TABLE IF NOT EXISTS product_seo (
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  locale text NOT NULL,
  canonical_path text,
  robots_policy text NOT NULL DEFAULT 'index,follow',
  structured_data_eligible boolean NOT NULL DEFAULT true,
  provenance text NOT NULL DEFAULT 'IMPORT',
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (product_id, locale),
  CHECK (canonical_path IS NULL OR canonical_path LIKE '/%')
);

CREATE TABLE IF NOT EXISTS slugs (
  entity_type text NOT NULL CHECK (entity_type IN ('PRODUCT', 'CATEGORY', 'MANUFACTURER', 'CONTENT')),
  entity_id text NOT NULL,
  locale text NOT NULL,
  slug text NOT NULL,
  is_canonical boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (entity_type, entity_id, locale),
  UNIQUE (entity_type, locale, slug)
);

CREATE INDEX IF NOT EXISTS idx_slugs_lookup
  ON slugs (locale, slug, is_canonical);

INSERT INTO product_localizations
  (product_id, locale, title, short_description, description, seo_title, seo_description, source, approved)
SELECT p.id, 'sk', COALESCE(NULLIF(p.name_b2c, ''), p.title), COALESCE(p.short_description, ''),
       COALESCE(p.enriched_description, p.supplier_description, ''), p.seo_title, p.seo_description,
       'IMPORT', true
  FROM products p
ON CONFLICT (product_id, locale) DO UPDATE SET
  title = EXCLUDED.title, short_description = EXCLUDED.short_description,
  description = EXCLUDED.description, seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description, updated_at = now();

INSERT INTO product_seo (product_id, locale, canonical_path, provenance)
SELECT p.id, 'sk', '/produkt/' || p.slug, 'IMPORT' FROM products p
ON CONFLICT (product_id, locale) DO UPDATE SET canonical_path = EXCLUDED.canonical_path, updated_at = now();

INSERT INTO slugs (entity_type, entity_id, locale, slug, is_canonical)
SELECT 'PRODUCT', p.id, 'sk', p.slug, true FROM products p
ON CONFLICT (entity_type, entity_id, locale) DO UPDATE SET slug = EXCLUDED.slug, updated_at = now();

CREATE OR REPLACE FUNCTION worlds_sync_product_localization_seo()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO product_localizations
    (product_id, locale, title, short_description, description, seo_title, seo_description, source, approved, updated_at)
  VALUES (NEW.id, 'sk', COALESCE(NULLIF(NEW.name_b2c, ''), NEW.title), COALESCE(NEW.short_description, ''),
          COALESCE(NEW.enriched_description, NEW.supplier_description, ''), NEW.seo_title, NEW.seo_description,
          'IMPORT', true, now())
  ON CONFLICT (product_id, locale) DO UPDATE SET
    title = EXCLUDED.title, short_description = EXCLUDED.short_description,
    description = EXCLUDED.description, seo_title = EXCLUDED.seo_title,
    seo_description = EXCLUDED.seo_description, updated_at = now();

  INSERT INTO product_seo (product_id, locale, canonical_path, provenance, updated_at)
  VALUES (NEW.id, 'sk', '/produkt/' || NEW.slug, 'IMPORT', now())
  ON CONFLICT (product_id, locale) DO UPDATE SET canonical_path = EXCLUDED.canonical_path, updated_at = now();

  INSERT INTO slugs (entity_type, entity_id, locale, slug, is_canonical, updated_at)
  VALUES ('PRODUCT', NEW.id, 'sk', NEW.slug, true, now())
  ON CONFLICT (entity_type, entity_id, locale) DO UPDATE SET slug = EXCLUDED.slug, updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS products_localization_seo ON products;
CREATE TRIGGER products_localization_seo
AFTER INSERT OR UPDATE OF title, name_b2c, short_description, supplier_description, enriched_description,
  seo_title, seo_description, slug
ON products
FOR EACH ROW EXECUTE FUNCTION worlds_sync_product_localization_seo();
