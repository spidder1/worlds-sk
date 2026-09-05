CREATE TABLE IF NOT EXISTS media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url text NOT NULL UNIQUE,
  storage_url text,
  status text NOT NULL DEFAULT 'DISCOVERED'
    CHECK (status IN ('DISCOVERED', 'QUEUED', 'DOWNLOADED', 'FAILED', 'BLOCKED')),
  mime_type text,
  byte_size bigint,
  sha256 text,
  width integer,
  height integer,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_checked_at timestamptz,
  error_message text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_media_assets_status
  ON media_assets (status, last_checked_at NULLS FIRST);
CREATE INDEX IF NOT EXISTS idx_media_assets_sha256
  ON media_assets (sha256) WHERE sha256 IS NOT NULL;

ALTER TABLE product_media ADD COLUMN IF NOT EXISTS media_asset_id uuid REFERENCES media_assets(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_product_media_asset ON product_media (media_asset_id);
