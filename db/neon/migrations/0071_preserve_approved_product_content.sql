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
    title = CASE WHEN product_localizations.approved AND product_localizations.source NOT IN ('IMPORT', 'ED')
                 THEN product_localizations.title ELSE EXCLUDED.title END,
    short_description = CASE WHEN product_localizations.approved AND product_localizations.source NOT IN ('IMPORT', 'ED')
                             THEN product_localizations.short_description ELSE EXCLUDED.short_description END,
    description = CASE WHEN product_localizations.approved AND product_localizations.source NOT IN ('IMPORT', 'ED')
                       THEN product_localizations.description ELSE EXCLUDED.description END,
    seo_title = CASE WHEN product_localizations.approved AND product_localizations.source NOT IN ('IMPORT', 'ED')
                     THEN product_localizations.seo_title ELSE EXCLUDED.seo_title END,
    seo_description = CASE WHEN product_localizations.approved AND product_localizations.source NOT IN ('IMPORT', 'ED')
                           THEN product_localizations.seo_description ELSE EXCLUDED.seo_description END,
    source = CASE WHEN product_localizations.approved AND product_localizations.source NOT IN ('IMPORT', 'ED')
                  THEN product_localizations.source ELSE EXCLUDED.source END,
    approved = CASE WHEN product_localizations.approved AND product_localizations.source NOT IN ('IMPORT', 'ED')
                    THEN product_localizations.approved ELSE EXCLUDED.approved END,
    updated_at = now();

  INSERT INTO product_seo (product_id, locale, canonical_path, provenance, updated_at)
  VALUES (NEW.id, 'sk', '/produkt/' || NEW.slug, 'IMPORT', now())
  ON CONFLICT (product_id, locale) DO UPDATE SET
    canonical_path = CASE WHEN product_seo.provenance NOT IN ('IMPORT', 'ED')
                          THEN product_seo.canonical_path ELSE EXCLUDED.canonical_path END,
    provenance = CASE WHEN product_seo.provenance NOT IN ('IMPORT', 'ED')
                      THEN product_seo.provenance ELSE EXCLUDED.provenance END,
    updated_at = now();

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
