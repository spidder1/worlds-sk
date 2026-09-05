CREATE TABLE IF NOT EXISTS supplier_producers (
  producer_code text PRIMARY KEY,
  producer_name text NOT NULL DEFAULT '',
  producer_id text,
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS supplier_commodities (
  commodity_code text PRIMARY KEY,
  commodity_name text NOT NULL DEFAULT '',
  parent_commodity_code text,
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_supplier_commodities_parent
  ON supplier_commodities (parent_commodity_code, commodity_name);
