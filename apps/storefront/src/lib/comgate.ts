type ComgateResponse = { code?: number; message?: string; transId?: string; redirect?: string; status?: string; refId?: string; price?: string; curr?: string };

const endpoint = 'https://payments.comgate.cz/v2.0';

function credentials() {
  const merchant = process.env.COMGATE_MERCHANT?.trim();
  const secret = process.env.COMGATE_SECRET?.trim();
  if (!merchant || !secret) return null;
  return { merchant, secret, authorization: `Basic ${Buffer.from(`${merchant}:${secret}`).toString('base64')}` };
}

export async function createComgatePayment(input: { orderNumber: string; amount: number; currency: string; email: string; fullName: string; returnUrl: string; notifyUrl: string }) {
  const auth = credentials();
  if (!auth) return { configured: false as const };
  const response = await fetch(`${endpoint}/paymentRedirect/merchant/${encodeURIComponent(auth.merchant)}`, { method: 'POST', headers: { authorization: auth.authorization, 'content-type': 'application/json' }, body: JSON.stringify({ test: process.env.COMGATE_TEST === 'true', country: 'SK', price: Math.round(input.amount * 100), curr: input.currency, label: `Worlds ${input.orderNumber}`.slice(0, 16), refId: input.orderNumber, method: 'ALL', email: input.email, fullName: input.fullName, urlToReturn: input.returnUrl, urlToStatus: input.notifyUrl, category: 'PHYSICAL_GOODS_ONLY' }), signal: AbortSignal.timeout(10000), cache: 'no-store' });
  const data = await response.json().catch(() => ({})) as ComgateResponse;
  if (!response.ok || data.code !== 0 || !data.transId || !data.redirect) throw new Error(data.message || `Comgate payment creation failed (${response.status})`);
  return { configured: true as const, transId: data.transId, redirect: data.redirect };
}

export async function getComgateStatus(transId: string) {
  const auth = credentials();
  if (!auth) return null;
  const response = await fetch(`${endpoint}/status/${encodeURIComponent(transId)}.json`, { headers: { authorization: auth.authorization, accept: 'application/json' }, signal: AbortSignal.timeout(8000), cache: 'no-store' });
  const data = await response.json().catch(() => ({})) as ComgateResponse;
  if (!response.ok || data.code !== 0) return null;
  return data;
}

export function isComgateWebhookSecretValid(value: unknown) {
  const expected = process.env.COMGATE_SECRET?.trim();
  return Boolean(expected && typeof value === 'string' && value === expected);
}
