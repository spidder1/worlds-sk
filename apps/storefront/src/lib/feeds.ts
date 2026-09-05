import { queryNeon } from './neon-client';

type FeedProduct = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  brand: string | null;
  mpn: string | null;
  ean: string | null;
  final_price: string | number;
  currency: string | null;
  stock_count: number | null;
  category_slug: string | null;
  category_hierarchy: string[] | null;
  image_url: string | null;
};

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://worlds.sk').replace(/\/$/, '');

function escapeXml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function cleanDescription(value: string | null): string {
  return (value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 5000);
}

export async function getFeedProducts(): Promise<FeedProduct[]> {
  return queryNeon<FeedProduct>(`SELECT id, title, slug,
      COALESCE(enriched_description, supplier_description, short_description, '') AS description,
      brand, mpn, ean, final_price, currency, stock_count, category_slug,
      category_hierarchy, images->0->>'url' AS image_url
    FROM storefront_products
    WHERE status = 'ACTIVE' AND final_price > 0
      AND images IS NOT NULL AND jsonb_array_length(images) > 0
    ORDER BY id ASC`);
}

export function productUrl(product: Pick<FeedProduct, 'slug'>): string {
  return `${siteUrl}/produkt/${encodeURIComponent(product.slug)}`;
}

export function productCategory(product: Pick<FeedProduct, 'category_hierarchy' | 'category_slug'>): string {
  const hierarchy = product.category_hierarchy?.filter(Boolean) || [];
  return hierarchy.length > 0 ? hierarchy.join(' > ') : (product.category_slug || 'Počítače a IT');
}

export function xmlEscape(value: unknown): string {
  return escapeXml(value);
}

export function descriptionForFeed(value: string | null): string {
  return cleanDescription(value);
}
