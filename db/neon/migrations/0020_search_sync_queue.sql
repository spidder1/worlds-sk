CREATE TABLE IF NOT EXISTS search_sync_queue (
  product_id text PRIMARY KEY,
  reason text NOT NULL DEFAULT 'catalog_sync',
  enqueued_at timestamptz NOT NULL DEFAULT now(),
  attempts integer NOT NULL DEFAULT 0,
  last_error text,
  processed_at timestamptz
);

CREATE INDEX IF NOT EXISTS search_sync_queue_pending_idx
  ON search_sync_queue (processed_at, enqueued_at)
  WHERE processed_at IS NULL;
