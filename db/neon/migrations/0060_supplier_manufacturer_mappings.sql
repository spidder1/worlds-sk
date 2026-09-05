CREATE TABLE IF NOT EXISTS supplier_manufacturers (
  producer_code text PRIMARY KEY,
  producer_name text NOT NULL DEFAULT '',
  producer_id text,
  manufacturer_id text REFERENCES manufacturers(id) ON DELETE SET NULL,
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_supplier_manufacturers_name
  ON supplier_manufacturers (lower(producer_name));

CREATE TABLE IF NOT EXISTS manufacturer_mappings (
  producer_code text PRIMARY KEY REFERENCES supplier_manufacturers(producer_code) ON DELETE CASCADE,
  manufacturer_id text REFERENCES manufacturers(id) ON DELETE SET NULL,
  method text NOT NULL DEFAULT 'REVIEW',
  confidence numeric(5,4),
  status text NOT NULL DEFAULT 'REVIEW'
    CHECK (status IN ('ACTIVE', 'REVIEW', 'REJECTED')),
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_manufacturer_mappings_review
  ON manufacturer_mappings (status, confidence);

INSERT INTO supplier_manufacturers
  (producer_code, producer_name, producer_id, manufacturer_id, source_payload)
SELECT sp.producer_code, sp.producer_name, sp.producer_id, m.id, sp.source_payload
  FROM supplier_producers sp
  LEFT JOIN manufacturers m ON lower(trim(m.name)) = lower(trim(sp.producer_name))
ON CONFLICT (producer_code) DO UPDATE SET
  producer_name = EXCLUDED.producer_name, producer_id = EXCLUDED.producer_id,
  manufacturer_id = COALESCE(supplier_manufacturers.manufacturer_id, EXCLUDED.manufacturer_id),
  source_payload = EXCLUDED.source_payload, updated_at = now();

INSERT INTO manufacturer_mappings (producer_code, manufacturer_id, method, confidence, status, evidence)
SELECT sm.producer_code, sm.manufacturer_id,
       CASE WHEN sm.manufacturer_id IS NULL THEN 'REVIEW' ELSE 'EXACT_NAME' END,
       CASE WHEN sm.manufacturer_id IS NULL THEN NULL ELSE 1 END,
       CASE WHEN sm.manufacturer_id IS NULL THEN 'REVIEW' ELSE 'ACTIVE' END,
       jsonb_build_object('producerName', sm.producer_name)
  FROM supplier_manufacturers sm
ON CONFLICT (producer_code) DO UPDATE SET
  manufacturer_id = COALESCE(manufacturer_mappings.manufacturer_id, EXCLUDED.manufacturer_id),
  updated_at = now();
