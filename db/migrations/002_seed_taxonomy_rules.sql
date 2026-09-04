-- Initial Worlds.sk mappings used by the sample ASUS/Lenovo import.
-- These are deliberately conservative; title/attribute rules can override them.

INSERT INTO category_mappings (
  supplier, supplier_category_code, canonical_category_slug, priority, rule_source
)
SELECT 'eD_SYSTEM', v.code, v.slug, 100, 'SEED'
FROM (VALUES
  ('101', 'notebooky'),
  ('83', 'notebooky'),
  ('84', 'notebooky'),
  ('102', 'stolne-pocitace'),
  ('103', 'notebooky'),
  ('201', 'procesory'),
  ('202', 'graficke-karty'),
  ('203', 'pamate-ram'),
  ('204', 'ssd-a-pevne-disky'),
  ('301', 'monitory-a-displeje'),
  ('401', 'klavesnice-a-mysi'),
  ('402', 'pamatove-karty-sd')
) AS v(code, slug)
WHERE EXISTS (SELECT 1 FROM categories c WHERE c.slug = v.slug)
  AND NOT EXISTS (
    SELECT 1 FROM category_mappings m
    WHERE m.supplier = 'eD_SYSTEM'
      AND m.supplier_category_code = v.code
      AND m.active = true
  );

INSERT INTO category_mappings (
  supplier, supplier_commodity_code, canonical_category_slug, priority, rule_source
)
SELECT 'eD_SYSTEM', v.code, v.slug, 110, 'SEED'
FROM (VALUES
  ('NB', 'notebooky'),
  ('PC', 'stolne-pocitace'),
  ('CPU', 'procesory'),
  ('VGA', 'graficke-karty'),
  ('MEM', 'pamate-ram'),
  ('SSD', 'ssd-a-pevne-disky'),
  ('LCD', 'monitory-a-displeje')
) AS v(code, slug)
WHERE EXISTS (SELECT 1 FROM categories c WHERE c.slug = v.slug)
  AND NOT EXISTS (
    SELECT 1 FROM category_mappings m
    WHERE m.supplier = 'eD_SYSTEM'
      AND m.supplier_commodity_code = v.code
      AND m.active = true
  );

INSERT INTO category_rules (name, target_category_slug, match_expression, priority, created_by)
SELECT v.name, v.slug, v.expression::jsonb, v.priority, 'seed'
FROM (VALUES
  ('Gaming notebook model families', 'herne-notebooky', '{"title_any":["rog","tuf gaming","legion","loq","nitro","predator","victus","omen","rtx","geforce"]}', 10),
  ('Business notebook model families', 'firemne-notebooky', '{"title_any":["thinkpad","thinkbook","expertbook","probook","elitebook","latitude","precision"]}', 20),
  ('Ultrabook model families', 'ultrabooky', '{"title_any":["zenbook","yoga slim","swift","xps","gram"]}', 30),
  ('Two in one notebook signals', '2v1-a-dotykove-notebooky', '{"title_any":["2in1","2 v 1","x360","flip","touch","dotyk"]}', 40),
  ('Docking and USB hub signals', 'dokovacie-stanice', '{"title_any":["dock","dokovacia","usb hub","thunderbolt"]}', 50),
  ('Notebook bag and case signals', 'tasky-a-puzdra-na-notebooky', '{"title_any":["batoh na notebook","brašna","brasna","puzdro na notebook","obal na notebook"]}', 60)
) AS v(name, slug, expression, priority)
WHERE EXISTS (SELECT 1 FROM categories c WHERE c.slug = v.slug)
  AND NOT EXISTS (SELECT 1 FROM category_rules r WHERE r.name = v.name);
