CREATE TABLE IF NOT EXISTS supplier_order_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  attempt_id uuid NOT NULL UNIQUE REFERENCES supplier_order_attempts(id) ON DELETE CASCADE,
  request_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'PREPARED'
    CHECK (status IN ('PREPARED', 'SUBMITTED', 'SUCCEEDED', 'FAILED', 'UNKNOWN')),
  submitted_at timestamptz,
  response_received_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_supplier_order_requests_order
  ON supplier_order_requests (order_id, created_at DESC);

CREATE TABLE IF NOT EXISTS supplier_order_events (
  id bigserial PRIMARY KEY,
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  attempt_id uuid REFERENCES supplier_order_attempts(id) ON DELETE SET NULL,
  event_type text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_supplier_order_events_order
  ON supplier_order_events (order_id, created_at DESC);
