ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS customer_type text NOT NULL DEFAULT 'PRIVATE',
  ADD COLUMN IF NOT EXISTS customer_ico text,
  ADD COLUMN IF NOT EXISTS customer_dic text;

ALTER TABLE orders
  DROP CONSTRAINT IF EXISTS orders_customer_type_check;
ALTER TABLE orders
  ADD CONSTRAINT orders_customer_type_check CHECK (customer_type IN ('PRIVATE', 'LEGAL'));

UPDATE categories AS child
   SET parent_id = parent.id,
       parent_slug = parent.slug,
       level = 2,
       updated_at = now()
  FROM categories AS parent
 WHERE child.slug = 'prislusenstvo-k-notebookom'
   AND parent.slug = 'pocitace-a-notebooky';

UPDATE categories AS child
   SET level = 3,
       updated_at = now()
  FROM categories AS parent
 WHERE parent.slug = 'prislusenstvo-k-notebookom'
   AND child.parent_slug = parent.slug;

UPDATE products
   SET category_hierarchy = category_hierarchy - 1
 WHERE category_slug IN (
   'prislusenstvo-k-notebookom', 'tasky-a-puzdra-na-notebooky',
   'baterie-a-adaptery-k-notebookom', 'chladenie-a-stojany-na-notebooky',
   'ochranne-folie-a-skla', 'pera-a-stylusy'
 )
   AND jsonb_typeof(category_hierarchy) = 'array'
   AND category_hierarchy->>1 = 'Notebooky';
