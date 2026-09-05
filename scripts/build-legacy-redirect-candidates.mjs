import fs from 'node:fs/promises';
import pg from 'pg';

const cdxUrl = process.env.WAYBACK_CDX_URL || 'https://web.archive.org/cdx/search/cdx?url=*.worlds.sk/*&output=json&fl=original&filter=statuscode:200&collapse=urlkey&limit=5000';
const exportFile = process.env.LEGACY_URLS_FILE?.trim();
let archivedValues;
if (exportFile) {
  const text = await fs.readFile(exportFile, 'utf8');
  archivedValues = text.split(/\r?\n/).map((line) => {
    const first = line.split(',')[0]?.trim().replace(/^"|"$/g, '').replaceAll('""', '"');
    return first || '';
  }).filter((value) => value.startsWith('http'));
  console.log(`[redirects] source=file:${exportFile}`);
} else {
  const response = await fetch(cdxUrl);
  if (!response.ok) throw new Error(`Wayback CDX failed: ${response.status}`);
  const rows = await response.json();
  archivedValues = rows.slice(1).map((row) => String(row[0] || '').trim()).filter((url) => url.startsWith('http'));
  console.log(`[redirects] source=wayback`);
}
const archivedUrls = [...new Set(archivedValues)].map((value) => new URL(value));
const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
try {
  const categories = await client.query('SELECT slug FROM categories WHERE active = true');
  const products = await client.query('SELECT slug FROM products WHERE status = $1', ['ACTIVE']);
  const categorySlugs = new Set(categories.rows.map((row) => String(row.slug)));
  const productSlugs = new Set(products.rows.map((row) => String(row.slug)));
  const output = [['source_path', 'target_path', 'http_status', 'reason']];
  for (const url of archivedUrls) {
    const path = `${url.pathname}${url.search}`;
    if (path === '/') { output.push(['/', '/', '301', 'legacy-home']); continue; }
    if (path.startsWith('/catalogsearch/result')) { const query = url.searchParams.get('q'); if (query) output.push([path, `/vyhladavanie?q=${encodeURIComponent(query)}`, '301', 'legacy-search']); continue; }
    if (!path.endsWith('.html') || url.search) continue;
    const segments = path.replace(/\.html$/, '').split('/').filter(Boolean);
    const slug = segments.at(-1);
    if (!slug) continue;
    if (categorySlugs.has(slug)) output.push([path, `/kategoria/${slug}`, '301', 'legacy-category']);
    else if (productSlugs.has(slug)) output.push([path, `/produkt/${slug}`, '301', 'legacy-product']);
  }
  const csv = output.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n') + '\n';
  const outputPath = process.env.REDIRECT_CANDIDATE_OUTPUT || 'reports/legacy-redirect-candidates.csv';
  await fs.mkdir(outputPath.split(/[\\/]/).slice(0, -1).join('/') || '.', { recursive: true });
  await fs.writeFile(outputPath, csv, 'utf8');
  console.log(`[redirects] archived=${archivedUrls.length} candidates=${output.length - 1} output=${outputPath}`);
} finally {
  await client.end();
}
