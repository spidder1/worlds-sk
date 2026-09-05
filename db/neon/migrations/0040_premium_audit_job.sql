INSERT INTO sync_job_settings (job_key, name, description, workflow_file, schedule_cron)
VALUES (
  'premium-audit',
  'Kontrola premium katalógu eD',
  'Stiahne a overí premium katalóg bez zápisu produktov. Uloží veľkosť, checksum, počet XML záznamov a stav do histórie importov.',
  'ed-premium-audit.yml',
  '0 4 * * 0'
)
ON CONFLICT (job_key) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, workflow_file = EXCLUDED.workflow_file;
