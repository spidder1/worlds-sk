import fs from 'node:fs';
import path from 'node:path';
import AdmZip from 'adm-zip';
import { XMLParser } from 'fast-xml-parser';
import pg from 'pg';
import slugify from 'slugify';
import { EDSystemClient } from '@worlds/ed-client';
import { classifyProductIndependently } from './taxonomy-definition.js';
import { sanitizeAndFormatHtml } from './html-sanitizer.js';
import { WORLDS_IT_CATEGORIES } from './taxonomy-definition.js';
import { TaxonomyCategory } from '@worlds/types';
import { assessCatalogScope } from './catalog-scope.js';

const { Pool } = pg;

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

const rawConnectionString = requiredEnv('DATABASE_URL');
const connectionUrl = new URL(rawConnectionString);
connectionUrl.searchParams.delete('sslmode');
const connectionString = connectionUrl.toString();

function configuredTargetBrands(): Set<string> {
  return new Set(
    (process.env.ED_SAMPLE_BRANDS || 'ASUS,Lenovo')
      .split(',')
      .map((brand) => brand.trim().toUpperCase())
      .filter(Boolean),
  );
}

function configuredMinimumCostEur(): number {
  const raw = process.env.ED_MIN_COST_EUR?.trim();
  if (!raw) return 0;
  const value = Number(raw.replace(',', '.'));
  if (!Number.isFinite(value) || value < 0) throw new Error('ED_MIN_COST_EUR musí byť nezáporné číslo.');
  return value;
}

function targetBrandsLabel(): string {
  if (process.env.ED_STOCK_ONLY === 'true') return 'SKLAD & CENY';
  const configured = [...configuredTargetBrands()];
  return configured.includes('ALL') ? 'VŠETKY ZNAČKY' : configured.join(' & ');
}

function isTargetBrand(name: string, rawBrand: string | undefined, targetBrands: Set<string>): { isMatch: boolean; brandName: string | null } {
  const b = (rawBrand || '').toUpperCase().trim();
  const title = name.toUpperCase();

  if (targetBrands.has('ALL')) {
    const inferred = (rawBrand || name.split(/\s+/)[0] || '').trim();
    return inferred ? { isMatch: true, brandName: inferred.slice(0, 120) } : { isMatch: false, brandName: null };
  }

  if (
    b === 'ASUS' ||
    b.includes('ASUSTEK') ||
    title.startsWith('ASUS') ||
    title.includes('ASUS ') ||
    title.includes(' ROG ') ||
    title.includes(' TUF ') ||
    title.includes('ZENBOOK')
  ) {
    return targetBrands.has('ALL') || targetBrands.has('ASUS') ? { isMatch: true, brandName: 'ASUS' } : { isMatch: false, brandName: null };
  }

  if (
    b === 'LENOVO' ||
    title.startsWith('LENOVO') ||
    title.includes('LENOVO ') ||
    title.includes('THINKPAD') ||
    title.includes('IDEAPAD') ||
    title.includes('LEGION')
  ) {
    return targetBrands.has('ALL') || targetBrands.has('LENOVO') ? { isMatch: true, brandName: 'Lenovo' } : { isMatch: false, brandName: null };
  }

  return { isMatch: false, brandName: null };
}

function getCategoryPlaceholderImage(catSlug: string): string {
  if (catSlug.includes('notebook') || catSlug.includes('ultrabook')) {
    return 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80';
  }
  if (catSlug.includes('pocitac') || catSlug.includes('server') || catSlug.includes('mini-pc')) {
    return 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&q=80';
  }
  if (catSlug.includes('monitor') || catSlug.includes('displej')) {
    return 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80';
  }
  if (catSlug.includes('grafick') || catSlug.includes('procesor') || catSlug.includes('ram') || catSlug.includes('komponent') || catSlug.includes('dosk')) {
    return 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80';
  }
  if (catSlug.includes('klavesnic') || catSlug.includes('mys') || catSlug.includes('perifer')) {
    return 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80';
  }
  return 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80';
}

function safeSlug(title: string, code: string): string {
  const titleSlug = slugify(title, { lower: true, strict: true, locale: 'sk', trim: true }).slice(0, 80);
  return `${titleSlug || 'produkt'}-${code.toLowerCase()}`;
}

type StoredCategoryRule = { target_category_slug: string; match_expression: Record<string, unknown>; priority: number };
type StoredCategoryMapping = { supplier_category_code: string | null; supplier_commodity_code: string | null; canonical_category_slug: string };

function flattenTaxonomy(categories: TaxonomyCategory[], parentPath: string[] = []): Map<string, string[]> {
  const result = new Map<string, string[]>();
  for (const category of categories) {
    const path = [...parentPath, category.name];
    result.set(category.slug, path);
    for (const [slug, hierarchy] of flattenTaxonomy(category.subcategories || [], path)) {
      result.set(slug, hierarchy);
    }
  }
  return result;
}

async function loadClassificationConfig(pool: pg.Pool): Promise<{ rules: StoredCategoryRule[]; mappings: StoredCategoryMapping[] }> {
  try {
    const [rules, mappings] = await Promise.all([
      pool.query<StoredCategoryRule>(
        `SELECT target_category_slug, match_expression, priority
           FROM category_rules WHERE active = true ORDER BY priority ASC, id ASC`,
      ),
      pool.query<StoredCategoryMapping>(
        `SELECT supplier_category_code, supplier_commodity_code, canonical_category_slug
           FROM category_mappings WHERE active = true ORDER BY priority ASC, id ASC`,
      ),
    ]);
    return { rules: rules.rows, mappings: mappings.rows };
  } catch (error) {
    console.warn('⚠️ Pravidlá kategorizácie nie sú dostupné; používam lokálny klasifikátor.', error instanceof Error ? error.message : error);
    return { rules: [], mappings: [] };
  }
}

function classifyWithStoredRules(
  product: any,
  config: { rules: StoredCategoryRule[]; mappings: StoredCategoryMapping[] },
): { slug: string; hierarchy: string[]; source: string; confidence: number; reasoning: string } {
  const paths = flattenTaxonomy(WORLDS_IT_CATEGORIES);
  const title = String(product.Name || product.ProductName || '').toLowerCase();
  const description = String(product.Description || product.DescriptionShort || '').toLowerCase();
  const fullText = `${title} ${description}`;

  for (const rule of config.rules) {
    const terms = Array.isArray(rule.match_expression?.title_any)
      ? rule.match_expression.title_any.map((term) => String(term).toLowerCase())
      : [];
    const notebookContext = /\b(notebook|laptop|ntb)\b|notebooky|notebooku/i.test(fullText);
    if (
      ['herne-notebooky', 'firemne-notebooky', 'ultrabooky', '2v1-a-dotykove-notebooky'].includes(rule.target_category_slug) &&
      !notebookContext
    ) continue;
    if (terms.some((term) => term && fullText.includes(term))) {
      return {
        slug: rule.target_category_slug,
        hierarchy: paths.get(rule.target_category_slug) || [rule.target_category_slug],
        source: 'CATEGORY_RULE', confidence: 0.97,
        reasoning: `Stored rule matched one of: ${terms.join(', ')}`,
      };
    }
  }

  const categoryCode = String(product.CategoryCode || '').trim();
  const commodityCode = String(product.CommodityCode || '').trim().toUpperCase();
  const mapping = config.mappings.find((item) =>
    (categoryCode && item.supplier_category_code === categoryCode) ||
    (commodityCode && item.supplier_commodity_code?.toUpperCase() === commodityCode),
  );
  if (mapping) {
    return {
      slug: mapping.canonical_category_slug,
      hierarchy: paths.get(mapping.canonical_category_slug) || [mapping.canonical_category_slug],
      source: 'SUPPLIER_MAPPING', confidence: 0.9,
      reasoning: `Supplier category ${categoryCode || 'n/a'} / commodity ${commodityCode || 'n/a'}`,
    };
  }

  const fallback = classifyProductIndependently({
    title: String(product.Name || product.ProductName || ''),
    mpn: String(product.PartNumber || product.PartNumber2 || ''),
    ean: String(product.EANCode || product.EAN || ''),
    description: product.Description || '',
    descriptionShort: product.DescriptionShort || '',
    producerName: product.ProducerName || product.ProducerCode || '',
  });
  return { ...fallback, source: 'HEURISTIC', confidence: 0.75, reasoning: 'Local product title and description heuristic' };
}

function extractImageUrls(p: any): string[] {
  const urls: string[] = [];

  const addUrl = (raw: any) => {
    if (!raw) return;
    if (Array.isArray(raw)) {
      raw.forEach(addUrl);
      return;
    }
    let u = typeof raw === 'object' ? String(raw.URL || raw.Url || raw['#text'] || '') : String(raw);
    u = u.trim();
    if (!u || u.length < 5) return;

    if (!u.startsWith('http')) {
      u = `https://www.edsystem.sk/${u.replace(/^\//, '')}`;
    } else if (u.startsWith('http://')) {
      u = u.replace(/^http:\/\//i, 'https://');
    }

    // Replace eD thumbnail suffixes with original full-res image names.
    u = u.replace(/_(?:3|8)(?=\.[a-z0-9]+(?:\?|$))/i, '');

    if (!urls.includes(u)) {
      urls.push(u);
    }
  };

  // Direct ImageUrl / ImgUrl
  addUrl(p.ImageUrl);
  addUrl(p.ImgUrl);
  addUrl(p.ProductImage);
  addUrl(p.Images);

  // ImageList structure
  if (p.ImageList) {
    const list = p.ImageList.ProductImage || p.ImageList.Image || p.ImageList;
    if (Array.isArray(list)) {
      for (const item of list) {
        addUrl(item);
      }
    } else {
      addUrl(list);
    }
  }

  return urls;
}

async function syncCategoriesAndManufacturers(pool: pg.Pool) {
  console.log('📌 Synchronizujem kategórie a výrobcov do Neon PostgreSQL...');

  const manufacturers = [
    { id: 'manuf-asus', name: 'ASUS', slug: 'asus' },
    { id: 'manuf-lenovo', name: 'Lenovo', slug: 'lenovo' },
  ];

  for (const m of manufacturers) {
    await pool.query(
      `INSERT INTO manufacturers (id, name, slug) VALUES ($1, $2, $3)
       ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name`,
      [m.id, m.name, m.slug]
    );
  }

  async function insertCategoryNode(cat: TaxonomyCategory, parentSlug?: string) {
    await pool.query(
      `INSERT INTO categories (id, slug, name, parent_slug, level, display_order)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (slug) DO UPDATE SET
         name = EXCLUDED.name,
         parent_slug = EXCLUDED.parent_slug,
         level = EXCLUDED.level,
         display_order = EXCLUDED.display_order`,
      [cat.id, cat.slug, cat.name, parentSlug || null, cat.level, cat.displayOrder]
    );

    if (cat.subcategories && cat.subcategories.length > 0) {
      for (const sub of cat.subcategories) {
        await insertCategoryNode(sub, cat.slug);
      }
    }
  }

  for (const cat of WORLDS_IT_CATEGORIES) {
    await insertCategoryNode(cat);
  }

  console.log('✅ Kategórie a výrobcovia úspešne zapísaní.');
}

async function syncProductMedia(pool: pg.Pool, products: any[]): Promise<void> {
  const productIds = products.map((product) => String(product.id));
  if (productIds.length === 0) return;
  await pool.query('DELETE FROM product_media WHERE product_id = ANY($1::text[])', [productIds]);

  const mediaRows: Array<[string, string, string, string, number, boolean, string]> = [];
  for (const product of products) {
    const images = Array.isArray(product.images) ? product.images : [];
    for (const image of images) {
      const url = String(image.url || '').trim();
      if (!url) continue;
      mediaRows.push([
        String(image.id || `${product.id}-image-${image.position || 0}`),
        String(product.id),
        url,
        url,
        Number(image.position || 0),
        Boolean(image.isPrimary),
        String(image.altText || product.title),
      ]);
    }
  }

  for (let offset = 0; offset < mediaRows.length; offset += 400) {
    const rows = mediaRows.slice(offset, offset + 400);
    const params: unknown[] = [];
    const values = rows.map((row) => {
      const start = params.length + 1;
      params.push(...row);
      return `($${start}, $${start + 1}, $${start + 2}, $${start + 3}, $${start + 4}, $${start + 5}, $${start + 6}, 'eD_SYSTEM')`;
    });
    await pool.query(
      `INSERT INTO product_media (
         id, product_id, url, normalized_url, position, is_primary, alt_text, source
       ) VALUES ${values.join(', ')}
       ON CONFLICT (product_id, normalized_url) DO UPDATE SET
         url = EXCLUDED.url,
         position = EXCLUDED.position,
         is_primary = EXCLUDED.is_primary,
         alt_text = EXCLUDED.alt_text,
         updated_at = NOW()`,
      params,
    );
  }
}

async function fetchLiveStockMap(): Promise<Map<string, any>> {
  const stockMap = new Map<string, any>();
  const credentials = {
    login: requiredEnv('ED_LOGIN'),
    password: requiredEnv('ED_PASSWORD'),
    endpointUrl: process.env.ED_ENDPOINT_URL?.trim() || 'https://private-ws-sk.elinkx.biz/service.asmx',
  };

  try {
    console.log('📡 Žiadam eD System API o čerstvý súbor s cenami a skladovými zásobami...');
    const client = new EDSystemClient(credentials);
    const status = await client.getProductCatalogueStockDownloadXML();

    if (status.IsReady && status.Url) {
      console.log(`  ✓ Sťahujem živý skladový XML feed z ${new URL(status.Url).origin}`);
      const res = await fetch(status.Url, { signal: AbortSignal.timeout(180_000) });
      const xmlText = await res.text();

      console.log(`  ✓ Spracovávam ${ (xmlText.length / 1024 / 1024).toFixed(2) } MB skladových dát...`);
      const blocks = xmlText.match(/<ProductShort>[\s\S]*?<\/ProductShort>/g) || [];

      for (const block of blocks) {
        const codeMatch = block.match(/<Code>(.*?)<\/Code>/);
        const proIdMatch = block.match(/<ProId>(.*?)<\/ProId>/);
        const pnMatch = block.match(/<PartNumber>(.*?)<\/PartNumber>/);
        const priceMatch = block.match(/<YourPriceWithFees>(.*?)<\/YourPriceWithFees>/) ||
                           block.match(/<YourPrice>(.*?)<\/YourPrice>/) ||
                           block.match(/<DealerPrice>(.*?)<\/DealerPrice>/);
        const stockMatch = block.match(/<OnStockCount>(.*?)<\/OnStockCount>/);

        const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
        const stockCount = stockMatch ? parseFloat(stockMatch[1]) : 0;

        const data = {
          price,
          stockCount,
          isInStock: stockCount > 0,
        };

        if (codeMatch) stockMap.set(codeMatch[1], data);
        if (proIdMatch) stockMap.set(proIdMatch[1], data);
        if (pnMatch) stockMap.set(pnMatch[1], data);
      }
      console.log(`✅ Skladová mapa pripravená: ${stockMap.size} položiek s reálnymi cenami!`);
    } else {
      console.warn('⚠️ eD skladový feed nebol pripravený včas.');
    }
  } catch (err: any) {
    console.warn('⚠️ Zlyhalo načítanie skladového feedu z eD API:', err.message);
  }

  return stockMap;
}

function retailPriceFromCost(cost: number, vatRate: number): { basePrice: number; finalPrice: number } {
  if (!Number.isFinite(cost) || cost <= 0) return { basePrice: 0, finalPrice: 0 };
  const marginPct = cost < 50 ? 18 : cost > 1000 ? 10 : 12;
  const basePrice = Number((cost * (1 + marginPct / 100)).toFixed(2));
  return { basePrice, finalPrice: Number((basePrice * (1 + vatRate / 100)).toFixed(2)) };
}

async function syncStockOnly(pool: pg.Pool, stockMap: Map<string, any>, batchId: string | undefined): Promise<void> {
  if (stockMap.size === 0) throw new Error('Stock feed neobsahuje žiadne položky.');
  const products = await pool.query<{ id: string; supplier_code: string; supplier_pro_id: string | null; mpn: string | null; vat_rate: string | number }>(
    `SELECT id, supplier_code, supplier_pro_id, mpn, vat_rate
       FROM products WHERE status = 'ACTIVE'`,
  );
  let matched = 0;
  let priced = 0;
  let inStock = 0;
  for (const product of products.rows) {
    const info = stockMap.get(product.supplier_code) || stockMap.get(product.supplier_pro_id || '') || stockMap.get(product.mpn || '');
    if (!info) continue;
    matched++;
    const stockCount = Math.max(0, Number(info.stockCount) || 0);
    const pricing = retailPriceFromCost(Number(info.price), Number(product.vat_rate || 20));
    if (pricing.finalPrice > 0) priced++;
    if (stockCount > 0) inStock++;
    await pool.query(
      `UPDATE products
          SET stock_count = $2::numeric,
              is_in_stock = $3::boolean,
              stock_text = $4::text,
              base_price = CASE WHEN $5::numeric > 0 THEN $6::numeric ELSE base_price END,
              final_price = CASE WHEN $5::numeric > 0 THEN $7::numeric ELSE final_price END,
              data_hash = CONCAT('stock_', $2::text, '_', COALESCE($5::text, '0')),
              updated_at = NOW()
        WHERE id = $1`,
      [product.id, stockCount, stockCount > 0, stockCount > 0 ? `Skladom > ${stockCount} ks` : 'Na objednávku', Number(info.price) || 0, pricing.basePrice, pricing.finalPrice],
    );
  }
  if (matched === 0) throw new Error('Stock feed sa nezhoduje so žiadnym aktívnym produktom.');
  if (batchId) {
    await pool.query(
      `UPDATE sync_batches
          SET total_read = $1, imported_count = $2, filtered_count = $3,
              metrics = $4::jsonb, status = 'COMPLETED', completed_at = NOW()
        WHERE id = $5`,
      [stockMap.size, matched, Math.max(0, stockMap.size - matched), JSON.stringify({ matched_products: matched, priced_count: priced, in_stock_count: inStock, stock_only: true }), batchId],
    );
  }
  console.log(`✅ Stock-only synchronizácia: ${matched} produktov, ${priced} cien, ${inStock} skladom.`);
}

export async function importAsusLenovoToNeon() {
  console.log('===========================================================');
  console.log(` Worlds.sk - AKTUALIZÁCIA CIEN & OPRAVA OBRÁZKOV (${targetBrandsLabel()})`);
  console.log('===========================================================\n');

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 10,
  });

  const batchNumber = `ed-catalog-${Date.now()}`;
  const batchResult = await pool.query<{ id: string }>(
    `INSERT INTO sync_batches (batch_number, mode, status)
     VALUES ($1, $2, 'RUNNING') RETURNING id`,
    [batchNumber, sampleOnlyLabel()],
  );
  const batchId = batchResult.rows[0]?.id;

  try {
    const stockOnly = process.env.ED_STOCK_ONLY === 'true';
    if (stockOnly) {
      const stockMap = await fetchLiveStockMap();
      await syncStockOnly(pool, stockMap, batchId);
      return;
    }
    await syncCategoriesAndManufacturers(pool);
  const classificationConfig = await loadClassificationConfig(pool);

  // 1. Fetch live stock prices
  const stockMap = await fetchLiveStockMap();

  const downloadsDir = path.resolve(process.cwd(), 'downloads');
  const xmlCandidates = [
    path.join(downloadsDir, 'productCatalogue_39536264-b5ab-4b6c-9137-0cec8817bf51.xml'),
    path.join(downloadsDir, 'productCatalogue_main.zip'),
    path.join(downloadsDir, 'navigator.xml'),
  ];

  let xmlContent = '';
  const existingXml = xmlCandidates.find((c) => fs.existsSync(c));
  if (!existingXml) {
    throw new Error('Nenašiel sa žiadny XML súbor v priečinku downloads.');
  }

  console.log(`📦 Načítavam katalóg: ${path.basename(existingXml)}`);

  if (existingXml.endsWith('.zip')) {
    const zip = new AdmZip(existingXml);
    const xmlEntry = zip.getEntries().find((e) => e.entryName.endsWith('.xml'));
    if (!xmlEntry) {
      throw new Error(`ZIP katalóg ${path.basename(existingXml)} neobsahuje XML súbor.`);
    }
    xmlContent = xmlEntry.getData().toString('utf8');
  } else {
    xmlContent = fs.readFileSync(existingXml, 'utf8');
  }

  console.log(`✓ Načítaný XML katalóg (${(xmlContent.length / 1024 / 1024).toFixed(2)} MB)`);

  console.log(`🔍 Filtrujem a spracovávam: ${targetBrandsLabel()}...`);
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    parseTagValue: true,
    trimValues: true,
    processEntities: false,
  });

  const productBlocks = xmlContent.match(/<Product>[\s\S]*?<\/Product>/g) ||
                        xmlContent.match(/<ProductComplete>[\s\S]*?<\/ProductComplete>/g) || [];

  console.log(`✓ Počet celkových položiek v XML: ${productBlocks.length}`);

  const targetProducts: any[] = [];
  const sampleOnly = process.env.ED_SAMPLE_ONLY === 'true';
  const dryRun = process.argv.includes('--dry-run') || process.env.ED_DRY_RUN === 'true';
  const minimumCostEur = configuredMinimumCostEur();
  const targetBrands = configuredTargetBrands();
  const sampleLimitRaw = Number.parseInt(process.env.ED_SAMPLE_LIMIT || '250', 10);
  const sampleLimit = Number.isFinite(sampleLimitRaw) && sampleLimitRaw > 0 ? sampleLimitRaw : 250;
  let asusCount = 0;
  let lenovoCount = 0;
  const brandCounts = new Map<string, number>();
  let pricedCount = 0;
  let imageProductCount = 0;
  let imageCount = 0;
  let multiImageProductCount = 0;
  let lowCostFilteredCount = 0;

  if (minimumCostEur > 0) console.log(`💶 Minimálna nákupná cena: ${minimumCostEur.toFixed(2)} €`);

  for (const block of productBlocks) {
    const parsed = parser.parse(block);
    const p = parsed.Product || parsed.ProductComplete;
    if (!p) continue;

    const name = String(p.Name || p.ProductName || '').trim();
    if (!name || name.length < 3) continue;

    const rawBrand = String(p.ProducerName || p.ProducerCode || '');
    const { isMatch, brandName } = isTargetBrand(name, rawBrand, targetBrands);
    if (!isMatch || !brandName) continue;
    const scope = assessCatalogScope({
      title: name,
      description: p.Description,
      descriptionShort: p.DescriptionShort,
      commodityName: p.CommodityName,
    });
    if (!scope.included) continue;
    brandCounts.set(brandName, (brandCounts.get(brandName) || 0) + 1);

    const code = String(p.Code || p.ProId);
    const partNumber = String(p.PartNumber || p.PartNumber2 || code);

    // Look up price from live stockMap first, then eD product fields
    const stockInfo = stockMap.get(code) || stockMap.get(String(p.ProId)) || stockMap.get(partNumber);
    let cost = stockInfo ? stockInfo.price : Number(p.YourPriceWithFees || p.YourPrice || p.DealerPrice || 0);
    if (cost < minimumCostEur) {
      lowCostFilteredCount++;
      continue;
    }

    const classification = classifyWithStoredRules(p, classificationConfig);
    const { slug: catSlug, hierarchy: catPath } = classification;

    let basePrice = 0;
    let finalPrice = 0;
    const vatRate = Number(p.Vat || 20);

    if (cost > 0) {
      let marginPct = 12;
      if (cost < 50) marginPct = 18;
      else if (cost > 1000) marginPct = 10;

      basePrice = Number((cost * (1 + marginPct / 100)).toFixed(2));
      finalPrice = Number((basePrice * (1 + vatRate / 100)).toFixed(2));
    }

    const stockCountRaw = stockInfo ? stockInfo.stockCount : Number(p.OnStockCount);
    const isInStock = Number.isFinite(stockCountRaw) ? stockCountRaw > 0 : String(p.OnStock).toLowerCase() === 'true';
    const stockCount = Number.isFinite(stockCountRaw) ? Math.max(0, stockCountRaw) : (isInStock ? 5 : 0);

    const mpn = partNumber;
    const ean = String(p.EANCode || p.EAN || '');
    const slug = safeSlug(name, code);

    const rawDescription = String(p.Description || p.DescriptionShort || '');
    const { cleanHtml, plainText, specs } = sanitizeAndFormatHtml(rawDescription);

    // Image processing: extract high-res original photos
    const extractedUrls = extractImageUrls(p);
    const images: any[] = [];

    if (extractedUrls.length > 0) {
      extractedUrls.forEach((url, idx) => {
        images.push({
          id: `img-${code}-${idx}`,
          url,
          position: idx,
          isPrimary: idx === 0,
          altText: name,
        });
      });
    }
    if (finalPrice > 0) pricedCount++;
    if (images.length > 0) imageProductCount++;
    imageCount += images.length;
    if (images.length > 1) multiImageProductCount++;

    const attributes: Record<string, any> = {
      brand: { code: 'brand', name: 'Výrobca', value: brandName, rawValue: brandName },
      mpn: { code: 'mpn', name: 'Kód výrobcu (Part Number)', value: mpn, rawValue: mpn },
      warranty: { code: 'warranty', name: 'Záruka', value: `${Number(p.WarrantyTerm) || 24} mesiacov`, rawValue: String(Number(p.WarrantyTerm) || 24) },
    };

    for (const [specKey, specVal] of Object.entries(specs)) {
      const cleanKey = specKey.toLowerCase().replace(/[^a-z0-9_]+/g, '_').slice(0, 30);
      if (!attributes[cleanKey] && specVal.length < 80) {
        attributes[cleanKey] = {
          code: cleanKey,
          name: specKey,
          value: specVal,
          rawValue: specVal,
        };
      }
    }

    if (brandName === 'ASUS') asusCount++;
    if (brandName === 'Lenovo') lenovoCount++;

    targetProducts.push({
      id: `ed-${code}`,
      sku: code,
      supplier_code: code,
      supplier_pro_id: String(p.ProId || code),
      mpn,
      ean: ean || null,
      brand: brandName,
      category_slug: catSlug,
      category_hierarchy: catPath,
      category_source: classification.source,
      category_confidence: classification.confidence,
      category_reasoning: classification.reasoning,
      commodity_code: String(p.CommodityCode || 'IT'),
      commodity_name: String(p.CommodityName || 'Hardvér'),
      title: name,
      name_b2c: null,
      slug,
      short_description: plainText.slice(0, 250),
      supplier_description: plainText,
      enriched_description: cleanHtml,
      seo_title: `${name} | Worlds.sk`,
      seo_description: `Kúpiť ${name} (PartNumber: ${mpn}) za výhodnú cenu ${finalPrice} € na Worlds.sk.`,
      search_keywords: [brandName.toLowerCase(), mpn.toLowerCase(), catSlug],
      vat_rate: vatRate,
      base_price: basePrice,
      final_price: finalPrice,
      currency: 'EUR',
      stock_count: stockCount,
      is_in_stock: isInStock,
      stock_text: isInStock ? `Skladom > ${stockCount} ks` : 'Na objednávku',
      min_order_quantity: 1,
      warranty_months: Number(p.WarrantyTerm) || 24,
      warranty_unit: 'M',
      attributes,
      images,
      status: 'ACTIVE',
      data_hash: `hash_${code}_${cost}_${stockCount}`,
    });

    if (sampleOnly && targetProducts.length >= sampleLimit) {
      console.log(`🧪 Sample režim: dosiahnutý limit ${sampleLimit} produktov (${targetBrandsLabel()}).`);
      break;
    }
  }

  console.log(`\n===========================================================`);
  console.log(` 🎉 Nájdené IT produkty target značiek:`);
  if (targetBrands.has('ALL')) {
    const topBrands = [...brandCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([brand, count]) => `${brand}: ${count}`)
      .join(' | ');
    console.log(` 🔹 Top značky: ${topBrands || 'bez rozpoznanej značky'}`);
  } else {
    console.log(` 🔹 ASUS: ${asusCount}`);
    console.log(` 🔹 Lenovo: ${lenovoCount}`);
  }
  console.log(` 📦 Celkovo s aktualizovanými cenami a fotkami: ${targetProducts.length}`);
  console.log(`===========================================================\n`);

  if (targetProducts.length === 0) {
    throw new Error(`Feed neobsahuje žiadne produkty pre rozsah ${targetBrandsLabel()}.`);
  }
  if (pricedCount === 0) {
    throw new Error(`Feed neobsahuje žiadnu platnú cenu pre rozsah ${targetBrandsLabel()}.`);
  }

  if (dryRun) {
    console.log('🧪 Dry-run: produkty sa nezapisujú do Neonu.');
    if (batchId) {
      await pool.query(
        `UPDATE sync_batches
            SET total_read = $1, imported_count = $2, filtered_count = $3,
                metrics = $4::jsonb, status = 'COMPLETED', completed_at = NOW()
          WHERE id = $5`,
        [productBlocks.length, targetProducts.length, Math.max(0, productBlocks.length - targetProducts.length), JSON.stringify({ priced_count: pricedCount, image_product_count: imageProductCount, image_count: imageCount, multi_image_product_count: multiImageProductCount, low_cost_filtered_count: lowCostFilteredCount, minimum_cost_eur: minimumCostEur }), batchId],
      );
    }
    return;
  }

  console.log(`🚀 Upsertujem produkty (${targetBrandsLabel()}) bez mazania existujúceho katalógu...`);
  const batchSize = 100;
  let inserted = 0;

  for (let i = 0; i < targetProducts.length; i += batchSize) {
    const batch = targetProducts.slice(i, i + batchSize);

    const valueRows: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    for (const p of batch) {
      valueRows.push(
        `(${Array.from({ length: 37 }, () => `$${paramIndex++}`).join(', ')})`
      );

      params.push(
        p.id,
        p.sku,
        p.supplier_code,
        p.supplier_pro_id,
        p.mpn,
        p.ean,
        p.brand,
        p.category_slug,
        JSON.stringify(p.category_hierarchy),
        p.category_source,
        p.category_confidence,
        p.category_reasoning,
        p.commodity_code,
        p.commodity_name,
        p.title,
        p.name_b2c,
        p.slug,
        p.short_description,
        p.supplier_description,
        p.enriched_description,
        p.seo_title,
        p.seo_description,
        JSON.stringify(p.search_keywords),
        p.vat_rate,
        p.base_price,
        p.final_price,
        p.currency,
        p.stock_count,
        p.is_in_stock,
        p.stock_text,
        p.min_order_quantity,
        p.warranty_months,
        p.warranty_unit,
        JSON.stringify(p.attributes),
        JSON.stringify(p.images),
        p.status,
        p.data_hash
      );
    }

    const insertSql = `
      INSERT INTO products (
        id, sku, supplier_code, supplier_pro_id, mpn, ean, brand,
        category_slug, category_hierarchy, category_source, category_confidence, category_reasoning,
        commodity_code, commodity_name,
        title, name_b2c, slug, short_description, supplier_description,
        enriched_description, seo_title, seo_description, search_keywords,
        vat_rate, base_price, final_price, currency, stock_count,
        is_in_stock, stock_text, min_order_quantity, warranty_months,
        warranty_unit, attributes, images, status, data_hash
      ) VALUES ${valueRows.join(', ')}
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        category_slug = EXCLUDED.category_slug,
        category_hierarchy = EXCLUDED.category_hierarchy,
        base_price = EXCLUDED.base_price,
        final_price = EXCLUDED.final_price,
        stock_count = EXCLUDED.stock_count,
        is_in_stock = EXCLUDED.is_in_stock,
        images = EXCLUDED.images,
        attributes = EXCLUDED.attributes,
        data_hash = EXCLUDED.data_hash,
        category_source = EXCLUDED.category_source,
        category_confidence = EXCLUDED.category_confidence,
        category_reasoning = EXCLUDED.category_reasoning,
        updated_at = NOW();
    `;

    await pool.query(insertSql, params);
    await syncProductMedia(pool, batch);
    inserted += batch.length;
    console.log(`  ✓ Uložených ${inserted}/${targetProducts.length} produktov...`);
  }

  console.log('\n===========================================================');
  console.log(` 🎉 ÚSPECH! CELKOVO ULOŽENÝCH ${inserted} PRODUKTOV S AKTUALIZOVANÝMI CENAMI A FOTKAMI!`);
  console.log('===========================================================\n');

  if (batchId) {
    await pool.query(
      `UPDATE sync_batches
          SET total_read = $1, imported_count = $2, filtered_count = $3,
              metrics = $4::jsonb, status = 'COMPLETED', completed_at = NOW()
        WHERE id = $5`,
      [productBlocks.length, inserted, Math.max(0, productBlocks.length - targetProducts.length), JSON.stringify({ priced_count: pricedCount, image_product_count: imageProductCount, image_count: imageCount, multi_image_product_count: multiImageProductCount, low_cost_filtered_count: lowCostFilteredCount, minimum_cost_eur: minimumCostEur }), batchId],
    );
  }

  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (batchId) {
      await pool.query(
        `UPDATE sync_batches
            SET status = 'FAILED', error_message = $1, completed_at = NOW()
          WHERE id = $2`,
        [message.slice(0, 4000), batchId],
      );
    }
    console.error(`❌ Import dávka ${batchNumber} zlyhala: ${message}`);
    throw error;
  } finally {
    await pool.end();
  }
}

function sampleOnlyLabel(): string {
  const brands = (process.env.ED_SAMPLE_BRANDS || 'ASUS,Lenovo').replace(/\s+/g, '').replace(/,/g, '_').toUpperCase();
  const scope = process.env.ED_SAMPLE_ONLY === 'true' ? `SAMPLE_${brands}` : `FULL_${brands}`;
  const dryRun = process.argv.includes('--dry-run') || process.env.ED_DRY_RUN === 'true';
  const mode = process.env.ED_STOCK_ONLY === 'true' ? `STOCK_ONLY_${scope}` : scope;
  return dryRun ? `DRY_RUN_${mode}` : mode;
}

if (process.argv[1]?.endsWith('import-neon.ts') || process.argv[1]?.endsWith('import-neon.js')) {
  importAsusLenovoToNeon().catch(console.error);
}
