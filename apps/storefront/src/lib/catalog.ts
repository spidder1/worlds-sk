import { MasterProduct, TaxonomyCategory } from '@worlds/types';
import { supabase } from './supabase-client';

export const CATEGORIES: TaxonomyCategory[] = [
  {
    id: 'cat-pocitace-a-notebooky',
    slug: 'pocitace-a-notebooky',
    name: 'Počítače a notebooky',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 1,
    allowedFilterAttributes: ['brand', 'cpu_family', 'ram_gb', 'ssd_gb', 'screen_size_inch', 'gpu_model'],
    subcategories: [
      {
        id: 'cat-notebooky',
        slug: 'notebooky',
        name: 'Notebooky',
        parentSlug: 'pocitace-a-notebooky',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 1,
        allowedFilterAttributes: ['brand', 'cpu_family', 'ram_gb', 'ssd_gb', 'screen_size_inch', 'gpu_model'],
        subcategories: [
          {
            id: 'cat-herne-notebooky',
            slug: 'herne-notebooky',
            name: 'Herné notebooky',
            parentSlug: 'notebooky',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 1,
            allowedFilterAttributes: ['brand', 'gpu_model', 'cpu_family', 'ram_gb', 'screen_size_inch'],
          },
          {
            id: 'cat-firemne-notebooky',
            slug: 'firemne-notebooky',
            name: 'Firemné a pracovné notebooky',
            parentSlug: 'notebooky',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 2,
            allowedFilterAttributes: ['brand', 'cpu_family', 'ram_gb', 'ssd_gb'],
          },
          {
            id: 'cat-ultrabooky',
            slug: 'ultrabooky',
            name: 'Ultrabooky a kompaktné',
            parentSlug: 'notebooky',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 3,
            allowedFilterAttributes: ['brand', 'screen_size_inch', 'ram_gb', 'ssd_gb'],
          },
          {
            id: 'cat-2v1-dotykove',
            slug: '2v1-a-dotykove-notebooky',
            name: '2v1 a dotykové notebooky',
            parentSlug: 'notebooky',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 4,
            allowedFilterAttributes: ['brand', 'screen_size_inch', 'ram_gb'],
          },
        ],
      },
      {
        id: 'cat-stolne-pocitace',
        slug: 'stolne-pocitace',
        name: 'Stolné počítače',
        parentSlug: 'pocitace-a-notebooky',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 2,
        allowedFilterAttributes: ['brand', 'cpu_family', 'ram_gb', 'ssd_gb', 'gpu_model'],
        subcategories: [
          {
            id: 'cat-herne-pc',
            slug: 'herne-pocitace',
            name: 'Herné počítače',
            parentSlug: 'stolne-pocitace',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 1,
            allowedFilterAttributes: ['brand', 'gpu_model', 'cpu_family', 'ram_gb'],
          },
          {
            id: 'cat-kancelarske-pc',
            slug: 'kancelarske-pocitace',
            name: 'Kancelárske a domáce PC',
            parentSlug: 'stolne-pocitace',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 2,
            allowedFilterAttributes: ['brand', 'cpu_family', 'ram_gb', 'ssd_gb'],
          },
          {
            id: 'cat-all-in-one',
            slug: 'all-in-one-pocitace',
            name: 'All-in-One PC (v monitore)',
            parentSlug: 'stolne-pocitace',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 3,
            allowedFilterAttributes: ['brand', 'screen_size_inch', 'ram_gb'],
          },
          {
            id: 'cat-mini-pc',
            slug: 'mini-pc',
            name: 'Mini PC a HTPC',
            parentSlug: 'stolne-pocitace',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 4,
            allowedFilterAttributes: ['brand', 'cpu_family', 'ram_gb'],
          },
        ],
      },
      {
        id: 'cat-servery',
        slug: 'servery-a-workstation',
        name: 'Servery a pracovné stanice',
        parentSlug: 'pocitace-a-notebooky',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 3,
        allowedFilterAttributes: ['brand', 'cpu_family', 'ram_gb'],
      },
    ],
  },
  {
    id: 'cat-pocitacove-komponenty',
    slug: 'pocitacove-komponenty',
    name: 'Počítačové komponenty',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 2,
    allowedFilterAttributes: ['brand', 'socket', 'chipset', 'capacity_gb'],
    subcategories: [
      {
        id: 'cat-procesory',
        slug: 'procesory',
        name: 'Procesory (CPU)',
        parentSlug: 'pocitacove-komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 1,
        allowedFilterAttributes: ['brand', 'socket', 'cpu_family', 'cores_count'],
      },
      {
        id: 'cat-graficke-karty',
        slug: 'graficke-karty',
        name: 'Grafické karty (GPU)',
        parentSlug: 'pocitacove-komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 2,
        allowedFilterAttributes: ['brand', 'gpu_chip', 'vram_gb', 'interface'],
      },
      {
        id: 'cat-pamate-ram',
        slug: 'pamate-ram',
        name: 'Operačné pamäte (RAM)',
        parentSlug: 'pocitacove-komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 3,
        allowedFilterAttributes: ['brand', 'ram_type', 'capacity_gb', 'frequency_mhz'],
      },
      {
        id: 'cat-ssd-a-disky',
        slug: 'ssd-a-pevne-disky',
        name: 'SSD disky a úložiská',
        parentSlug: 'pocitacove-komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 4,
        allowedFilterAttributes: ['brand', 'capacity_gb', 'form_factor', 'interface'],
      },
      {
        id: 'cat-zakladne-dosky',
        slug: 'zakladne-dosky',
        name: 'Základné dosky',
        parentSlug: 'pocitacove-komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 5,
        allowedFilterAttributes: ['brand', 'socket', 'chipset', 'form_factor'],
      },
      {
        id: 'cat-pocitacove-zdroje',
        slug: 'pocitacove-zdroje',
        name: 'Počítačové zdroje (PSU)',
        parentSlug: 'pocitacove-komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 6,
        allowedFilterAttributes: ['brand', 'power_w', 'efficiency_rating'],
      },
      {
        id: 'cat-pocitacove-skrinky',
        slug: 'pocitacove-skrinky',
        name: 'Počítačové skrinky (Case)',
        parentSlug: 'pocitacove-komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 7,
        allowedFilterAttributes: ['brand', 'form_factor', 'color'],
      },
      {
        id: 'cat-chladenie-pc',
        slug: 'chladenie-pc',
        name: 'Chladenie a ventilátory',
        parentSlug: 'pocitacove-komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 8,
        allowedFilterAttributes: ['brand', 'cooling_type', 'socket'],
      },
    ],
  },
  {
    id: 'cat-monitory-a-displeje',
    slug: 'monitory-a-displeje',
    name: 'Monitory a displeje',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 3,
    allowedFilterAttributes: ['brand', 'screen_size_inch', 'resolution', 'refresh_rate_hz', 'panel_type'],
  },
  {
    id: 'cat-prislusenstvo-a-periferie',
    slug: 'prislusenstvo-a-periferie',
    name: 'Príslušenstvo a periférie',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 4,
    allowedFilterAttributes: ['brand', 'connection_type'],
    subcategories: [
      {
        id: 'cat-klavesnice-a-mysi',
        slug: 'klavesnice-a-mysi',
        name: 'Klávesnice a myši',
        parentSlug: 'prislusenstvo-a-periferie',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 1,
        allowedFilterAttributes: ['brand', 'connection_type', 'switch_type'],
      },
      {
        id: 'cat-sluchadla-a-headsety',
        slug: 'sluchadla-a-headsety',
        name: 'Slúchadlá a headsety',
        parentSlug: 'prislusenstvo-a-periferie',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 2,
        allowedFilterAttributes: ['brand', 'connection_type'],
      },
      {
        id: 'cat-dokovacie-stanice',
        slug: 'dokovacie-stanice',
        name: 'Dokovacie stanice a USB huby',
        parentSlug: 'prislusenstvo-a-periferie',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 3,
        allowedFilterAttributes: ['brand', 'interface'],
      },
      {
        id: 'cat-webkamery-a-mikrofony',
        slug: 'webkamery-a-mikrofony',
        name: 'Webkamery a mikrofóny',
        parentSlug: 'prislusenstvo-a-periferie',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 4,
        allowedFilterAttributes: ['brand', 'resolution'],
      },
      {
        id: 'cat-reproduktory-pc',
        slug: 'reproduktory-k-pc',
        name: 'Reproduktory k počítaču',
        parentSlug: 'prislusenstvo-a-periferie',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 5,
        allowedFilterAttributes: ['brand', 'power_w'],
      },
    ],
  },
  {
    id: 'cat-sietove-prvky-a-wifi',
    slug: 'sietove-prvky-a-wifi',
    name: 'Sieťové prvky a Wi-Fi',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 5,
    allowedFilterAttributes: ['brand', 'wifi_standard', 'ports_count'],
    subcategories: [
      {
        id: 'cat-wifi-routere',
        slug: 'wifi-routere-a-mesh',
        name: 'Wi-Fi routere a Mesh systémy',
        parentSlug: 'sietove-prvky-a-wifi',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 1,
        allowedFilterAttributes: ['brand', 'wifi_standard'],
      },
      {
        id: 'cat-switche',
        slug: 'switche-a-prepinace',
        name: 'Switche a sieťové prepínače',
        parentSlug: 'sietove-prvky-a-wifi',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 2,
        allowedFilterAttributes: ['brand', 'ports_count', 'poe_support'],
      },
      {
        id: 'cat-nas-uloziska',
        slug: 'nas-sietove-uloziska',
        name: 'NAS sieťové dátové úložiská',
        parentSlug: 'sietove-prvky-a-wifi',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 3,
        allowedFilterAttributes: ['brand', 'bays_count'],
      },
    ],
  },
  {
    id: 'cat-tlaciarne-a-kancelaria',
    slug: 'tlaciarne-a-kancelaria',
    name: 'Tlačiarne a kancelária',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 6,
    allowedFilterAttributes: ['brand', 'print_technology'],
    subcategories: [
      {
        id: 'cat-tlaciarne-multifunkcie',
        slug: 'tlaciarne-a-multifunkcie',
        name: 'Tlačiarne a multifunkčné zariadenia',
        parentSlug: 'tlaciarne-a-kancelaria',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 1,
        allowedFilterAttributes: ['brand', 'print_technology', 'color_print'],
      },
      {
        id: 'cat-tonery-a-naplne',
        slug: 'tonery-a-naplne',
        name: 'Tonery, cartridge a náplne',
        parentSlug: 'tlaciarne-a-kancelaria',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 2,
        allowedFilterAttributes: ['brand', 'color'],
      },
      {
        id: 'cat-skenery',
        slug: 'skenery',
        name: 'Dokumentové skenery',
        parentSlug: 'tlaciarne-a-kancelaria',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 3,
        allowedFilterAttributes: ['brand'],
      },
    ],
  },
  {
    id: 'cat-napajanie-a-kable',
    slug: 'napajanie-a-kable',
    name: 'Napájanie, záložné zdroje a káble',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 7,
    allowedFilterAttributes: ['brand', 'cable_type'],
    subcategories: [
      {
        id: 'cat-ups-zalozne-zdroje',
        slug: 'ups-zalozne-zdroje',
        name: 'UPS záložné zdroje a prepäťové ochrany',
        parentSlug: 'napajanie-a-kable',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 1,
        allowedFilterAttributes: ['brand', 'power_va'],
      },
      {
        id: 'cat-kable-a-redukcie',
        slug: 'kable-a-redukcie',
        name: 'Káble, redukcie a adaptéry (HDMI, DP, USB-C)',
        parentSlug: 'napajanie-a-kable',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 2,
        allowedFilterAttributes: ['brand', 'cable_type', 'length_m'],
      },
      {
        id: 'cat-nabijacky-adaptery',
        slug: 'nabijacky-a-adaptery',
        name: 'Nabíjačky a napájacie adaptéry',
        parentSlug: 'napajanie-a-kable',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 3,
        allowedFilterAttributes: ['brand', 'power_w'],
      },
    ],
  },
  {
    id: 'cat-pamatove-media',
    slug: 'pamatove-media-a-usb',
    name: 'Pamäťové médiá a USB',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 8,
    allowedFilterAttributes: ['brand', 'capacity_gb'],
    subcategories: [
      {
        id: 'cat-usb-flash-disky',
        slug: 'usb-flash-disky',
        name: 'USB flash disky',
        parentSlug: 'pamatove-media-a-usb',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 1,
        allowedFilterAttributes: ['brand', 'capacity_gb', 'interface'],
      },
      {
        id: 'cat-externe-disky',
        slug: 'externe-disky-ssd-hdd',
        name: 'Externé disky (SSD a HDD)',
        parentSlug: 'pamatove-media-a-usb',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 2,
        allowedFilterAttributes: ['brand', 'capacity_gb', 'disk_type'],
      },
      {
        id: 'cat-pamatove-karty',
        slug: 'pamatove-karty-sd',
        name: 'Pamäťové karty (SD / microSD)',
        parentSlug: 'pamatove-media-a-usb',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 3,
        allowedFilterAttributes: ['brand', 'capacity_gb', 'card_type'],
      },
    ],
  },
];

// Supabase row typing is generated at runtime for this legacy view boundary.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDbRowToMasterProduct(row: any): MasterProduct {
  return {
    id: row.id,
    supplierCode: row.supplier_code,
    supplierProId: row.supplier_pro_id || row.supplier_code,
    sku: row.sku,
    mpn: row.mpn,
    mpn2: row.mpn2,
    ean: row.ean,
    brand: row.brand,
    rawBrand: row.raw_brand,
    categorySlug: row.category_slug,
    categoryHierarchy: Array.isArray(row.category_hierarchy) ? row.category_hierarchy : ['Počítače a IT'],
    commodityCode: row.commodity_code,
    commodityName: row.commodity_name,
    title: row.title,
    slug: row.slug,
    shortDescription: row.short_description,
    supplierDescription: row.supplier_description,
    enrichedDescription: row.enriched_description,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    searchKeywords: Array.isArray(row.search_keywords) ? row.search_keywords : [],
    pricing: {
      supplierCost: Number(row.supplier_cost || 0),
      supplierFees: {
        garbageFee: Number(row.garbage_fee || 0),
        authorFee: Number(row.author_fee || 0),
      },
      totalCostWithFees: Number(row.total_cost_with_fees || row.supplier_cost || 0),
      vatRate: Number(row.vat_rate || 20),
      marginPercentage: Number(row.margin_percentage || 12),
      basePrice: Number(row.base_price || 0),
      finalPrice: Number(row.final_price || 0),
      recommendedRetailPrice: row.recommended_retail_price ? Number(row.recommended_retail_price) : undefined,
      currency: row.currency || 'EUR',
    },
    stockCount: Number(row.stock_count || 0),
    isInStock: Boolean(row.is_in_stock),
    stockText: row.stock_text,
    expectedRestockDate: row.expected_restock_date,
    minOrderQuantity: row.min_order_quantity || 1,
    warrantyMonths: Number(row.warranty_months ?? 0),
    attributes: typeof row.attributes === 'object' && row.attributes !== null ? row.attributes : {},
    images: Array.isArray(row.images) ? row.images : [],
    dimensions: row.dimensions,
    status: row.status || 'ACTIVE',
    reviewStatus: row.review_status || 'AUTO_APPROVED',
    aiEnrichment: row.ai_enrichment,
    qualityScore: typeof row.quality_score === 'object' && row.quality_score !== null ? row.quality_score : { total: 0, breakdown: {} },
    dataHash: row.data_hash || '',
    lastSyncedAt: row.last_synced_at || new Date().toISOString(),
    lastReprocessedAt: row.last_reprocessed_at || new Date().toISOString(),
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
  };
}

const STOREFRONT_PRODUCT_COLUMNS = [
  'id', 'supplier_code', 'supplier_pro_id', 'sku', 'mpn', 'ean', 'brand',
  'category_slug', 'category_hierarchy', 'commodity_code', 'commodity_name',
  'title', 'name_b2c', 'slug', 'short_description', 'supplier_description',
  'enriched_description', 'seo_title', 'seo_description', 'search_keywords',
  'vat_rate', 'base_price', 'final_price', 'currency', 'stock_count',
  'is_in_stock', 'stock_text', 'min_order_quantity', 'warranty_months',
  'warranty_unit', 'attributes', 'images', 'status', 'data_hash',
  'last_synced_at', 'created_at', 'updated_at',
].join(',');

export const PRODUCTS_PER_PAGE = 24;

export type ProductSort = 'recommended' | 'price_asc' | 'price_desc' | 'name';

export interface ProductPageOptions {
  page?: number;
  pageSize?: number;
  categorySlug?: string;
  query?: string;
  brand?: string;
  inStockOnly?: boolean;
  sort?: ProductSort;
}

export interface ManufacturerItem {
  name: string;
  count: number;
}

export interface ProductPageResult {
  products: MasterProduct[];
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
}

function collectCategorySlugs(category: TaxonomyCategory): string[] {
  return [category.slug, ...(category.subcategories?.flatMap(collectCategorySlugs) ?? [])];
}

function normalizeSearchQuery(query: string): string {
  return query
    .trim()
    .replace(/[^\p{L}\p{N}\s._-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .slice(0, 80);
}

export async function getManufacturers(): Promise<ManufacturerItem[]> {
  try {
    // Real catalogue-wide counts. The sampled fallback below only counts brands
    // within the rows it happens to fetch, so its numbers are not catalogue totals.
    const { data: grouped, error: groupedError } = await supabase.rpc('get_storefront_brand_counts', { p_limit: 16 });
    if (!groupedError && Array.isArray(grouped) && grouped.length > 0) {
      return grouped.map((row: { name: string; count: number }) => ({
        name: row.name,
        count: Number(row.count),
      }));
    }
    if (groupedError) {
      console.error('getManufacturers: brand count RPC failed, falling back to sampling:', groupedError.message);
    }

    const { data, error } = await supabase
      .from('storefront_products')
      .select('brand')
      .neq('brand', 'Unbranded')
      .limit(2000);

    if (error) {
      console.error('getManufacturers: Supabase query failed:', error.message);
    }

    if (!data || data.length === 0) {
      return [
        { name: 'HPE', count: 15889 },
        { name: 'HP', count: 2946 },
        { name: 'Lenovo', count: 2500 },
        { name: 'Asus', count: 1800 },
        { name: 'Dell', count: 1500 },
        { name: 'Acer', count: 1400 },
        { name: 'Apple', count: 950 },
        { name: 'Samsung', count: 1200 },
        { name: 'Zebra', count: 1237 },
        { name: 'Canon', count: 864 },
        { name: 'PremiumCord', count: 871 },
        { name: 'AVACOM', count: 700 },
      ];
    }

    const counts = new Map<string, number>();
    for (const item of data) {
      const b = item.brand?.trim();
      if (b && b !== 'Unbranded') {
        counts.set(b, (counts.get(b) || 0) + 1);
      }
    }

    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 16);
  } catch {
    return [
      { name: 'HPE', count: 15889 },
      { name: 'HP', count: 2946 },
      { name: 'Lenovo', count: 2500 },
      { name: 'Asus', count: 1800 },
      { name: 'Dell', count: 1500 },
      { name: 'Acer', count: 1400 },
      { name: 'Apple', count: 950 },
      { name: 'Samsung', count: 1200 },
    ];
  }
}

/**
 * Server-side, price-safe catalogue pagination.
 */
export async function getProductsPage(options: ProductPageOptions = {}): Promise<ProductPageResult> {
  const pageSize = Math.min(60, Math.max(1, Math.floor(options.pageSize ?? PRODUCTS_PER_PAGE)));
  const page = Math.max(1, Math.floor(options.page ?? 1));
  const from = (page - 1) * pageSize;
  const query = normalizeSearchQuery(options.query ?? '');

  let request = supabase
    .from('storefront_products')
    .select(STOREFRONT_PRODUCT_COLUMNS, { count: 'exact' });

  if (options.categorySlug) {
    const category = await getCategoryBySlug(options.categorySlug);
    const slugs = category ? collectCategorySlugs(category) : [options.categorySlug];
    request = request.in('category_slug', slugs);
  }

  if (options.brand) {
    const cleanBrand = options.brand.trim();
    request = request.ilike('brand', `%${cleanBrand}%`);
  }

  if (options.inStockOnly) request = request.eq('is_in_stock', true).gt('stock_count', 0);
  if (query) {
    const qClean = query.replace(/[%_]/g, '');
    request = request.or(`title.ilike.%${qClean}%,mpn.ilike.%${qClean}%,brand.ilike.%${qClean}%,ean.ilike.%${qClean}%,sku.ilike.%${qClean}%`);
  }

  switch (options.sort) {
    case 'price_asc':
      request = request.order('final_price', { ascending: true }).order('id', { ascending: true });
      break;
    case 'price_desc':
      request = request.order('final_price', { ascending: false }).order('id', { ascending: true });
      break;
    case 'name':
      request = request.order('title', { ascending: true }).order('id', { ascending: true });
      break;
    default:
      request = request
        .order('is_in_stock', { ascending: false })
        .order('updated_at', { ascending: false })
        .order('id', { ascending: true });
  }

  const { data, error, count } = await request.range(from, from + pageSize - 1);
  if (error) {
    console.error('Chyba pri stránkovanom čítaní katalógu:', error.message);
    return { products: [], page, pageSize, total: 0, pageCount: 0 };
  }

  const total = count ?? 0;
  return {
    products: (data ?? []).map(mapDbRowToMasterProduct),
    page,
    pageSize,
    total,
    pageCount: total === 0 ? 0 : Math.ceil(total / pageSize),
  };
}

/**
 * Získanie všetkých produktov priamo z PostgreSQL databázy Supabase
 */
export async function getAllProducts(): Promise<MasterProduct[]> {
  return (await getProductsPage({ pageSize: 60 })).products;
}

/**
 * Získanie detailu produktu podľa slug priamo z PostgreSQL databázy Supabase (s multi-strategy fallbackom)
 */
export async function getProductBySlug(slug: string): Promise<MasterProduct | null> {
  try {
    const cleanSlug = decodeURIComponent(slug).trim();
    if (!/^[a-zA-Z0-9-]{1,200}$/.test(cleanSlug)) return null;

    // 1. Priama zhoda na slug
    const { data: directMatch } = await supabase
      .from('storefront_products')
      .select(STOREFRONT_PRODUCT_COLUMNS)
      .eq('slug', cleanSlug)
      .maybeSingle();

    if (directMatch) {
      return mapDbRowToMasterProduct(directMatch);
    }

    // 2. Extrakcia SKU / kódu z konca slugu (napr. text-1523510 -> 1523510)
    const trailingSkuMatch = cleanSlug.match(/-([0-9a-zA-Z]+)$/);
    if (trailingSkuMatch && trailingSkuMatch[1]) {
      const extractedSku = trailingSkuMatch[1];
      const { data: skuMatch } = await supabase
        .from('storefront_products')
        .select(STOREFRONT_PRODUCT_COLUMNS)
        .or(`sku.eq.${extractedSku},supplier_code.eq.${extractedSku}`)
        .maybeSingle();

      if (skuMatch) {
        return mapDbRowToMasterProduct(skuMatch);
      }
    }

    // 3. Priame SKU / ID / MPN
    const { data: idOrSkuMatch } = await supabase
      .from('storefront_products')
      .select(STOREFRONT_PRODUCT_COLUMNS)
      .or(`sku.eq.${cleanSlug},supplier_code.eq.${cleanSlug},mpn.eq.${cleanSlug},id.eq.${cleanSlug}`)
      .maybeSingle();

    if (idOrSkuMatch) {
      return mapDbRowToMasterProduct(idOrSkuMatch);
    }

    // 4. Fuzzy slug match
    const { data: fuzzyMatches } = await supabase
      .from('storefront_products')
      .select(STOREFRONT_PRODUCT_COLUMNS)
      .ilike('slug', `%${cleanSlug}%`)
      .limit(1);

    if (fuzzyMatches && fuzzyMatches.length > 0) {
      return mapDbRowToMasterProduct(fuzzyMatches[0]);
    }

    return null;
  } catch (e) {
    console.error(`Chyba pri čítaní produktu ${slug} z databázy:`, e);
    return null;
  }
}

/**
 * Získanie produktov podľa kategórie priamo z databázy Supabase
 */
export async function getProductsByCategory(categorySlug: string): Promise<MasterProduct[]> {
  return (await getProductsPage({ categorySlug, pageSize: 60 })).products;
}

/**
 * Získanie odporúčaných / skladových produktov pre homepage
 */
export async function getFeaturedProducts(limit = 8): Promise<MasterProduct[]> {
  try {
    const { data, error } = await supabase
      .from('storefront_products')
      .select(STOREFRONT_PRODUCT_COLUMNS)
      .eq('is_in_stock', true)
      .order('final_price', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('getFeaturedProducts: Supabase query failed:', error.message);
      return [];
    }
    if (!data || data.length === 0) {
      return [];
    }

    return data.map(mapDbRowToMasterProduct);
  } catch (e) {
    console.error('Chyba pri čítaní featured produktov z databázy:', e);
    return [];
  }
}

export async function getCategories(): Promise<TaxonomyCategory[]> {
  try {
    const { data: nodes, error } = await supabase
      .from('storefront_taxonomy_nodes')
      .select('id, parent_id, name, slug, source_level, source_order, active')
      .eq('active', true)
      .order('source_order', { ascending: true });

    if (error) {
      console.error('getCategories: Supabase query failed, using static taxonomy:', error.message);
      return CATEGORIES;
    }
    if (!nodes || nodes.length === 0) {
      return CATEGORIES;
    }

    // Build hierarchy dynamically from DB
    const nodeMap = new Map<string, TaxonomyCategory>();
    const rootNodes: TaxonomyCategory[] = [];

    for (const n of nodes) {
      nodeMap.set(n.id, {
        id: n.id,
        slug: n.slug,
        name: n.name,
        level: n.source_level || 1,
        isSeoIndexed: true,
        displayOrder: n.source_order || 1,
        allowedFilterAttributes: ['brand', 'cpu_family', 'ram_gb', 'ssd_gb', 'screen_size_inch', 'gpu_model'],
        subcategories: []
      });
    }

    for (const n of nodes) {
      const cat = nodeMap.get(n.id)!;
      if (n.parent_id && nodeMap.has(n.parent_id)) {
        const parent = nodeMap.get(n.parent_id)!;
        cat.parentSlug = parent.slug;
        parent.subcategories = parent.subcategories || [];
        parent.subcategories.push(cat);
      } else {
        rootNodes.push(cat);
      }
    }

    return rootNodes.length > 0 ? rootNodes : CATEGORIES;
  } catch (e) {
    console.error('Chyba pri dynamickom načítaní kategórií z databázy:', e);
    return CATEGORIES;
  }
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

  return findCat(await getCategories());
}

export const findCategoryBySlug = getCategoryBySlug;

/**
 * Fulltextové vyhľadávanie produktov v PostgreSQL databáze Supabase
 */
export async function searchProducts(query: string): Promise<MasterProduct[]> {
  const q = normalizeSearchQuery(query);
  if (!q) return [];
  return (await getProductsPage({ query: q, pageSize: 60 })).products;
}

export interface ProductSitemapRecord {
  slug: string;
  status: string;
  updatedAt: string;
}

export async function getProductCount(): Promise<number> {
  try {
    const { data, error } = await supabase.rpc('get_storefront_product_count');
    if (!error && typeof data === 'number') {
      return data;
    }
  } catch {
    // Fallback if RPC is unavailable
  }

  const { count, error } = await supabase
    .from('storefront_products')
    .select('id', { count: 'exact', head: true });

  if (error) return 0;
  return count ?? 0;
}

export async function getProductSitemapBatch(offset: number, limit: number): Promise<ProductSitemapRecord[]> {
  const safeOffset = Math.max(0, Math.floor(offset));
  const safeLimit = Math.min(1000, Math.max(1, Math.floor(limit)));

  try {
    const { data, error } = await supabase.rpc('get_product_sitemap_batch', {
      p_offset: safeOffset,
      p_limit: safeLimit,
    });
    if (!error && Array.isArray(data)) {
      return data.map((row: { slug: string; status: string; updated_at: string }) => ({
        slug: row.slug,
        status: row.status,
        updatedAt: row.updated_at,
      }));
    }
  } catch {
    // Fallback below
  }

  const { data, error } = await supabase
    .from('storefront_products')
    .select('slug,status,updated_at')
    .order('id', { ascending: true })
    .range(safeOffset, safeOffset + safeLimit - 1);

  if (error) return [];
  return (data ?? []).map((row) => ({
    slug: row.slug,
    status: row.status,
    updatedAt: row.updated_at,
  }));
}
