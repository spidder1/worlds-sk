CREATE TABLE IF NOT EXISTS source_media_assets (
  supplier_product_id uuid NOT NULL REFERENCES supplier_products(id) ON DELETE CASCADE,
  media_asset_id uuid NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'PRODUCT',
  source_position integer NOT NULL DEFAULT 0,
  source_updated_at timestamptz,
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (supplier_product_id, media_asset_id)
);

CREATE INDEX IF NOT EXISTS idx_source_media_assets_asset
  ON source_media_assets (media_asset_id, supplier_product_id);

CREATE TABLE IF NOT EXISTS taxonomy_node_media (
  taxonomy_node_id text NOT NULL REFERENCES taxonomy_nodes(id) ON DELETE CASCADE,
  media_asset_id uuid NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'CATEGORY',
  position integer NOT NULL DEFAULT 0,
  alt_text text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (taxonomy_node_id, media_asset_id)
);

CREATE INDEX IF NOT EXISTS idx_taxonomy_node_media_position
  ON taxonomy_node_media (taxonomy_node_id, position);
