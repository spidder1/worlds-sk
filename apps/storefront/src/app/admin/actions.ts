'use server';

import { redirect } from 'next/navigation';
import { queryNeon } from '../../lib/neon-client';
import { adminPasswordMatches, clearAdminSession, isAdminAuthenticated, setAdminSession } from './auth';
import type { SyncJobName } from '@worlds/queue';

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get('password') || '');
  if (!adminPasswordMatches(password)) redirect('/admin?error=1');
  await setAdminSession();
  redirect('/admin');
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect('/admin');
}

export async function updateProductCategory(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const id = String(formData.get('id') || '');
  const category = String(formData.get('category') || '').trim();
  if (!id || !category) return;
  await queryNeon('UPDATE products SET category_slug = $1, updated_at = NOW() WHERE id = $2', [category, id]);
  redirect('/admin/produkty?saved=1');
}

export async function approveCategoryReview(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const id = String(formData.get('id') || '').trim();
  const category = String(formData.get('category') || '').trim();
  if (!id || !category) return;
  await queryNeon(`UPDATE products
    SET category_slug = $1, category_source = 'ADMIN', category_confidence = 1, category_reasoning = 'Schválené administrátorom', updated_at = NOW()
    WHERE id = $2`, [category, id]);
  redirect('/admin/kategorizacia?saved=1');
}

export async function resolveQuarantine(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const id = String(formData.get('id') || '').trim();
  const note = String(formData.get('note') || '').trim().slice(0, 500) || null;
  if (!id) return;
  await queryNeon('UPDATE product_quarantine SET resolved = true, resolution_note = $1, resolved_at = NOW() WHERE id = $2', [note, id]);
  redirect('/admin/karantena?saved=1');
}

export async function updateOrderStatus(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const id = String(formData.get('id') || '').trim();
  const status = String(formData.get('status') || '').trim();
  const paymentStatus = String(formData.get('payment_status') || '').trim();
  if (!id || !['NEW', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELLED'].includes(status) || !['PENDING', 'PAID', 'FAILED', 'REFUNDED'].includes(paymentStatus)) return;
  await queryNeon('UPDATE orders SET status = $1, payment_status = $2, updated_at = NOW() WHERE id = $3', [status, paymentStatus, id]);
  redirect('/admin/objednavky?saved=1');
}

export async function queueSupplierOrder(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const id = String(formData.get('id') || '').trim();
  if (!id) return;
  await queryNeon(`UPDATE orders SET supplier_order_status = 'QUEUED', supplier_order_error = NULL, updated_at = NOW()
    WHERE id = $1 AND payment_status = 'PAID' AND supplier_order_status IN ('NOT_SENT', 'FAILED')`, [id]);
  redirect('/admin/objednavky?saved=1');
}

export async function updateManufacturerReview(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const id = String(formData.get('id') || '');
  const auditClass = String(formData.get('audit_class') || 'UNVERIFIED_CANDIDATE');
  if (!id || !['VERIFIED_BRAND', 'UNVERIFIED_CANDIDATE', 'REMOVED'].includes(auditClass)) return;
  await queryNeon('UPDATE manufacturers SET audit_class = $1, updated_at = NOW() WHERE id = $2', [auditClass, id]);
  redirect('/admin/vyrobcovia?saved=1');
}

export async function saveSyncJobSettings(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const jobKey = String(formData.get('job_key') || '').trim();
  const scheduleCron = String(formData.get('schedule_cron') || '').trim().slice(0, 120);
  const enabled = String(formData.get('enabled') || '') === 'true';
  if (!jobKey || (scheduleCron && !/^\S+(?:\s+\S+){4}$/.test(scheduleCron))) return;
  await queryNeon('UPDATE sync_job_settings SET schedule_cron = $1, enabled = $2, updated_at = NOW() WHERE job_key = $3', [scheduleCron || null, enabled, jobKey]);
  redirect('/admin/importy?saved=1');
}

export async function runSyncJob(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const jobKey = String(formData.get('job_key') || '').trim();
  // A disabled job must not run on the scheduler, but administrators still
  // need to be able to trigger it manually for diagnostics or a one-off sync.
  // Keep the enabled flag in the scheduler query only; this action is the
  // explicit manual execution path.
  const rows = await queryNeon<{ workflow_file: string }>('SELECT workflow_file FROM sync_job_settings WHERE job_key = $1 LIMIT 1', [jobKey]);
  const workflow = rows[0]?.workflow_file;
  const queueJob: SyncJobName | null = jobKey === 'stock-price'
    ? 'stock-price'
    : jobKey === 'catalog-full'
      ? 'catalog-full'
      : jobKey === 'image-loader'
        ? 'image-loader'
        : jobKey === 'manufacturer-cleanup'
          ? 'manufacturer-cleanup'
          : jobKey === 'transport-dictionary'
            ? 'transport-dictionary'
            : null;
  if (process.env.REDIS_URL?.trim() && queueJob) {
    try {
      const { enqueueSyncJob } = await import(/* webpackIgnore: true */ '@worlds/queue');
      await enqueueSyncJob(queueJob, { requestedBy: 'admin' });
      await queryNeon('UPDATE sync_job_settings SET last_requested_at = NOW(), updated_at = NOW() WHERE job_key = $1', [jobKey]);
      redirect('/admin/importy?run=1');
    } catch {
      redirect('/admin/importy?error=queue');
    }
  }
  const token = process.env.GITHUB_TOKEN?.trim();
  const repository = process.env.GITHUB_REPOSITORY?.trim() || 'spidder1/worlds-sk';
  if (!workflow || !token) redirect('/admin/importy?error=github');
  const inputs = jobKey === 'stock-price'
    ? { mode: 'stock-price' }
    : jobKey === 'catalog-full'
      ? { mode: 'full' }
      : jobKey === 'manufacturer-cleanup'
        ? { dry_run: 'false' }
        : {};
  const response = await fetch(`https://api.github.com/repos/${repository}/actions/workflows/${encodeURIComponent(workflow)}/dispatches`, {
    method: 'POST', headers: { accept: 'application/vnd.github+json', authorization: `Bearer ${token}`, 'content-type': 'application/json', 'user-agent': 'worlds-admin' },
    body: JSON.stringify({ ref: 'main', inputs }),
  });
  if (!response.ok) redirect('/admin/importy?error=github');
  await queryNeon('UPDATE sync_job_settings SET last_requested_at = NOW(), updated_at = NOW() WHERE job_key = $1', [jobKey]);
  redirect('/admin/importy?run=1');
}

function boundedNumber(value: FormDataEntryValue | null, fallback: number, min: number, max: number): number {
  const parsed = Number(String(value ?? ''));
  return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback;
}

export async function updatePricingSettings(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const vatRate = boundedNumber(formData.get('vat_rate'), 20, 0, 100);
  const minimumCostEur = boundedNumber(formData.get('minimum_cost_eur'), 0, 0, 1_000_000);
  const allowPrivatePurchase = String(formData.get('allow_private_purchase') || '') === 'true';
  const transportCodeRaw = String(formData.get('transport_code') || '').trim();
  const transportCode = /^\d+$/.test(transportCodeRaw) ? transportCodeRaw : '';
  const rows = [1, 2, 3, 4, 5, 6].map((index) => {
    const min = Number(String(formData.get(`margin_${index}_min`) ?? ''));
    const maxRaw = String(formData.get(`margin_${index}_max`) ?? '').trim();
    const percent = Number(String(formData.get(`margin_${index}_percent`) ?? ''));
    return { min, max: maxRaw ? Number(maxRaw) : null, percent };
  }).filter((row) => Number.isFinite(row.min) && row.min >= 0 && Number.isFinite(row.percent) && row.percent >= -100 && row.percent <= 1000 && (row.max === null || (Number.isFinite(row.max) && row.max > row.min)))
    .sort((a, b) => a.min - b.min);
  if (rows.length === 0) return;
  await queryNeon(`INSERT INTO store_settings (key, value, updated_at) VALUES ('pricing.vat_rate', $1::jsonb, NOW()), ('feed.minimum_cost_eur', $2::jsonb, NOW()), ('checkout.allow_private_purchase', $3::jsonb, NOW()), ('orders.default_transport_code', $4::jsonb, NOW())
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`, [JSON.stringify({ value: vatRate }), JSON.stringify({ value: minimumCostEur }), JSON.stringify({ value: allowPrivatePurchase }), JSON.stringify({ value: transportCode || null })]);
  await queryNeon('DELETE FROM pricing_rules');
  for (const [index, row] of rows.entries()) {
    await queryNeon('INSERT INTO pricing_rules (min_cost, max_cost, margin_percent, display_order, updated_at) VALUES ($1, $2, $3, $4, NOW())', [row.min, row.max, row.percent, index + 1]);
  }
  redirect('/admin/nastavenia?saved=1');
}

export async function upsertContentPage(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const slug = String(formData.get('slug') || '').trim().toLowerCase();
  const title = String(formData.get('title') || '').trim();
  const body = String(formData.get('body') || '');
  const seoTitle = String(formData.get('seo_title') || '').trim() || null;
  const seoDescription = String(formData.get('seo_description') || '').trim() || null;
  if (!/^[a-z0-9-]{2,80}$/.test(slug) || !title) return;
  await queryNeon(`INSERT INTO content_pages (slug, title, body, seo_title, seo_description, updated_at)
    VALUES ($1, $2, $3, $4, $5, NOW())
    ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, body = EXCLUDED.body, seo_title = EXCLUDED.seo_title, seo_description = EXCLUDED.seo_description, updated_at = NOW()`,
    [slug, title, body, seoTitle, seoDescription]);
  redirect(`/admin/obsah?slug=${encodeURIComponent(slug)}&saved=1`);
}
