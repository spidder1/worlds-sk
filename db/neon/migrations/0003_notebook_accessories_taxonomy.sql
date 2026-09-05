-- Keep notebook-specific accessories under the Notebooky branch.
UPDATE categories AS child
   SET parent_id = parent.id,
       parent_slug = parent.slug,
       level = 3,
       display_order = 5,
       updated_at = now()
  FROM categories AS parent
 WHERE child.slug = 'prislusenstvo-k-notebookom'
   AND parent.slug = 'notebooky';

UPDATE categories AS child
   SET parent_id = parent.id,
       parent_slug = parent.slug,
       level = 4,
       updated_at = now()
  FROM categories AS parent
 WHERE parent.slug = 'prislusenstvo-k-notebookom'
   AND child.parent_slug = parent.slug
   AND child.level <> 4;
