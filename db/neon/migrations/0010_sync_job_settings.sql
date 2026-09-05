CREATE TABLE IF NOT EXISTS sync_job_settings (
  job_key text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  workflow_file text NOT NULL,
  schedule_cron text,
  enabled boolean NOT NULL DEFAULT true,
  last_requested_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO sync_job_settings (job_key, name, description, workflow_file, schedule_cron)
VALUES
 ('catalog-full', 'Úplný import katalógu', 'Načíta produkty, kategórie, ceny, atribúty a obrázky z dodávateľského feedu. Uplatní aj všetky aktívne filtre a rekategorizačné pravidlá.', 'ed-catalog-sync.yml', '30 6,20 * * *'),
 ('stock-price', 'Synchronizácia skladov a cien', 'Rýchla pravidelná synchronizácia dostupnosti a nákupných/predajných cien bez opätovného importu celého katalógu.', 'ed-catalog-sync.yml', '0 * * * *'),
 ('image-loader', 'Nočné načítanie ďalších obrázkov', 'Dohľadá ďalšie obrázky cez getProductDetail a doplní produktové galérie bez prepísania katalógových údajov.', 'ed-image-loader.yml', '15 2 * * *'),
 ('manufacturer-cleanup', 'Čistenie výrobcov a logotypov', 'Normalizuje názvy výrobcov, vyradí neplatné záznamy, priradí značky k produktom a doplní dostupné logotypy.', 'manufacturer-cleanup.yml', '20 3 * * 0')
ON CONFLICT (job_key) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, workflow_file = EXCLUDED.workflow_file;
