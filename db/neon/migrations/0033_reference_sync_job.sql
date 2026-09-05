INSERT INTO sync_job_settings (job_key, name, description, workflow_file, schedule_cron)
VALUES (
  'reference-data',
  'Synchronizácia indexov a väzieb produktov',
  'Načíta oba eD indexové stromy a direktívne väzby medzi produktmi. Vyriešené väzby uloží do katalógu a neznáme produkty ponechá v karanténe.',
  'ed-reference-sync.yml',
  '15 5 * * *'
)
ON CONFLICT (job_key) DO UPDATE
  SET name = EXCLUDED.name,
      description = EXCLUDED.description,
      workflow_file = EXCLUDED.workflow_file;
