import { NextResponse } from 'next/server';
import { getComgateStatus, isComgateWebhookSecretValid } from '../../../../../lib/comgate';
import { queryNeon } from '../../../../../lib/neon-client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({})) as { transId?: string; refId?: string; secret?: string };
  if (!payload.transId || !isComgateWebhookSecretValid(payload.secret)) return NextResponse.json({ code: 1400, message: 'Invalid notification' }, { status: 401 });
  const status = await getComgateStatus(payload.transId);
  if (!status) return NextResponse.json({ code: 1500, message: 'Unable to verify payment status' }, { status: 503 });
  const orderNumber = status.refId || payload.refId;
  if (!orderNumber) return NextResponse.json({ code: 1400, message: 'Missing order reference' }, { status: 400 });
  const paymentStatus = status.status === 'PAID' || status.status === 'AUTHORIZED' ? 'PAID' : status.status === 'CANCELLED' ? 'FAILED' : 'PENDING';
  await queryNeon(`UPDATE orders SET payment_status = $1, status = CASE WHEN $1 = 'PAID' AND status = 'NEW' THEN 'PROCESSING' ELSE status END, updated_at = NOW() WHERE order_number = $2 AND comgate_transaction_id = $3`, [paymentStatus, orderNumber, payload.transId]);
  return NextResponse.json({ code: 0, message: 'OK' });
}
