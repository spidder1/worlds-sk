import { NextResponse } from 'next/server';
import { getNeonPool } from '../../lib/neon-client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: Promise<{ legacy: string[] }> }) {
  const { legacy } = await params;
  const requestUrl = new URL(request.url);
  const sourcePath = `/${legacy.map((part) => encodeURIComponent(decodeURIComponent(part))).join('/')}${requestUrl.search}`;
  const result = await getNeonPool().query<{ target_path: string; http_status: number }>(
    'SELECT target_path, http_status FROM seo_redirects WHERE source_path = $1 AND active = true LIMIT 1',
    [sourcePath],
  );
  if (!result.rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const target = result.rows[0].target_path;
  const location = target.startsWith('https://') ? target : new URL(target, request.url).toString();
  const response = NextResponse.redirect(location, result.rows[0].http_status);
  response.headers.set('cache-control', 'public, max-age=3600, s-maxage=86400');
  return response;
}
