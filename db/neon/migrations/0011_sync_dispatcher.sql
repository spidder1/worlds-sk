ALTER TABLE sync_job_settings ADD COLUMN IF NOT EXISTS last_dispatched_at timestamptz;
