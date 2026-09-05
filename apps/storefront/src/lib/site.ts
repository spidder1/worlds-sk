/**
 * Canonical origin for this deployment.
 *
 * Preview and staging deployments must not present themselves as worlds.sk:
 * duplicate content under someone else's canonical is an SEO liability. The
 * origin comes from NEXT_PUBLIC_SITE_URL and anything that is not the
 * production origin is served noindex (see app/robots.ts and the layout).
 */
const PRODUCTION_ORIGIN = 'https://worlds.sk';

function normalize(origin: string): string {
  return origin.trim().replace(/\/+$/, '');
}

function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return normalize(configured);

  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL?.trim() || process.env.VERCEL_URL?.trim();
  if (vercelUrl) return normalize(vercelUrl.startsWith('http') ? vercelUrl : `https://${vercelUrl}`);

  return 'http://localhost:3000';
}

export const SITE_URL = resolveSiteUrl();

/** True only on the real shop origin. Everything else is a preview. */
export const IS_PRODUCTION_SITE = SITE_URL === PRODUCTION_ORIGIN;

export function absoluteUrl(pathname: string): string {
  return `${SITE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}
