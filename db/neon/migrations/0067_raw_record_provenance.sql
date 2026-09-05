ALTER TABLE raw_records
  ADD COLUMN IF NOT EXISTS source_name text;

CREATE INDEX IF NOT EXISTS idx_raw_records_batch_source
  ON raw_records (batch_id, source_name, record_number);
