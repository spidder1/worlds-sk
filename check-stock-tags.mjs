import fs from 'node:fs';

async function checkStockXml() {
  const stockXmlUrl = 'https://private-ws-sk.elinkx.biz/download/productCatalogueStock_1fbdf826-994f-4019-bae3-cfb146593ad1.xml';
  const res = await fetch(stockXmlUrl);
  const text = await res.text();
  console.log('--- NÁHĽAD SKLADOVÉHO XML (prvých 1500 znakov) ---');
  console.log(text.slice(0, 1500));
}

checkStockXml().catch(console.error);
