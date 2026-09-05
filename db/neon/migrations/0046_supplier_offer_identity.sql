-- Normalized supplier-offer identity. products remains the canonical storefront
-- record; this layer preserves the eD offer identity and its exact identifiers.
CREATE TABLE IF NOT EXISTS suppliers (
  id text PRIMARY KEY,
  name text NOT NULL,
  source_system text NOT NULL DEFAULT 'ED_SK',
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO suppliers (id, name, source_system)
VALUES ('ED_SK', 'eD system Slovensko', 'ED_SK')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, updated_at = now();

CREATE TABLE IF NOT EXISTS supplier_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id text NOT NULL REFERENCES suppliers(id),
  supplier_sku text NOT NULL,
  external_product_id text,
  manufacturer_code text,
  title text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'ACTIVE',
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (supplier_id, supplier_sku)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_supplier_products_external_id
  ON supplier_products (supplier_id, external_product_id)
  WHERE external_product_id IS NOT NULL AND external_product_id <> '';
CREATE INDEX IF NOT EXISTS idx_supplier_products_last_seen
  ON supplier_products (supplier_id, last_seen_at DESC);

CREATE TABLE IF NOT EXISTS product_supplier_links (
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  supplier_product_id uuid NOT NULL REFERENCES supplier_products(id) ON DELETE CASCADE,
  match_method text NOT NULL DEFAULT 'SOURCE_CODE',
  match_confidence numeric(5,4) NOT NULL DEFAULT 1,
  is_primary boolean NOT NULL DEFAULT true,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (product_id, supplier_product_id)
);

CREATE INDEX IF NOT EXISTS idx_product_supplier_links_offer
  ON product_supplier_links (supplier_product_id, is_primary);

CREATE TABLE IF NOT EXISTS supplier_product_identifiers (
  supplier_product_id uuid NOT NULL REFERENCES supplier_products(id) ON DELETE CASCADE,
  identifier_type text NOT NULL,
  raw_value text NOT NULL,
  normalized_value text,
  is_verified boolean NOT NULL DEFAULT false,
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (supplier_product_id, identifier_type, raw_value)
);

CREATE INDEX IF NOT EXISTS idx_supplier_product_identifiers_normalized
  ON supplier_product_identifiers (identifier_type, normalized_value)
  WHERE normalized_value IS NOT NULL;

CREATE OR REPLACE FUNCTION worlds_sync_supplier_offer_identity()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  offer_id uuid;
BEGIN
  IF COALESCE(NULLIF(trim(NEW.supplier_code), ''), '') = '' THEN
    RETURN NEW;
  END IF;

  INSERT INTO supplier_products
    (supplier_id, supplier_sku, external_product_id, manufacturer_code, title, status,
     source_payload, last_seen_at)
  VALUES
    ('ED_SK', trim(NEW.supplier_code), NULLIF(trim(COALESCE(NEW.supplier_pro_id, '')), ''),
     NULLIF(trim(COALESCE(NEW.producer_code, '')), ''), COALESCE(NEW.title, ''),
     COALESCE(NEW.status, 'ACTIVE'), jsonb_build_object('source', 'products_trigger'),
     COALESCE(NEW.last_seen_at, now()))
  ON CONFLICT (supplier_id, supplier_sku) DO UPDATE SET
    external_product_id = EXCLUDED.external_product_id,
    manufacturer_code = EXCLUDED.manufacturer_code,
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    source_payload = EXCLUDED.source_payload,
    last_seen_at = EXCLUDED.last_seen_at
  RETURNING id INTO offer_id;

  INSERT INTO product_supplier_links (product_id, supplier_product_id, updated_at)
  VALUES (NEW.id, offer_id, now())
  ON CONFLICT (product_id, supplier_product_id) DO UPDATE SET updated_at = now();

  IF NULLIF(trim(COALESCE(NEW.ean, '')), '') IS NOT NULL THEN
    INSERT INTO supplier_product_identifiers
      (supplier_product_id, identifier_type, raw_value, normalized_value, is_verified)
    VALUES (offer_id, 'EAN', trim(NEW.ean), regexp_replace(trim(NEW.ean), '[^0-9]', '', 'g'), length(regexp_replace(trim(NEW.ean), '[^0-9]', '', 'g')) IN (8, 12, 13, 14))
    ON CONFLICT (supplier_product_id, identifier_type, raw_value) DO UPDATE SET
      normalized_value = EXCLUDED.normalized_value, is_verified = EXCLUDED.is_verified, updated_at = now();
  END IF;
  IF NULLIF(trim(COALESCE(NEW.mpn, '')), '') IS NOT NULL THEN
    INSERT INTO supplier_product_identifiers
      (supplier_product_id, identifier_type, raw_value, normalized_value, is_verified)
    VALUES (offer_id, 'MPN', trim(NEW.mpn), upper(regexp_replace(trim(NEW.mpn), '[^A-Za-z0-9._/-]', '', 'g')), true)
    ON CONFLICT (supplier_product_id, identifier_type, raw_value) DO UPDATE SET
      normalized_value = EXCLUDED.normalized_value, is_verified = true, updated_at = now();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS products_supplier_offer_identity ON products;
CREATE TRIGGER products_supplier_offer_identity
AFTER INSERT OR UPDATE OF supplier_code, supplier_pro_id, producer_code, title, status, last_seen_at, ean, mpn
ON products
FOR EACH ROW EXECUTE FUNCTION worlds_sync_supplier_offer_identity();

-- Backfill rows that predate this migration so the normalized layer is complete
-- immediately after deployment, not only after the next catalogue run.
INSERT INTO supplier_products
  (supplier_id, supplier_sku, external_product_id, manufacturer_code, title, status, last_seen_at)
SELECT 'ED_SK', trim(p.supplier_code), NULLIF(trim(COALESCE(p.supplier_pro_id, '')), ''),
       NULLIF(trim(COALESCE(p.producer_code, '')), ''), COALESCE(p.title, ''),
       COALESCE(p.status, 'ACTIVE'), COALESCE(p.last_seen_at, now())
  FROM products p
 WHERE NULLIF(trim(COALESCE(p.supplier_code, '')), '') IS NOT NULL
ON CONFLICT (supplier_id, supplier_sku) DO UPDATE SET last_seen_at = EXCLUDED.last_seen_at;

INSERT INTO product_supplier_links (product_id, supplier_product_id)
SELECT p.id, sp.id
  FROM products p
  JOIN supplier_products sp ON sp.supplier_id = 'ED_SK' AND sp.supplier_sku = trim(p.supplier_code)
 WHERE NULLIF(trim(COALESCE(p.supplier_code, '')), '') IS NOT NULL
ON CONFLICT (product_id, supplier_product_id) DO NOTHING;
