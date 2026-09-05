import pg from 'pg';

const host = process.env.MEILISEARCH_HOST?.trim()?.replace(/\/$/, '');
const apiKey = process.env.MEILISEARCH_API_KEY?.trim();
const indexUid = process.env.MEILISEARCH_INDEX?.trim() || 'worlds_products';
const batchSize = Math.min(5000, Math.max(100, Number(process.env.MEILISEARCH_BATCH_SIZE || 1000)));
if (!host || !apiKey || !process.env.DATABASE_URL) throw new Error('MEILISEARCH_HOST, MEILISEARCH_API_KEY and DATABASE_URL are required');

async function meili(path, options = {}) {
  const response = await fetch(`${host}${path}`, { ...options, headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json', ...(options.headers || {}) } });
  if (!response.ok) throw new Error(`Meilisearch ${response.status}: ${await response.text()}`);
  return response.status === 204 ? null : response.json();
}

await meili(`/indexes/${encodeURIComponent(indexUid)}/settings`, { method: 'PATCH', body: JSON.stringify({ searchableAttributes: ['title', 'brand', 'mpn', 'ean', 'sku', 'category_slug'], displayedAttributes: ['id', 'title', 'slug', 'brand', 'mpn', 'ean', 'sku', 'category_slug', 'final_price', 'currency', 'is_in_stock', 'stock_count', 'images'], filterableAttributes: ['brand', 'category_slug', 'is_in_stock', 'final_price'], sortableAttributes: ['final_price', 'title'] }) });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 2 });
let offset = 0;
let indexed = 0;
try {
  while (true) {
    const { rows } = await pool.query(`SELECT id, title, slug, brand, mpn, ean, sku, category_slug, final_price, currency, is_in_stock, stock_count, images FROM products WHERE status = 'ACTIVE' AND final_price > 0 ORDER BY id LIMIT $1 OFFSET $2`, [batchSize, offset]);
    if (!rows.length) break;
    await meili(`/indexes/${encodeURIComponent(indexUid)}/documents?primaryKey=id`, { method: 'POST', body: JSON.stringify(rows.map((row) => ({ ...row, final_price: Number(row.final_price), stock_count: Number(row.stock_count || 0), images: Array.isArray(row.images) ? row.images : [] }))) });
    indexed += rows.length;
    offset += rows.length;
    console.log(`[meilisearch] indexed ${indexed}`);
    if (rows.length < batchSize) break;
  }
  console.log(`[meilisearch] complete index=${indexUid} documents=${indexed}`);
} finally {
  await pool.end();
}
