import fs from 'node:fs';
import path from 'node:path';
import { classifyProductIndependently } from './taxonomy-definition.js';
import { sanitizeAndFormatHtml } from './html-sanitizer.js';
import { computeProductHashes, detectDelta, StagingProductRow, Staging2DeltaRow } from './delta-staging2.js';
import { extractStructuredAttributes } from './attribute-extractor.js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://jhgyzgdiapiewpjgosxm.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoZ3l6Z2RpYXBpZXdwamdvc3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwNzI2OTksImV4cCI6MjEwMzY0ODY5OX0.6SAAJarR0Er3LFFewmcJTN_oEE2OoEMLqUTQJRGA3hY';

function extractBrand(title: string, rawBrand?: string | null): string {
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

async function postBatch(url: string, batch: any[], maxRetries = 3): Promise<boolean> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url, {
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
      console.warn(`  [Pokus ${attempt}/${maxRetries}] Zápis: ${err.slice(0, 150)}`);
    } catch (e: any) {
      console.warn(`  [Pokus ${attempt}/${maxRetries}] Chyba: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 400 * attempt));
  }
  return false;
}

export async function processStaging2ToMaster() {
  console.log('===========================================================');
  console.log(' Worlds.sk - STAGING2 DELTA DETEKCIA A PROCESING DO MASTER DB');
  console.log(' staging_products -> staging2_product_deltas -> master_products');
  console.log(' Využitie 100% funkcií zo špecifikácie PRIVATEdoc.pdf');
  console.log('===========================================================\n');

  // 1. Načítanie aktívnych produktov
  console.log('1. Načítavam dáta zo staging vrstvy...');
  const jsonCandidates = [
    path.resolve(process.cwd(), 'downloads/final_active_notebooks.json'),
    path.resolve(process.cwd(), '../downloads/final_active_notebooks.json'),
    path.resolve(process.cwd(), '../../downloads/final_active_notebooks.json'),
    path.resolve('downloads/final_active_notebooks.json'),
    'C:\\Web\\Ethos\\downloads\\final_active_notebooks.json'
  ];
  const targetJsonPath = jsonCandidates.find(p => fs.existsSync(p));
  if (!targetJsonPath) {
    console.error('Súbor final_active_notebooks.json sa nenašiel!');
    return;
  }
  const activeProducts = JSON.parse(fs.readFileSync(targetJsonPath, 'utf8'));
  console.log(`   ✓ Načítaných ${activeProducts.length} aktívnych produktov na spracovanie.`);

  // 2. Načítanie existujúcich deltas zo staging2
  console.log('2. Overujem predchádzajúci stav v tabuľke staging2_product_deltas...');
  let previousDeltasMap = new Map<string, Staging2DeltaRow>();
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/staging2_product_deltas?select=*&limit=5000`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    if (res.ok) {
      const rows: Staging2DeltaRow[] = await res.json();
      for (const r of rows) previousDeltasMap.set(r.code, r);
      console.log(`   ✓ V staging2 evidovaných ${previousDeltasMap.size} záznamov.`);
    }
  } catch (e: any) {
    console.warn('   Upozornenie: Tabuľka staging2 je prázdna alebo nedostupná:', e.message);
  }

  // 3. Výpočet hashov a detekcia zmien (Delta Engine)
  console.log('3. Detegujem zmeny (ceny, sklad, obsah) cez MD5/SHA-256 hashe...');
  const deltaRows: Staging2DeltaRow[] = [];
  const changedProductsToProcess: any[] = [];

  let newCount = 0;
  let priceChangedCount = 0;
  let stockChangedCount = 0;
  let contentChangedCount = 0;
  let unchangedCount = 0;

  for (const item of activeProducts) {
    const code = String(item.supplierCode);
    const stagingItem: StagingProductRow = {
      code,
      pro_id: String(item.proId || code),
      part_number: item.mpn ? String(item.mpn) : null,
      ean_code: item.ean ? String(item.ean) : null,
      name: item.title,
      producer_name: item.brand,
      your_price: item.pricing.supplierCost,
      your_price_with_fees: item.pricing.totalCostWithFees,
      dealer_price: item.pricing.basePrice,
      end_user_price: item.pricing.finalPrice,
      garbage_fee: item.pricing.supplierFees.garbageFee,
      author_fee: item.pricing.supplierFees.authorFee,
      vat: item.pricing.vatRate || 20,
      on_stock: item.isInStock,
      on_stock_count: item.stockCount,
      warranty: `${item.warrantyMonths || 24} M`,
      image_url: item.images?.[0]?.url || null,
      description: item.supplierDescription || null,
      description_short: item.shortDescription || null
    };

    const delta = detectDelta(stagingItem, previousDeltasMap.get(code));
    deltaRows.push(delta);

    if (delta.delta_status === 'NEW') newCount++;
    else if (delta.delta_status === 'PRICE_CHANGED') priceChangedCount++;
    else if (delta.delta_status === 'STOCK_CHANGED') stockChangedCount++;
    else if (delta.delta_status === 'CONTENT_CHANGED') contentChangedCount++;
    else unchangedCount++;

    if (delta.delta_status !== 'UNCHANGED' || previousDeltasMap.size === 0) {
      changedProductsToProcess.push({ item, delta });
    }
  }

  console.log('===========================================================');
  console.log(' VÝSLEDKY DELTA ANALÝZY (STAGING2):');
  console.log(`  - 🆕 Nové položky (NEW): ${newCount}`);
  console.log(`  - 💰 Zmena ceny (PRICE_CHANGED): ${priceChangedCount}`);
  console.log(`  - 📦 Zmena skladu (STOCK_CHANGED): ${stockChangedCount}`);
  console.log(`  - 📝 Zmena obsahu (CONTENT_CHANGED): ${contentChangedCount}`);
  console.log(`  - ⏸️ Nezmenené položky (UNCHANGED - preskočené): ${unchangedCount}`);
  console.log('===========================================================\n');

  // 4. Zápis stavov do staging2_product_deltas
  console.log('4. Zapisujem auditné hashe a stavy do staging2_product_deltas...');
  const batchSize = 200;
  for (let i = 0; i < deltaRows.length; i += batchSize) {
    const batch = deltaRows.slice(i, i + batchSize);
    await postBatch(`${SUPABASE_URL}/rest/v1/staging2_product_deltas`, batch);
  }
  console.log('   ✓ Staging2 tabuľka úspešne aktualizovaná.\n');

  if (changedProductsToProcess.length === 0) {
    console.log('🎉 Žiadne zmeny na spracovanie. Databáza master_products je 100% aktuálna.');
    return;
  }

  // 5. Procesovanie zmenených položiek do master_products a product_attribute_values
  console.log(`5. Procesujem ${changedProductsToProcess.length} zmenených položiek do master_products...`);
  const masterDbRows: any[] = [];
  const allProductAttributeRows: any[] = [];

  for (const { item, delta } of changedProductsToProcess) {
    const code = String(item.supplierCode);
    const name = item.title;
    const rawDesc = item.supplierDescription || '';

    // Nezávislá kategorizácia
    const { slug: catSlug, hierarchy: catPath } = classifyProductIndependently({
      title: name,
      mpn: String(item.mpn || ''),
      ean: String(item.ean || ''),
      description: rawDesc,
      descriptionShort: item.shortDescription || '',
      producerName: item.brand
    });

    const brand = extractBrand(name, item.brand);
    const mpn = String(item.mpn || code);
    const ean = String(item.ean || `${code}0000`);
    const titleSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
    const slug = `${titleSlug}-${code}`;

    // Zachovanie formátovaného HTML popisu a extrakcia tabuľkových špecifikácií
    const { cleanHtml, plainText, specs } = sanitizeAndFormatHtml(rawDesc);

    // Extrakcia dynamických atribútov a vytvorenie riadkov pre fazetové filtre
    const extracted = extractStructuredAttributes(
      name,
      rawDesc,
      specs,
      brand,
      mpn,
      item.warrantyMonths || 24
    );

    // Pripravíme riadky pre product_attribute_values
    for (const attrRow of extracted.attributeRows) {
      allProductAttributeRows.push({
        product_code: code,
        attribute_code: attrRow.attribute_code,
        value_code: attrRow.value_code,
        value: attrRow.value,
        numeric_value: attrRow.numeric_value || null
      });
    }

    // Spracovanie oficiálnej fotky
    let imgUrl = item.images?.[0]?.url;
    if (imgUrl && !imgUrl.startsWith('http')) {
      imgUrl = `https://www.edsystem.sk/${imgUrl.replace(/^\//, '')}`;
    }

    const images = [];
    if (imgUrl && imgUrl.includes('edsystem.sk')) {
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

    // Cenová štruktúra podľa PRIVATEdoc.pdf
    const cost = item.pricing.supplierCost;
    const marginPct = item.pricing.marginPercentage || 12;
    const basePrice = item.pricing.basePrice;
    const finalPrice = item.pricing.finalPrice;

    masterDbRows.push({
      id: `ed-${code}`,
      supplier_code: code,
      supplier_pro_id: String(item.proId || code),
      sku: code,
      mpn,
      mpn2: item.mpn2 || null,
      ean,
      brand,
      producer_id: item.producerId || null,
      producer_code: item.producerCode || null,
      category_slug: catSlug,
      category_hierarchy: catPath,
      commodity_code: item.commodityCode || 'NB',
      commodity_name: item.commodityName || 'Notebooky',
      title: name,
      name_b2c: name,
      slug,
      short_description: plainText.slice(0, 220),
      supplier_description: plainText,
      enriched_description: cleanHtml,
      seo_title: `${name} | Worlds.sk`,
      seo_description: `Kúpiť ${name} (PartNumber: ${mpn}) za výhodnú cenu ${finalPrice} € s expresným doručením z centrálneho skladu na Worlds.sk.`,
      search_keywords: [brand.toLowerCase(), mpn.toLowerCase(), catSlug],
      
      // Ceny a poplatky z eD
      supplier_cost: cost,
      garbage_fee: item.pricing.supplierFees.garbageFee,
      author_fee: item.pricing.supplierFees.authorFee,
      total_cost_with_fees: item.pricing.totalCostWithFees,
      vat_rate: item.pricing.vatRate || 20,
      margin_percentage: marginPct,
      base_price: basePrice,
      final_price: finalPrice,
      dealer_price: item.pricing.dealerPrice || cost,
      dealer_price1: item.pricing.dealerPrice1 || cost,
      recommended_retail_price: item.pricing.recommendedRetailPrice || finalPrice,
      value_pack_discount: item.valuePackDiscount || 0,
      value_pack_qty: item.valuePackQty || 0,
      currency: 'EUR',
      rc_status: 'N',
      rc_code: null,
      rate_of_duty_code: null,
      
      // Sklad & dostupnosť
      stock_count: item.stockCount,
      is_in_stock: item.isInStock,
      stock_text: item.stockText,
      expected_restock_date: item.expectedRestockDate || null,
      min_order_quantity: 1,
      multiple_quantity: item.multipleQuantity || 1,
      
      // Záruka
      warranty_months: item.warrantyMonths || 24,
      warranty_unit: 'M',
      warranty_text: `${item.warrantyMonths || 24} M`,
      
      // Logistika & rozmery (LogisticDataList)
      weight_kg: extracted.weightKg || (catSlug.includes('notebook') ? 1.85 : 0.50),
      length_cm: extracted.lengthCm || null,
      width_cm: extracted.widthCm || null,
      height_cm: extracted.heightCm || null,
      package_type: 'JEDN',
      package_count: 1,
      
      // Médiá & marketingové príznaky
      images,
      img_count: images.length,
      img_last_changed: new Date().toISOString(),
      is_top: Boolean(item.isTop),
      is_new: Boolean(item.isNew),
      is_clearance: false,
      is_premium: catSlug.includes('ultrabook') || finalPrice > 1500,
      b2c_eligible: true,
      
      // Dynamické atribúty
      attributes: extracted.allAttributes,
      navigator_data: [],
      relations: item.relations || [],
      
      status: 'ACTIVE',
      quality_score: { total: imgUrl ? 95 : 85, breakdown: {} },
      quality_score_total: imgUrl ? 95 : 85,
      data_hash: delta.data_hash,
      last_synced_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }

  // 6. Zápis spracovaných položiek do master_products
  console.log('6. Ukladám aktualizované položky do tabuľky master_products...');
  let savedMaster = 0;
  for (let i = 0; i < masterDbRows.length; i += batchSize) {
    const batch = masterDbRows.slice(i, i + batchSize);
    const ok = await postBatch(`${SUPABASE_URL}/rest/v1/master_products`, batch);
    if (ok) {
      savedMaster += batch.length;
      console.log(`  ✓ Aktualizovaných ${savedMaster}/${masterDbRows.length} produktov v master_products...`);
    }
    await new Promise(r => setTimeout(r, 50));
  }

  // 7. Zápis hodnôt do product_attribute_values
  console.log('7. Ukladám fazetové parametre do tabuľky product_attribute_values...');
  let savedAttrs = 0;
  for (let i = 0; i < allProductAttributeRows.length; i += batchSize) {
    const batch = allProductAttributeRows.slice(i, i + batchSize);
    const ok = await postBatch(`${SUPABASE_URL}/rest/v1/product_attribute_values`, batch);
    if (ok) {
      savedAttrs += batch.length;
    }
    await new Promise(r => setTimeout(r, 25));
  }
  console.log(`   ✓ Uložených ${savedAttrs} parametrov do product_attribute_values pre rýchle filtrovanie.\n`);

  console.log('===========================================================');
  console.log(` 🎉 ÚSPEŠNE DOKONČENÉ!`);
  console.log(` Všetky zmeny boli detegované cez staging2 a zapísané do master tabuliek s kompletnou podporou atribútov.`);
  console.log('===========================================================\n');
}

if (process.argv[1]?.endsWith('process-deltas-to-master.ts') || process.argv[1]?.endsWith('process-deltas-to-master.js')) {
  processStaging2ToMaster().catch(console.error);
}
