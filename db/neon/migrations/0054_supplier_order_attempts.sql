CREATE TABLE IF NOT EXISTS supplier_order_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  attempt_no integer NOT NULL CHECK (attempt_no > 0),
  status text NOT NULL DEFAULT 'RUNNING'
    CHECK (status IN ('RUNNING', 'SENT', 'FAILED', 'CANCELLED')),
  test_mode boolean NOT NULL DEFAULT true,
  request_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  response_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  supplier_order_symbol text,
  error_message text,
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  UNIQUE (order_id, attempt_no)
);

CREATE INDEX IF NOT EXISTS idx_supplier_order_attempts_order
  ON supplier_order_attempts (order_id, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_supplier_order_attempts_running
  ON supplier_order_attempts (status, started_at)
  WHERE status = 'RUNNING';
