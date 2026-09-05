import assert from 'node:assert/strict';
import test from 'node:test';
import { buildFullUpsertSql, STOCK_PRICE_SQL } from './neon-rpc.js';

const upsert = buildFullUpsertSql();

test('full imports match existing products on the supplier code', () => {
  assert.match(upsert, /ON CONFLICT \(supplier_code\) DO UPDATE SET/);
});

test('re-importing never rewrites a live product URL', () => {
  const updateClause = upsert.slice(upsert.indexOf('DO UPDATE SET'), upsert.indexOf('WHERE products.content_hash'));
  assert.ok(!/\bslug = EXCLUDED\.slug/.test(updateClause), 'slug must not be overwritten on update');
  assert.match(upsert, /INSERT INTO products \([^)]*\bslug\b/, 'new products still get a slug on insert');
});

test('full imports preserve administrator-owned category decisions', () => {
  const updateClause = upsert.slice(upsert.indexOf('DO UPDATE SET'), upsert.indexOf('WHERE products.content_hash'));
  for (const column of ['category_slug', 'category_hierarchy', 'category_source', 'category_confidence', 'category_reasoning']) {
    assert.match(
      updateClause,
      new RegExp(`${column} = CASE WHEN products\\.category_source = 'ADMIN' THEN products\\.${column} ELSE EXCLUDED\\.${column} END`),
      `${column} must remain admin-owned after a later feed import`,
    );
  }
});

test('full imports persist the extensible source payload', () => {
  assert.match(upsert, /source_extra/);
  assert.match(upsert, /source_extra jsonb/);
  assert.match(upsert, /product_attribute_values/);
  assert.match(upsert, /jsonb_each\(COALESCE\(source\.attributes/);
  assert.match(upsert, /product_media/);
  assert.match(upsert, /jsonb_array_elements\(COALESCE\(source\.images/);
  assert.match(upsert, /product_warranties/);
  assert.match(upsert, /supplier_packaging/);
  assert.match(upsert, /jsonb_array_elements\(COALESCE\(source\.logistic_data/);
  assert.match(upsert, /supplier_product_marketing_flags/);
  assert.match(upsert, /product_change_log/);
  assert.match(upsert, /previous_content_hash/);
  assert.match(upsert, /product_identifiers/);
  assert.match(upsert, /SUPPLIER_PRO_ID/);
});

test('full imports persist B2C naming and feed currency', () => {
  assert.match(upsert, /name_b2c/);
  assert.match(upsert, /currency/);
  assert.match(upsert, /name_b2c text/);
  assert.match(upsert, /currency text/);
});

test('full imports persist normalized commerce and logistics fields', () => {
  for (const column of ['dealer_price_1', 'value_pack', 'value_pack_qty', 'unit', 'logistic_data', 'ext_info_codes', 'index_code_1', 'index_code_2']) {
    assert.match(upsert, new RegExp(`\\b${column}\\b`), `${column} must be part of the full import`);
  }
  assert.match(STOCK_PRICE_SQL, /dealer_price_1 = i\.dealer_price_1/);
});

test('full imports register manufacturers before products', () => {
  assert.match(upsert, /manufacturer_upsert AS \(/);
  assert.match(upsert, /INSERT INTO manufacturers \(id, name, slug\)/);
  assert.match(upsert, /LEFT JOIN manufacturer_upsert ON manufacturer_upsert\.name = input\.brand/);
});

test('full imports do not reintroduce a manufacturer marked removed by admin', () => {
  assert.match(upsert, /removed\.audit_class = 'REMOVED'/);
  assert.match(upsert, /THEN '' ELSE item\.brand END\s*\)\s*AS brand/);
});

test('full imports prefer an active reviewed manufacturer mapping', () => {
  assert.match(upsert, /FROM manufacturer_mappings mapping/);
  assert.match(upsert, /mapping\.status = 'ACTIVE'/);
  assert.match(upsert, /canonical\.name/);
});

test('unchanged products are skipped but still stamped with the current batch', () => {
  assert.match(upsert, /products\.content_hash IS DISTINCT FROM EXCLUDED\.content_hash/);
  assert.match(upsert, /products\.price_hash IS DISTINCT FROM EXCLUDED\.price_hash/);
  assert.match(upsert, /products\.inventory_hash IS DISTINCT FROM EXCLUDED\.inventory_hash/);
  // Without this pass a product whose data did not change would look absent
  // from the feed and be retired by the completion step.
  assert.match(upsert, /UPDATE products p\s+SET last_import_batch = \$1::uuid, last_seen_at = now\(\)/);
});

test('the stock feed only touches commercial and availability columns', () => {
  for (const column of ['title', 'slug', 'attributes', 'images', 'category_slug', 'supplier_description']) {
    assert.ok(
      !new RegExp(`\\b${column} = i\\.`).test(STOCK_PRICE_SQL),
      `stock sync must not write ${column}`,
    );
  }
  assert.match(STOCK_PRICE_SQL, /final_price = i\.final_price/);
  assert.match(STOCK_PRICE_SQL, /stock_count = i\.stock_count/);
  assert.match(STOCK_PRICE_SQL, /garbage_fee = i\.garbage_fee/);
  assert.match(STOCK_PRICE_SQL, /author_fee = i\.author_fee/);
});

test('codes the stock feed does not know about are reported, not deleted', () => {
  assert.match(STOCK_PRICE_SQL, /AS missing/);
  assert.ok(!/DELETE FROM products/.test(STOCK_PRICE_SQL));
});
