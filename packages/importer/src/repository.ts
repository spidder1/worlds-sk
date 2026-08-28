import { MasterProduct, QuarantineRecord, ImportRunSummary } from '@worlds/types';

export interface ProductFilterOptions {
  categorySlug?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  search?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'name' | 'quality';
  limit?: number;
  offset?: number;
}

export class ProductMasterRepository {
  private products = new Map<string, MasterProduct>(); // key: supplierCode (or id)
  private codeToId = new Map<string, string>();
  private quarantine = new Map<string, QuarantineRecord>();
  private runs = new Map<string, ImportRunSummary>();

  async upsertProduct(product: MasterProduct): Promise<void> {
    this.products.set(product.id, product);
    this.codeToId.set(product.supplierCode, product.id);
  }

  async getProductById(id: string): Promise<MasterProduct | null> {
    return this.products.get(id) || null;
  }

  async getProductByCode(supplierCode: string): Promise<MasterProduct | null> {
    const id = this.codeToId.get(supplierCode);
    if (!id) return null;
    return this.products.get(id) || null;
  }

  async getProductBySlug(slug: string): Promise<MasterProduct | null> {
    for (const p of this.products.values()) {
      if (p.slug === slug) return p;
    }
    return null;
  }

  async getAllProducts(): Promise<MasterProduct[]> {
    return Array.from(this.products.values());
  }

  async queryProducts(filter: ProductFilterOptions = {}): Promise<{ items: MasterProduct[]; total: number }> {
    let result = Array.from(this.products.values());

    if (filter.categorySlug) {
      result = result.filter((p) => p.categorySlug === filter.categorySlug);
    }
    if (filter.brand) {
      result = result.filter((p) => p.brand.toLowerCase() === filter.brand!.toLowerCase());
    }
    if (filter.minPrice !== undefined) {
      result = result.filter((p) => p.pricing.finalPrice >= filter.minPrice!);
    }
    if (filter.maxPrice !== undefined) {
      result = result.filter((p) => p.pricing.finalPrice <= filter.maxPrice!);
    }
    if (filter.inStockOnly) {
      result = result.filter((p) => p.isInStock && p.stockCount > 0);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.mpn.toLowerCase().includes(q) ||
          p.ean?.includes(q) ||
          p.searchKeywords.some((k) => k.includes(q))
      );
    }

    if (filter.sortBy === 'price_asc') {
      result.sort((a, b) => a.pricing.finalPrice - b.pricing.finalPrice);
    } else if (filter.sortBy === 'price_desc') {
      result.sort((a, b) => b.pricing.finalPrice - a.pricing.finalPrice);
    } else if (filter.sortBy === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filter.sortBy === 'quality') {
      result.sort((a, b) => b.qualityScore.total - a.qualityScore.total);
    }

    const total = result.length;
    const offset = filter.offset || 0;
    const limit = filter.limit || 50;
    const paginated = result.slice(offset, offset + limit);

    return { items: paginated, total };
  }

  async addQuarantine(record: QuarantineRecord): Promise<void> {
    this.quarantine.set(record.id, record);
  }

  async getQuarantineRecords(): Promise<QuarantineRecord[]> {
    return Array.from(this.quarantine.values());
  }

  async recordImportRun(summary: ImportRunSummary): Promise<void> {
    this.runs.set(summary.id, summary);
  }

  async getImportRuns(): Promise<ImportRunSummary[]> {
    return Array.from(this.runs.values());
  }

  async getStats() {
    const products = Array.from(this.products.values());
    const total = products.length;
    const active = products.filter((p) => p.status === 'ACTIVE').length;
    const inStock = products.filter((p) => p.isInStock).length;
    const needsReview = products.filter((p) => p.reviewStatus === 'NEEDS_REVIEW').length;
    const missingEan = products.filter((p) => !p.ean).length;
    const missingImages = products.filter((p) => p.images.length === 0).length;
    const avgQuality = total > 0 ? Math.round(products.reduce((acc, p) => acc + p.qualityScore.total, 0) / total) : 0;

    return {
      totalProducts: total,
      activeProducts: active,
      inStockProducts: inStock,
      needsReviewCount: needsReview,
      missingEanCount: missingEan,
      missingImagesCount: missingImages,
      averageQualityScore: avgQuality,
      quarantinedCount: this.quarantine.size,
    };
  }
}
