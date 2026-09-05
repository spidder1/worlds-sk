-- Product identity lookups use SKU/MPN and supplier code as primary keys;
-- the legacy standalone EAN index is not required by the normalized path and
-- is removed to make room for the attribute dictionary.
DROP INDEX IF EXISTS idx_products_ean;
DROP INDEX IF EXISTS idx_products_cat_slug;
DROP INDEX IF EXISTS idx_products_status;

CREATE TABLE IF NOT EXISTS supplier_product_attribute_values (
  supplier_product_id uuid NOT NULL REFERENCES supplier_products(id) ON DELETE CASCADE,
  attribute_code text NOT NULL,
  value_code text NOT NULL,
  value_text text NOT NULL DEFAULT '',
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (supplier_product_id, attribute_code, value_code)
);

-- The table is populated incrementally by the trigger below. Defer this
-- secondary filter index until the Neon project has storage headroom.

CREATE OR REPLACE FUNCTION worlds_sync_supplier_product_attribute()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    DELETE FROM supplier_product_attribute_values spa
     USING product_supplier_links l
     WHERE l.product_id = OLD.product_id
       AND spa.supplier_product_id = l.supplier_product_id
       AND spa.attribute_code = trim(COALESCE(OLD.source_attribute_code, ''))
       AND spa.value_code = trim(COALESCE(OLD.raw_value, ''));
    RETURN OLD;
  END IF;
  IF TG_OP = 'UPDATE' AND (
       OLD.source_attribute_code IS DISTINCT FROM NEW.source_attribute_code
       OR OLD.raw_value IS DISTINCT FROM NEW.raw_value
     ) THEN
    DELETE FROM supplier_product_attribute_values spa
     USING product_supplier_links l
     WHERE l.product_id = OLD.product_id
       AND spa.supplier_product_id = l.supplier_product_id
       AND spa.attribute_code = trim(COALESCE(OLD.source_attribute_code, ''))
       AND spa.value_code = trim(COALESCE(OLD.raw_value, ''));
  END IF;
  IF NULLIF(trim(COALESCE(NEW.source_attribute_code, '')), '') IS NULL
     OR NULLIF(trim(COALESCE(NEW.raw_value, '')), '') IS NULL THEN
    RETURN NEW;
  END IF;
  INSERT INTO supplier_product_attribute_values
    (supplier_product_id, attribute_code, value_code, value_text, source_payload, updated_at)
  SELECT l.supplier_product_id, trim(NEW.source_attribute_code), trim(NEW.raw_value),
         COALESCE(NEW.normalized_value, NEW.raw_value), COALESCE(NEW.source_payload, '{}'::jsonb), now()
    FROM product_supplier_links l
   WHERE l.product_id = NEW.product_id
  ON CONFLICT (supplier_product_id, attribute_code, value_code) DO UPDATE SET
    value_text = EXCLUDED.value_text, source_payload = EXCLUDED.source_payload, updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS product_attribute_supplier_projection ON product_attribute_values;
CREATE TRIGGER product_attribute_supplier_projection
AFTER INSERT OR UPDATE OF source_attribute_code, raw_value, normalized_value, source_payload OR DELETE
ON product_attribute_values
FOR EACH ROW EXECUTE FUNCTION worlds_sync_supplier_product_attribute();

INSERT INTO supplier_product_attribute_values
  (supplier_product_id, attribute_code, value_code, value_text, source_payload)
SELECT l.supplier_product_id, pav.source_attribute_code, pav.raw_value,
       COALESCE(pav.normalized_value, pav.raw_value), pav.source_payload
  FROM product_attribute_values pav
  JOIN product_supplier_links l ON l.product_id = pav.product_id
 WHERE NULLIF(trim(COALESCE(pav.source_attribute_code, '')), '') IS NOT NULL
   AND NULLIF(trim(COALESCE(pav.raw_value, '')), '') IS NOT NULL
ON CONFLICT (supplier_product_id, attribute_code, value_code) DO UPDATE SET
  value_text = EXCLUDED.value_text, source_payload = EXCLUDED.source_payload, updated_at = now();
