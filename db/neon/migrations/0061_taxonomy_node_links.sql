CREATE TABLE IF NOT EXISTS taxonomy_node_links (
  source_taxonomy_code text NOT NULL REFERENCES taxonomies(code) ON DELETE CASCADE,
  source_node_id text NOT NULL REFERENCES taxonomy_nodes(id) ON DELETE CASCADE,
  target_taxonomy_code text NOT NULL REFERENCES taxonomies(code) ON DELETE CASCADE,
  target_node_id text NOT NULL REFERENCES taxonomy_nodes(id) ON DELETE CASCADE,
  link_type text NOT NULL DEFAULT 'MAPPED',
  method text NOT NULL DEFAULT 'REVIEW',
  confidence numeric(5,4),
  status text NOT NULL DEFAULT 'REVIEW'
    CHECK (status IN ('ACTIVE', 'REVIEW', 'REJECTED')),
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (source_taxonomy_code, source_node_id, target_taxonomy_code, target_node_id)
);

CREATE INDEX IF NOT EXISTS idx_taxonomy_node_links_target
  ON taxonomy_node_links (target_taxonomy_code, target_node_id, status);
