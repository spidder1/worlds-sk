import fs from 'node:fs';
import path from 'node:path';
import AdmZip from 'adm-zip';
import { XMLParser } from 'fast-xml-parser';
import pg from 'pg';
import slugify from 'slugify';
import { classifyProductIndependently } from './taxonomy-definition.js';
import { sanitizeAndFormatHtml } from './html-sanitizer.js';
import { extractStructuredAttributes } from './attribute-extractor.js';
import { WORLDS_IT_CATEGORIES } from './taxonomy-definition.js';
import { TaxonomyCategory } from '@worlds/types';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_nLuIOvXw7dZ3@ep-withered-thunder-au37ajrg-pooler.c-10.us-east-1.aws.neon.tech/neondb?sslmode=require';

function isTargetBrand(name: string, rawBrand?: string): { isMatch: boolean; brandName: 'ASUS' | 'Lenovo' | null } {
  const b = (rawBrand || '').toUpperCase().trim();
  const title = name.toUpperCase();

  if (
    b === 'ASUS' ||
    b.includes('ASUSTEK') ||
    title.startsWith('ASUS') ||
    title.includes('ASUS ') ||
    title.includes(' ROG ') ||
    title.includes(' TUF ') ||
    title.includes('ZENBOOK')
  ) {
    return { isMatch: true, brandName: 'ASUS' };
  }

  if (
    b === 'LENOVO' ||
    title.startsWith('LENOVO') ||
    title.includes('LENOVO ') ||
    title.includes('THINKPAD') ||
    title.includes('IDEAPAD') ||
    title.includes('LEGION')
  ) {
    return { isMatch: true, brandName: 'Lenovo' };
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

async function syncCategoriesAndManufacturers(pool: pg.Pool) {
  console.log('📌 Synchronizujem kategórie a výrobcov do Neon PostgreSQL...');

  // Manufacturers
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

  // Categories helper
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

export async function importAsusLenovoToNeon() {
  console.log('===========================================================');
  console.log(' Worlds.sk - IMPORT PRODUKTOV ASUS & LENOVO DO NEON DB');
  console.log('===========================================================\n');

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 10,
  });

  await syncCategoriesAndManufacturers(pool);

  const downloadsDir = path.resolve(process.cwd(), 'downloads');
  const xmlCandidates = [
    path.join(downloadsDir, 'productCatalogue_39536264-b5ab-4b6c-9137-0cec8817bf51.xml'),
    path.join(downloadsDir, 'productCatalogue_main.zip'),
    path.join(downloadsDir, 'navigator.xml'),
  ];

  let xmlContent = '';
  let stockMap = new Map<string, any>();

  // Find source XML
  const existingXml = xmlCandidates.find((c) => fs.existsSync(c));
  if (!existingXml) {
    console.error('❌ Nenašiel sa žiadny XML súbor v složke downloads!');
    await pool.end();
    return;
  }

  console.log(`📦 Používam katalógový zdroj: ${path.basename(existingXml)}`);

  if (existingXml.endsWith('.zip')) {
    const zip = new AdmZip(existingXml);
    const xmlEntry = zip.getEntries().find((e) => e.entryName.endsWith('.xml'));
    if (!xmlEntry) {
      console.error('❌ ZIP súbor neobsahuje XML!');
      await pool.end();
      return;
    }
    xmlContent = xmlEntry.getData().toString('utf8');
  } else {
    xmlContent = fs.readFileSync(existingXml, 'utf8');
  }

  console.log(`✓ Načítaný XML katalóg (${(xmlContent.length / 1024 / 1024).toFixed(2)} MB)`);

  // Parse products
  console.log('🔍 Filtrujem a spracovávam výhradne značky ASUS a Lenovo...');
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
  let asusCount = 0;
  let lenovoCount = 0;

  for (const block of productBlocks) {
    const parsed = parser.parse(block);
    const p = parsed.Product || parsed.ProductComplete;
    if (!p) continue;

    const name = String(p.Name || p.ProductName || '').trim();
    if (!name || name.length < 3) continue;

    const rawBrand = String(p.ProducerName || p.ProducerCode || '');
    const { isMatch, brandName } = isTargetBrand(name, rawBrand);
    if (!isMatch || !brandName) continue;

    const code = String(p.Code || p.ProId);
    const cost = Number(p.YourPriceWithFees || p.YourPrice || p.DealerPrice || 0);

    // Calculate commercial data
    const vatRate = Number(p.Vat || 20);
    let marginPct = 12;
    if (cost < 50) marginPct = 18;
    else if (cost > 1000) marginPct = 10;

    const basePrice = Number((cost * (1 + marginPct / 100)).toFixed(2));
    const finalPrice = Number((basePrice * (1 + vatRate / 100)).toFixed(2));

    const stockCountRaw = Number(p.OnStockCount);
    const isInStock = Number.isFinite(stockCountRaw) ? stockCountRaw > 0 : String(p.OnStock).toLowerCase() === 'true';
    const stockCount = Number.isFinite(stockCountRaw) ? Math.max(0, stockCountRaw) : (isInStock ? 5 : 0);

    const { slug: catSlug, hierarchy: catPath } = classifyProductIndependently({
      title: name,
      mpn: String(p.PartNumber || p.PartNumber2 || code),
      ean: String(p.EANCode || p.EAN || ''),
      description: p.Description || '',
      descriptionShort: p.DescriptionShort || '',
      producerName: brandName,
    });

    const mpn = String(p.PartNumber || p.PartNumber2 || code);
    const ean = String(p.EANCode || p.EAN || '');
    const slug = safeSlug(name, code);

    const rawDescription = String(p.Description || p.DescriptionShort || '');
    const { cleanHtml, plainText, specs } = sanitizeAndFormatHtml(rawDescription);

    let rawImg = p.ImageUrl && String(p.ImageUrl).trim().length > 5 ? String(p.ImageUrl).trim() : null;
    if (rawImg && !rawImg.startsWith('http')) {
      rawImg = `https://www.edsystem.sk/${rawImg.replace(/^\//, '')}`;
    }

    const images = [];
    if (rawImg) {
      images.push({
        id: `img-${code}-0`,
        url: rawImg,
        position: 0,
        isPrimary: true,
        altText: name,
      });
    } else {
      images.push({
        id: `img-${code}-cat-placeholder`,
        url: getCategoryPlaceholderImage(catSlug),
        position: 0,
        isPrimary: true,
        altText: name,
      });
    }

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
      commodity_code: String(p.CommodityCode || 'IT'),
      commodity_name: String(p.CommodityName || 'Hardvér'),
      title: name,
      name_b2c: null,
      slug,
      short_description: plainText.slice(0, 250),
      supplier_description: plainText,
      enriched_description: cleanHtml,
      seo_title: `${name} | Worlds.sk`,
      seo_description: `Kúpiť ${name} (PartNumber: ${mpn}) za cenu ${finalPrice} € na Worlds.sk.`,
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
  }

  console.log(`\n===========================================================`);
  console.log(` 🎉 Nájdené IT produkty target značiek:`);
  console.log(` 🔹 ASUS: ${asusCount}`);
  console.log(` 🔹 Lenovo: ${lenovoCount}`);
  console.log(` 📦 Celkovo k importu: ${targetProducts.length}`);
  console.log(`===========================================================\n`);

  // Clear existing products in Neon DB to have a clean DB state as requested
  console.log('🧹 Čistím databázu produktov v Neon PostgreSQL...');
  await pool.query('TRUNCATE TABLE products CASCADE');

  // Insert in batches of 100
  console.log('🚀 Zapisujem ASUS & Lenovo produkty do Neon DB...');
  const batchSize = 100;
  let inserted = 0;

  for (let i = 0; i < targetProducts.length; i += batchSize) {
    const batch = targetProducts.slice(i, i + batchSize);

    const valueRows: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    for (const p of batch) {
      valueRows.push(
        `($${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++})`
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
        category_slug, category_hierarchy, commodity_code, commodity_name,
        title, name_b2c, slug, short_description, supplier_description,
        enriched_description, seo_title, seo_description, search_keywords,
        vat_rate, base_price, final_price, currency, stock_count,
        is_in_stock, stock_text, min_order_quantity, warranty_months,
        warranty_unit, attributes, images, status, data_hash
      ) VALUES ${valueRows.join(', ')}
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        final_price = EXCLUDED.final_price,
        stock_count = EXCLUDED.stock_count,
        is_in_stock = EXCLUDED.is_in_stock,
        updated_at = NOW();
    `;

    await pool.query(insertSql, params);
    inserted += batch.length;
    console.log(`  ✓ Uložených ${inserted}/${targetProducts.length} produktov...`);
  }

  console.log('\n===========================================================');
  console.log(` 🎉 ÚSPECH! CELKOVO ULOŽENÝCH ${inserted} PRODUKTOV DO NEON POSTGRESQL!`);
  console.log(' DB layout je kompletne pripravená a obsahuje výhradne ASUS & Lenovo IT produkty.');
  console.log('===========================================================\n');

  await pool.end();
}

if (process.argv[1]?.endsWith('import-neon.ts') || process.argv[1]?.endsWith('import-neon.js')) {
  importAsusLenovoToNeon().catch(console.error);
}
