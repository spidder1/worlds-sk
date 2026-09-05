CREATE TABLE IF NOT EXISTS supplier_information_codes (
  info_code text PRIMARY KEY,
  info_name text NOT NULL DEFAULT '',
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
