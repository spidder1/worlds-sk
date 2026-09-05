-- Restore notebook accessories under the general accessories branch.
UPDATE categories AS child
   SET parent_id = parent.id,
       parent_slug = parent.slug,
       level = 2,
       display_order = 1,
       updated_at = now()
  FROM categories AS parent
 WHERE child.slug = 'prislusenstvo-k-notebookom'
   AND parent.slug = 'prislusenstvo-a-periferie';

UPDATE categories AS child
   SET parent_id = parent.id,
       parent_slug = parent.slug,
       level = 3,
       updated_at = now()
  FROM categories AS parent
 WHERE parent.slug = 'prislusenstvo-k-notebookom'
   AND child.parent_slug = parent.slug
   AND child.level <> 3;
