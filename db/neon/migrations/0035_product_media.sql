CREATE TABLE IF NOT EXISTS product_media (
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  source_url text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  is_primary boolean NOT NULL DEFAULT false,
  alt_text text NOT NULL DEFAULT '',
  provenance text NOT NULL DEFAULT 'UNKNOWN_ED',
  source_updated_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (product_id, source_url)
);

CREATE INDEX IF NOT EXISTS idx_product_media_position
  ON product_media (product_id, position);
