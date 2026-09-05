UPDATE categories SET parent_id = NULL, parent_slug = NULL, level = 1, updated_at = now() WHERE slug = 'prislusenstvo-k-notebookom';
UPDATE categories SET level = 2, updated_at = now() WHERE parent_slug = 'prislusenstvo-k-notebookom';
UPDATE products SET category_hierarchy = category_hierarchy - 0
 WHERE category_slug IN ('prislusenstvo-k-notebookom','tasky-a-puzdra-na-notebooky','baterie-a-adaptery-k-notebookom','chladenie-a-stojany-na-notebooky','ochranne-folie-a-skla','pera-a-stylusy')
 AND jsonb_typeof(category_hierarchy) = 'array' AND category_hierarchy->>0 = 'Počítače a notebooky';
