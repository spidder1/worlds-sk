INSERT INTO sync_job_settings (job_key, name, description, workflow_file, schedule_cron)
VALUES ('transport-dictionary', 'Obnovenie dopravcov eD', 'Načíta aktuálny zoznam B2C dopravcov z eD a uloží ich kódy pre odosielanie objednávok.', 'ed-transport-sync.yml', '15 5 * * *')
ON CONFLICT (job_key) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, workflow_file = EXCLUDED.workflow_file;
