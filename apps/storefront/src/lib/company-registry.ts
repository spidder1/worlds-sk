import { normalizeVatId } from './vies';

export type CompanyLookup = { status: 'FOUND' | 'NOT_FOUND' | 'UNAVAILABLE' | 'INVALID'; country: 'SK' | 'CZ'; ico: string; name?: string; street?: string; city?: string; postalCode?: string; dic?: string; icDph?: string };

function validSlovakIco(value: string) {
  if (!/^\d{8}$/.test(value)) return false;
  const digits = value.split('').map(Number);
  const weighted = digits.slice(0, 7).reduce((sum, digit, index) => sum + digit * (8 - index), 0);
  const remainder = weighted % 11;
  return (remainder === 0 ? 1 : remainder === 1 ? 0 : 11 - remainder) === digits[7];
}

function normalizeAddress(value: unknown) {
  const address = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const street = String(address.nazevUlice ?? address.ulice ?? address.street ?? '').trim() || undefined;
  const house = String(address.cisloDomovni ?? address.cisloOrientacni ?? address.houseNumber ?? '').trim();
  return { street: street ? `${street}${house ? ` ${house}` : ''}` : undefined, city: String(address.nazevObce ?? address.obec ?? address.city ?? '').trim() || undefined, postalCode: String(address.psc ?? address.postalCode ?? '').replace(/\s+/g, '') || undefined };
}

export async function lookupCompany(country: string, ico: string): Promise<CompanyLookup> {
  const normalizedCountry = country.toUpperCase() === 'CZ' ? 'CZ' : 'SK';
  const normalizedIco = ico.replace(/\s+/g, '');
  if (!/^\d{8}$/.test(normalizedIco) || (normalizedCountry === 'SK' && !validSlovakIco(normalizedIco))) return { status: 'INVALID', country: normalizedCountry, ico: normalizedIco };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    if (normalizedCountry === 'CZ') {
      const response = await fetch(`https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/${normalizedIco}`, { headers: { accept: 'application/json' }, signal: controller.signal, cache: 'no-store' });
      if (response.status === 404) return { status: 'NOT_FOUND', country: 'CZ', ico: normalizedIco };
      if (!response.ok) return { status: 'UNAVAILABLE', country: 'CZ', ico: normalizedIco };
      const data = await response.json() as Record<string, unknown>;
      const address = normalizeAddress(data.sidlo);
      const name = String(data.obchodniJmeno ?? data.nazev ?? '').trim() || undefined;
      return { status: name ? 'FOUND' : 'NOT_FOUND', country: 'CZ', ico: normalizedIco, name, ...address, dic: String(data.dic ?? '').trim() || undefined };
    }
    const baseUrl = process.env.FINSTAT_API_URL?.trim();
    const apiKey = process.env.FINSTAT_API_KEY?.trim();
    if (!baseUrl || !apiKey) return { status: 'UNAVAILABLE', country: 'SK', ico: normalizedIco };
    const response = await fetch(baseUrl.replace(/\/$/, '').replace('{ico}', normalizedIco), { headers: { accept: 'application/json', 'x-api-key': apiKey }, signal: controller.signal, cache: 'no-store' });
    if (response.status === 404) return { status: 'NOT_FOUND', country: 'SK', ico: normalizedIco };
    if (!response.ok) return { status: 'UNAVAILABLE', country: 'SK', ico: normalizedIco };
    const data = await response.json() as Record<string, unknown>;
    const address = normalizeAddress(data.address ?? data.sidlo);
    const name = String(data.name ?? data.companyName ?? data.obchodneMeno ?? '').trim() || undefined;
    const icDph = String(data.vatId ?? data.icDph ?? '').trim() || undefined;
    return { status: name ? 'FOUND' : 'NOT_FOUND', country: 'SK', ico: normalizedIco, name, ...address, dic: String(data.dic ?? '').trim() || undefined, icDph: normalizeVatId(icDph)?.normalized };
  } catch {
    return { status: 'UNAVAILABLE', country: normalizedCountry, ico: normalizedIco };
  } finally {
    clearTimeout(timeout);
  }
}
