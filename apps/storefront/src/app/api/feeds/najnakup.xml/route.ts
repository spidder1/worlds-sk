import { descriptionForFeed, getFeedProducts, productCategory, productUrl, xmlEscape } from '../../../../lib/feeds';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const products = await getFeedProducts();
  const items = products.map((product) => `  <SHOPITEM>
    <ITEM_ID>${xmlEscape(product.id)}</ITEM_ID>
    <PRODUCTNAME>${xmlEscape(product.title)}</PRODUCTNAME>
    <DESCRIPTION>${xmlEscape(descriptionForFeed(product.description))}</DESCRIPTION>
    <URL>${xmlEscape(productUrl(product))}</URL>
    <IMGURL>${xmlEscape(product.image_url)}</IMGURL>
    <PRICE>${Number(product.final_price).toFixed(2)}</PRICE>
    <CURRENCY>${xmlEscape(product.currency || 'EUR')}</CURRENCY>
    <CATEGORY>${xmlEscape(productCategory(product))}</CATEGORY>
    <MANUFACTURER>${xmlEscape(product.brand || 'Worlds')}</MANUFACTURER>
    ${product.ean ? `<EAN>${xmlEscape(product.ean)}</EAN>` : ''}
    <AVAILABILITY>${Number(product.stock_count || 0) > 0 ? 'in_stock' : 'on_order'}</AVAILABILITY>
  </SHOPITEM>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<SHOP>
${items}
</SHOP>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
