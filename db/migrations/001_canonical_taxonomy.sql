-- Worlds.sk canonical taxonomy and classification audit tables.
-- Supplier category values are retained as source data; storefront navigation
-- must use categories.slug only.

CREATE TABLE IF NOT EXISTS category_mappings (
  id bigserial PRIMARY KEY,
  supplier text NOT NULL DEFAULT 'eD_SYSTEM',
  supplier_category_code text,
  supplier_commodity_code text,
  supplier_category_name text,
  canonical_category_slug text NOT NULL REFERENCES categories(slug) ON UPDATE CASCADE,
  priority integer NOT NULL DEFAULT 100,
  active boolean NOT NULL DEFAULT true,
  rule_source text NOT NULL DEFAULT 'MANUAL',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (supplier_category_code IS NOT NULL OR supplier_commodity_code IS NOT NULL OR supplier_category_name IS NOT NULL)
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_category_mappings_code
  ON category_mappings (supplier, supplier_category_code)
  WHERE supplier_category_code IS NOT NULL AND active = true;

CREATE UNIQUE INDEX IF NOT EXISTS uq_category_mappings_commodity
  ON category_mappings (supplier, supplier_commodity_code)
  WHERE supplier_commodity_code IS NOT NULL AND active = true;

CREATE INDEX IF NOT EXISTS idx_category_mappings_canonical
  ON category_mappings (canonical_category_slug, active, priority);

CREATE TABLE IF NOT EXISTS category_rules (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  target_category_slug text NOT NULL REFERENCES categories(slug) ON UPDATE CASCADE,
  match_expression jsonb NOT NULL,
  priority integer NOT NULL DEFAULT 100,
  active boolean NOT NULL DEFAULT true,
  created_by text NOT NULL DEFAULT 'system',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_category_rules_active_priority
  ON category_rules (active, priority, target_category_slug);

CREATE TABLE IF NOT EXISTS product_category_history (
  id bigserial PRIMARY KEY,
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  previous_category_slug text,
  new_category_slug text NOT NULL,
  source text NOT NULL,
  confidence numeric(5,4),
  reasoning text,
  import_batch_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_product_category_history_product
  ON product_category_history (product_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_product_category_history_review
  ON product_category_history (source, confidence)
  WHERE confidence IS NOT NULL AND confidence < 0.7;

CREATE TABLE IF NOT EXISTS product_media (
  id text PRIMARY KEY,
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url text NOT NULL,
  normalized_url text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  is_primary boolean NOT NULL DEFAULT false,
  alt_text text,
  source text NOT NULL DEFAULT 'eD_SYSTEM',
  content_type text,
  http_status integer,
  verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (product_id, normalized_url)
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_product_media_primary
  ON product_media (product_id)
  WHERE is_primary = true;

CREATE INDEX IF NOT EXISTS idx_product_media_product_position
  ON product_media (product_id, position);
