CREATE TABLE IF NOT EXISTS seo_redirects (
  id uuid PRIMARY KEY,
  source_path text NOT NULL UNIQUE,
  target_path text NOT NULL,
  http_status smallint NOT NULL DEFAULT 301 CHECK (http_status IN (301, 302, 307, 308)),
  reason text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (source_path LIKE '/%' AND source_path NOT LIKE '%://%'),
  CHECK (target_path LIKE '/%' OR target_path LIKE 'https://%')
);

CREATE INDEX IF NOT EXISTS idx_seo_redirects_active_source ON seo_redirects (source_path) WHERE active = true;
