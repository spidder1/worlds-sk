CREATE TABLE IF NOT EXISTS raw_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id uuid NOT NULL REFERENCES sync_batches(id) ON DELETE CASCADE,
  source_method text NOT NULL,
  source_name text NOT NULL,
  storage_uri text,
  byte_size bigint NOT NULL DEFAULT 0,
  sha256 text NOT NULL,
  media_type text,
  captured_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  UNIQUE (batch_id, source_name, sha256)
);

CREATE INDEX IF NOT EXISTS idx_raw_documents_hash ON raw_documents (sha256, captured_at DESC);

CREATE TABLE IF NOT EXISTS raw_records (
  id bigserial PRIMARY KEY,
  batch_id uuid NOT NULL REFERENCES sync_batches(id) ON DELETE CASCADE,
  raw_document_id uuid REFERENCES raw_documents(id) ON DELETE SET NULL,
  record_number bigint NOT NULL,
  source_key text,
  payload jsonb NOT NULL,
  payload_sha256 text,
  captured_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (batch_id, record_number)
);

CREATE TABLE IF NOT EXISTS staging_products (
  id bigserial PRIMARY KEY,
  batch_id uuid NOT NULL REFERENCES sync_batches(id) ON DELETE CASCADE,
  source_key text NOT NULL,
  normalized_payload jsonb NOT NULL,
  validation_status text NOT NULL DEFAULT 'PENDING'
    CHECK (validation_status IN ('PENDING', 'VALID', 'QUARANTINED', 'IMPORTED')),
  issue_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (batch_id, source_key)
);

CREATE TABLE IF NOT EXISTS import_issues (
  id bigserial PRIMARY KEY,
  batch_id uuid NOT NULL REFERENCES sync_batches(id) ON DELETE CASCADE,
  source_key text,
  issue_code text NOT NULL,
  severity text NOT NULL DEFAULT 'ERROR' CHECK (severity IN ('INFO', 'WARNING', 'ERROR', 'FATAL')),
  message text NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  resolved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_import_issues_open
  ON import_issues (batch_id, resolved, severity, created_at DESC);

CREATE TABLE IF NOT EXISTS outbox_events (
  id bigserial PRIMARY KEY,
  aggregate_type text NOT NULL,
  aggregate_id text NOT NULL,
  event_type text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'PENDING'
    CHECK (status IN ('PENDING', 'PROCESSING', 'SENT', 'FAILED')),
  attempts integer NOT NULL DEFAULT 0,
  available_at timestamptz NOT NULL DEFAULT now(),
  last_error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  processed_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_outbox_events_pending
  ON outbox_events (status, available_at, id)
  WHERE status IN ('PENDING', 'FAILED');
