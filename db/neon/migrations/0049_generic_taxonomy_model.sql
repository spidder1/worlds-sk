CREATE TABLE IF NOT EXISTS taxonomies (
  code text PRIMARY KEY,
  name text NOT NULL,
  source_kind text NOT NULL DEFAULT 'APPLICATION',
  editable boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO taxonomies (code, name, source_kind, editable) VALUES
  ('WORLDS_CATALOG', 'Worlds.sk katalóg', 'APPLICATION', true),
  ('ED_INDEX_1', 'eD index strom 1', 'ED', false),
  ('ED_INDEX_2', 'eD index strom 2', 'ED', false),
  ('ED_COMMODITY', 'eD komodity', 'ED', false)
ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name, updated_at = now();

CREATE TABLE IF NOT EXISTS taxonomy_nodes (
  id text PRIMARY KEY,
  taxonomy_code text NOT NULL REFERENCES taxonomies(code) ON DELETE CASCADE,
  external_code text NOT NULL,
  slug text,
  name text NOT NULL,
  parent_node_id text REFERENCES taxonomy_nodes(id) ON DELETE SET NULL,
  display_order integer NOT NULL DEFAULT 0,
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (taxonomy_code, external_code)
);

CREATE INDEX IF NOT EXISTS idx_taxonomy_nodes_parent
  ON taxonomy_nodes (taxonomy_code, parent_node_id, display_order, name);

CREATE TABLE IF NOT EXISTS taxonomy_node_closure (
  taxonomy_code text NOT NULL REFERENCES taxonomies(code) ON DELETE CASCADE,
  ancestor_node_id text NOT NULL REFERENCES taxonomy_nodes(id) ON DELETE CASCADE,
  descendant_node_id text NOT NULL REFERENCES taxonomy_nodes(id) ON DELETE CASCADE,
  depth integer NOT NULL CHECK (depth >= 0),
  PRIMARY KEY (taxonomy_code, ancestor_node_id, descendant_node_id)
);

CREATE INDEX IF NOT EXISTS idx_taxonomy_closure_descendant
  ON taxonomy_node_closure (taxonomy_code, descendant_node_id, depth);

CREATE TABLE IF NOT EXISTS category_mappings (
  source_taxonomy_code text NOT NULL REFERENCES taxonomies(code) ON DELETE CASCADE,
  source_node_code text NOT NULL,
  target_node_id text NOT NULL REFERENCES taxonomy_nodes(id) ON DELETE CASCADE,
  method text NOT NULL DEFAULT 'RULE',
  confidence numeric(5,4),
  status text NOT NULL DEFAULT 'ACTIVE'
    CHECK (status IN ('ACTIVE', 'REVIEW', 'REJECTED')),
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (source_taxonomy_code, source_node_code)
);

CREATE TABLE IF NOT EXISTS product_taxonomy_assignments (
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  taxonomy_code text NOT NULL REFERENCES taxonomies(code) ON DELETE CASCADE,
  taxonomy_node_id text NOT NULL REFERENCES taxonomy_nodes(id) ON DELETE CASCADE,
  source text NOT NULL DEFAULT 'IMPORT',
  confidence numeric(5,4),
  is_primary boolean NOT NULL DEFAULT true,
  approved_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (product_id, taxonomy_code, taxonomy_node_id)
);

CREATE INDEX IF NOT EXISTS idx_product_taxonomy_node
  ON product_taxonomy_assignments (taxonomy_code, taxonomy_node_id, is_primary);

-- Mirror the current editable Worlds category tree.
INSERT INTO taxonomy_nodes (id, taxonomy_code, external_code, slug, name, parent_node_id, display_order, source_payload)
SELECT 'worlds:' || c.id, 'WORLDS_CATALOG', c.id, c.slug, c.name,
       CASE WHEN c.parent_id IS NOT NULL
                  AND EXISTS (SELECT 1 FROM categories parent WHERE parent.id = c.parent_id)
            THEN 'worlds:' || c.parent_id ELSE NULL END,
       COALESCE(c.display_order, 0), jsonb_build_object('source', 'categories')
  FROM categories c
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug, name = EXCLUDED.name, parent_node_id = EXCLUDED.parent_node_id,
  display_order = EXCLUDED.display_order, updated_at = now();

-- Rebuild closure for the canonical tree. The delete is scoped only to this
-- taxonomy; supplier reference trees remain independent and replayable.
DELETE FROM taxonomy_node_closure WHERE taxonomy_code = 'WORLDS_CATALOG';
WITH RECURSIVE paths AS (
  SELECT n.id AS ancestor_node_id, n.id AS descendant_node_id, 0 AS depth,
         ARRAY[n.id]::text[] AS visited
    FROM taxonomy_nodes n WHERE n.taxonomy_code = 'WORLDS_CATALOG'
  UNION ALL
  SELECT p.ancestor_node_id, child.id, p.depth + 1, p.visited || child.id
    FROM paths p
    JOIN taxonomy_nodes child ON child.taxonomy_code = 'WORLDS_CATALOG'
                             AND child.parent_node_id = p.descendant_node_id
   WHERE NOT child.id = ANY(p.visited)
)
INSERT INTO taxonomy_node_closure (taxonomy_code, ancestor_node_id, descendant_node_id, depth)
SELECT 'WORLDS_CATALOG', ancestor_node_id, descendant_node_id, depth FROM paths
ON CONFLICT DO NOTHING;

INSERT INTO product_taxonomy_assignments (product_id, taxonomy_code, taxonomy_node_id, source, confidence, is_primary)
SELECT p.id, 'WORLDS_CATALOG', 'worlds:' || c.id, 'IMPORT', p.category_confidence, true
  FROM products p
  JOIN categories c ON c.slug = p.category_slug
ON CONFLICT (product_id, taxonomy_code, taxonomy_node_id) DO UPDATE SET
  confidence = EXCLUDED.confidence, updated_at = now();

CREATE OR REPLACE FUNCTION worlds_sync_product_taxonomy_assignment()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO product_taxonomy_assignments
    (product_id, taxonomy_code, taxonomy_node_id, source, confidence, is_primary, updated_at)
  SELECT NEW.id, 'WORLDS_CATALOG', 'worlds:' || c.id, COALESCE(NEW.category_source, 'IMPORT'),
         NEW.category_confidence, true, now()
    FROM categories c WHERE c.slug = NEW.category_slug
  ON CONFLICT (product_id, taxonomy_code, taxonomy_node_id) DO UPDATE SET
    source = EXCLUDED.source, confidence = EXCLUDED.confidence, updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS products_taxonomy_assignment ON products;
CREATE TRIGGER products_taxonomy_assignment
AFTER INSERT OR UPDATE OF category_slug, category_source, category_confidence
ON products
FOR EACH ROW EXECUTE FUNCTION worlds_sync_product_taxonomy_assignment();
