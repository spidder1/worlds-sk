#!/usr/bin/env node
import crypto from 'node:crypto';
import pg from 'pg';
import AdmZip from 'adm-zip';
import { EDSystemClient } from '@worlds/ed-client';

const { Pool } = pg;
const required = (name) => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required`);
  return value;
};

const pool = new Pool({ connectionString: required('DATABASE_URL'), ssl: { rejectUnauthorized: false }, max: 2 });
const client = new EDSystemClient({ login: required('ED_LOGIN'), password: required('ED_PASSWORD'), endpointUrl: process.env.ED_ENDPOINT_URL?.trim() });
let batchId;

try {
  const batch = await pool.query(
    `INSERT INTO sync_batches (batch_number, mode, status, source_method, started_at)
     VALUES ($1, 'premium-audit', 'RUNNING', 'getProductCatalogueFullPremiumDownloadXML', NOW()) RETURNING id`,
    [`premium-audit-${new Date().toISOString()}`],
  );
  batchId = batch.rows[0].id;
  const status = await client.getProductCatalogueFullPremiumDownloadXML({ onStock: false });
  if (!status.IsReady || !status.Url) {
    throw new Error(`Premium feed is not ready: ${status.Status?.StatusCode || 'UNKNOWN'}${status.Status?.ErrorText ? `: ${status.Status.ErrorText}` : ''}`);
  }

  const response = await fetch(status.Url, { signal: AbortSignal.timeout(180_000) });
  if (!response.ok) throw new Error(`Premium feed download failed with HTTP ${response.status}`);
  const payload = Buffer.from(await response.arrayBuffer());
  if (payload.length === 0) throw new Error('Premium feed returned an empty body.');
  const checksum = crypto.createHash('sha256').update(payload).digest('hex');
  let entries = 0;
  if (/\.zip(?:\?|$)/i.test(status.Url) || payload.subarray(0, 2).toString('hex') === '504b') {
    const zip = new AdmZip(payload);
    entries = zip.getEntries().filter((entry) => /\.xml$/i.test(entry.entryName)).length;
    if (entries === 0) throw new Error('Premium ZIP contains no XML entry.');
  } else {
    const xml = payload.toString('utf8');
    entries = (xml.match(/<Product(?:Complete)?(?:\s|>)/g) || []).length;
    if (entries === 0) throw new Error('Premium XML contains no Product records.');
  }
  const metrics = { bytes: payload.length, sha256: checksum, xmlEntries: entries, ready: true };
  await pool.query(
    `UPDATE sync_batches SET status = 'COMPLETED', completed_at = NOW(), total_read = $1,
       imported_count = 0, filtered_count = 0, metrics = $2::jsonb WHERE id = $3`,
    [entries, JSON.stringify(metrics), batchId],
  );
  console.log(JSON.stringify({ batchId, ...metrics }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  if (batchId) await pool.query('UPDATE sync_batches SET status = $1, completed_at = NOW(), error_message = $2 WHERE id = $3', ['FAILED', message.slice(0, 2000), batchId]);
  console.error(message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
