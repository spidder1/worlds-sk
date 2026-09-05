import { getFeedProducts, productCategory, productUrl, xmlEscape, descriptionForFeed } from '../../../../lib/feeds';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const products = await getFeedProducts();
  const items = products.map((product) => {
    const price = Number(product.final_price).toFixed(2);
    const availability = Number(product.stock_count || 0) > 0 ? 'in stock' : 'out of stock';
    return `    <item>
      <g:id>${xmlEscape(product.id)}</g:id>
      <g:title>${xmlEscape(product.title)}</g:title>
      <g:description>${xmlEscape(descriptionForFeed(product.description))}</g:description>
      <g:link>${xmlEscape(productUrl(product))}</g:link>
      <g:image_link>${xmlEscape(product.image_url)}</g:image_link>
      <g:price>${price} ${xmlEscape(product.currency || 'EUR')}</g:price>
      <g:availability>${availability}</g:availability>
      <g:condition>new</g:condition>
      <g:brand>${xmlEscape(product.brand || 'Worlds')}</g:brand>
      ${product.mpn ? `<g:mpn>${xmlEscape(product.mpn)}</g:mpn>` : ''}
      ${product.ean ? `<g:gtin>${xmlEscape(product.ean)}</g:gtin>` : ''}
      <g:product_type>${xmlEscape(productCategory(product))}</g:product_type>
    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Worlds.sk</title>
    <link>https://worlds.sk</link>
    <description>IT produkty a príslušenstvo</description>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
