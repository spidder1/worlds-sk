import { getFeedProducts, productCategory, productUrl, xmlEscape, descriptionForFeed } from '../../../../lib/feeds';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const products = await getFeedProducts();
  const items = products.map((product) => {
    const price = Number(product.final_price).toFixed(2);
    const delivery = Number(product.stock_count || 0) > 0 ? '0' : '7';
    return `  <SHOPITEM>
    <ITEM_ID>${xmlEscape(product.id)}</ITEM_ID>
    <PRODUCTNAME>${xmlEscape(product.title)}</PRODUCTNAME>
    <DESCRIPTION>${xmlEscape(descriptionForFeed(product.description))}</DESCRIPTION>
    <URL>${xmlEscape(productUrl(product))}</URL>
    <IMGURL>${xmlEscape(product.image_url)}</IMGURL>
    <PRICE_VAT>${price}</PRICE_VAT>
    <CATEGORYTEXT>${xmlEscape(productCategory(product))}</CATEGORYTEXT>
    <MANUFACTURER>${xmlEscape(product.brand || 'Worlds')}</MANUFACTURER>
    ${product.ean ? `<EAN>${xmlEscape(product.ean)}</EAN>` : ''}
    <DELIVERY_DATE>${delivery}</DELIVERY_DATE>
  </SHOPITEM>`;
  }).join('\n');

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
