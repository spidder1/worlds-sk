import fs from 'node:fs';
import path from 'node:path';
import AdmZip from 'adm-zip';
import { XMLParser } from 'fast-xml-parser';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://jhgyzgdiapiewpjgosxm.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoZ3l6Z2RpYXBpZXdwamdvc3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwNzI2OTksImV4cCI6MjEwMzY0ODY5OX0.6SAAJarR0Er3LFFewmcJTN_oEE2OoEMLqUTQJRGA3hY';

async function sendStagingBatchWithRetry(batch: any[], maxRetries = 3): Promise<boolean> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/staging_products`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(batch)
      });

      if (res.ok) return true;
      const err = await res.text();
      console.warn(`  [Pokus ${attempt}/${maxRetries}] Chyba pri zápise dávky: ${err.slice(0, 150)}`);
    } catch (e: any) {
      console.warn(`  [Pokus ${attempt}/${maxRetries}] Sieťová chyba: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 400 * attempt));
  }
  return false;
}

export async function runStagingImport() {
  console.log('===========================================================');
  console.log(' Worlds.sk - KOMPLETNÝ 1:1 IMPORT DO STAGING TABUĽKY');
  console.log(' eD SYSTEM XML -> SUPABASE POSTGRESQL (staging_products)');
  console.log(' Bez filtrovania, 100% pôvodné dáta a originálne ceny dodávateľa');
  console.log('===========================================================\n');

  const downloadsDir = path.resolve(process.cwd(), 'downloads');
  const zipPath = path.join(downloadsDir, 'productCatalogue_main.zip');

  if (!fs.existsSync(zipPath)) {
    console.error(`Súbor ${zipPath} sa nenašiel!`);
    return;
  }

  console.log('1. Načítavam a rozbaľujem master XML katalóg...');
  const zip = new AdmZip(zipPath);
  const xmlEntry = zip.getEntries().find(e => e.entryName.endsWith('.xml'));

  if (!xmlEntry) {
    console.error('V ZIP archíve sa nenašiel XML katalóg!');
    return;
  }

  const xmlContent = xmlEntry.getData().toString('utf8');
  console.log(`   ✓ XML katalóg načítaný (${(xmlContent.length / 1024 / 1024).toFixed(2)} MB)\n`);

  console.log('2. Parsujem všetky produkty 1:1 z XML bez filtrovania...');
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    parseTagValue: true,
    trimValues: true,
    processEntities: false,
  });

  const productBlocks = xmlContent.match(/<Product>[\s\S]*?<\/Product>/g) || [];
  console.log(`   ✓ Nájdených ${productBlocks.length} produktov v XML.\n`);

  console.log('3. Transformujem položky do staging štruktúry s originálnymi cenami dodávateľa...');
  const stagingRows: any[] = [];
  const seenCodes = new Set();

  for (let i = 0; i < productBlocks.length; i++) {
    const parsed = parser.parse(productBlocks[i]);
    const p = parsed.Product;
    if (!p) continue;

    const code = String(p.Code || p.ProId || '').trim();
    if (!code || seenCodes.has(code)) continue;
    seenCodes.add(code);

    const name = String(p.Name || p.ProductName || '').trim();
    if (!name) continue;

    const proId = p.ProId ? String(p.ProId) : null;
    const partNumber = p.PartNumber ? String(p.PartNumber) : (p.PartNumber2 ? String(p.PartNumber2) : null);
    const eanCode = p.EANCode ? String(p.EANCode) : (p.EAN ? String(p.EAN) : null);
    const producerName = p.ProducerName ? String(p.ProducerName) : null;
    const producerCode = p.ProducerCode ? String(p.ProducerCode) : null;
    const commodityCode = p.CommodityCode ? String(p.CommodityCode) : null;
    const commodityName = p.CommodityName ? String(p.CommodityName) : null;

    // Originálne ceny od dodávateľa bez úprav
    const yourPrice = parseFloat(p.YourPrice || '0');
    const yourPriceWithFees = parseFloat(p.YourPriceWithFees || '0');
    const dealerPrice = parseFloat(p.DealerPrice || '0');
    const endUserPrice = parseFloat(p.EndUserPrice || '0');
    const garbageFee = parseFloat(p.GarbageFee || '0');
    const authorFee = parseFloat(p.AuthorFee || '0');
    const vat = parseFloat(p.Vat || '20');
    const onStock = String(p.OnStock).toLowerCase() === 'true';
    const onStockCount = parseInt(p.OnStockCount || '0', 10);
    const warranty = p.Warranty ? String(p.Warranty) : (p.WarrantyTerm ? `${p.WarrantyTerm} M` : null);
    const imageUrl = p.ImageUrl ? String(p.ImageUrl).trim() : null;
    const description = p.Description ? String(p.Description) : null;
    const descriptionShort = p.DescriptionShort ? String(p.DescriptionShort) : null;

    stagingRows.push({
      code,
      pro_id: proId,
      part_number: partNumber,
      ean_code: eanCode,
      name,
      producer_name: producerName,
      producer_code: producerCode,
      commodity_code: commodityCode,
      commodity_name: commodityName,
      your_price: yourPrice,
      your_price_with_fees: yourPriceWithFees,
      dealer_price: dealerPrice,
      end_user_price: endUserPrice,
      garbage_fee: garbageFee,
      author_fee: authorFee,
      vat,
      on_stock: onStock,
      on_stock_count: onStockCount,
      warranty,
      image_url: imageUrl,
      description,
      description_short: descriptionShort,
      raw_data: {
        ValuePack: p.ValuePack,
        ValuePackQty: p.ValuePackQty,
        MultipleQuantity: p.MultipleQuantity
      },
      imported_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }

  console.log(`===========================================================`);
  console.log(` Pripravených položiek na staging zápis: ${stagingRows.length}`);
  console.log(` S oficiálnou fotkou z eD CDN: ${stagingRows.filter(r => r.image_url).length}`);
  console.log(`===========================================================\n`);

  // 4. Zápis do Supabase staging tabuľky po dávkach
  console.log('4. Zapisujem všetky produkty do tabuľky staging_products (dávky po 200)...');
  const batchSize = 200;
  let saved = 0;

  for (let i = 0; i < stagingRows.length; i += batchSize) {
    const batch = stagingRows.slice(i, i + batchSize);
    const success = await sendStagingBatchWithRetry(batch);
    if (success) {
      saved += batch.length;
      if (saved % 2000 === 0 || saved >= stagingRows.length) {
        console.log(`  ✓ Uložených ${saved}/${stagingRows.length} položiek do staging_products...`);
      }
    }
    await new Promise(r => setTimeout(r, 30));
  }

  console.log('\n===========================================================');
  console.log(` 🎉 ÚSPECH! CELKOVO ULOŽENÝCH ${saved} PÔVODNÝCH POLOŽIEK DO STAGING TABUĽKY!`);
  console.log('===========================================================\n');
}

if (process.argv[1]?.endsWith('import-staging.ts') || process.argv[1]?.endsWith('import-staging.js') || process.argv[1]?.endsWith('import-staging.mjs')) {
  runStagingImport().catch(console.error);
}
