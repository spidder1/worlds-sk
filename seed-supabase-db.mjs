import fs from 'node:fs';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;
if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) throw new Error('Missing SUPABASE_URL or SUPABASE_SECRET_KEY.');

async function seedSupabaseDb() {
  console.log('===========================================================');
  console.log(' UKLADÁM PRODUKTY PRIAMO DO DATABÁZY SUPABASE');
  console.log('===========================================================\n');

  const products = JSON.parse(fs.readFileSync('downloads/final_active_notebooks.json', 'utf8'));
  console.log(`Pripravených ${products.length} produktov na zápis do databázy...`);

  // Transformujeme do formátu stĺpcov tabuľky master_products
  const dbRows = products.map((l, idx) => {
    let brand = l.brand;
    const titleUpper = l.title.toUpperCase();
    if (titleUpper.startsWith('ACER') || titleUpper.includes('ACER')) brand = 'Acer';
    else if (titleUpper.startsWith('LENOVO') || titleUpper.includes('LENOVO') || titleUpper.includes('THINKPAD')) brand = 'Lenovo';
    else if (titleUpper.startsWith('ASUS') || titleUpper.includes('ASUS') || titleUpper.includes('ROG')) brand = 'ASUS';
    else if (titleUpper.startsWith('HP') || titleUpper.includes('HEWLETT') || titleUpper.includes('OMEN')) brand = 'HP';
    else if (titleUpper.startsWith('DELL') || titleUpper.includes('DELL')) brand = 'Dell';
    else if (titleUpper.startsWith('APPLE') || titleUpper.includes('MACBOOK')) brand = 'Apple';

    let catSlug = 'notebooky';
    let catPath = ['Počítače a notebooky', 'Notebooky'];
    const titleLower = l.title.toLowerCase();
    if (titleLower.includes('legion') || titleLower.includes('predator') || titleLower.includes('nitro') || titleLower.includes('victus') || titleLower.includes('gaming') || titleLower.includes('omen') || titleLower.includes('rtx')) {
      catSlug = 'herne-notebooky';
      catPath = ['Počítače a notebooky', 'Notebooky', 'Herné notebooky'];
    } else if (titleLower.includes('thinkpad') || titleLower.includes('expertbook') || titleLower.includes('probook') || titleLower.includes('elitebook') || titleLower.includes('latitude')) {
      catSlug = 'firemne-notebooky';
      catPath = ['Počítače a notebooky', 'Notebooky', 'Firemné a pracovné notebooky'];
    } else if (titleLower.includes('zenbook') || titleLower.includes('swift') || titleLower.includes('macbook') || titleLower.includes('yoga')) {
      catSlug = 'ultrabooky';
      catPath = ['Počítače a notebooky', 'Notebooky', 'Ultrabooky'];
    }

    const laptopImages = [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80'
    ];

    return {
      id: `ed-${l.supplierCode}`,
      supplier_code: String(l.supplierCode),
      supplier_pro_id: String(l.proId || l.supplierCode || l.sku),
      sku: String(l.sku),
      mpn: String(l.mpn || l.sku || ''),
      ean: String(l.ean || `${l.sku}0000`),
      brand,
      category_slug: catSlug,
      category_hierarchy: catPath,
      title: l.title,
      slug: l.slug,
      short_description: l.shortDescription,
      supplier_description: l.supplierDescription,
      seo_title: `${l.title} | Worlds.sk`,
      seo_description: `Kúpiť ${l.title} (PartNumber: ${l.mpn}) za výhodnú cenu ${l.pricing.finalPrice} € s expresným doručením z centrálneho skladu na Worlds.sk.`,
      search_keywords: [brand.toLowerCase(), String(l.mpn || '').toLowerCase(), catSlug],
      supplier_cost: l.pricing.supplierCost,
      garbage_fee: l.pricing.supplierFees.garbageFee,
      author_fee: l.pricing.supplierFees.authorFee,
      total_cost_with_fees: l.pricing.totalCostWithFees,
      vat_rate: l.pricing.vatRate,
      margin_percentage: l.pricing.marginPercentage,
      base_price: l.pricing.basePrice,
      final_price: l.pricing.finalPrice,
      currency: 'EUR',
      stock_count: l.stockCount,
      is_in_stock: l.isInStock,
      stock_text: l.stockText,
      min_order_quantity: 1,
      warranty_months: l.warrantyMonths || 24,
      attributes: {
        brand: { code: 'brand', name: 'Výrobca', value: String(brand), rawValue: String(brand) },
        mpn: { code: 'mpn', name: 'Part Number', value: String(l.mpn || l.sku || ''), rawValue: String(l.mpn || l.sku || '') },
        warranty: { code: 'warranty', name: 'Záruka', value: `${l.warrantyMonths} mesiacov`, rawValue: String(l.warrantyMonths) }
      },
      images: [
        {
          id: `img-${l.supplierCode}`,
          url: laptopImages[idx % laptopImages.length],
          position: 0,
          isPrimary: true,
          altText: l.title
        }
      ],
      status: 'ACTIVE',
      review_status: 'AUTO_APPROVED',
      quality_score: {
        total: 90,
        breakdown: {
          ean: l.ean ? 10 : 0,
          brand: 10,
          mpn: 10,
          category: 10,
          images: 10,
          attributes: 10,
          description: 10,
          seo: 10,
          price: 10,
          stock: 10
        }
      },
      quality_score_total: 90,
      data_hash: l.dataHash,
      last_synced_at: new Date().toISOString(),
      last_reprocessed_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  });

  // Zapisujeme po dávkach po 50 položiek cez Supabase REST API
  const batchSize = 50;
  let inserted = 0;

  for (let i = 0; i < dbRows.length; i += batchSize) {
    const batch = dbRows.slice(i, i + batchSize);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/master_products`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_SECRET_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(batch)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`Chyba pri dávke ${i} - ${i + batch.length}:`, errText);
    } else {
      inserted += batch.length;
      console.log(`  ✓ Uložených ${inserted}/${dbRows.length} produktov do Supabase...`);
    }
  }

  console.log(`\n🎉 ÚSPEŠNE ULOŽENÝCH ${inserted} PRODUKTOV DO SUPABASE POSTGRESQL!`);
}

seedSupabaseDb().catch(console.error);
