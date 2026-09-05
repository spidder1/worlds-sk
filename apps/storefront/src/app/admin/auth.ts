import crypto from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'worlds_admin_session';

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET?.trim() || process.env.ADMIN_PASSWORD?.trim() || '';
}

function signature(): string {
  const key = secret();
  return key ? crypto.createHmac('sha256', key).update('worlds-admin-v1').digest('hex') : '';
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const expected = signature();
  if (!expected) return false;
  const actual = (await cookies()).get(COOKIE_NAME)?.value || '';
  return actual.length === expected.length && crypto.timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
}

export async function setAdminSession() {
  const value = signature();
  if (!value) throw new Error('ADMIN_SESSION_SECRET or ADMIN_PASSWORD is not configured.');
  (await cookies()).set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/admin',
    maxAge: 60 * 60 * 12,
  });
}

export async function clearAdminSession() {
  (await cookies()).delete(COOKIE_NAME);
}

export function adminPasswordMatches(value: string): boolean {
  const configured = process.env.ADMIN_PASSWORD?.trim() || process.env.ADMIN_TOKEN?.trim() || '';
  if (!configured || !value) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(configured);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
