import { NextResponse } from 'next/server';
import { getNeonPool } from '../../lib/neon-client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const rawPath = requestUrl.pathname || '/';
  let decodedPath = rawPath;
  try {
    decodedPath = decodeURIComponent(rawPath);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  const withoutTrailingSlash = rawPath.length > 1 ? rawPath.replace(/\/$/, '') : rawPath;
  const decodedWithoutTrailingSlash = decodedPath.length > 1 ? decodedPath.replace(/\/$/, '') : decodedPath;
  const candidates = [...new Set([
    `${rawPath}${requestUrl.search}`,
    `${decodedPath}${requestUrl.search}`,
    `${withoutTrailingSlash}${requestUrl.search}`,
    `${decodedWithoutTrailingSlash}${requestUrl.search}`,
  ])];
  let redirectRow: { target_path: string; http_status: number } | undefined;
  for (const sourcePath of candidates) {
    const result = await getNeonPool().query<{ target_path: string; http_status: number }>(
      'SELECT target_path, http_status FROM seo_redirects WHERE source_path = $1 AND active = true LIMIT 1',
      [sourcePath],
    );
    if (result.rows[0]) {
      redirectRow = result.rows[0];
      break;
    }
  }
  if (!redirectRow) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const target = redirectRow.target_path;
  const location = target.startsWith('https://') ? target : new URL(target, request.url).toString();
  const response = NextResponse.redirect(location, redirectRow.http_status);
  response.headers.set('cache-control', 'public, max-age=3600, s-maxage=86400');
  return response;
}
