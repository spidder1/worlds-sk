const VIES_ENDPOINT = 'https://ec.europa.eu/taxation_customs/vies/services/checkVatService';

export type ViesResult = { valid: boolean | null; status: 'VALID' | 'INVALID' | 'UNAVAILABLE' | 'INVALID_FORMAT'; vatId: string; name?: string | null; address?: string | null };

export function normalizeVatId(value: unknown) {
  const normalized = String(value ?? '').replace(/\s+/g, '').toUpperCase();
  const match = /^([A-Z]{2})(\d{8,12})$/.exec(normalized);
  return match ? { countryCode: match[1], vatNumber: match[2], normalized } : null;
}

export async function validateVatId(value: unknown): Promise<ViesResult> {
  const vat = normalizeVatId(value);
  if (!vat) return { valid: false, status: 'INVALID_FORMAT', vatId: String(value ?? '') };
  const xml = `<?xml version="1.0" encoding="UTF-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><checkVat xmlns="urn:ec.europa.eu:taxud:vies:services:checkVat:types"><countryCode>${vat.countryCode}</countryCode><vatNumber>${vat.vatNumber}</vatNumber></checkVat></soap:Body></soap:Envelope>`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(VIES_ENDPOINT, { method: 'POST', headers: { 'content-type': 'text/xml; charset=utf-8', soapaction: '""' }, body: xml, signal: controller.signal, cache: 'no-store' });
    const text = await response.text();
    if (!response.ok) return { valid: null, status: 'UNAVAILABLE', vatId: vat.normalized };
    return { valid: /<valid>\s*true\s*<\/valid>/i.test(text), status: /<valid>\s*true\s*<\/valid>/i.test(text) ? 'VALID' : 'INVALID', vatId: vat.normalized, name: text.match(/<name>([\s\S]*?)<\/name>/i)?.[1]?.trim() || null, address: text.match(/<address>([\s\S]*?)<\/address>/i)?.[1]?.trim() || null };
  } catch {
    return { valid: null, status: 'UNAVAILABLE', vatId: vat.normalized };
  } finally {
    clearTimeout(timeout);
  }
}
