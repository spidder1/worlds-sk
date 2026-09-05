import { MasterProduct, TaxonomyCategory, calculateQualityScore } from '@worlds/types';
import { queryNeon, rethrowIfMisconfigured } from './neon-client';

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
        id: 'cat-prislusenstvo-k-notebookom',
        slug: 'prislusenstvo-k-notebookom',
        name: 'Príslušenstvo k notebookom',
        parentSlug: 'prislusenstvo-a-periferie',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 1,
        allowedFilterAttributes: ['brand'],
        subcategories: [
          { id: 'cat-tasky-a-puzdra', slug: 'tasky-a-puzdra-na-notebooky', name: 'Tašky, batohy a puzdrá na notebooky', parentSlug: 'prislusenstvo-k-notebookom', level: 3, isSeoIndexed: true, displayOrder: 1, allowedFilterAttributes: ['brand'] },
          { id: 'cat-baterie-a-adaptery', slug: 'baterie-a-adaptery-k-notebookom', name: 'Batérie a adaptéry k notebookom', parentSlug: 'prislusenstvo-k-notebookom', level: 3, isSeoIndexed: true, displayOrder: 2, allowedFilterAttributes: ['brand'] },
          { id: 'cat-chladenie-stojany-nb', slug: 'chladenie-a-stojany-na-notebooky', name: 'Chladiace podložky a stojany', parentSlug: 'prislusenstvo-k-notebookom', level: 3, isSeoIndexed: true, displayOrder: 3, allowedFilterAttributes: ['brand'] },
          { id: 'cat-ochranne-folie-skla', slug: 'ochranne-folie-a-skla', name: 'Ochranné fólie a sklá', parentSlug: 'prislusenstvo-k-notebookom', level: 3, isSeoIndexed: true, displayOrder: 4, allowedFilterAttributes: ['brand'] },
          { id: 'cat-pera-a-stylusy', slug: 'pera-a-stylusy', name: 'Dotykové perá a stylusy', parentSlug: 'prislusenstvo-k-notebookom', level: 3, isSeoIndexed: true, displayOrder: 5, allowedFilterAttributes: ['brand'] },
        ],
      },
      {
        id: 'cat-dokovacie-stanice',
        slug: 'dokovacie-stanice',
        name: 'Dokovacie stanice a USB huby',
        parentSlug: 'prislusenstvo-a-periferie',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 2,
        allowedFilterAttributes: ['brand', 'interface'],
      },
      {
        id: 'cat-zaruky-a-sluzby',
        slug: 'zaruky-a-sluzby',
        name: 'Záruky, rozšírenia a služby',
        parentSlug: 'prislusenstvo-a-periferie',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 3,
        allowedFilterAttributes: ['brand'],
      },
      {
        id: 'cat-klavesnice-a-mysi',
        slug: 'klavesnice-a-mysi',
        name: 'Klávesnice a myši',
        parentSlug: 'prislusenstvo-a-periferie',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 4,
        allowedFilterAttributes: ['brand', 'connection_type', 'switch_type'],
      },
      {
        id: 'cat-sluchadla-a-headsety',
        slug: 'sluchadla-a-headsety',
        name: 'Slúchadlá a headsety',
        parentSlug: 'prislusenstvo-a-periferie',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 5,
        allowedFilterAttributes: ['brand', 'connection_type'],
      },
      {
        id: 'cat-webkamery-a-mikrofony',
        slug: 'webkamery-a-mikrofony',
        name: 'Webkamery a mikrofóny',
        parentSlug: 'prislusenstvo-a-periferie',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 6,
        allowedFilterAttributes: ['brand', 'resolution'],
      },
      {
        id: 'cat-reproduktory-pc',
        slug: 'reproduktory-k-pc',
        name: 'Reproduktory k počítaču',
        parentSlug: 'prislusenstvo-a-periferie',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 7,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDbRowToMasterProduct(row: any): MasterProduct {
  return {
    id: row.id,
    supplierCode: row.supplier_code,
    supplierProId: row.supplier_pro_id || row.supplier_code,
    sku: row.sku,
    mpn: row.mpn || '',
    mpn2: undefined,
    ean: row.ean,
    brand: row.brand,
    rawBrand: row.brand,
    manufacturerLogoUrl: row.manufacturer_logo_url || null,
    categorySlug: row.category_slug,
    categoryHierarchy: Array.isArray(row.category_hierarchy) ? row.category_hierarchy : ['Počítače a IT'],
    commodityCode: row.commodity_code,
    commodityName: row.commodity_name,
    title: row.title,
    slug: row.slug,
    shortDescription: row.short_description || '',
    supplierDescription: row.supplier_description || '',
    enrichedDescription: row.enriched_description || '',
    seoTitle: row.seo_title || `${row.title} | Worlds.sk`,
    seoDescription: row.seo_description || '',
    searchKeywords: Array.isArray(row.search_keywords) ? row.search_keywords : [],
    pricing: {
      // Supplier cost, dealer price and margin are internal commercial data.
      // This object is serialized into client components, so purchasing terms
      // are deliberately not hydrated here.
      supplierCost: 0,
      supplierFees: {
        // Recycling (SNC) and copyright (AO) levies are already included in the
        // sell price and must be disclosed. They come from the eD feed; rows
        // imported before the columns existed report 0 until the next full sync.
        garbageFee: Number(row.garbage_fee || 0),
        authorFee: Number(row.author_fee || 0),
      },
      totalCostWithFees: 0,
      vatRate: Number(row.vat_rate || 20),
      marginPercentage: 0,
      basePrice: Number(row.base_price || 0),
      finalPrice: Number(row.final_price || 0),
      recommendedRetailPrice: Number(row.recommended_retail_price || row.final_price || 0),
      currency: row.currency || 'EUR',
    },
    stockCount: Number(row.stock_count || 0),
    isInStock: Boolean(row.is_in_stock),
    stockText: row.stock_text || (row.is_in_stock ? 'Skladom' : 'Na objednávku'),
    expectedRestockDate: undefined,
    minOrderQuantity: Number(row.min_order_quantity || 1),
    warrantyMonths: Number(row.warranty_months ?? 24),
    attributes: typeof row.attributes === 'object' && row.attributes !== null ? row.attributes : {},
    images: Array.isArray(row.images) ? row.images : [],
    dimensions: undefined,
    status: row.status || 'ACTIVE',
    reviewStatus: 'AUTO_APPROVED',
    aiEnrichment: undefined,
    // Scored from what this row actually contains, using the same rules the
    // importer applies. It used to be hardcoded to 95 for every product.
    qualityScore: calculateQualityScore({
      ean: row.ean ?? undefined,
      brand: row.brand,
      mpn: row.mpn || '',
      categorySlug: row.category_slug,
      categoryHierarchy: Array.isArray(row.category_hierarchy) ? row.category_hierarchy : [],
      images: Array.isArray(row.images) ? row.images : [],
      attributes: typeof row.attributes === 'object' && row.attributes !== null ? row.attributes : {},
      supplierDescription: row.supplier_description || '',
      enrichedDescription: row.enriched_description || '',
      seoTitle: row.seo_title || undefined,
      seoDescription: row.seo_description || undefined,
      pricing: {
        supplierCost: Number(row.supplier_cost || 0),
        supplierFees: { garbageFee: Number(row.garbage_fee || 0), authorFee: Number(row.author_fee || 0) },
        totalCostWithFees: Number(row.total_cost_with_fees || row.base_price || 0),
        vatRate: Number(row.vat_rate || 20),
        marginPercentage: Number(row.margin_percentage || 0),
        basePrice: Number(row.base_price || 0),
        finalPrice: Number(row.final_price || 0),
        currency: row.currency || 'EUR',
      },
      stockCount: Number(row.stock_count || 0),
    }),
    dataHash: row.data_hash || '',
    lastSyncedAt: row.last_synced_at ? new Date(row.last_synced_at).toISOString() : new Date().toISOString(),
    lastReprocessedAt: row.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString(),
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString(),
  };
}

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
  cpu?: string;
  ram?: string;
  ssd?: string;
  minPrice?: number;
  maxPrice?: number;
  searchIds?: string[];
}

export interface ManufacturerItem {
  name: string;
  count: number;
  logoUrl?: string | null;
}

export interface FacetValue {
  name: string;
  count: number;
}

export interface CatalogFacets {
  brands: FacetValue[];
  cpus: FacetValue[];
  rams: FacetValue[];
  ssds: FacetValue[];
}

export interface ProductPageResult {
  products: MasterProduct[];
  /**
   * Facet counts for the current category or search, aggregated in Postgres.
   * Previously the whole result set was shipped to the browser so the sidebar
   * could count it client-side, which meant every category page transferred
   * thousands of full product records.
   */
  facets: CatalogFacets;
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
}

/**
 * Facet buckets. The regular expressions are duplicated by
 * appendMultiFilterConditions when a bucket is selected, so the label a user
 * clicks always filters on exactly what was counted.
 */
const CPU_BUCKETS: Array<[label: string, pattern: string]> = [
  ['High-End (Intel i7 / Ryzen 7)', 'ryzen 7|core i7|ultra 7'],
  ['Mainstream (Intel i5 / Ryzen 5)', 'ryzen 5|core i5|ultra 5'],
  ['Basic (Intel i3 / Ryzen 3)', 'ryzen 3|core i3'],
];

const RAM_BUCKETS: Array<[label: string, pattern: string]> = [
  ['64 GB RAM', '64\\s*gb|64g'],
  ['32 GB RAM', '32\\s*gb|32g'],
  ['16 GB RAM', '16\\s*gb|16g'],
  ['8 GB RAM', '8\\s*gb|8g'],
];

const SSD_BUCKETS: Array<[label: string, pattern: string]> = [
  ['2 TB SSD', '2\\s*tb|2000gb'],
  ['1 TB SSD', '1\\s*tb|1000gb|1tssd'],
  ['512 GB SSD', '512\\s*gb|512ssd'],
  ['256 GB SSD', '256\\s*gb|256ssd'],
];

/** Builds a CASE expression that assigns each title to its first matching bucket. */
function bucketCaseExpression(buckets: Array<[string, string]>): string {
  const branches = buckets
    .map(([label, pattern]) => `WHEN title ~* '${pattern}' THEN '${label.replace(/'/g, "''")}'`)
    .join('\n        ');
  return `CASE\n        ${branches}\n      END`;
}

const EMPTY_FACETS: CatalogFacets = { brands: [], cpus: [], rams: [], ssds: [] };

function orderFacet(buckets: Array<[string, string]>, counts: Map<string, number>): FacetValue[] {
  return buckets
    .map(([label]) => ({ name: label, count: counts.get(label) ?? 0 }))
    .filter((facet) => facet.count > 0);
}

function collectCategorySlugs(category: TaxonomyCategory): string[] {
  return [category.slug, ...(category.subcategories?.flatMap(collectCategorySlugs) ?? [])];
}

function normalizeSearchQuery(query: string): string {
  return query
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s._-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .slice(0, 80);
}

// Keep search accent-insensitive without requiring the optional PostgreSQL
// unaccent extension on every Neon branch.
const ACCENT_SOURCE = 'áäčďéěíĺľňóôŕřšťúůýž';
const ACCENT_TARGET = 'aacdeeillnoorrstuuyz';
function foldSql(column: string): string {
  return `translate(lower(${column}), '${ACCENT_SOURCE}', '${ACCENT_TARGET}')`;
}

function appendMultiFilterConditions(
  brand: string | undefined,
  cpu: string | undefined,
  ram: string | undefined,
  ssd: string | undefined,
  whereConditions: string[],
  params: unknown[],
  getNextIdx: () => number
) {
  if (brand) {
    const brands = brand.split(',').map((s) => s.trim()).filter(Boolean);
    if (brands.length > 0) {
      const escaped = brands.map((b) => normalizeSearchQuery(b).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
      whereConditions.push(`${foldSql('brand')} ~ $${getNextIdx()}`);
      params.push(`^(${escaped.join('|')})$`);
    }
  }

  if (cpu) {
    const cpus = cpu.split(',').map((s) => s.trim()).filter(Boolean);
    const cpuPatterns: string[] = [];
    for (const c of cpus) {
      if (/i7|ryzen 7|ultra 7/i.test(c)) cpuPatterns.push('ryzen 7|core i7|ultra 7');
      else if (/i5|ryzen 5|ultra 5/i.test(c)) cpuPatterns.push('ryzen 5|core i5|ultra 5');
      else if (/i3|ryzen 3/i.test(c)) cpuPatterns.push('ryzen 3|core i3');
      else cpuPatterns.push(c.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    }
    if (cpuPatterns.length > 0) {
      whereConditions.push(`title ~* $${getNextIdx()}`);
      params.push(cpuPatterns.join('|'));
    }
  }

  if (ram) {
    const rams = ram.split(',').map((s) => s.trim()).filter(Boolean);
    const ramPatterns: string[] = [];
    for (const r of rams) {
      if (/64\s*gb/i.test(r)) ramPatterns.push('64\\s*gb|64g');
      else if (/32\s*gb/i.test(r)) ramPatterns.push('32\\s*gb|32g');
      else if (/16\s*gb/i.test(r)) ramPatterns.push('16\\s*gb|16g');
      else if (/8\s*gb/i.test(r)) ramPatterns.push('8\\s*gb|8g');
      else ramPatterns.push(r.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    }
    if (ramPatterns.length > 0) {
      whereConditions.push(`title ~* $${getNextIdx()}`);
      params.push(ramPatterns.join('|'));
    }
  }

  if (ssd) {
    const ssds = ssd.split(',').map((s) => s.trim()).filter(Boolean);
    const ssdPatterns: string[] = [];
    for (const s of ssds) {
      if (/2\s*tb/i.test(s)) ssdPatterns.push('2\\s*tb|2000gb');
      else if (/1\s*tb/i.test(s)) ssdPatterns.push('1\\s*tb|1000gb|1tssd');
      else if (/512\s*gb/i.test(s)) ssdPatterns.push('512\\s*gb|512ssd');
      else if (/256\s*gb/i.test(s)) ssdPatterns.push('256\\s*gb|256ssd');
      else ssdPatterns.push(s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    }
    if (ssdPatterns.length > 0) {
      whereConditions.push(`title ~* $${getNextIdx()}`);
      params.push(ssdPatterns.join('|'));
    }
  }
}

export interface ManufacturerOptions {
  categorySlug?: string;
  query?: string;
  inStockOnly?: boolean;
}

export async function getManufacturers(options: ManufacturerOptions = {}): Promise<ManufacturerItem[]> {
  try {
    const whereConditions: string[] = ["status = 'ACTIVE'", "final_price > 0", "brand IS NOT NULL", "brand != 'Unbranded'"];
    const params: unknown[] = [];
    let paramIdx = 1;

    if (options.categorySlug) {
      const category = await getCategoryBySlug(options.categorySlug);
      const slugs = category ? collectCategorySlugs(category) : [options.categorySlug];
      whereConditions.push(`category_slug = ANY($${paramIdx++})`);
      params.push(slugs);
    }

    if (options.inStockOnly) {
      whereConditions.push(`is_in_stock = true AND stock_count > 0`);
    }

    if (options.query) {
      const query = normalizeSearchQuery(options.query);
      if (query) {
        const qClean = query.replace(/[%_]/g, '');
        whereConditions.push(
          `(${foldSql('title')} LIKE $${paramIdx} OR ${foldSql('mpn')} LIKE $${paramIdx} OR ${foldSql('brand')} LIKE $${paramIdx} OR ${foldSql('ean')} LIKE $${paramIdx} OR ${foldSql('sku')} LIKE $${paramIdx})`
        );
        params.push(`%${qClean}%`);
        paramIdx++;
      }
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    const rows = await queryNeon<{ brand: string; count: string; logo_url: string | null; logo_status: string | null }>(`
      SELECT p.brand, COUNT(*)::int as count,
        MAX(CASE WHEN m.logo_status = 'DOWNLOADED' THEN m.logo_url END) AS logo_url,
        MAX(m.logo_status) AS logo_status
      FROM storefront_products p
      LEFT JOIN manufacturers m ON ${foldSql('m.name')} = ${foldSql('p.brand')}
      ${whereClause}
      GROUP BY p.brand
      ORDER BY count DESC
    `, params);

    return rows.map((r) => ({
      name: r.brand,
      count: Number(r.count),
      logoUrl: r.logo_status === 'DOWNLOADED' ? r.logo_url : null,
    }));
  } catch (err) {
    rethrowIfMisconfigured(err);
    console.error('Chyba pri načítaní výrobcov z Neon DB:', err);
    return [
      { name: 'ASUS', count: 0 },
      { name: 'Lenovo', count: 0 },
    ];
  }
}

export async function getProductsPage(options: ProductPageOptions = {}): Promise<ProductPageResult> {
  const pageSize = Math.min(60, Math.max(1, Math.floor(options.pageSize ?? PRODUCTS_PER_PAGE)));
  const page = Math.max(1, Math.floor(options.page ?? 1));
  const offset = (page - 1) * pageSize;
  const query = normalizeSearchQuery(options.query ?? '');

  const baseConditions: string[] = ["status = 'ACTIVE'", "final_price > 0"];
  const baseParams: unknown[] = [];
  let baseParamIdx = 1;

  if (options.categorySlug) {
    const category = await getCategoryBySlug(options.categorySlug);
    const slugs = category ? collectCategorySlugs(category) : [options.categorySlug];
    baseConditions.push(`category_slug = ANY($${baseParamIdx++})`);
    baseParams.push(slugs);
  }

  if (options.inStockOnly) {
    baseConditions.push(`is_in_stock = true AND stock_count > 0`);
  }

  if (typeof options.minPrice === 'number' && Number.isFinite(options.minPrice) && options.minPrice >= 0) {
    baseConditions.push(`final_price >= $${baseParamIdx++}`);
    baseParams.push(options.minPrice);
  }

  if (typeof options.maxPrice === 'number' && Number.isFinite(options.maxPrice) && options.maxPrice > 0) {
    baseConditions.push(`final_price <= $${baseParamIdx++}`);
    baseParams.push(options.maxPrice);
  }

  if (options.searchIds) {
    baseConditions.push(`id = ANY($${baseParamIdx++}::text[])`);
    baseParams.push(options.searchIds);
  }

  if (query) {
    const qClean = query.replace(/[%_]/g, '');
    baseConditions.push(
      `(${foldSql('title')} LIKE $${baseParamIdx} OR ${foldSql('mpn')} LIKE $${baseParamIdx} OR ${foldSql('brand')} LIKE $${baseParamIdx} OR ${foldSql('ean')} LIKE $${baseParamIdx} OR ${foldSql('sku')} LIKE $${baseParamIdx})`
    );
    baseParams.push(`%${qClean}%`);
    baseParamIdx++;
  }

  const filteredConditions = [...baseConditions];
  const filteredParams = [...baseParams];
  let filteredParamIdx = baseParamIdx;

  appendMultiFilterConditions(
    options.brand,
    options.cpu,
    options.ram,
    options.ssd,
    filteredConditions,
    filteredParams,
    () => filteredParamIdx++
  );

  const baseWhereClause = baseConditions.length > 0 ? `WHERE ${baseConditions.join(' AND ')}` : '';
  const filteredWhereClause = filteredConditions.length > 0 ? `WHERE ${filteredConditions.join(' AND ')}` : '';

  let orderBy = 'is_in_stock DESC, final_price ASC, id ASC';
  switch (options.sort) {
    case 'price_asc':
      orderBy = 'final_price ASC, id ASC';
      break;
    case 'price_desc':
      orderBy = 'final_price DESC, id ASC';
      break;
    case 'name':
      orderBy = 'title ASC, id ASC';
      break;
  }

  try {
    const countSql = `SELECT COUNT(*)::int as total FROM storefront_products ${filteredWhereClause}`;
    const countRows = await queryNeon<{ total: number }>(countSql, filteredParams);
    const total = countRows[0]?.total ?? 0;

    const pageSql = `SELECT p.*, CASE WHEN m.logo_status = 'DOWNLOADED' THEN m.logo_url END AS manufacturer_logo_url
      FROM storefront_products p
      LEFT JOIN manufacturers m ON ${foldSql('m.name')} = ${foldSql('p.brand')}
      ${filteredWhereClause}
      ORDER BY ${orderBy.replace(/\bid\b/g, 'p.id')} LIMIT $${filteredParamIdx++} OFFSET $${filteredParamIdx++}`;
    const pageRows = await queryNeon(pageSql, [...filteredParams, pageSize, offset]);
    const products = pageRows.map(mapDbRowToMasterProduct);

    // Facet counts are aggregated in Postgres over brand and title only. The
    // previous implementation selected every matching row (descriptions,
    // attributes and image JSON included) and counted them in the browser.
    const facetSql = `
      WITH scoped AS (SELECT brand, title FROM products ${baseWhereClause})
      SELECT 'brand' AS kind, brand AS label, COUNT(*)::int AS count
        FROM scoped
       WHERE brand IS NOT NULL AND brand <> '' AND brand <> 'Unbranded'
       GROUP BY brand
      UNION ALL
      SELECT 'cpu', bucket.label, COUNT(*)::int
        FROM scoped, LATERAL (SELECT ${bucketCaseExpression(CPU_BUCKETS)} AS label) AS bucket
       WHERE bucket.label IS NOT NULL GROUP BY bucket.label
      UNION ALL
      SELECT 'ram', bucket.label, COUNT(*)::int
        FROM scoped, LATERAL (SELECT ${bucketCaseExpression(RAM_BUCKETS)} AS label) AS bucket
       WHERE bucket.label IS NOT NULL GROUP BY bucket.label
      UNION ALL
      SELECT 'ssd', bucket.label, COUNT(*)::int
        FROM scoped, LATERAL (SELECT ${bucketCaseExpression(SSD_BUCKETS)} AS label) AS bucket
       WHERE bucket.label IS NOT NULL GROUP BY bucket.label
    `;
    const facetRows = await queryNeon<{ kind: string; label: string; count: number }>(facetSql, baseParams);

    const byKind = (kind: string) => {
      const counts = new Map<string, number>();
      for (const row of facetRows) {
        if (row.kind === kind && row.label) counts.set(row.label, row.count);
      }
      return counts;
    };

    const facets: CatalogFacets = {
      brands: [...byKind('brand').entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'sk')),
      cpus: orderFacet(CPU_BUCKETS, byKind('cpu')),
      rams: orderFacet(RAM_BUCKETS, byKind('ram')),
      ssds: orderFacet(SSD_BUCKETS, byKind('ssd')),
    };

    return {
      products,
      facets,
      page,
      pageSize,
      total,
      pageCount: total === 0 ? 0 : Math.ceil(total / pageSize),
    };
  } catch (err) {
    rethrowIfMisconfigured(err);
    console.error('Chyba pri stránkovanom čítaní katalógu z Neon DB:', err);
    return { products: [], facets: EMPTY_FACETS, page, pageSize, total: 0, pageCount: 0 };
  }
}

export async function getAllProducts(): Promise<MasterProduct[]> {
  return (await getProductsPage({ pageSize: 60 })).products;
}

export async function getProductBySlug(slug: string): Promise<MasterProduct | null> {
  try {
    const cleanSlug = decodeURIComponent(slug).trim();
    if (!/^[a-zA-Z0-9-]{1,200}$/.test(cleanSlug)) return null;

    // 1. Exact match on slug
    const directRows = await queryNeon(`SELECT p.*, CASE WHEN m.logo_status = 'DOWNLOADED' THEN m.logo_url END AS manufacturer_logo_url FROM storefront_products p LEFT JOIN manufacturers m ON ${foldSql('m.name')} = ${foldSql('p.brand')} WHERE p.slug = $1 LIMIT 1`, [cleanSlug]);
    if (directRows.length > 0) return mapDbRowToMasterProduct(directRows[0]);

    // 2. Trailing SKU match
    const trailingMatch = cleanSlug.match(/-([0-9a-zA-Z]+)$/);
    if (trailingMatch && trailingMatch[1]) {
      const sku = trailingMatch[1];
      const skuRows = await queryNeon(`SELECT p.*, CASE WHEN m.logo_status = 'DOWNLOADED' THEN m.logo_url END AS manufacturer_logo_url FROM storefront_products p LEFT JOIN manufacturers m ON ${foldSql('m.name')} = ${foldSql('p.brand')} WHERE (p.sku = $1 OR p.supplier_code = $1) LIMIT 1`, [sku]);
      if (skuRows.length > 0) return mapDbRowToMasterProduct(skuRows[0]);
    }

    // 3. Direct SKU / MPN / ID
    const idRows = await queryNeon(`SELECT p.*, CASE WHEN m.logo_status = 'DOWNLOADED' THEN m.logo_url END AS manufacturer_logo_url FROM storefront_products p LEFT JOIN manufacturers m ON ${foldSql('m.name')} = ${foldSql('p.brand')} WHERE (p.sku = $1 OR p.supplier_code = $1 OR p.mpn = $1 OR p.id = $1) LIMIT 1`, [cleanSlug]);
    if (idRows.length > 0) return mapDbRowToMasterProduct(idRows[0]);

    // 4. Fuzzy slug match
    const fuzzyRows = await queryNeon(`SELECT p.*, CASE WHEN m.logo_status = 'DOWNLOADED' THEN m.logo_url END AS manufacturer_logo_url FROM storefront_products p LEFT JOIN manufacturers m ON ${foldSql('m.name')} = ${foldSql('p.brand')} WHERE p.slug ILIKE $1 LIMIT 1`, [`%${cleanSlug}%`]);
    if (fuzzyRows.length > 0) return mapDbRowToMasterProduct(fuzzyRows[0]);

    return null;
  } catch (e) {
    rethrowIfMisconfigured(e);
    console.error(`Chyba pri čítaní produktu ${slug} z Neon DB:`, e);
    return null;
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<MasterProduct[]> {
  return (await getProductsPage({ categorySlug, pageSize: 60 })).products;
}

export async function getFeaturedProducts(limit = 8): Promise<MasterProduct[]> {
  try {
    const rows = await queryNeon(
      `SELECT p.*, CASE WHEN m.logo_status = 'DOWNLOADED' THEN m.logo_url END AS manufacturer_logo_url FROM storefront_products p LEFT JOIN manufacturers m ON ${foldSql('m.name')} = ${foldSql('p.brand')} WHERE p.is_in_stock = true ORDER BY p.final_price ASC LIMIT $1`,
      [limit]
    );
    return rows.map(mapDbRowToMasterProduct);
  } catch (e) {
    rethrowIfMisconfigured(e);
    console.error('Chyba pri čítaní featured produktov z Neon DB:', e);
    return [];
  }
}

export async function getCategories(): Promise<TaxonomyCategory[]> {
  try {
    const rows = await queryNeon<{ id: string; parent_slug: string | null; name: string; slug: string; level: number; display_order: number }>(
      `WITH RECURSIVE category_tree AS (
        SELECT c.id, COALESCE(c.parent_slug, parent.slug) AS parent_slug, c.name, c.slug, c.level, c.display_order,
               ARRAY[LPAD(c.display_order::text, 8, '0') || ':' || c.name]::text[] AS sort_path
          FROM categories c
          LEFT JOIN categories parent ON parent.id = c.parent_id
         WHERE c.active = true AND c.parent_slug IS NULL AND c.parent_id IS NULL
        UNION ALL
        SELECT child.id, COALESCE(child.parent_slug, parent.slug) AS parent_slug, child.name, child.slug, child.level, child.display_order,
               tree.sort_path || (LPAD(child.display_order::text, 8, '0') || ':' || child.name)
          FROM categories child
          LEFT JOIN categories parent ON parent.id = child.parent_id
          JOIN category_tree tree ON child.parent_slug = tree.slug OR child.parent_id = tree.id
         WHERE child.active = true
      )
      SELECT id, parent_slug, name, slug, level, display_order
        FROM category_tree
       ORDER BY sort_path`
    );

    if (rows.length === 0) return CATEGORIES;

    const nodeMap = new Map<string, TaxonomyCategory>();
    const rootNodes: TaxonomyCategory[] = [];

    for (const r of rows) {
      nodeMap.set(r.slug, {
        id: r.id,
        slug: r.slug,
        name: r.name,
        level: r.level || 1,
        isSeoIndexed: true,
        displayOrder: r.display_order || 1,
        allowedFilterAttributes: ['brand', 'cpu_family', 'ram_gb', 'ssd_gb', 'screen_size_inch', 'gpu_model'],
        subcategories: [],
      });
    }

    for (const r of rows) {
      const cat = nodeMap.get(r.slug)!;
      if (r.parent_slug && nodeMap.has(r.parent_slug)) {
        const parent = nodeMap.get(r.parent_slug)!;
        cat.parentSlug = parent.slug;
        parent.subcategories = parent.subcategories || [];
        parent.subcategories.push(cat);
      } else {
        rootNodes.push(cat);
      }
    }

    return rootNodes.length > 0 ? rootNodes : CATEGORIES;
  } catch (e) {
    rethrowIfMisconfigured(e);
    console.error('Chyba pri načítaní kategórií z Neon DB:', e);
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
    const rows = await queryNeon<{ count: string }>(`SELECT COUNT(*)::int as count FROM storefront_products`);
    return Number(rows[0]?.count ?? 0);
  } catch {
    return 0;
  }
}

export async function getProductSitemapBatch(offset: number, limit: number): Promise<ProductSitemapRecord[]> {
  try {
    const rows = await queryNeon<{ slug: string; status: string; updated_at: string }>(
      `SELECT slug, status, updated_at FROM storefront_products ORDER BY id ASC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    return rows.map((r) => ({
      slug: r.slug,
      status: r.status,
      updatedAt: r.updated_at,
    }));
  } catch {
    return [];
  }
}
