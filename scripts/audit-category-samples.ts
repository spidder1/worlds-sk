import pg from 'pg';
import { categorizeProductSmartly } from './recategorize-products.ts';

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL?.trim();
if (!connectionString) throw new Error('DATABASE_URL is required');

const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false }, max: 4 });
const notebookSlugs = new Set(['notebooky', 'herne-notebooky', 'firemne-notebooky', '2v1-a-dotykove-notebooky', 'ultrabooky']);
const notebookSignal = /(notebook|laptop|\bntb\b|macbook|thinkpad|probook|elitebook|latitude|ideapad|chromebook|aspire|vivobook|zenbook|legion|rog|tuf)/i;

const main = async () => {
  const categories = await pool.query<{ category_slug: string; count: string }>(
    'SELECT category_slug, COUNT(*)::text AS count FROM products GROUP BY category_slug ORDER BY category_slug'
  );
  let sampled = 0;
  const mismatches: Array<{ category: string; expected: string; title: string; sku: string }> = [];
  for (const c of categories.rows) {
    const rows = await pool.query<{ category_slug: string; title: string; sku: string }>(
      'SELECT category_slug, title, sku FROM products WHERE category_slug = $1 ORDER BY md5(id::text) LIMIT 50',
      [c.category_slug]
    );
    sampled += rows.rows.length;
    for (const p of rows.rows) {
      let expected = categorizeProductSmartly(p.title, p.category_slug).slug;
      if (notebookSlugs.has(expected) && !notebookSignal.test(p.title || '')) expected = 'prislusenstvo-a-periferie';
      if (expected !== p.category_slug) mismatches.push({ category: p.category_slug, expected, title: p.title, sku: p.sku });
    }
  }
  console.log(JSON.stringify({ categories: categories.rows.length, sampled, mismatches }, null, 2));
  await pool.end();
};
main().catch(async (error) => { console.error(error); await pool.end(); process.exitCode = 1; });
