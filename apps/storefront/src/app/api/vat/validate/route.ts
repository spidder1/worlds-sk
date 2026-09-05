import { NextResponse } from 'next/server';
import { normalizeVatId, validateVatId } from '../../../../lib/vies';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (!normalizeVatId(body.vatId)) return NextResponse.json({ valid: false, status: 'INVALID_FORMAT', error: 'IČ DPH musí obsahovať kód krajiny a 8 až 12 číslic.' }, { status: 400 });
  const result = await validateVatId(body.vatId);
  return NextResponse.json(result, { status: result.status === 'UNAVAILABLE' ? 503 : 200 });
}
