ALTER TABLE supplier_order_attempts
  DROP CONSTRAINT IF EXISTS supplier_order_attempts_status_check;

ALTER TABLE supplier_order_attempts
  ADD CONSTRAINT supplier_order_attempts_status_check
  CHECK (status IN ('RUNNING', 'SENT', 'FAILED', 'UNKNOWN', 'CANCELLED'));

CREATE INDEX IF NOT EXISTS idx_supplier_order_attempts_unknown
  ON supplier_order_attempts (status, started_at)
  WHERE status = 'UNKNOWN';
