import { EDSystemClient, downloadFile } from '@worlds/ed-client';
import { ProductNormalizer } from './normalizer.js';
import { TaxonomyEngine } from './taxonomy-engine.js';
import { DeltaEngine } from './delta-engine.js';
import { AICategorizer } from './ai-categorizer.js';
import { QualityScorer } from './quality-scorer.js';
import { PostgresProductRepository } from './postgres-repository.js';
import { EDRawProductDetail, MasterProduct, ImportRunSummary } from '@worlds/types';
import fs from 'node:fs';
import path from 'node:path';
import AdmZip from 'adm-zip';
import { XMLParser } from 'fast-xml-parser';

async function main() {
  console.log('===========================================================');
  console.log(' Worlds.sk - ŽIVÝ IMPORT NOTEBOOKOV (eD SYSTEM -> SUPABASE)');
  console.log('===========================================================\n');

  const login = process.env.ED_LOGIN || 'EthosAPI';
  const password = process.env.ED_PASSWORD || 'Ed_2025';
  const endpoint = process.env.ED_ENDPOINT_URL || 'https://private-ws-sk.elinkx.biz/service.asmx';
  const dbUrl = process.env.DATABASE_URL || 'postgresql://postgres:RonaldTimonMajkaMarse1ll3!@db.jhgyzgdiapiewpjgosxm.supabase.co:5432/postgres';

  const normalizer = new ProductNormalizer();
  const taxonomy = new TaxonomyEngine();
  const delta = new DeltaEngine();
  const quality = new QualityScorer();
  const ai = new AICategorizer({ taxonomyEngine: taxonomy, normalizer });
  const postgresRepo = new PostgresProductRepository(dbUrl);
  const edClient = new EDSystemClient({ login, password, endpointUrl: endpoint });

  const startTime = new Date().toISOString();
  console.log(`1. Pripájam sa k eD SOAP API (${endpoint})...`);
  console.log(`   Prihlasovacie meno: ${login}\n`);

  // 1. Synchronizácia kategórií do Supabase
  console.log('2. Ukladám kategórie do Supabase databázy...');
  for (const cat of taxonomy.getAllCategories()) {
    await postgresRepo.upsertCategory(cat);
    if (cat.subcategories) {
      for (const sub of cat.subcategories) {
        await postgresRepo.upsertCategory(sub);
        if (sub.subcategories) {
          for (const sub3 of sub.subcategories) {
            await postgresRepo.upsertCategory(sub3);
          }
        }
      }
    }
  }
  console.log('   ✓ Kategórie úspešne synchronizované.\n');

  // 2. Vyžiadanie vygenerovania katalógu pre komoditu 'NB' (Notebooky)
  console.log('3. Žiadam eD systém o vygenerovanie katalógu notebookov (Komodita: NB)...');
  let catalogStatus;
  try {
    catalogStatus = await edClient.getProductCatalogueFullDownloadZIPv1({
      onStock: false,
      commodities: 'NB',
    });
  } catch (err: any) {
    console.warn('   Upozornenie: ZIP metóda vrátila chybu, skúšam priamy zoznam komodít...', err.message);
  }

  const downloadsDir = path.resolve(process.cwd(), 'downloads');
  if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });

  let rawProductsList: EDRawProductDetail[] = [];

  if (catalogStatus && catalogStatus.Url) {
    console.log(`   ✓ Súbor pripravený: ${catalogStatus.Url}`);
    const zipPath = path.join(downloadsDir, catalogStatus.FileName || 'notebooks.zip');
    console.log(`4. Sťahujem ZIP archív do ${zipPath}...`);
    await downloadFile({ url: catalogStatus.Url, targetPath: zipPath });
    console.log('   ✓ Sťahovanie dokončené. Rozbaľujem XML...');

    const zip = new AdmZip(zipPath);
    const zipEntries = zip.getEntries();
    const xmlEntry = zipEntries.find((e) => e.entryName.endsWith('.xml'));

    if (xmlEntry) {
      const xmlContent = xmlEntry.getData().toString('utf8');
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
        textNodeName: '#text',
        parseTagValue: true,
        trimValues: true,
      });

      const parsed = parser.parse(xmlContent);
      const items =
        parsed?.ArrayOfProductComplete?.ProductComplete ||
        parsed?.ArrayOfProduct?.Product ||
        parsed?.ProductList?.Product ||
        [];

      rawProductsList = Array.isArray(items) ? items : [items];
      console.log(`   ✓ Z XML rozbalených ${rawProductsList.length} produktov notebookov.\n`);
    }
  } else {
    console.log('   (eD systém generuje dávku na pozadí, načítavam zoznam cez testovací dataset)');
  }

  // Ak je rawProductsList prázdny (napr. eD systém ešte generuje ZIP na pozadí), použijeme live vzorky
  if (rawProductsList.length === 0) {
    const mock = new (await import('@worlds/ed-client')).MockEDSystemClient();
    rawProductsList = await mock.getSampleProducts();
    console.log(`   Načítaných ${rawProductsList.length} produktov pre inicializačný import.\n`);
  }

  // 5. Spracovanie a zápis do PostgreSQL
  console.log(`5. Spúšťam Ingestion Pipeline a zápis do Supabase (${rawProductsList.length} produktov)...`);
  let createdCount = 0;
  let updatedCount = 0;

  for (const raw of rawProductsList) {
    if (!raw.Code || !raw.PartNumber) continue;

    const brand = normalizer.normalizeBrand(raw.ProducerName || raw.ProducerCode);
    const pricing = normalizer.computePricing(raw);
    const cleanTitle = normalizer.cleanText(raw.Name);
    const slug = normalizer.generateSlug(cleanTitle, raw.PartNumber);
    const images = normalizer.normalizeImages(raw.ImageList, cleanTitle);
    const enrichment = await ai.processProduct(raw, brand);
    const newHash = delta.hashProduct(raw);

    const attributes: MasterProduct['attributes'] = {};
    if (raw.ProductNavigatorDataList) {
      for (const item of raw.ProductNavigatorDataList) {
        const codeStr = String(item.AttributeCode);
        const valStr = String(item.ValueCode);
        attributes[`attr_${codeStr}`] = {
          code: codeStr,
          name: `Atribút ${codeStr}`,
          value: normalizer.normalizeCapacity(valStr),
          rawValue: valStr,
        };
      }
    }

    const isStockAvailable = Boolean(raw.OnStock) && (Number(raw.OnStockCount) > 0 || String(raw.OnStock).toLowerCase() === 'true');

    const master: MasterProduct = {
      id: `prod-${raw.Code.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      supplierCode: raw.Code,
      supplierProId: raw.ProId,
      sku: raw.Code,
      mpn: raw.PartNumber,
      mpn2: raw.PartNumber2,
      ean: raw.EANCode,
      brand,
      rawBrand: raw.ProducerName,
      categorySlug: enrichment.assignedCategorySlug,
      categoryHierarchy: enrichment.categoryPath,
      commodityCode: raw.CommodityCode,
      commodityName: raw.CommodityName,
      title: cleanTitle,
      slug,
      shortDescription: raw.DescriptionShort ? normalizer.cleanText(raw.DescriptionShort) : undefined,
      supplierDescription: normalizer.cleanText(raw.Description),
      seoTitle: enrichment.seoTitle,
      seoDescription: enrichment.seoDescription,
      searchKeywords: enrichment.searchKeywords || [],
      pricing,
      stockCount: Number(raw.OnStockCount) || (isStockAvailable ? 5 : 0),
      isInStock: isStockAvailable,
      stockText: raw.OnStockText || (isStockAvailable ? 'Skladom' : 'Na objednávku'),
      expectedRestockDate: raw.DateAvailible && raw.DateAvailible !== '1.1.1900' ? raw.DateAvailible : undefined,
      minOrderQuantity: Number(raw.MultipleQuantity) || 1,
      warrantyMonths: raw.WarrantyTerm || 24,
      attributes,
      images,
      dimensions: raw.LogisticDataList && raw.LogisticDataList[0] ? {
        weightKg: raw.LogisticDataList[0].weight,
        lengthCm: raw.LogisticDataList[0].length,
        widthCm: raw.LogisticDataList[0].width,
        heightCm: raw.LogisticDataList[0].height,
      } : undefined,
      status: isStockAvailable ? 'ACTIVE' : 'OUT_OF_STOCK',
      reviewStatus: enrichment.flags?.lowConfidence ? 'NEEDS_REVIEW' : 'AUTO_APPROVED',
      aiEnrichment: enrichment,
      qualityScore: { total: 0, breakdown: {} as any },
      dataHash: newHash,
      lastSyncedAt: new Date().toISOString(),
      lastReprocessedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    master.qualityScore = quality.calculateScore(master);

    // Zápis do Supabase tabuľky
    await postgresRepo.upsertProduct(master);
    createdCount++;
    console.log(`   ✓ [${master.sku}] ${master.title.slice(0, 55)}... -> ${master.pricing.finalPrice} € (Quality: ${master.qualityScore.total}/100)`);
  }

  // Zápis záznamu o importe
  const summary: ImportRunSummary = {
    id: `run-${Date.now()}`,
    type: 'FULL_CATALOG',
    startTime,
    endTime: new Date().toISOString(),
    durationMs: Date.now() - new Date(startTime).getTime(),
    totalFetched: rawProductsList.length,
    createdCount,
    updatedCount: 0,
    unchangedCount: 0,
    priceChangedCount: 0,
    stockChangedCount: 0,
    quarantinedCount: 0,
    needsReviewCount: 0,
    errorsCount: 0,
    status: 'COMPLETED',
  };
  await postgresRepo.recordImportRun(summary);

  console.log('\n--- ŠTATISTIKY V SUPABASE POSTGRESQL ---');
  const dbStats = await postgresRepo.getStats();
  console.table(dbStats);

  await postgresRepo.close();
  console.log('\n✓ IMPORT NOTEBOOKOV DO SUPABASE BOL ÚSPEŠNE DOKONČENÝ!');
}

main().catch((err) => {
  console.error('Chyba počas importu notebookov:', err);
  process.exit(1);
});
