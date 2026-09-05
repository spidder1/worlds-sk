import pg from 'pg';
import { EDSystemClient } from '@worlds/ed-client';
import { extractProductImageUrls } from './catalog-sync.js';

const { Pool } = pg;

type Candidate = {
  id: string;
  sku: string;
  images: unknown;
};

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required`);
  return value;
}

function positiveInt(name: string, fallback: number): number {
  const parsed = Number.parseInt(process.env[name] || '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function imageRecords(urls: string[], title: string) {
  return urls.map((url, position) => ({
    id: `${title}-${position}`,
    url,
    position,
    isPrimary: position === 0,
    altText: title,
  }));
}

function imageChangedAt(raw: unknown): string | null {
  const text = String(raw ?? '').trim();
  if (!text || /^1[./-]1[./-]1900/.test(text)) return null;
  const european = text.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})/);
  if (european) return `${european[3]}-${european[2].padStart(2, '0')}-${european[1].padStart(2, '0')}`;
  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

function mergeImages(existing: unknown, incoming: string[], title: string) {
  const current = Array.isArray(existing) ? existing.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === 'object')) : [];
  const urls = [...new Set([
    ...current.map((item) => String(item.url || '').trim()).filter(Boolean),
    ...incoming,
  ])];
  return imageRecords(urls, title);
}

async function main() {
  const pool = new Pool({ connectionString: required('DATABASE_URL'), ssl: { rejectUnauthorized: false }, max: 4 });
  const client = new EDSystemClient({
    login: required('ED_LOGIN'),
    password: required('ED_PASSWORD'),
    endpointUrl: process.env.ED_ENDPOINT_URL?.trim(),
  });
  const limit = positiveInt('IMAGE_LOADER_LIMIT', 1000);
  const delayMs = positiveInt('IMAGE_LOADER_DELAY_MS', 150);
  const concurrency = Math.min(positiveInt('IMAGE_LOADER_CONCURRENCY', 4), 16);
  const staleDays = positiveInt('IMAGE_LOADER_STALE_DAYS', 14);
  const candidates = await pool.query<Candidate>(
    `SELECT id, COALESCE(supplier_code, sku) AS sku, images
       FROM products
      WHERE image_sync_checked_at IS NULL
         OR image_sync_checked_at < NOW() - ($1::text || ' days')::interval
      ORDER BY (COALESCE(jsonb_array_length(images), 0) = 0) DESC,
               image_sync_checked_at NULLS FIRST,
               updated_at ASC
      LIMIT $2`,
    [staleDays, limit],
  );

  let checked = 0;
  let updated = 0;
  let failed = 0;
  let cursor = 0;
  const worker = async () => {
    while (cursor < candidates.rows.length) {
      const product = candidates.rows[cursor++];
      try {
        const detail = await client.getProductDetail(product.sku);
        const urls = detail ? extractProductImageUrls(detail as unknown as Record<string, unknown>) : [];
        if (detail && urls.length > 0) {
          const existingImages = Array.isArray(product.images) ? product.images : [];
          const merged = mergeImages(existingImages, urls, product.sku);
          await pool.query(
            `UPDATE products
                SET images = $1::jsonb,
                    image_count = $2,
                    images_last_changed = CASE WHEN $3::text IS NULL OR $3::text = '' THEN images_last_changed ELSE $3::timestamptz END,
                    image_sync_checked_at = NOW(),
                    updated_at = NOW()
              WHERE id = $4`,
            [JSON.stringify(merged), Number(detail.ImgCount || merged.length) || merged.length, imageChangedAt(detail.ImgLastChanged), product.id],
          );
          await pool.query('DELETE FROM product_media WHERE product_id = $1', [product.id]);
          await pool.query(
            `WITH incoming AS (
              SELECT item.value->>'url' AS source_url,
                     COALESCE((item.value->>'position')::integer, 0) AS position,
                     COALESCE((item.value->>'isPrimary')::boolean, false) AS is_primary,
                     COALESCE(item.value->>'altText', '') AS alt_text
                FROM jsonb_array_elements($2::jsonb) AS item
               WHERE NULLIF(item.value->>'url', '') IS NOT NULL
            ), assets AS (
              INSERT INTO media_assets (source_url, status, last_checked_at, updated_at)
              SELECT source_url, 'DISCOVERED', NOW(), NOW() FROM incoming
              ON CONFLICT (source_url) DO UPDATE SET last_checked_at = NOW(), updated_at = NOW()
              RETURNING id, source_url
            )
            INSERT INTO product_media (product_id, source_url, media_asset_id, position, is_primary, alt_text, provenance, updated_at)
            SELECT $1, incoming.source_url, assets.id, incoming.position, incoming.is_primary,
                   incoming.alt_text, 'UNKNOWN_ED', NOW()
              FROM incoming JOIN assets USING (source_url)
             ON CONFLICT (product_id, source_url) DO UPDATE SET
               media_asset_id = EXCLUDED.media_asset_id, position = EXCLUDED.position, is_primary = EXCLUDED.is_primary,
               alt_text = EXCLUDED.alt_text, updated_at = NOW()`,
            [product.id, JSON.stringify(merged)],
          );
          await pool.query(`INSERT INTO search_sync_queue (product_id, reason, enqueued_at, processed_at, last_error)
            VALUES ($1, 'image_sync', NOW(), NULL, NULL)
            ON CONFLICT (product_id) DO UPDATE SET reason = EXCLUDED.reason, enqueued_at = NOW(), processed_at = NULL, last_error = NULL`, [product.id]);
          if (merged.length > existingImages.length) updated += 1;
        } else {
          await pool.query('UPDATE products SET image_count = COALESCE($1, image_count), image_sync_checked_at = NOW() WHERE id = $2', [detail?.ImgCount ?? null, product.id]);
        }
        checked += 1;
      } catch (error) {
        failed += 1;
        console.error(`image detail failed for ${product.sku}:`, error instanceof Error ? error.message : error);
        await pool.query('UPDATE products SET image_sync_checked_at = NOW() WHERE id = $1', [product.id]).catch(() => undefined);
      }
      if (delayMs > 0) await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, candidates.rows.length) }, () => worker()));

  console.log(JSON.stringify({ candidates: candidates.rowCount, checked, updated, failed, limit, delayMs, concurrency, staleDays }));
  await pool.end();
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
