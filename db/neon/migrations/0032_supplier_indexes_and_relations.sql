-- Reference trees and directed product relations from the eD exchange.
CREATE TABLE IF NOT EXISTS supplier_index_nodes (
  tree_key text NOT NULL CHECK (tree_key IN ('INDEX_1', 'INDEX_2')),
  index_code text NOT NULL,
  commodity_code text,
  parent_index_code text,
  index_name text NOT NULL DEFAULT '',
  index_sort text,
  index_sort_code text,
  index_level integer,
  index_order integer,
  code_name text,
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tree_key, index_code)
);

CREATE INDEX IF NOT EXISTS idx_supplier_index_nodes_parent
  ON supplier_index_nodes (tree_key, parent_index_code, index_order, index_name);

CREATE TABLE IF NOT EXISTS product_relation_types (
  relation_type_id text PRIMARY KEY,
  relation_name text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS product_relations (
  parent_product_id text NOT NULL,
  child_product_id text NOT NULL,
  relation_type_id text NOT NULL REFERENCES product_relation_types(relation_type_id),
  parent_supplier_code text NOT NULL,
  child_supplier_code text NOT NULL,
  quantity numeric(12,3) NOT NULL DEFAULT 1,
  relation_name text NOT NULL DEFAULT '',
  source_batch uuid,
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (parent_product_id, child_product_id, relation_type_id)
);

CREATE INDEX IF NOT EXISTS idx_product_relations_child ON product_relations (child_product_id);
CREATE INDEX IF NOT EXISTS idx_product_relations_type ON product_relations (relation_type_id);

CREATE TABLE IF NOT EXISTS unresolved_product_relations (
  id bigserial PRIMARY KEY,
  parent_pro_id text,
  parent_code text,
  child_pro_id text,
  child_code text,
  relation_type_id text,
  relation_name text,
  quantity numeric(12,3) NOT NULL DEFAULT 1,
  source_batch uuid,
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_unresolved_product_relations_open
  ON unresolved_product_relations (resolved_at, last_seen_at);
