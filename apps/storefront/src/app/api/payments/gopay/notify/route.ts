import { NextResponse } from 'next/server';
import { getGoPayStatus } from '../../../../../lib/gopay';
import { queryNeon } from '../../../../../lib/neon-client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({})) as { id?: number | string; payment?: { id?: number | string } };
  const paymentId = String(payload.id ?? payload.payment?.id ?? '').trim();
  if (!paymentId) return NextResponse.json({ error: 'Missing GoPay payment id' }, { status: 400 });
  const status = await getGoPayStatus(paymentId);
  if (!status) return NextResponse.json({ error: 'Unable to verify GoPay payment' }, { status: 503 });
  const orderNumber = status.order_number;
  if (!orderNumber) return NextResponse.json({ error: 'Missing order reference' }, { status: 400 });
  const paymentStatus = status.state === 'PAID' ? 'PAID' : ['CANCELED', 'REFUNDED'].includes(status.state || '') ? 'FAILED' : 'PENDING';
  await queryNeon(`UPDATE orders SET payment_status = $1, status = CASE WHEN $1 = 'PAID' AND status = 'NEW' THEN 'PROCESSING' ELSE status END, updated_at = NOW() WHERE order_number = $2 AND gopay_payment_id = $3`, [paymentStatus, orderNumber, paymentId]);
  return NextResponse.json({ received: true });
}
