import fs from 'node:fs';
import path from 'node:path';
import AdmZip from 'adm-zip';
import { XMLParser } from 'fast-xml-parser';
import { classifyProductIndependently } from './packages/importer/dist/taxonomy-definition.js';
import { sanitizeAndFormatHtml } from './packages/importer/dist/html-sanitizer.js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://jhgyzgdiapiewpjgosxm.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoZ3l6Z2RpYXBpZXdwamdvc3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwNzI2OTksImV4cCI6MjEwMzY0ODY5OX0.6SAAJarR0Er3LFFewmcJTN_oEE2OoEMLqUTQJRGA3hY';

function extractBrand(title, rawBrand) {
  if (rawBrand && rawBrand !== 'Neznámy' && rawBrand.trim().length > 1) {
    return rawBrand.trim();
  }
  const t = title.toUpperCase();
  if (t.startsWith('ACER') || t.includes('ACER')) return 'Acer';
  if (t.startsWith('LENOVO') || t.includes('LENOVO') || t.includes('THINKPAD') || t.includes('IDEAPAD') || t.includes('LEGION')) return 'Lenovo';
  if (t.startsWith('ASUS') || t.includes('ASUS') || t.includes('ROG ') || t.includes('TUF ') || t.includes('ZENBOOK')) return 'ASUS';
  if (t.startsWith('HP') || t.includes('HEWLETT') || t.includes('OMEN') || t.includes('PROBOOK') || t.includes('ELITEBOOK') || t.includes('VICTUS')) return 'HP';
  if (t.startsWith('DELL') || t.includes('DELL') || t.includes('LATITUDE') || t.includes('OPTIPLEX') || t.includes('ALIENWARE')) return 'Dell';
  if (t.startsWith('APPLE') || t.includes('APPLE') || t.includes('MACBOOK') || t.includes('IPHONE') || t.includes('IPAD') || t.includes('IMAC')) return 'Apple';
  if (t.startsWith('SAMSUNG') || t.includes('SAMSUNG')) return 'Samsung';
  if (t.startsWith('INTEL') || t.includes('INTEL')) return 'Intel';
  if (t.startsWith('AMD') || t.includes('AMD RYZEN')) return 'AMD';
  if (t.startsWith('KINGSTON') || t.includes('KINGSTON') || t.includes('FURY')) return 'Kingston';
  if (t.startsWith('LOGITECH') || t.includes('LOGITECH')) return 'Logitech';
  if (t.startsWith('CORSAIR') || t.includes('CORSAIR')) return 'Corsair';
  if (t.startsWith('MSI') || t.includes('MSI')) return 'MSI';
  if (t.startsWith('GIGABYTE') || t.includes('GIGABYTE') || t.includes('AORUS')) return 'Gigabyte';
  if (t.startsWith('WESTERN DIGITAL') || t.startsWith('WD ') || t.includes('WESTERN DIGITAL')) return 'Western Digital';
  if (t.startsWith('SEAGATE') || t.includes('SEAGATE')) return 'Seagate';
  if (t.startsWith('TP-LINK') || t.includes('TP-LINK')) return 'TP-Link';
  if (t.startsWith('SYNOLOGY') || t.includes('SYNOLOGY')) return 'Synology';
  if (t.startsWith('QNAP') || t.includes('QNAP')) return 'QNAP';
  if (t.startsWith('CANON') || t.includes('CANON')) return 'Canon';
  if (t.startsWith('EPSON') || t.includes('EPSON')) return 'Epson';
  if (t.startsWith('BROTHER') || t.includes('BROTHER')) return 'Brother';
  if (t.startsWith('APC') || t.includes('APC')) return 'APC';
  if (t.startsWith('EATON') || t.includes('EATON')) return 'Eaton';
  if (t.startsWith('BENQ') || t.includes('BENQ')) return 'BenQ';
  if (t.startsWith('PHILIPS') || t.includes('PHILIPS')) return 'Philips';
  if (t.startsWith('AOC') || t.includes('AOC')) return 'AOC';
  if (t.startsWith('IIYAMA') || t.includes('IIYAMA')) return 'iiyama';
  if (t.startsWith('CRUCIAL') || t.includes('CRUCIAL')) return 'Crucial';
  if (t.startsWith('RAZER') || t.includes('RAZER')) return 'Razer';
  if (t.startsWith('STEELSERIES') || t.includes('STEELSERIES')) return 'SteelSeries';

  return title.split(' ')[0] || 'Unbranded';
}

function getCategoryPlaceholderImage(catSlug) {
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
  if (catSlug.includes('sluchadl') || catSlug.includes('headset')) {
    return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';
  }
  if (catSlug.includes('wifi') || catSlug.includes('router') || catSlug.includes('switch') || catSlug.includes('siet')) {
    return 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80';
  }
  if (catSlug.includes('tlaciar') || catSlug.includes('toner') || catSlug.includes('skener')) {
    return 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=80';
  }
  if (catSlug.includes('ups') || catSlug.includes('kabel') || catSlug.includes('napajan')) {
    return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80';
  }
  if (catSlug.includes('usb') || catSlug.includes('flash') || catSlug.includes('karta') || catSlug.includes('extern')) {
    return 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=800&q=80';
  }

  return 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80';
}

async function sendBatchWithRetry(batch, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/master_products`, {
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
      console.warn(`  [Pokus ${attempt}/${maxRetries}] Zápis do DB: ${err.slice(0, 150)}`);
    } catch (e) {
      console.warn(`  [Pokus ${attempt}/${maxRetries}] Chyba pripojenia: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 400 * attempt));
  }
  return false;
}

async function main() {
  console.log('===========================================================');
  console.log(' Worlds.sk - NEZÁVISLÁ KATEGORIZÁCIA, ČISTÉ HTML A FOTKY');
  console.log('===========================================================\n');

  console.log('1. Načítavam master XML katalóg...');
  const zip = new AdmZip('downloads/productCatalogue_main.zip');
  const xmlEntry = zip.getEntries().find(e => e.entryName.endsWith('.xml'));
  const xmlContent = xmlEntry.getData().toString('utf8');

  console.log('2. Indexujem XML položky podľa Code a PartNumber...');
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    parseTagValue: true,
    trimValues: true,
    processEntities: false,
  });

  const productBlocks = xmlContent.match(/<Product>[\s\S]*?<\/Product>/g) || [];
  const xmlProductMap = new Map();

  for (const block of productBlocks) {
    const parsed = parser.parse(block);
    const p = parsed.Product;
    if (!p) continue;

    const code = String(p.Code || p.ProId);
    const pn = p.PartNumber ? String(p.PartNumber) : null;
    const img = p.ImageUrl && String(p.ImageUrl).trim().length > 5 ? String(p.ImageUrl).trim() : null;
    const desc = p.Description || p.DescriptionShort || '';

    const entry = {
      code,
      proId: p.ProId,
      partNumber: pn,
      imageUrl: img,
      rawDescription: desc,
      descriptionShort: p.DescriptionShort,
      commodityCode: p.CommodityCode,
      commodityName: p.CommodityName,
      producerName: p.ProducerName,
      warranty: p.WarrantyTerm,
      ean: p.EANCode || p.EAN
    };

    if (code) xmlProductMap.set(code, entry);
    if (pn) xmlProductMap.set(pn, entry);
  }
  console.log(`   ✓ Zaindexovaných ${xmlProductMap.size} položiek z XML.\n`);

  // 3. Načítame aktívne produkty so živými cenami a skladovými stavmi
  console.log('3. Nezávisle kategorizujem každý produkt a spracovávam HTML popis...');
  const activeProducts = JSON.parse(fs.readFileSync('downloads/final_active_notebooks.json', 'utf8'));

  const finalDbRows = [];
  let withDirectPhotos = 0;
  const categoryStats = new Map();

  for (const item of activeProducts) {
    const code = String(item.supplierCode);
    const xmlInfo = xmlProductMap.get(code) || xmlProductMap.get(String(item.mpn)) || {};

    const name = item.title;
    const rawDesc = xmlInfo.rawDescription || item.supplierDescription || '';
    const descShort = xmlInfo.descriptionShort || item.shortDescription || '';

    // NEZÁVISLÁ KATEGORIZÁCIA NA ZÁKLADE VŠETKÝCH DÁT PRODUKTU
    const { slug: catSlug, hierarchy: catPath } = classifyProductIndependently({
      title: name,
      mpn: String(item.mpn || xmlInfo.partNumber || ''),
      ean: String(item.ean || xmlInfo.ean || ''),
      description: rawDesc,
      descriptionShort: descShort,
      producerName: item.brand || xmlInfo.producerName
    });

    categoryStats.set(catSlug, (categoryStats.get(catSlug) || 0) + 1);

    const brand = extractBrand(name, item.brand || xmlInfo.producerName);
    const mpn = String(item.mpn || xmlInfo.partNumber || code);
    const ean = String(item.ean || xmlInfo.ean || `${code}0000`);
    const titleSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
    const slug = `${titleSlug}-${code}`;

    // Zachovanie kompletného formátovaného HTML popisu s dekódovanými entitami
    const { cleanHtml, plainText, specs } = sanitizeAndFormatHtml(rawDesc);

    // Fotografia z eD XML
    let imgUrl = xmlInfo.imageUrl || item.images?.[0]?.url;
    if (imgUrl && !imgUrl.startsWith('http')) {
      imgUrl = `https://www.edsystem.sk/${imgUrl.replace(/^\//, '')}`;
    }

    const images = [];
    if (imgUrl && imgUrl.includes('edsystem.sk')) {
      withDirectPhotos++;
      images.push({
        id: `img-${code}-0`,
        url: imgUrl,
        position: 0,
        isPrimary: true,
        altText: name
      });
    } else {
      images.push({
        id: `img-${code}-cat-placeholder`,
        url: getCategoryPlaceholderImage(catSlug),
        position: 0,
        isPrimary: true,
        altText: name
      });
    }

    const attributes = {
      brand: { code: 'brand', name: 'Výrobca', value: brand, rawValue: brand },
      mpn: { code: 'mpn', name: 'Part Number', value: mpn, rawValue: mpn },
      warranty: { code: 'warranty', name: 'Záruka', value: `${item.warrantyMonths || 24} mesiacov`, rawValue: String(item.warrantyMonths || 24) }
    };

    for (const [sKey, sVal] of Object.entries(specs)) {
      const cKey = sKey.toLowerCase().replace(/[^a-z0-9_]+/g, '_').slice(0, 30);
      if (!attributes[cKey] && sVal.length < 80) {
        attributes[cKey] = { code: cKey, name: sKey, value: sVal, rawValue: sVal };
      }
    }

    finalDbRows.push({
      id: `ed-${code}`,
      supplier_code: code,
      supplier_pro_id: String(item.proId || xmlInfo.proId || code),
      sku: code,
      mpn,
      ean,
      brand,
      category_slug: catSlug,
      category_hierarchy: catPath,
      commodity_code: xmlInfo.commodityCode || 'NB',
      commodity_name: xmlInfo.commodityName || 'Notebooky',
      title: name,
      slug,
      short_description: plainText.slice(0, 220),
      supplier_description: plainText,
      enriched_description: cleanHtml,
      seo_title: `${name} | Worlds.sk`,
      seo_description: `Kúpiť ${name} (PartNumber: ${mpn}) za výhodnú cenu ${item.pricing.finalPrice} € s expresným doručením z centrálneho skladu na Worlds.sk.`,
      search_keywords: [brand.toLowerCase(), mpn.toLowerCase(), catSlug],
      supplier_cost: item.pricing.supplierCost,
      garbage_fee: item.pricing.supplierFees.garbageFee,
      author_fee: item.pricing.supplierFees.authorFee,
      total_cost_with_fees: item.pricing.totalCostWithFees,
      vat_rate: item.pricing.vatRate || 20,
      margin_percentage: item.pricing.marginPercentage || 12,
      base_price: item.pricing.basePrice,
      final_price: item.pricing.finalPrice,
      currency: 'EUR',
      stock_count: item.stockCount,
      is_in_stock: item.isInStock,
      stock_text: item.stockText,
      min_order_quantity: 1,
      warranty_months: item.warrantyMonths || 24,
      attributes,
      images,
      status: 'ACTIVE',
      review_status: 'AUTO_APPROVED',
      quality_score: { total: imgUrl ? 95 : 85, breakdown: {} },
      quality_score_total: imgUrl ? 95 : 85,
      data_hash: item.dataHash || `hash_${code}`,
      last_synced_at: new Date().toISOString(),
      last_reprocessed_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }

  console.log('===========================================================');
  console.log(' ŠTATISTIKA NEZÁVISLEJ KATEGORIZÁCIE:');
  for (const [cat, count] of categoryStats.entries()) {
    console.log(`  - ${cat}: ${count} produktov`);
  }
  console.log('-----------------------------------------------------------');
  console.log(` Celkovo produktov s formátovaným HTML a fotkami: ${finalDbRows.length}`);
  console.log(` S priamou fotkou z eD CDN: ${withDirectPhotos}`);
  console.log('===========================================================\n');

  // 4. Zápis do Supabase databázy
  console.log('4. Ukladám spracované produkty do Supabase PostgreSQL...');
  const batchSize = 100;
  let saved = 0;

  for (let i = 0; i < finalDbRows.length; i += batchSize) {
    const batch = finalDbRows.slice(i, i + batchSize);
    const ok = await sendBatchWithRetry(batch);
    if (ok) {
      saved += batch.length;
      console.log(`  ✓ Uložených ${saved}/${finalDbRows.length} produktov do Supabase...`);
    }
    await new Promise(r => setTimeout(r, 50));
  }

  console.log('\n===========================================================');
  console.log(` 🎉 ÚSPEŠNE ULOŽENÝCH ${saved} PRODUKTOV S NEZÁVISLOU KATEGORIZÁCIOU DO SUPABASE!`);
  console.log('===========================================================\n');
}

main().catch(console.error);
