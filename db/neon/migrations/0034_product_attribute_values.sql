CREATE TABLE IF NOT EXISTS product_attribute_values (
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  attribute_key text NOT NULL,
  source_attribute_code text,
  attribute_name text NOT NULL DEFAULT '',
  raw_value text NOT NULL DEFAULT '',
  normalized_value text NOT NULL DEFAULT '',
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (product_id, attribute_key)
);

CREATE INDEX IF NOT EXISTS idx_product_attribute_values_filter
  ON product_attribute_values (attribute_key, normalized_value);
CREATE INDEX IF NOT EXISTS idx_product_attribute_values_product
  ON product_attribute_values (product_id);
