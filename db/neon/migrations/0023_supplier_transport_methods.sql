CREATE TABLE IF NOT EXISTS supplier_transport_methods (
  code text PRIMARY KEY,
  name text NOT NULL,
  type_code text,
  active boolean NOT NULL DEFAULT true,
  fetched_at timestamptz NOT NULL DEFAULT NOW()
);

ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS value jsonb;
INSERT INTO store_settings (key, value, updated_at)
VALUES ('orders.default_transport_code', '{"value": null}'::jsonb, NOW())
ON CONFLICT (key) DO NOTHING;

CREATE INDEX IF NOT EXISTS idx_supplier_transport_active ON supplier_transport_methods (active, name);
