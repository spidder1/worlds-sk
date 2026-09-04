import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { queryNeon } from '../../../lib/neon-client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type CartRow = {
  product_id: string;
  quantity: number;
  sku: string;
  title: string;
  slug: string;
  final_price: string;
  currency: string;
  image_url: string | null;
};

function sessionFrom(request: Request, body?: { sessionToken?: string }): string {
  const session = body?.sessionToken || new URL(request.url).searchParams.get('session') || '';
  if (!/^[a-zA-Z0-9-]{16,100}$/.test(session)) throw new Error('Invalid cart session');
  return session;
}

async function ensureCart(sessionToken: string): Promise<string> {
  const rows = await queryNeon<{ id: string }>(
    `INSERT INTO carts (session_token) VALUES ($1)
     ON CONFLICT (session_token) DO UPDATE SET updated_at = NOW()
     RETURNING id`,
    [sessionToken],
  );
  return rows[0].id;
}

async function readCart(sessionToken: string) {
  const rows = await queryNeon<CartRow>(
    `SELECT ci.product_id, ci.quantity, p.sku, p.title, p.slug, p.final_price, p.currency,
            COALESCE((p.images->0->>'url'), NULL) AS image_url
       FROM carts c
       JOIN cart_items ci ON ci.cart_id = c.id
       JOIN storefront_products p ON p.id = ci.product_id
      WHERE c.session_token = $1
      ORDER BY ci.created_at ASC`,
    [sessionToken],
  );
  return rows.map((row) => ({ ...row, final_price: Number(row.final_price) }));
}

export async function GET(request: Request) {
  const session = new URL(request.url).searchParams.get('session') || randomUUID();
  try {
    return NextResponse.json({ sessionToken: session, items: await readCart(session) });
  } catch (error) {
    console.error('[cart] read failed:', error);
    return NextResponse.json({ error: 'Košík sa nepodarilo načítať.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { sessionToken?: string; productId?: string; quantity?: number };
    const session = sessionFrom(request, body);
    if (!body.productId || !/^[a-zA-Z0-9_-]{1,120}$/.test(body.productId)) {
      return NextResponse.json({ error: 'Neplatný produkt.' }, { status: 400 });
    }
    const requestedQuantity = Number(body.quantity ?? 1);
    if (!Number.isInteger(requestedQuantity) || requestedQuantity < 1 || requestedQuantity > 99) {
      return NextResponse.json({ error: 'Neplatné množstvo.' }, { status: 400 });
    }
    const quantity = requestedQuantity;
    const cartId = await ensureCart(session);
    const product = await queryNeon<{ id: string }>(
      'SELECT id FROM storefront_products WHERE id = $1 LIMIT 1',
      [body.productId],
    );
    if (!product.length) return NextResponse.json({ error: 'Produkt nie je dostupný.' }, { status: 404 });
    await queryNeon(
      `INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)
       ON CONFLICT (cart_id, product_id) DO UPDATE SET quantity = LEAST(99, cart_items.quantity + EXCLUDED.quantity), updated_at = NOW()`,
      [cartId, body.productId, quantity],
    );
    return NextResponse.json({ sessionToken: session, items: await readCart(session) });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message === 'Invalid cart session') return NextResponse.json({ error: 'Neplatná relácia košíka.' }, { status: 400 });
    console.error('[cart] write failed:', error);
    return NextResponse.json({ error: 'Košík sa nepodarilo aktualizovať.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const session = sessionFrom(request);
    const productId = url.searchParams.get('productId');
    const cart = await queryNeon<{ id: string }>('SELECT id FROM carts WHERE session_token = $1 LIMIT 1', [session]);
    if (cart.length && productId) await queryNeon('DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2', [cart[0].id, productId]);
    return NextResponse.json({ sessionToken: session, items: await readCart(session) });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message === 'Invalid cart session') return NextResponse.json({ error: 'Neplatná relácia košíka.' }, { status: 400 });
    return NextResponse.json({ error: 'Košík sa nepodarilo aktualizovať.' }, { status: 500 });
  }
}
