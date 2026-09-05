CREATE TABLE IF NOT EXISTS supplier_product_marketing_flags (
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  flag_code text NOT NULL,
  flag_name text NOT NULL DEFAULT '',
  flag_value text NOT NULL DEFAULT '',
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (product_id, flag_code)
);

CREATE INDEX IF NOT EXISTS idx_supplier_marketing_flags_code_value
  ON supplier_product_marketing_flags (flag_code, flag_value);
