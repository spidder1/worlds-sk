#!/usr/bin/env node
import pg from 'pg';

const connectionString = process.env.DATABASE_URL?.trim();
if (!connectionString) throw new Error('DATABASE_URL is required');
const { Pool } = pg;
const pool = new Pool({ connectionString, max: 1, connectionTimeoutMillis: 15_000 });

const criticalChecks = {
  priced_without_read_model: `SELECT COUNT(*)::int AS count FROM products p WHERE p.final_price > 0 AND NOT EXISTS (SELECT 1 FROM product_prices pp WHERE pp.product_id = p.id AND pp.price_list_code = 'RETAIL')`,
  supplier_offer_missing: `SELECT COUNT(*)::int AS count FROM products p WHERE NULLIF(trim(p.supplier_code), '') IS NOT NULL AND NOT EXISTS (SELECT 1 FROM supplier_products sp WHERE sp.supplier_id = 'ED_SK' AND sp.supplier_sku = trim(p.supplier_code))`,
  localization_missing: `SELECT COUNT(*)::int AS count FROM products p WHERE p.status IN ('ACTIVE', 'OUT_OF_STOCK') AND NOT EXISTS (SELECT 1 FROM product_localizations pl WHERE pl.product_id = p.id AND pl.locale = 'sk')`,
  search_document_missing: `SELECT COUNT(*)::int AS count FROM products p WHERE p.status IN ('ACTIVE', 'OUT_OF_STOCK') AND NOT EXISTS (SELECT 1 FROM search_documents sd WHERE sd.product_id = p.id)`,
  inventory_projection_missing: `SELECT COUNT(*)::int AS count FROM product_supplier_links l JOIN products p ON p.id = l.product_id WHERE NOT EXISTS (SELECT 1 FROM supplier_inventory_current ic WHERE ic.supplier_product_id = l.supplier_product_id AND ic.location_code = 'ED_MAIN')`,
};
const warningChecks = {
  media_link_pending: `SELECT COUNT(*)::int AS count FROM product_media pm WHERE pm.media_asset_id IS NULL`,
};

try {
  const results = {};
  for (const [name, sql] of Object.entries(criticalChecks)) {
    const { rows } = await pool.query(sql);
    results[name] = Number(rows[0]?.count || 0);
  }
  const warnings = {};
  for (const [name, sql] of Object.entries(warningChecks)) {
    const { rows } = await pool.query(sql);
    warnings[name] = Number(rows[0]?.count || 0);
  }
  const critical = Object.entries(results).filter(([, count]) => count > 0);
  console.log(JSON.stringify({ checkedAt: new Date().toISOString(), results, warnings, healthy: critical.length === 0 }, null, 2));
  if (critical.length > 0) process.exitCode = 1;
} finally {
  await pool.end();
}
