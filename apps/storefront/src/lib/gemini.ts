export type ShoppingIntent = {
  maxPrice?: number;
  ram?: string;
  ssd?: string;
  categorySlug?: string;
  brand?: string;
};

const allowedCategories = new Set(['notebooky', 'stolne-pocitace', 'monitory-a-displeje', 'pocitacove-komponenty', 'prislusenstvo-a-periferie']);
const allowedBrands = new Set(['asus', 'lenovo', 'hp', 'dell', 'acer', 'apple', 'msi', 'intel', 'amd', 'nvidia', 'samsung', 'logitech']);

function asCleanIntent(value: unknown): ShoppingIntent | null {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as Record<string, unknown>;
  const result: ShoppingIntent = {};
  if (typeof candidate.maxPrice === 'number' && Number.isFinite(candidate.maxPrice) && candidate.maxPrice > 0 && candidate.maxPrice <= 100_000) result.maxPrice = Math.round(candidate.maxPrice);
  if (typeof candidate.ram === 'string' && /^\d{1,4}$/.test(candidate.ram.trim())) result.ram = candidate.ram.trim();
  if (typeof candidate.ssd === 'string' && /^\d{1,5}$/.test(candidate.ssd.trim())) result.ssd = candidate.ssd.trim();
  if (typeof candidate.categorySlug === 'string' && allowedCategories.has(candidate.categorySlug.trim().toLowerCase())) result.categorySlug = candidate.categorySlug.trim().toLowerCase();
  if (typeof candidate.brand === 'string' && allowedBrands.has(candidate.brand.trim().toLowerCase())) result.brand = candidate.brand.trim().toLowerCase();
  return Object.keys(result).length ? result : null;
}

export async function parseShoppingIntentWithGemini(text: string): Promise<ShoppingIntent | null> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return null;
  const model = process.env.GEMINI_MODEL?.trim() || 'gemini-2.0-flash';
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: `Extract shopping filters from this Slovak request. Return only JSON. Never invent values. Allowed categorySlug values: notebooky, stolne-pocitace, monitory-a-displeje, pocitacove-komponenty, prislusenstvo-a-periferie. Allowed brand values: ASUS, Lenovo, HP, Dell, Acer, Apple, MSI, Intel, AMD, NVIDIA, Samsung, Logitech. Request: ${text.slice(0, 500)}` }] }],
      generationConfig: {
        temperature: 0,
        response_mime_type: 'application/json',
        response_schema: {
          type: 'OBJECT',
          properties: {
            maxPrice: { type: 'NUMBER' },
            ram: { type: 'STRING' },
            ssd: { type: 'STRING' },
            categorySlug: { type: 'STRING' },
            brand: { type: 'STRING' },
          },
        },
      },
    }),
    signal: AbortSignal.timeout(4_000),
    cache: 'no-store',
  });
  if (!response.ok) return null;
  const payload = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
  const jsonText = payload.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!jsonText) return null;
  try {
    return asCleanIntent(JSON.parse(jsonText));
  } catch {
    return null;
  }
}
