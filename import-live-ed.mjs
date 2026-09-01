import fs from 'node:fs';
import path from 'node:path';
import AdmZip from 'adm-zip';
import { XMLParser } from 'fast-xml-parser';

async function processLiveEdCatalog() {
  console.log('===========================================================');
  console.log(' Worlds.sk - ŽIVÝ STREAMING IMPORT DÁT Z eD SYSTEM');
  console.log('===========================================================\n');

  const downloadsDir = path.resolve(process.cwd(), 'downloads');
  const zipPath = path.join(downloadsDir, 'productCatalogue_main.zip');

  console.log('1. Rozbaľujem 405 MB XML katalóg z eD archívu...');
  const zip = new AdmZip(zipPath);
  const entries = zip.getEntries();
  const xmlEntry = entries.find(e => e.entryName.endsWith('.xml'));

  if (!xmlEntry) {
    console.error('Nenašiel sa XML súbor v archíve!');
    return;
  }

  const xmlContent = xmlEntry.getData().toString('utf8');
  console.log(`   ✓ XML načítané do pamäte (${(xmlContent.length / 1024 / 1024).toFixed(2)} MB)\n`);

  console.log('2. Streamujem a parsujem jednotlivé produkty...');
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    parseTagValue: true,
    trimValues: true,
    processEntities: false,
  });

  // Nájdeme všetky bloky <Product> ... </Product> alebo <ProductComplete> ... </ProductComplete>
  const productBlocks = xmlContent.match(/<(Product|ProductComplete)[\s\S]*?<\/(Product|ProductComplete)>/g) || [];
  console.log(`   ✓ Celkový počet produktov v XML: ${productBlocks.length}\n`);

  const notebooks = [];
  let totalProcessed = 0;

  for (const block of productBlocks) {
    totalProcessed++;
    const parsed = parser.parse(block);
    const p = parsed.Product || parsed.ProductComplete;
    if (!p) continue;

    const name = String(p.Name || p.ProductName || '');
    const nameLower = name.toLowerCase();
    const com = String(p.CommodityName || p.CommodityCode || '').toLowerCase();
    const cat = String(p.CategoryName || p.CategoryCode || '').toLowerCase();

    const isNotebook = (
      com.includes('notebook') || com.includes('laptop') || com === 'nb' ||
      cat.includes('notebook') || cat.includes('laptop') ||
      nameLower.includes('notebook') || nameLower.includes('laptop') || nameLower.includes('thinkpad') ||
      nameLower.includes('expertbook') || nameLower.includes('zenbook') || nameLower.includes('macbook') ||
      nameLower.includes('vivobook') || nameLower.includes('latitude') || nameLower.includes('inspiron') ||
      nameLower.includes('ideapad') || nameLower.includes('legion') || nameLower.includes('predator') ||
      nameLower.includes('nitro') || nameLower.includes('omen') || nameLower.includes('pavilion') ||
      nameLower.includes('victus') || nameLower.includes('probook') || nameLower.includes('elitebook') ||
      nameLower.includes('yoga') || nameLower.includes('swift') || nameLower.includes('aspire')
    );

    if (isNotebook) {
      const rawCost = Number(p.YourPriceWithFees || p.Price || p.YourPrice || 0);
      const margin = 0.15; // 15% marža
      const finalPrice = Number(((rawCost * (1 + margin)) * 1.20).toFixed(2));
      const onStock = Boolean(p.OnStock) && (Number(p.OnStockCount) > 0 || String(p.OnStock).toLowerCase() === 'true');

      notebooks.push({
        code: p.Code || p.ProId,
        proId: p.ProId,
        mpn: p.PartNumber || p.PartNumber2 || p.Code,
        ean: p.EANCode || p.EAN,
        brand: p.ProducerName || p.ProducerCode || 'Neznámy',
        name: name.replace(/&amp;/g, '&').replace(/&quot;/g, '"'),
        rawCost,
        finalPrice,
        onStock,
        stockCount: Number(p.OnStockCount) || (onStock ? 5 : 0),
        warrantyMonths: Number(p.WarrantyTerm) || 24,
        description: p.DescriptionShort || p.Description || '',
        category: p.CategoryName || 'Notebooky',
        commodity: p.CommodityName || 'Notebooky'
      });
    }
  }

  console.log('===========================================================');
  console.log(` 🎉 ÚSPECH! CELKOVÝ POČET EXTRAHOVANÝCH NOTEBOOKOV: ${notebooks.length}`);
  console.log('===========================================================\n');

  console.log('Ukážka prvých 15 skutočných notebookov priamo z eD distribúcie:');
  console.log('-----------------------------------------------------------');
  notebooks.slice(0, 15).forEach((n, idx) => {
    console.log(`[${idx + 1}] Kód: ${n.code} | Značka: ${n.brand} | MPN: ${n.mpn} | EAN: ${n.ean || 'N/A'}`);
    console.log(`    Názov: ${n.name}`);
    console.log(`    Nákup eD: ${n.rawCost} € | Predaj s DPH: ${n.finalPrice} € | Sklad: ${n.onStock ? `Skladom (${n.stockCount} ks)` : 'Na objednávku'}`);
    console.log('-----------------------------------------------------------');
  });

  // Uložíme výsledky
  fs.writeFileSync('downloads/extracted_live_notebooks.json', JSON.stringify(notebooks, null, 2), 'utf8');
  console.log(`\n✓ Všetkých ${notebooks.length} živých notebookov uložených do: downloads/extracted_live_notebooks.json`);
}

processLiveEdCatalog().catch(console.error);
