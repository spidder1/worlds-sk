-- Reviewed manufacturer allow-list used by the recurring catalog cleanup.
ALTER TABLE manufacturers ADD COLUMN IF NOT EXISTS audit_class text NOT NULL DEFAULT 'UNVERIFIED_CANDIDATE';
ALTER TABLE manufacturers ADD COLUMN IF NOT EXISTS audit_confidence integer;
ALTER TABLE manufacturers ADD COLUMN IF NOT EXISTS audit_reason text;
ALTER TABLE manufacturers ADD COLUMN IF NOT EXISTS audit_source text;

CREATE INDEX IF NOT EXISTS idx_manufacturers_audit_class ON manufacturers (audit_class, name);
