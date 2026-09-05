'use server';

import { redirect } from 'next/navigation';
import { queryNeon } from '../../lib/neon-client';
import { adminPasswordMatches, clearAdminSession, isAdminAuthenticated, setAdminSession } from './auth';

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

export async function updateManufacturerReview(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const id = String(formData.get('id') || '');
  const auditClass = String(formData.get('audit_class') || 'UNVERIFIED_CANDIDATE');
  if (!id || !['VERIFIED_BRAND', 'UNVERIFIED_CANDIDATE', 'REMOVED'].includes(auditClass)) return;
  await queryNeon('UPDATE manufacturers SET audit_class = $1, updated_at = NOW() WHERE id = $2', [auditClass, id]);
  redirect('/admin/vyrobcovia?saved=1');
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
  const rows = [1, 2, 3, 4, 5, 6].map((index) => {
    const min = Number(String(formData.get(`margin_${index}_min`) ?? ''));
    const maxRaw = String(formData.get(`margin_${index}_max`) ?? '').trim();
    const percent = Number(String(formData.get(`margin_${index}_percent`) ?? ''));
    return { min, max: maxRaw ? Number(maxRaw) : null, percent };
  }).filter((row) => Number.isFinite(row.min) && row.min >= 0 && Number.isFinite(row.percent) && row.percent >= -100 && row.percent <= 1000 && (row.max === null || (Number.isFinite(row.max) && row.max > row.min)))
    .sort((a, b) => a.min - b.min);
  if (rows.length === 0) return;
  await queryNeon(`INSERT INTO store_settings (key, value, updated_at) VALUES ('pricing.vat_rate', $1::jsonb, NOW()), ('feed.minimum_cost_eur', $2::jsonb, NOW()), ('checkout.allow_private_purchase', $3::jsonb, NOW())
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`, [JSON.stringify({ value: vatRate }), JSON.stringify({ value: minimumCostEur }), JSON.stringify({ value: allowPrivatePurchase })]);
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
