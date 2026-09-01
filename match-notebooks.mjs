import fs from 'node:fs';
import path from 'node:path';
import { XMLParser } from 'fast-xml-parser';

async function matchStockAndPhysicalLaptops() {
  console.log('===========================================================');
  console.log(' SPÁJANIE ŽIVÝCH NOTEBOOKOV SO SKLADOVÝMI ZÁSOBAMI A CENAMI');
  console.log('===========================================================\n');

  const stockXmlUrl = 'https://private-ws-sk.elinkx.biz/download/productCatalogueStock_1fbdf826-994f-4019-bae3-cfb146593ad1.xml';
  console.log(`1. Sťahujem skladové zásoby z eD (${stockXmlUrl})...`);
  const res = await fetch(stockXmlUrl);
  const stockXmlText = await res.text();
  console.log(`   ✓ Skladový XML feed načítaný (${(stockXmlText.length / 1024 / 1024).toFixed(2)} MB textu)\n`);

  console.log('2. Parsujem skladové položky <ProductShort>...');
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    parseTagValue: true,
    trimValues: true,
    processEntities: false,
  });

  const stockBlocks = stockXmlText.match(/<ProductShort>[\s\S]*?<\/ProductShort>/g) || [];
  console.log(`   ✓ Celkový počet skladových záznamov v eD: ${stockBlocks.length}`);

  const stockMap = new Map();
  for (const block of stockBlocks) {
    const parsed = parser.parse(block);
    const item = parsed.ProductShort;
    if (item && (item.Code || item.ProId || item.PartNumber)) {
      const stockCount = parseFloat(item.OnStockCount || '0');
      const data = {
        proId: item.ProId ? String(item.ProId) : undefined,
        code: item.Code ? String(item.Code) : undefined,
        partNumber: item.PartNumber ? String(item.PartNumber) : undefined,
        yourPrice: parseFloat(item.YourPrice || '0'),
        yourPriceWithFees: parseFloat(item.YourPriceWithFees || item.YourPrice || '0'),
        garbageFee: parseFloat(item.GarbageFee || '0'),
        authorFee: parseFloat(item.AuthorFee || '0'),
        stockCount,
        isInStock: stockCount > 0,
      };

      if (data.code) stockMap.set(data.code, data);
      if (data.proId) stockMap.set(data.proId, data);
      if (data.partNumber) stockMap.set(data.partNumber, data);
    }
  }

  // 2. Načítame extrahované notebooky
  const rawNotebooks = JSON.parse(fs.readFileSync('downloads/extracted_live_notebooks.json', 'utf8'));

  // Filtrujeme SKUTOČNÝ HARDVÉR (vylúčime CarePack, rozšírenia záruk a licencie)
  const physicalLaptops = rawNotebooks.filter(n => {
    const name = n.name.toLowerCase();
    const isService = name.includes('carepack') || name.includes('care pack') || name.includes('rozšírenie záruky') ||
                      name.includes('service pack') || name.includes('licencia') || name.includes('predĺženie záruky');
    return !isService;
  });

  console.log(`\n3. Počet fyzických hardvérových notebookov v katalógu: ${physicalLaptops.length}`);

  // Priradíme sklad a cenu
  const activeLaptops = [];
  for (const lap of physicalLaptops) {
    const stockInfo = stockMap.get(String(lap.code)) || stockMap.get(String(lap.proId)) || stockMap.get(String(lap.mpn));
    
    const cost = stockInfo ? stockInfo.yourPriceWithFees : lap.rawCost;
    const stockCount = stockInfo ? stockInfo.stockCount : lap.stockCount;
    const isStock = stockInfo ? stockInfo.isInStock : (stockCount > 0);
    const sncFee = stockInfo ? stockInfo.garbageFee : 0.90;
    const aoFee = stockInfo ? stockInfo.authorFee : 6.04;

    if (cost > 100) { // reálne notebooky s cenou nad 100 EUR
      const marginPct = 12; // 12% marža
      const basePrice = Number((cost * (1 + marginPct / 100)).toFixed(2));
      const finalPriceWithVat = Number((basePrice * 1.20).toFixed(2));

      activeLaptops.push({
        id: `ed-${lap.code}`,
        supplierCode: String(lap.code),
        sku: String(lap.code),
        mpn: lap.mpn,
        ean: lap.ean,
        brand: lap.brand !== 'Neznámy' ? lap.brand : (lap.name.split(' ')[0] || 'ASUS'),
        title: lap.name,
        slug: `${lap.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${lap.code}`,
        shortDescription: lap.description || `${lap.name} - oficiálna distribúcia eD system`,
        supplierDescription: lap.description,
        pricing: {
          supplierCost: cost,
          supplierFees: { garbageFee: sncFee, authorFee: aoFee },
          totalCostWithFees: cost,
          vatRate: 20,
          marginPercentage: marginPct,
          basePrice,
          finalPrice: finalPriceWithVat,
          currency: 'EUR'
        },
        stockCount,
        isInStock: isStock,
        stockText: isStock ? `Skladom > ${stockCount} ks` : 'U dodávateľa',
        warrantyMonths: lap.warrantyMonths || 24,
        categorySlug: 'notebooky',
        status: isStock ? 'ACTIVE' : 'OUT_OF_STOCK',
        reviewStatus: 'AUTO_APPROVED',
        qualityScore: { total: 85, breakdown: {} },
        dataHash: `hash_${lap.code}_${cost}_${stockCount}`
      });
    }
  }

  console.log(`\n===========================================================`);
  console.log(` 🎉 VÝSLEDOK: ${activeLaptops.length} SKUTOČNÝCH NOTEBOOKOV S CENAMI`);
  console.log(` Skladom priamo v eD centrále: ${activeLaptops.filter(l => l.isInStock).length} modelov`);
  console.log(`===========================================================\n`);

  console.log('Ukážka TOP 15 skladových notebookov pripravených na e-shope:');
  console.log('-----------------------------------------------------------');
  
  const inStockLaptops = activeLaptops.filter(l => l.isInStock).slice(0, 15);
  inStockLaptops.forEach((l, idx) => {
    console.log(`[${idx + 1}] ${l.title}`);
    console.log(`    Kód: ${l.sku} | Značka: ${l.brand} | PartNumber: ${l.mpn} | EAN: ${l.ean || 'N/A'}`);
    console.log(`    Nákup eD: ${l.pricing.supplierCost} € -> Predaj s DPH (20%): ${l.pricing.finalPrice} € | Skladom: ${l.stockCount} ks`);
    console.log('-----------------------------------------------------------');
  });

  fs.writeFileSync('downloads/final_active_notebooks.json', JSON.stringify(activeLaptops, null, 2), 'utf8');
  console.log(`\n✓ Uložených ${activeLaptops.length} modelov do downloads/final_active_notebooks.json`);
}

matchStockAndPhysicalLaptops().catch(console.error);
