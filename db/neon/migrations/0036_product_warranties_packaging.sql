CREATE TABLE IF NOT EXISTS product_warranties (
  product_id text PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
  raw_term text NOT NULL DEFAULT '',
  term numeric(12,3),
  unit text NOT NULL DEFAULT 'M',
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS supplier_packaging (
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  package_type text NOT NULL,
  package_index integer NOT NULL DEFAULT 0,
  item_count numeric(12,3),
  weight_kg numeric(12,3),
  length_cm numeric(12,3),
  width_cm numeric(12,3),
  height_cm numeric(12,3),
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (product_id, package_type, package_index)
);

CREATE INDEX IF NOT EXISTS idx_supplier_packaging_product ON supplier_packaging (product_id);
