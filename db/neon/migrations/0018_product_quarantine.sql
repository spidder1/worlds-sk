CREATE TABLE IF NOT EXISTS product_quarantine (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id uuid REFERENCES sync_batches(id) ON DELETE SET NULL,
  supplier_code text NOT NULL DEFAULT 'UNKNOWN',
  pro_id text,
  reason text NOT NULL,
  error_details text NOT NULL,
  raw_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  resolved boolean NOT NULL DEFAULT false,
  resolution_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz
);

CREATE INDEX IF NOT EXISTS product_quarantine_open_idx
  ON product_quarantine (resolved, created_at DESC);
CREATE INDEX IF NOT EXISTS product_quarantine_batch_idx
  ON product_quarantine (batch_id);
