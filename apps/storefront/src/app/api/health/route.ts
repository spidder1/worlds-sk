import { NextResponse } from 'next/server';
import { queryNeon } from '../../../lib/neon-client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rows = await queryNeon<{ count: string }>(
      'SELECT COUNT(*)::int AS count FROM storefront_products',
    );
    return NextResponse.json({
      ok: true,
      database: 'neon',
      sellableProducts: Number(rows[0]?.count || 0),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[health] Neon check failed:', error);
    return NextResponse.json(
      { ok: false, database: 'neon', timestamp: new Date().toISOString() },
      { status: 503 },
    );
  }
}
