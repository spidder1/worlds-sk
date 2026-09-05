import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VIES_ENDPOINT = 'https://ec.europa.eu/taxation_customs/vies/services/checkVatService';

function parseVatId(value: unknown) {
  const normalized = String(value ?? '').replace(/\s+/g, '').toUpperCase();
  const match = /^([A-Z]{2})(\d{8,12})$/.exec(normalized);
  return match ? { countryCode: match[1], vatNumber: match[2], normalized } : null;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const vat = parseVatId(body.vatId);
  if (!vat) return NextResponse.json({ valid: false, status: 'INVALID_FORMAT', error: 'IČ DPH musí obsahovať kód krajiny a 8 až 12 číslic.' }, { status: 400 });

  const xml = `<?xml version="1.0" encoding="UTF-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><checkVat xmlns="urn:ec.europa.eu:taxud:vies:services:checkVat:types"><countryCode>${vat.countryCode}</countryCode><vatNumber>${vat.vatNumber}</vatNumber></checkVat></soap:Body></soap:Envelope>`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(VIES_ENDPOINT, { method: 'POST', headers: { 'content-type': 'text/xml; charset=utf-8', soapaction: '""' }, body: xml, signal: controller.signal, cache: 'no-store' });
    const text = await response.text();
    if (!response.ok) return NextResponse.json({ valid: null, status: 'UNAVAILABLE', vatId: vat.normalized }, { status: 503 });
    const valid = /<valid>\s*true\s*<\/valid>/i.test(text);
    const name = text.match(/<name>([\s\S]*?)<\/name>/i)?.[1]?.trim() || null;
    const address = text.match(/<address>([\s\S]*?)<\/address>/i)?.[1]?.trim() || null;
    return NextResponse.json({ valid, status: valid ? 'VALID' : 'INVALID', vatId: vat.normalized, name, address });
  } catch {
    return NextResponse.json({ valid: null, status: 'UNAVAILABLE', vatId: vat.normalized }, { status: 503 });
  } finally {
    clearTimeout(timeout);
  }
}
