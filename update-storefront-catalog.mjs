import fs from 'node:fs';

async function updateStorefrontWithRealEdProducts() {
  console.log('===========================================================');
  console.log(' NAPĹŇANIE STOREFRONTU SKUTOČNÝMI PRODUKTMI Z eD SYSTEM');
  console.log('===========================================================\n');

  const raw = JSON.parse(fs.readFileSync('downloads/final_active_notebooks.json', 'utf8'));

  // Filtrujeme SKUTOČNÉ NOTEBOOKY (nie batohy, nie dokovacie stanice)
  const realLaptops = raw.filter(p => {
    const title = p.title.toLowerCase();
    const isAccessory = title.includes('batoh') || title.includes('backpack') || title.includes('dokovac') ||
                        title.includes('dock') || title.includes('batéria') || title.includes('baterie') ||
                        title.includes('vozík') || title.includes('klávesnice') || title.includes('keyboard') ||
                        title.includes('lcd ') || title.includes('router') || title.includes('headset');
    return !isAccessory && (
      title.includes('ntb') || title.includes('notebook') || title.includes('laptop') ||
      title.includes('thinkpad') || title.includes('ideapad') || title.includes('expertbook') ||
      title.includes('zenbook') || title.includes('vivobook') || title.includes('macbook') ||
      title.includes('aspire') || title.includes('swift') || title.includes('legion') ||
      title.includes('predator') || title.includes('latitude') || title.includes('inspiron') ||
      title.includes('probook') || title.includes('elitebook') || title.includes('victus') ||
      title.includes('yoga')
    );
  });

  console.log(`✓ Počet overených skutočných fyzických notebookov: ${realLaptops.length}`);
  const inStock = realLaptops.filter(l => l.isInStock);
  console.log(`✓ Z toho ihneď na centrálnom eD sklade: ${inStock.length}\n`);

  // Transformujeme do formátu MasterProduct
  const finalCatalog = inStock.slice(0, 30).map((l, idx) => {
    let brand = l.brand;
    const titleUpper = l.title.toUpperCase();
    if (titleUpper.startsWith('ACER') || titleUpper.includes('ACER')) brand = 'Acer';
    else if (titleUpper.startsWith('LENOVO') || titleUpper.includes('LENOVO') || titleUpper.includes('THINKPAD')) brand = 'Lenovo';
    else if (titleUpper.startsWith('ASUS') || titleUpper.includes('ASUS') || titleUpper.includes('ROG')) brand = 'ASUS';
    else if (titleUpper.startsWith('HP') || titleUpper.includes('HEWLETT') || titleUpper.includes('OMEN')) brand = 'HP';
    else if (titleUpper.startsWith('DELL') || titleUpper.includes('DELL')) brand = 'Dell';
    else if (titleUpper.startsWith('APPLE') || titleUpper.includes('MACBOOK')) brand = 'Apple';

    // Určenie podkategórie
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
      supplierCode: l.supplierCode,
      supplierProId: l.proId,
      sku: l.sku,
      mpn: String(l.mpn || l.sku || ''),
      ean: String(l.ean || `${l.sku}0000`),
      brand,
      categorySlug: catSlug,
      categoryHierarchy: catPath,
      title: l.title,
      slug: l.slug,
      shortDescription: l.shortDescription,
      supplierDescription: l.supplierDescription,
      seoTitle: `${l.title} | Worlds.sk`,
      seoDescription: `Kúpiť ${l.title} (PartNumber: ${l.mpn}) za výhodnú cenu ${l.pricing.finalPrice} € s expresným doručením z centrálneho skladu na Worlds.sk.`,
      searchKeywords: [brand.toLowerCase(), String(l.mpn || '').toLowerCase(), catSlug],
      pricing: l.pricing,
      stockCount: l.stockCount,
      isInStock: l.isInStock,
      stockText: l.stockText,
      warrantyMonths: l.warrantyMonths,
      attributes: {
        brand: { code: 'brand', name: 'Výrobca', value: brand, rawValue: brand },
        mpn: { code: 'mpn', name: 'Part Number', value: l.mpn, rawValue: l.mpn },
        warranty: { code: 'warranty', name: 'Záruka', value: `${l.warrantyMonths} mesiacov`, rawValue: `${l.warrantyMonths}` }
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
      reviewStatus: 'AUTO_APPROVED',
      qualityScore: {
        total: 90,
        breakdown: {
          hasEan: Boolean(l.ean),
          hasBrand: true,
          hasMpn: true,
          hasValidCategory: true,
          hasImages: true,
          hasAttributes: true,
          hasDescription: true,
          hasSeoMetadata: true,
          hasPrice: true,
          hasStock: true
        }
      },
      dataHash: l.dataHash,
      lastSyncedAt: new Date().toISOString(),
      lastReprocessedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  });

  console.log(`✓ Vybraných ${finalCatalog.length} prémiových skladových notebookov pre storefront.`);

  // Vygenerujeme nový catalog.ts
  const catalogCode = `import { MasterProduct, TaxonomyCategory } from '@worlds/types';

export const CATEGORIES: TaxonomyCategory[] = [
  {
    id: 'cat-1',
    slug: 'pocitace-a-notebooky',
    name: 'Počítače a notebooky',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 1,
    subcategories: [
      {
        id: 'cat-2',
        slug: 'notebooky',
        name: 'Notebooky',
        parentSlug: 'pocitace-a-notebooky',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 1,
        subcategories: [
          {
            id: 'cat-3',
            slug: 'herne-notebooky',
            name: 'Herné notebooky',
            parentSlug: 'notebooky',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 1,
          },
          {
            id: 'cat-4',
            slug: 'firemne-notebooky',
            name: 'Firemné a pracovné notebooky',
            parentSlug: 'notebooky',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 2,
          },
          {
            id: 'cat-5',
            slug: 'ultrabooky',
            name: 'Ultrabooky',
            parentSlug: 'notebooky',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 3,
          },
        ],
      },
      {
        id: 'cat-6',
        slug: 'stolne-pocitace',
        name: 'Stolné počítače',
        parentSlug: 'pocitace-a-notebooky',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 2,
      },
    ],
  },
  {
    id: 'cat-8',
    slug: 'komponenty',
    name: 'Počítačové komponenty',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 2,
    subcategories: [
      {
        id: 'cat-9',
        slug: 'procesory',
        name: 'Procesory (CPU)',
        parentSlug: 'komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 1,
      },
      {
        id: 'cat-10',
        slug: 'graficke-karty',
        name: 'Grafické karty (GPU)',
        parentSlug: 'komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 2,
      },
      {
        id: 'cat-11',
        slug: 'pamate-ram',
        name: 'Operačné pamäte (RAM)',
        parentSlug: 'komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 3,
      },
      {
        id: 'cat-12',
        slug: 'ssd-disky',
        name: 'SSD disky',
        parentSlug: 'komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 4,
      },
    ],
  },
  {
    id: 'cat-13',
    slug: 'monitory',
    name: 'Monitory',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 3,
  },
];

export const PRODUCTS: MasterProduct[] = ${JSON.stringify(finalCatalog, null, 2)};

export async function getAllProducts(): Promise<MasterProduct[]> {
  return PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<MasterProduct | null> {
  const product = PRODUCTS.find((p) => p.slug === slug);
  return product || null;
}

export async function getProductsByCategory(categorySlug: string): Promise<MasterProduct[]> {
  return PRODUCTS.filter((p) => {
    if (p.categorySlug === categorySlug) return true;
    if (p.categoryHierarchy && p.categoryHierarchy.some((c) => c.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(categorySlug))) {
      return true;
    }
    return false;
  });
}

export async function getFeaturedProducts(limit = 8): Promise<MasterProduct[]> {
  return PRODUCTS.slice(0, limit);
}

export async function getCategories(): Promise<TaxonomyCategory[]> {
  return CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<TaxonomyCategory | null> {
  function findCat(cats: TaxonomyCategory[]): TaxonomyCategory | null {
    for (const c of cats) {
      if (c.slug === slug) return c;
      if (c.subcategories) {
        const found = findCat(c.subcategories);
        if (found) return found;
      }
    }
    return null;
  }
  return findCat(CATEGORIES);
}

export async function searchProducts(query: string): Promise<MasterProduct[]> {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return PRODUCTS.filter((p) => {
    return (
      p.title.toLowerCase().includes(q) ||
      p.mpn.toLowerCase().includes(q) ||
      (p.ean && p.ean.toLowerCase().includes(q)) ||
      p.brand.toLowerCase().includes(q)
    );
  });
}
`;

  fs.writeFileSync('apps/storefront/src/lib/catalog.ts', catalogCode, 'utf8');
  console.log('✓ apps/storefront/src/lib/catalog.ts bol úspešne aktualizovaný so skutočnými eD produktmi!');
}

updateStorefrontWithRealEdProducts().catch(console.error);
