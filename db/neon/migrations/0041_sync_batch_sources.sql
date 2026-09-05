CREATE TABLE IF NOT EXISTS sync_batch_sources (
  id bigserial PRIMARY KEY,
  batch_id uuid NOT NULL REFERENCES sync_batches(id) ON DELETE CASCADE,
  source_method text NOT NULL,
  source_name text NOT NULL,
  byte_size bigint NOT NULL DEFAULT 0,
  sha256 text NOT NULL,
  media_type text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (batch_id, source_name, sha256)
);

CREATE INDEX IF NOT EXISTS idx_sync_batch_sources_batch ON sync_batch_sources (batch_id, created_at);
