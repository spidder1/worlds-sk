CREATE TABLE IF NOT EXISTS attributes (
  id text PRIMARY KEY,
  source_attribute_code text,
  name text NOT NULL,
  data_type text NOT NULL DEFAULT 'TEXT'
    CHECK (data_type IN ('TEXT', 'NUMBER', 'BOOLEAN', 'DATE', 'ENUM')),
  unit text,
  is_multivalue boolean NOT NULL DEFAULT false,
  is_filterable boolean NOT NULL DEFAULT true,
  active boolean NOT NULL DEFAULT true,
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_attributes_source_code
  ON attributes (source_attribute_code) WHERE source_attribute_code IS NOT NULL;

CREATE TABLE IF NOT EXISTS attribute_values (
  attribute_id text NOT NULL REFERENCES attributes(id) ON DELETE CASCADE,
  source_value_code text NOT NULL,
  value text NOT NULL DEFAULT '',
  sort_order numeric(12,3),
  active boolean NOT NULL DEFAULT true,
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (attribute_id, source_value_code)
);

CREATE INDEX IF NOT EXISTS idx_attribute_values_filter
  ON attribute_values (attribute_id, value, sort_order);

CREATE TABLE IF NOT EXISTS category_attributes (
  taxonomy_node_id text NOT NULL REFERENCES taxonomy_nodes(id) ON DELETE CASCADE,
  attribute_id text NOT NULL REFERENCES attributes(id) ON DELETE CASCADE,
  is_required boolean NOT NULL DEFAULT false,
  is_filterable boolean NOT NULL DEFAULT true,
  is_primary boolean NOT NULL DEFAULT false,
  filter_operator text NOT NULL DEFAULT 'OR' CHECK (filter_operator IN ('AND', 'OR')),
  display_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (taxonomy_node_id, attribute_id)
);

CREATE TABLE IF NOT EXISTS attribute_mappings (
  source_attribute_code text PRIMARY KEY,
  attribute_id text NOT NULL REFERENCES attributes(id) ON DELETE CASCADE,
  method text NOT NULL DEFAULT 'RULE',
  confidence numeric(5,4),
  status text NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'REVIEW', 'REJECTED')),
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS attribute_value_mappings (
  source_attribute_code text NOT NULL,
  source_value_code text NOT NULL,
  attribute_id text NOT NULL REFERENCES attributes(id) ON DELETE CASCADE,
  canonical_value_code text NOT NULL,
  method text NOT NULL DEFAULT 'RULE',
  confidence numeric(5,4),
  status text NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'REVIEW', 'REJECTED')),
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (source_attribute_code, source_value_code)
);

-- Start the canonical layer from the verified eD dictionaries. Administrators
-- can subsequently change names, types and mappings without altering source data.
INSERT INTO attributes (id, source_attribute_code, name, data_type, is_filterable, source_payload)
SELECT 'attr:' || sa.attribute_code, sa.attribute_code, sa.attribute_name, 'ENUM', true, sa.source_payload
  FROM supplier_attributes sa
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, source_payload = EXCLUDED.source_payload, updated_at = now();

INSERT INTO attribute_mappings (source_attribute_code, attribute_id, method, confidence)
SELECT sa.attribute_code, 'attr:' || sa.attribute_code, 'IMPORT', 1
  FROM supplier_attributes sa
ON CONFLICT (source_attribute_code) DO UPDATE SET attribute_id = EXCLUDED.attribute_id, updated_at = now();

INSERT INTO attribute_values (attribute_id, source_value_code, value, sort_order, source_payload)
SELECT 'attr:' || sv.attribute_code, sv.value_code, sv.value_text, sv.value_sort, sv.source_payload
  FROM supplier_attribute_values sv
ON CONFLICT (attribute_id, source_value_code) DO UPDATE SET
  value = EXCLUDED.value, sort_order = EXCLUDED.sort_order,
  source_payload = EXCLUDED.source_payload, updated_at = now();

INSERT INTO attribute_value_mappings
  (source_attribute_code, source_value_code, attribute_id, canonical_value_code, method, confidence)
SELECT sv.attribute_code, sv.value_code, 'attr:' || sv.attribute_code, sv.value_code, 'IMPORT', 1
  FROM supplier_attribute_values sv
ON CONFLICT (source_attribute_code, source_value_code) DO UPDATE SET
  attribute_id = EXCLUDED.attribute_id, canonical_value_code = EXCLUDED.canonical_value_code,
  updated_at = now();
