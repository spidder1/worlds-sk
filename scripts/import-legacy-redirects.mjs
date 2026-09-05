import fs from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import pg from 'pg';

const input = process.argv[2];
if (!input) throw new Error('Použitie: node scripts/import-legacy-redirects.mjs <redirects.csv>');
const csv = await fs.readFile(input, 'utf8');
const rows = csv.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
if (rows.length < 2) throw new Error('CSV musí obsahovať hlavičku a aspoň jeden riadok.');
const header = rows.shift().split(',').map((value) => value.trim().toLowerCase());
const sourceIndex = header.indexOf('source_path');
const targetIndex = header.indexOf('target_path');
const statusIndex = header.indexOf('http_status');
const reasonIndex = header.indexOf('reason');
if (sourceIndex < 0 || targetIndex < 0) throw new Error('CSV musí obsahovať source_path,target_path.');
const parse = (line) => line.split(',').map((value) => value.trim().replace(/^"|"$/g, ''));
const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
try {
  await client.query('BEGIN');
  for (const line of rows) {
    const values = parse(line);
    const source = values[sourceIndex];
    const target = values[targetIndex];
    const status = Number(values[statusIndex] || 301);
    const reason = values[reasonIndex] || 'legacy-url-import';
    if (!source?.startsWith('/') || (!target?.startsWith('/') && !target?.startsWith('https://')) || ![301, 302, 307, 308].includes(status)) throw new Error(`Neplatný redirect: ${line}`);
    await client.query(`INSERT INTO seo_redirects (id, source_path, target_path, http_status, reason) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (source_path) DO UPDATE SET target_path = EXCLUDED.target_path, http_status = EXCLUDED.http_status, reason = EXCLUDED.reason, active = true, updated_at = now()`, [randomUUID(), source, target, status, reason]);
  }
  await client.query('COMMIT');
  console.log(`[redirects] imported ${rows.length} rows`);
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  await client.end();
}
