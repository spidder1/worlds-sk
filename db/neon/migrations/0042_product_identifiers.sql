CREATE TABLE IF NOT EXISTS product_identifiers (
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  identifier_type text NOT NULL CHECK (identifier_type IN ('EAN', 'MPN', 'MPN2', 'SUPPLIER_CODE', 'SUPPLIER_PRO_ID')),
  identifier_value text NOT NULL,
  normalized_value text NOT NULL,
  is_primary boolean NOT NULL DEFAULT false,
  source text NOT NULL DEFAULT 'ED',
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (product_id, identifier_type, identifier_value)
);

CREATE INDEX IF NOT EXISTS idx_product_identifiers_lookup
  ON product_identifiers (identifier_type, normalized_value);
