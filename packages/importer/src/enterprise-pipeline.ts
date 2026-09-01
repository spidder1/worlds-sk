import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { classifyProductIndependently } from './taxonomy-definition.js';
import { sanitizeAndFormatHtml } from './html-sanitizer.js';
import { extractStructuredAttributes } from './attribute-extractor.js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://jhgyzgdiapiewpjgosxm.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoZ3l6Z2RpYXBpZXdwamdvc3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwNzI2OTksImV4cCI6MjEwMzY0ODY5OX0.6SAAJarR0Er3LFFewmcJTN_oEE2OoEMLqUTQJRGA3hY';

async function rpcBatch(batch: any[], maxRetries = 3): Promise<boolean> {
  const url = `${SUPABASE_URL}/rest/v1/rpc/ingest_canonical_products_batch`;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: batch })
      });
      if (res.ok) return true;
      const err = await res.text();
      console.warn(`  [Pokus ${attempt}/${maxRetries}] RPC chyba: ${err.slice(0, 150)}`);
    } catch (e: any) {
      console.warn(`  [Pokus ${attempt}/${maxRetries}] Sieťová chyba: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 400 * attempt));
  }
  return false;
}

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

export async function runEnterpriseImportPipeline(limit?: number) {
  console.log('==============================================================================');
  console.log(' Worlds.sk - KOMPLETNÁ IMPLEMENTÁCIA PODĽA implementation.md & sql proposal.sql');
  console.log(` IMPORT: ${limit ? `${limit} záznamov` : 'VŠETKY DOSTUPNÉ IT PRODUKTY'}`);
  console.log('==============================================================================\n');

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
  const allActiveProducts = JSON.parse(fs.readFileSync(targetJsonPath, 'utf8'));
  const targetProducts = limit ? allActiveProducts.slice(0, limit) : allActiveProducts;
  console.log(`1. Načítaných a transformovaných ${targetProducts.length} aktívnych produktov.`);

  const batchPayload: any[] = [];

  for (const item of targetProducts) {
    const code = String(item.supplierCode);
    const name = item.title;
    const rawDesc = item.supplierDescription || '';
    const brand = extractBrand(name, item.brand);
    const mpn = String(item.mpn || code);
    const ean = String(item.ean || `${code}0000`);
    const titleSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
    const slug = `${titleSlug}-${code}`;

    const { slug: catSlug, hierarchy: catPath } = classifyProductIndependently({
      title: name,
      mpn,
      ean,
      description: rawDesc,
      descriptionShort: item.shortDescription || '',
      producerName: brand
    });
    const { cleanHtml, plainText, specs } = sanitizeAndFormatHtml(rawDesc);
    const extracted = extractStructuredAttributes(name, rawDesc, specs, brand, mpn, item.warrantyMonths || 24);

    let imgUrl = item.images?.[0]?.url;
    if (imgUrl && !imgUrl.startsWith('http')) {
      imgUrl = `https://www.edsystem.sk/${imgUrl.replace(/^\//, '')}`;
    }
    const finalImgUrl = (imgUrl && imgUrl.includes('edsystem.sk')) ? imgUrl : getCategoryPlaceholderImage(catSlug);

    const cost = item.pricing.supplierCost;
    const garbageFee = item.pricing.supplierFees.garbageFee;
    const authorFee = item.pricing.supplierFees.authorFee;
    const totalCost = item.pricing.totalCostWithFees;
    const vatRate = item.pricing.vatRate || 20;
    const marginPct = item.pricing.marginPercentage || 12;
    const basePrice = item.pricing.basePrice;
    const finalPrice = item.pricing.finalPrice;

    const contentHash = crypto.createHash('sha256').update(`${name}_${rawDesc}_${finalImgUrl}`).digest('hex');

    batchPayload.push({
      code,
      title: name,
      brand,
      mpn,
      ean,
      slug,
      enriched_description: cleanHtml,
      supplier_description: plainText,
      supplier_cost: cost,
      garbage_fee: garbageFee,
      author_fee: authorFee,
      total_cost_with_fees: totalCost,
      base_price: basePrice,
      final_price: finalPrice,
      vat_rate: vatRate,
      margin_percentage: marginPct,
      stock_count: item.stockCount,
      is_in_stock: item.isInStock,
      stock_text: item.stockText,
      warranty_months: item.warrantyMonths || 24,
      category_slug: catSlug,
      category_hierarchy: catPath,
      attributes: extracted.allAttributes,
      images: [{ id: `img-${code}-0`, url: finalImgUrl, position: 0, isPrimary: true, altText: name }],
      data_hash: contentHash
    });
  }

  console.log(`2. Vykonávam atomický zápis ${batchPayload.length} produktov do cieľových schém v dávkach...`);
  
  const chunkSize = 50;
  let successCount = 0;

  for (let i = 0; i < batchPayload.length; i += chunkSize) {
    const chunk = batchPayload.slice(i, i + chunkSize);
    const ok = await rpcBatch(chunk);
    if (ok) {
      successCount += chunk.length;
      process.stdout.write(`   ✓ Zapísaných ${successCount} / ${batchPayload.length} produktov...\r`);
    } else {
      console.warn(`   ⚠️ Problém so zápisom bloku ${i} - ${i + chunk.length}`);
    }
  }

  console.log(`\n\n==============================================================================`);
  console.log(` 🎉 ÚSPECH! SPRACOVANÝCH ${successCount} ZÁZNAMOV V PLNOM ROZSAHU CIEĽOVEJ ARCHITEKTÚRY!`);
  console.log('==============================================================================\n');
}

const args = process.argv.slice(2);
const limitArg = args.find(a => a.startsWith('--limit='));
let limit: number | undefined = undefined;

if (limitArg) {
  const val = limitArg.split('=')[1];
  if (val !== 'all') {
    limit = parseInt(val, 10);
  }
} else if (args.includes('--all')) {
  limit = undefined;
}

runEnterpriseImportPipeline(limit).catch(console.error);
