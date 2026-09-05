import { NextResponse } from 'next/server';
import { queryNeon } from '../../../lib/neon-client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [rows, batches, quarantine] = await Promise.all([
      queryNeon<{ count: string }>('SELECT COUNT(*)::int AS count FROM storefront_products'),
      queryNeon<{
        batch_number: string;
        mode: string;
        status: string;
        imported_count: number | null;
        completed_at: string | null;
        error_message: string | null;
      }>(`SELECT batch_number, mode, status, imported_count, completed_at, error_message
          FROM sync_batches ORDER BY started_at DESC LIMIT 1`),
      queryNeon<{ count: string }>('SELECT COUNT(*)::int AS count FROM product_quarantine WHERE resolved = false'),
    ]);
    const latest = batches[0];
    const latestHealthy = latest?.status === 'COMPLETED';
    return NextResponse.json({
      ok: latest ? latestHealthy : true,
      database: 'neon',
      sellableProducts: Number(rows[0]?.count || 0),
      openQuarantineRecords: Number(quarantine[0]?.count || 0),
      checks: { latestSync: latestHealthy ? 'ok' : latest ? 'failed' : 'not_run' },
      lastSync: latest
        ? {
            batchNumber: latest.batch_number,
            mode: latest.mode,
            status: latest.status,
            importedCount: Number(latest.imported_count || 0),
            completedAt: latest.completed_at,
            error: latest.error_message,
          }
        : null,
      timestamp: new Date().toISOString(),
    }, { status: latest && !latestHealthy ? 503 : 200 });
  } catch (error) {
    console.error('[health] Neon check failed:', error);
    return NextResponse.json(
      { ok: false, database: 'neon', timestamp: new Date().toISOString() },
      { status: 503 },
    );
  }
}
