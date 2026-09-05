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
