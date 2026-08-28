import { TaxonomyCategory } from '@worlds/types';

export const MANAGED_TAXONOMY: TaxonomyCategory[] = [
  {
    id: 'cat-computers',
    slug: 'pocitace-a-notebooky',
    name: 'Počítače a notebooky',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 1,
    allowedFilterAttributes: ['brand', 'cpu', 'ram', 'storage'],
    subcategories: [
      {
        id: 'cat-notebooks',
        slug: 'notebooky',
        name: 'Notebooky',
        parentSlug: 'pocitace-a-notebooky',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 1,
        allowedFilterAttributes: ['brand', 'screen_size', 'cpu', 'ram', 'storage', 'gpu'],
        supplierCategoryCodes: ['101', '83', '84'],
        supplierCommodityCodes: ['NB'],
        subcategories: [
          {
            id: 'cat-notebooks-gaming',
            slug: 'herne-notebooky',
            name: 'Herné notebooky',
            parentSlug: 'notebooky',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 1,
            allowedFilterAttributes: ['brand', 'gpu', 'ram'],
          },
          {
            id: 'cat-notebooks-business',
            slug: 'firemne-notebooky',
            name: 'Firemné a pracovné notebooky',
            parentSlug: 'notebooky',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 2,
            allowedFilterAttributes: ['brand', 'cpu', 'ram'],
          },
          {
            id: 'cat-notebooks-ultrabooks',
            slug: 'ultrabooky',
            name: 'Ultrabooky a tenké notebooky',
            parentSlug: 'notebooky',
            level: 3,
            isSeoIndexed: true,
            displayOrder: 3,
            allowedFilterAttributes: ['brand', 'weight'],
          },
        ],
      },
      {
        id: 'cat-desktops',
        slug: 'stolne-pocitace',
        name: 'Stolné počítače',
        parentSlug: 'pocitace-a-notebooky',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 2,
        allowedFilterAttributes: ['brand', 'cpu', 'ram', 'gpu'],
        supplierCategoryCodes: ['102'],
        supplierCommodityCodes: ['PC'],
      },
      {
        id: 'cat-tablets',
        slug: 'tablety',
        name: 'Tablety',
        parentSlug: 'pocitace-a-notebooky',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 3,
        allowedFilterAttributes: ['brand', 'screen_size', 'storage'],
        supplierCategoryCodes: ['103'],
        supplierCommodityCodes: ['TAB'],
      },
    ],
  },
  {
    id: 'cat-components',
    slug: 'komponenty',
    name: 'Počítačové komponenty',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 2,
    allowedFilterAttributes: ['brand', 'socket', 'capacity', 'interface'],
    subcategories: [
      {
        id: 'cat-processors',
        slug: 'procesory',
        name: 'Procesory (CPU)',
        parentSlug: 'komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 1,
        allowedFilterAttributes: ['brand', 'socket', 'cores'],
        supplierCategoryCodes: ['201'],
        supplierCommodityCodes: ['CPU'],
      },
      {
        id: 'cat-gpu',
        slug: 'graficke-karty',
        name: 'Grafické karty (GPU)',
        parentSlug: 'komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 2,
        allowedFilterAttributes: ['brand', 'chipset', 'vram'],
        supplierCategoryCodes: ['202'],
        supplierCommodityCodes: ['VGA'],
      },
      {
        id: 'cat-ram',
        slug: 'pamate-ram',
        name: 'Operačné pamäte (RAM)',
        parentSlug: 'komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 3,
        allowedFilterAttributes: ['brand', 'type', 'capacity', 'frequency'],
        supplierCategoryCodes: ['203'],
        supplierCommodityCodes: ['MEM'],
      },
      {
        id: 'cat-ssd',
        slug: 'ssd-disky',
        name: 'SSD disky',
        parentSlug: 'komponenty',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 4,
        allowedFilterAttributes: ['brand', 'capacity', 'form_factor', 'interface'],
        supplierCategoryCodes: ['204'],
        supplierCommodityCodes: ['SSD'],
      },
    ],
  },
  {
    id: 'cat-monitors',
    slug: 'monitory',
    name: 'Monitory',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 3,
    allowedFilterAttributes: ['brand', 'screen_size', 'resolution', 'refresh_rate'],
    supplierCategoryCodes: ['301'],
    supplierCommodityCodes: ['LCD'],
  },
  {
    id: 'cat-accessories',
    slug: 'prislusenstvo-a-periferie',
    name: 'Príslušenstvo a periférie',
    level: 1,
    isSeoIndexed: true,
    displayOrder: 4,
    allowedFilterAttributes: ['brand', 'type'],
    subcategories: [
      {
        id: 'cat-keyboards-mice',
        slug: 'klavesnice-a-mysi',
        name: 'Klávesnice a myši',
        parentSlug: 'prislusenstvo-a-periferie',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 1,
        allowedFilterAttributes: ['brand', 'connection'],
        supplierCategoryCodes: ['401'],
      },
      {
        id: 'cat-memory-cards',
        slug: 'pamaetove-karty',
        name: 'Pamäťové karty a flash disky',
        parentSlug: 'prislusenstvo-a-periferie',
        level: 2,
        isSeoIndexed: true,
        displayOrder: 2,
        allowedFilterAttributes: ['brand', 'capacity', 'card_type'],
        supplierCategoryCodes: ['402'],
      },
    ],
  },
];

export class TaxonomyEngine {
  private categoryMap = new Map<string, TaxonomyCategory>();
  private codeToCategory = new Map<string, TaxonomyCategory>();
  private commodityToCategory = new Map<string, TaxonomyCategory>();

  constructor(taxonomy: TaxonomyCategory[] = MANAGED_TAXONOMY) {
    this.indexTaxonomy(taxonomy);
  }

  private indexTaxonomy(categories: TaxonomyCategory[]) {
    for (const cat of categories) {
      this.categoryMap.set(cat.slug, cat);
      if (cat.supplierCategoryCodes) {
        for (const code of cat.supplierCategoryCodes) {
          this.codeToCategory.set(code, cat);
        }
      }
      if (cat.supplierCommodityCodes) {
        for (const comm of cat.supplierCommodityCodes) {
          this.commodityToCategory.set(comm.toUpperCase(), cat);
        }
      }
      if (cat.subcategories) {
        this.indexTaxonomy(cat.subcategories);
      }
    }
  }

  /**
   * Matches raw eD category or commodity code into managed taxonomy
   */
  matchCategory(options: {
    categoryCode?: string;
    commodityCode?: string;
    productName?: string;
  }): { category: TaxonomyCategory | null; hierarchy: string[]; confidence: number } {
    const { categoryCode, commodityCode, productName = '' } = options;
    const nameLower = productName.toLowerCase();

    // 1. Direct eD category code match
    if (categoryCode && this.codeToCategory.has(categoryCode)) {
      const match = this.codeToCategory.get(categoryCode)!;
      
      // Fine-grained subcategory check (e.g. gaming laptop)
      if (match.slug === 'notebooky') {
        if (nameLower.includes('hern') || nameLower.includes('gaming') || nameLower.includes('rtx') || nameLower.includes('loq') || nameLower.includes('tuf')) {
          const gaming = this.categoryMap.get('herne-notebooky');
          if (gaming) {
            return {
              category: gaming,
              hierarchy: ['Počítače a notebooky', 'Notebooky', 'Herné notebooky'],
              confidence: 0.96,
            };
          }
        }
        if (nameLower.includes('expertbook') || nameLower.includes('thinkpad') || nameLower.includes('probook') || nameLower.includes('latitude')) {
          const business = this.categoryMap.get('firemne-notebooky');
          if (business) {
            return {
              category: business,
              hierarchy: ['Počítače a notebooky', 'Notebooky', 'Firemné a pracovné notebooky'],
              confidence: 0.95,
            };
          }
        }
      }

      return {
        category: match,
        hierarchy: this.buildHierarchy(match),
        confidence: 0.92,
      };
    }

    // 2. Commodity code fallback
    if (commodityCode && this.commodityToCategory.has(commodityCode.toUpperCase())) {
      const match = this.commodityToCategory.get(commodityCode.toUpperCase())!;
      return {
        category: match,
        hierarchy: this.buildHierarchy(match),
        confidence: 0.85,
      };
    }

    // 3. Name heuristic matching
    if (nameLower.includes('notebook') || nameLower.includes('laptop')) {
      const nb = this.categoryMap.get('notebooky');
      if (nb) return { category: nb, hierarchy: this.buildHierarchy(nb), confidence: 0.75 };
    }
    if (nameLower.includes('monitor') || nameLower.includes('lcd') || nameLower.includes('display')) {
      const mon = this.categoryMap.get('monitory');
      if (mon) return { category: mon, hierarchy: this.buildHierarchy(mon), confidence: 0.78 };
    }
    if (nameLower.includes('procesor') || nameLower.includes('intel core') || nameLower.includes('ryzen')) {
      const cpu = this.categoryMap.get('procesory');
      if (cpu) return { category: cpu, hierarchy: this.buildHierarchy(cpu), confidence: 0.80 };
    }

    return {
      category: null,
      hierarchy: ['Nešpecifikované'],
      confidence: 0.2,
    };
  }

  private buildHierarchy(cat: TaxonomyCategory): string[] {
    const list = [cat.name];
    let parentSlug = cat.parentSlug;
    while (parentSlug) {
      const parent = this.categoryMap.get(parentSlug);
      if (parent) {
        list.unshift(parent.name);
        parentSlug = parent.parentSlug;
      } else {
        break;
      }
    }
    return list;
  }

  getAllCategories(): TaxonomyCategory[] {
    return MANAGED_TAXONOMY;
  }

  getCategoryBySlug(slug: string): TaxonomyCategory | undefined {
    return this.categoryMap.get(slug);
  }
}
