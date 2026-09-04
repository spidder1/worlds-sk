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
