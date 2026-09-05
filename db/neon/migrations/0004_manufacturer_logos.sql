-- Curated manufacturer names and locally served logo assets for the storefront.
ALTER TABLE manufacturers ADD COLUMN IF NOT EXISTS logo_url text;
ALTER TABLE manufacturers ADD COLUMN IF NOT EXISTS logo_source text;
ALTER TABLE manufacturers ADD COLUMN IF NOT EXISTS logo_status text NOT NULL DEFAULT 'PENDING';
ALTER TABLE manufacturers ADD COLUMN IF NOT EXISTS logo_updated_at timestamptz;
ALTER TABLE manufacturers ADD COLUMN IF NOT EXISTS aliases jsonb NOT NULL DEFAULT '[]'::jsonb;

CREATE INDEX IF NOT EXISTS idx_manufacturers_logo_status ON manufacturers (logo_status, name);
