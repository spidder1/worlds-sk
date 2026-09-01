import fs from 'node:fs';
import path from 'node:path';
import AdmZip from 'adm-zip';
import { XMLParser } from 'fast-xml-parser';

async function checkPricesInZip() {
  const zip = new AdmZip('downloads/productCatalogue_main.zip');
  const xmlEntry = zip.getEntries().find(e => e.entryName.endsWith('.xml'));
  const xmlContent = xmlEntry.getData().toString('utf8');

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    parseTagValue: true,
    trimValues: true,
    processEntities: false,
  });

  const blocks = xmlContent.match(/<Product>[\s\S]*?<\/Product>/g) || [];

  let withDealerPrice = 0;
  let withEndUserPrice = 0;
  let withYourPrice = 0;
  let withYourPriceWithFees = 0;
  let withImages = 0;

  for (let i = 0; i < blocks.length; i++) {
    const parsed = parser.parse(blocks[i]);
    const p = parsed.Product;
    if (!p) continue;

    const dp = parseFloat(p.DealerPrice || '0');
    const eup = parseFloat(p.EndUserPrice || '0');
    const yp = parseFloat(p.YourPrice || '0');
    const ypwf = parseFloat(p.YourPriceWithFees || '0');
    const img = p.ImageUrl ? String(p.ImageUrl).trim() : '';

    if (dp > 0) withDealerPrice++;
    if (eup > 0) withEndUserPrice++;
    if (yp > 0) withYourPrice++;
    if (ypwf > 0) withYourPriceWithFees++;
    if (img.length > 5) withImages++;
  }

  console.log(`Celý katalóg (${blocks.length} položiek):`);
  console.log(`- Položky s DealerPrice: ${withDealerPrice}`);
  console.log(`- Položky s EndUserPrice: ${withEndUserPrice}`);
  console.log(`- Položky s YourPrice: ${withYourPrice}`);
  console.log(`- Položky s YourPriceWithFees: ${withYourPriceWithFees}`);
  console.log(`- Položky s ImageUrl z eD CDN: ${withImages}`);
}

checkPricesInZip().catch(console.error);
