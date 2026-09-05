-- Keep the administration labels clear and consistent for existing Neon installs.
UPDATE sync_job_settings
   SET name = 'Nočné načítanie ďalších obrázkov',
       description = 'Dohľadá ďalšie obrázky cez getProductDetail a doplní produktové galérie bez prepísania katalógových údajov.'
 WHERE job_key = 'image-loader';

UPDATE sync_job_settings
   SET name = 'Čistenie výrobcov a logotypov',
       description = 'Normalizuje názvy výrobcov, vyradí neplatné záznamy, priradí značky k produktom a doplní dostupné logotypy.'
 WHERE job_key = 'manufacturer-cleanup';

UPDATE sync_job_settings
   SET name = 'Odoslanie zaplatených objednávok dodávateľovi',
       description = 'Bezpečne odošle zaplatené objednávky čakajúce vo fronte do eD systému a uloží stav, symbol objednávky alebo chybu.'
 WHERE job_key = 'supplier-orders';
