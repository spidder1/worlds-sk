-- Services and warranty extensions are intentionally outside the physical IT
-- catalogue. Keep the whole branch hidden even when older imports created it.
WITH RECURSIVE blocked AS (
  SELECT slug
    FROM categories
   WHERE slug IN ('zaruky-a-sluzby', 'predlzenia-zaruky', 'licencie-a-predplatne', 'servisne-a-profesionalne-sluzby')
  UNION
  SELECT child.slug
    FROM blocked parent
    LEFT JOIN categories parent_category ON parent_category.slug = parent.slug
    JOIN categories child ON child.parent_slug = parent.slug OR child.parent_id = parent_category.id
)
UPDATE categories c
   SET active = false, updated_at = NOW()
 WHERE c.slug IN (SELECT slug FROM blocked);

WITH RECURSIVE blocked AS (
  SELECT slug
    FROM categories
   WHERE slug IN ('zaruky-a-sluzby', 'predlzenia-zaruky', 'licencie-a-predplatne', 'servisne-a-profesionalne-sluzby')
  UNION
  SELECT child.slug
    FROM blocked parent
    LEFT JOIN categories parent_category ON parent_category.slug = parent.slug
    JOIN categories child ON child.parent_slug = parent.slug OR child.parent_id = parent_category.id
)
UPDATE products
   SET status = 'HIDDEN', updated_at = NOW()
 WHERE category_slug IN (SELECT slug FROM blocked)
   AND status = 'ACTIVE';
