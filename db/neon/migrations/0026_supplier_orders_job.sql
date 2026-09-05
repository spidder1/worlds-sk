INSERT INTO sync_job_settings (job_key, name, description, workflow_file, schedule_cron)
VALUES (
  'supplier-orders',
  'Odoslanie zaplatených objednávok dodávateľovi',
  'Bezpečne odošle zaplatené objednávky čakajúce vo fronte do eD systému a uloží stav, symbol objednávky alebo chybu.',
  'ed-order-sync.yml',
  '*/10 * * * *'
)
ON CONFLICT (job_key) DO UPDATE
  SET name = EXCLUDED.name,
      description = EXCLUDED.description,
      workflow_file = EXCLUDED.workflow_file;
