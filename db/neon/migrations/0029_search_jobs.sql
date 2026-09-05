INSERT INTO sync_job_settings (job_key, name, description, workflow_file, schedule_cron)
VALUES
  ('search-reindex', 'Kompletné obnovenie vyhľadávacieho indexu', 'Nanovo vytvorí celý verejný Meilisearch index zo sellable produktov v Neone.', 'meilisearch-index.yml', '45 2 * * *'),
  ('search-drain', 'Priebežná synchronizácia vyhľadávania', 'Spracuje zmenené produkty z fronty a aktualizuje ich v Meilisearch bez úplného reindexu.', 'meilisearch-queue.yml', '*/10 * * * *')
ON CONFLICT (job_key) DO UPDATE
  SET name = EXCLUDED.name,
      description = EXCLUDED.description,
      workflow_file = EXCLUDED.workflow_file;
