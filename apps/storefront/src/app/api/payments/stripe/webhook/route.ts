import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { getNeonPool } from '../../../../../lib/neon-client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY?.trim();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  const signature = request.headers.get('stripe-signature');
  if (!secret || !webhookSecret || !signature) return NextResponse.json({ error: 'Webhook nie je nakonfigurovaný.' }, { status: 400 });
  try {
    const stripe = new Stripe(secret);
    const event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret);
    const pool = getNeonPool();
    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.metadata?.orderId) await pool.query(`UPDATE orders SET payment_status = 'PAID', status = CASE WHEN status = 'NEW' THEN 'PROCESSING' ELSE status END, updated_at = NOW() WHERE id = $1 AND stripe_session_id = $2`, [session.metadata.orderId, session.id]);
    }
    if (event.type === 'checkout.session.async_payment_failed') {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.metadata?.orderId) await pool.query(`UPDATE orders SET payment_status = 'FAILED', updated_at = NOW() WHERE id = $1 AND stripe_session_id = $2`, [session.metadata.orderId, session.id]);
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[stripe-webhook] invalid event', error);
    return NextResponse.json({ error: 'Neplatný podpis webhooku.' }, { status: 400 });
  }
}
