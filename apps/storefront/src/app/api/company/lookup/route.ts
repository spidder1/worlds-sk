import { NextResponse } from 'next/server';
import { lookupCompany } from '../../../../lib/company-registry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const country = typeof body.country === 'string' ? body.country : 'SK';
  const ico = typeof body.ico === 'string' ? body.ico : '';
  if (!['SK', 'CZ'].includes(country.toUpperCase())) return NextResponse.json({ error: 'Podporované krajiny sú SK a CZ.' }, { status: 400 });
  const result = await lookupCompany(country, ico);
  return NextResponse.json(result, { status: result.status === 'INVALID' ? 400 : result.status === 'UNAVAILABLE' ? 503 : 200 });
}
