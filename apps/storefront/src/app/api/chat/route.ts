import { NextResponse } from 'next/server';
import { getProductsPage } from '../../../lib/catalog';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function parseRequest(text: string) {
  const budget = text.match(/(?:do|max(?:imálne)?|pod)\s*(\d{2,6})(?:\s*€|\s*eur)?/i);
  const ram = text.match(/(\d+)\s*gb\s*(?:ram|operačnej|pamäte)/i);
  const ssd = text.match(/(\d+)\s*gb\s*(?:ssd|disk)/i);
  const category = /notebook|laptop/i.test(text) ? 'notebooky' : undefined;
  const brand = text.match(/\b(asus|lenovo|hp|dell|acer|apple|msi)\b/i)?.[1];
  return { maxPrice: budget ? Number(budget[1]) : undefined, ram: ram?.[1], ssd: ssd?.[1], categorySlug: category, brand, query: text };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const latest = messages.at(-1)?.content;
  if (typeof latest !== 'string' || latest.trim().length < 2) return NextResponse.json({ error: 'Napíšte, čo hľadáte.' }, { status: 400 });
  const filters = parseRequest(latest.trim());
  const result = await getProductsPage({ ...filters, page: 1, pageSize: 8, sort: 'price_asc', inStockOnly: true });
  const message = result.products.length
    ? `Našiel som ${result.total} vhodných produktov. Zobrazujem prvých ${result.products.length} podľa ceny.`
    : 'Pre túto požiadavku som nenašiel dostupný produkt. Skúste upraviť rozpočet alebo parametre.';
  return NextResponse.json({ message, filters, products: result.products.map((product) => ({ id: product.id, title: product.title, slug: product.slug, price: product.pricing.finalPrice, currency: product.pricing.currency, imageUrl: product.images.find((image) => image.isPrimary)?.url || product.images[0]?.url || null })) });
}
