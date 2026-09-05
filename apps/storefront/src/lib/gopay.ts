type GoPayResponse = {
  id?: number;
  result?: { code?: number; gw_url?: string; message?: string };
  gw_url?: string;
  state?: string;
  amount?: number;
  currency?: string;
  order_number?: string;
};

function configuration() {
  const goId = process.env.GOPAY_GO_ID?.trim();
  const clientId = process.env.GOPAY_CLIENT_ID?.trim();
  const clientSecret = process.env.GOPAY_CLIENT_SECRET?.trim();
  if (!goId || !clientId || !clientSecret) return null;
  const baseUrl = process.env.GOPAY_TEST === 'true' ? 'https://gw.sandbox.gopay.com/api' : 'https://gate.gopay.cz/api';
  return { goId, clientId, clientSecret, baseUrl };
}

async function accessToken(config: NonNullable<ReturnType<typeof configuration>>) {
  const response = await fetch(`${config.baseUrl}/oauth2/token`, {
    method: 'POST',
    headers: {
      authorization: `Basic ${Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64')}`,
      accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&scope=payment-all',
    signal: AbortSignal.timeout(10000),
    cache: 'no-store',
  });
  const data = await response.json().catch(() => ({})) as { access_token?: string; error_description?: string };
  if (!response.ok || !data.access_token) throw new Error(data.error_description || `GoPay token request failed (${response.status})`);
  return data.access_token;
}

export async function createGoPayPayment(input: {
  orderNumber: string;
  amount: number;
  currency: string;
  email: string;
  fullName: string;
  returnUrl: string;
  notifyUrl: string;
  items: Array<{ name: string; amount: number; count: number }>;
}) {
  const config = configuration();
  if (!config) return { configured: false as const };
  const token = await accessToken(config);
  const response = await fetch(`${config.baseUrl}/payments/payment`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({
      payer: { allowed_payment_instruments: ['PAYMENT_CARD'], default_payment_instrument: 'PAYMENT_CARD', contact: { email: input.email, first_name: input.fullName.slice(0, 70) } },
      amount: Math.round(input.amount * 100),
      currency: input.currency,
      order_number: input.orderNumber,
      order_description: `Worlds.sk ${input.orderNumber}`.slice(0, 255),
      items: input.items.map((item) => ({ name: item.name.slice(0, 255), amount: Math.round(item.amount * 100), count: item.count })),
      callback: { return_url: input.returnUrl, notification_url: input.notifyUrl },
    }),
    signal: AbortSignal.timeout(10000),
    cache: 'no-store',
  });
  const data = await response.json().catch(() => ({})) as GoPayResponse;
  const resultCode = data.result?.code;
  const redirect = data.gw_url || data.result?.gw_url;
  if (!response.ok || (resultCode !== undefined && resultCode !== 0) || !data.id || !redirect) {
    throw new Error(data.result?.message || `GoPay payment creation failed (${response.status})`);
  }
  return { configured: true as const, paymentId: String(data.id), redirect };
}

export async function getGoPayStatus(paymentId: string) {
  const config = configuration();
  if (!config) return null;
  const token = await accessToken(config);
  const response = await fetch(`${config.baseUrl}/payments/${encodeURIComponent(paymentId)}`, {
    headers: { authorization: `Bearer ${token}`, accept: 'application/json' },
    signal: AbortSignal.timeout(10000),
    cache: 'no-store',
  });
  const data = await response.json().catch(() => ({})) as GoPayResponse;
  if (!response.ok || data.result?.code && data.result.code !== 0) return null;
  return data;
}
