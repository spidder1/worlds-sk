import fs from 'node:fs';
import path from 'node:path';
import AdmZip from 'adm-zip';
import { XMLParser } from 'fast-xml-parser';

async function analyzeAllCategoriesAndImages() {
  console.log('===========================================================');
  console.log(' ANALÝZA VŠETKÝCH KATEGÓRIÍ A OBRÁZKOV Z eD XML');
  console.log('===========================================================\n');

  const zipPath = path.resolve('downloads', 'productCatalogue_main.zip');
  const zip = new AdmZip(zipPath);
  const xmlEntry = zip.getEntries().find(e => e.entryName.endsWith('.xml'));
  const xmlContent = xmlEntry.getData().toString('utf8');

  console.log('Parsujem skladové zásoby...');
  const stockFeedText = fs.readFileSync(path.resolve('downloads', 'productCatalogueStock_1fbdf826-994f-4019-bae3-cfb146593ad1.xml'), 'utf8');

  const stockBlocks = stockFeedText.match(/<ProductShort>[\s\S]*?<\/ProductShort>/g) || [];
  const stockMap = new Map();
  for (const block of stockBlocks) {
    const codeMatch = block.match(/<Code>(.*?)<\/Code>/);
    const proIdMatch = block.match(/<ProId>(.*?)<\/ProId>/);
    const pnMatch = block.match(/<PartNumber>(.*?)<\/PartNumber>/);
    const priceMatch = block.match(/<YourPriceWithFees>(.*?)<\/YourPriceWithFees>/) || block.match(/<YourPrice>(.*?)<\/YourPrice>/);
    const stockMatch = block.match(/<OnStockCount>(.*?)<\/OnStockCount>/);
    const garbageMatch = block.match(/<GarbageFee>(.*?)<\/GarbageFee>/);
    const authorMatch = block.match(/<AuthorFee>(.*?)<\/AuthorFee>/);

    const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
    const stockCount = stockMatch ? parseFloat(stockMatch[1]) : 0;
    const garbageFee = garbageMatch ? parseFloat(garbageMatch[1]) : 0.40;
    const authorFee = authorMatch ? parseFloat(authorMatch[1]) : 1.00;

    const data = { price, stockCount, garbageFee, authorFee, isInStock: stockCount > 0 };
    if (codeMatch) stockMap.set(codeMatch[1], data);
    if (proIdMatch) stockMap.set(proIdMatch[1], data);
    if (pnMatch) stockMap.set(pnMatch[1], data);
  }

  console.log(`✓ Skladová mapa pripravená: ${stockMap.size} položiek`);

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    parseTagValue: true,
    trimValues: true,
    processEntities: false,
  });

  console.log('Parsujem všetky produkty z 405 MB XML...');
  const productBlocks = xmlContent.match(/<Product>[\s\S]*?<\/Product>/g) || [];
  console.log(`✓ Celkovo nájdených ${productBlocks.length} produktov v XML.\n`);

  const categoryCounts = new Map();
  let withImagesCount = 0;
  let activeInStockCount = 0;
  const sampleProducts = [];

  for (const block of productBlocks) {
    const parsed = parser.parse(block);
    const p = parsed.Product;
    if (!p) continue;

    const name = String(p.Name || p.ProductName || '').trim();
    if (!name) continue;

    const code = String(p.Code || p.ProId);
    const stockInfo = stockMap.get(code) || stockMap.get(String(p.PartNumber));
    const cost = stockInfo ? stockInfo.price : Number(p.YourPriceWithFees || p.YourPrice || 0);
    const stockCount = stockInfo ? stockInfo.stockCount : 0;
    const isInStock = stockInfo ? stockInfo.isInStock : false;

    // Obrázok z XML
    let imageUrl = p.ImageUrl && String(p.ImageUrl).trim().length > 5 ? String(p.ImageUrl).trim() : null;
    if (imageUrl) withImagesCount++;

    const comName = String(p.CommodityName || p.CommodityCode || 'Iné');
    categoryCounts.set(comName, (categoryCounts.get(comName) || 0) + 1);

    if (cost > 5 && isInStock) {
      activeInStockCount++;
      if (sampleProducts.length < 20 && imageUrl) {
        sampleProducts.push({
          code,
          name,
          comName,
          cost,
          imageUrl,
          stockCount
        });
      }
    }
  }

  console.log('===========================================================');
  console.log(` Produkty s reálnou fotkou z eD CDN: ${withImagesCount}`);
  console.log(` Aktívne produkty skladom s cenou: ${activeInStockCount}`);
  console.log('===========================================================\n');

  console.log('Ukážka 10 produktov s priamymi fotkami z eD XML:');
  console.log('-----------------------------------------------------------');
  sampleProducts.slice(0, 10).forEach((p, idx) => {
    console.log(`[${idx + 1}] ${p.name}`);
    console.log(`    Kategória: ${p.comName} | Nákup: ${p.cost} € | Sklad: ${p.stockCount} ks`);
    console.log(`    📷 Foto URL: ${p.imageUrl}`);
    console.log('-----------------------------------------------------------');
  });
}

analyzeAllCategoriesAndImages().catch(console.error);
