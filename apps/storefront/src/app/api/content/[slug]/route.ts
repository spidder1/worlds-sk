import { NextResponse } from 'next/server';
import { queryNeon } from '../../../../lib/neon-client';

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!/^[a-z0-9-]{2,80}$/.test(slug)) return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
  try {
    const rows = await queryNeon<{ slug: string; title: string; body: string }>('SELECT slug, title, body FROM content_pages WHERE slug = $1 AND published = true LIMIT 1', [slug]);
    return NextResponse.json(rows[0] ?? null, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json(null);
  }
}
