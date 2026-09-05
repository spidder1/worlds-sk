CREATE TABLE IF NOT EXISTS supplier_attributes (
  attribute_code text PRIMARY KEY,
  attribute_name text NOT NULL DEFAULT '',
  is_primary boolean NOT NULL DEFAULT false,
  filter_operator text,
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS supplier_attribute_values (
  attribute_code text NOT NULL,
  value_code text NOT NULL,
  value_text text NOT NULL DEFAULT '',
  value_sort numeric(12,3),
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (attribute_code, value_code)
);

CREATE INDEX IF NOT EXISTS idx_supplier_attribute_values_text
  ON supplier_attribute_values (attribute_code, value_text);
