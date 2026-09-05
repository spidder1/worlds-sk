import pg from 'pg';

const host = process.env.MEILISEARCH_HOST?.trim()?.replace(/\/$/, '');
const apiKey = process.env.MEILISEARCH_API_KEY?.trim();
const indexUid = process.env.MEILISEARCH_INDEX?.trim() || 'worlds_products';
const limit = Math.min(2000, Math.max(1, Number(process.env.MEILISEARCH_QUEUE_LIMIT || 500)));
if (!host || !apiKey || !process.env.DATABASE_URL) throw new Error('MEILISEARCH_HOST, MEILISEARCH_API_KEY and DATABASE_URL are required');

function fold(value) {
  return String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

async function meili(path, options = {}) {
  const response = await fetch(`${host}${path}`, { ...options, headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json', ...(options.headers || {}) } });
  if (!response.ok) throw new Error(`Meilisearch ${response.status}: ${await response.text()}`);
  return response.status === 204 ? null : response.json();
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 2 });
try {
  const { rows } = await pool.query(`SELECT q.product_id, p.id, p.title, p.name_b2c, p.slug, p.brand, p.mpn, p.ean, p.sku,
      p.category_slug, p.final_price, p.currency, p.is_in_stock, p.stock_count, p.images,
      (p.id IS NULL OR p.status <> 'ACTIVE' OR p.final_price <= 0) AS should_remove
    FROM search_sync_queue q
    LEFT JOIN products p ON p.id = q.product_id
    WHERE q.processed_at IS NULL
    ORDER BY q.enqueued_at ASC
    LIMIT $1`, [limit]);
  if (!rows.length) {
    console.log('[meilisearch] queue empty');
  } else {
    const documents = rows.filter((row) => !row.should_remove).map((row) => ({
      ...row,
      title_folded: fold([row.title, row.name_b2c].filter(Boolean).join(' ')),
      brand_folded: fold(row.brand),
      mpn_folded: fold(row.mpn),
      ean_folded: fold(row.ean),
      sku_folded: fold(row.sku),
      final_price: Number(row.final_price),
      stock_count: Number(row.stock_count || 0),
      images: Array.isArray(row.images) ? row.images : [],
    }));
    if (documents.length) await meili(`/indexes/${encodeURIComponent(indexUid)}/documents?primaryKey=id`, { method: 'POST', body: JSON.stringify(documents) });
    for (const row of rows.filter((item) => item.should_remove)) {
      await meili(`/indexes/${encodeURIComponent(indexUid)}/documents/${encodeURIComponent(row.product_id)}`, { method: 'DELETE' });
    }
    const ids = rows.map((row) => row.product_id);
    await pool.query(`UPDATE search_sync_queue SET processed_at = NOW(), attempts = attempts + 1, last_error = NULL WHERE product_id = ANY($1::text[])`, [ids]);
    console.log(`[meilisearch] drained ${rows.length} queue items (${documents.length} upserted, ${rows.length - documents.length} removed)`);
  }
} catch (error) {
  console.error('[meilisearch] queue drain failed:', error);
  throw error;
} finally {
  await pool.end();
}
