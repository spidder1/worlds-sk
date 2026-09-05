CREATE TABLE IF NOT EXISTS source_systems (
  code text PRIMARY KEY,
  name text NOT NULL,
  endpoint_url text,
  active boolean NOT NULL DEFAULT true,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO source_systems (code, name, endpoint_url, metadata)
VALUES ('ED_SK', 'eD system Slovensko', 'https://private-ws-sk.elinkx.biz/service.asmx',
        jsonb_build_object('credentials', 'secret-manager'))
ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name, endpoint_url = EXCLUDED.endpoint_url, updated_at = now();

CREATE TABLE IF NOT EXISTS supplier_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id text NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  source_system_code text NOT NULL REFERENCES source_systems(code) ON DELETE RESTRICT,
  account_reference text NOT NULL,
  credentials_reference text,
  active boolean NOT NULL DEFAULT true,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (supplier_id, source_system_code, account_reference)
);

INSERT INTO supplier_accounts (supplier_id, source_system_code, account_reference, credentials_reference)
VALUES ('ED_SK', 'ED_SK', 'default', 'ED_LOGIN/ED_PASSWORD')
ON CONFLICT (supplier_id, source_system_code, account_reference) DO UPDATE SET
  credentials_reference = EXCLUDED.credentials_reference, updated_at = now();

ALTER TABLE sync_batches
  ADD COLUMN IF NOT EXISTS source_system_code text REFERENCES source_systems(code) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS supplier_account_id uuid REFERENCES supplier_accounts(id) ON DELETE SET NULL;

UPDATE sync_batches SET source_system_code = 'ED_SK' WHERE source_system_code IS NULL;
