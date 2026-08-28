import {
  EDRawProductDetail,
  EDRawProductStock,
  MasterProduct,
  QuarantineRecord,
  ImportRunSummary,
  ReviewStatus,
} from '@worlds/types';
import { ProductNormalizer } from './normalizer.js';
import { TaxonomyEngine } from './taxonomy-engine.js';
import { DeltaEngine } from './delta-engine.js';
import { AICategorizer } from './ai-categorizer.js';
import { QualityScorer } from './quality-scorer.js';
import { ProductMasterRepository } from './repository.js';

export class ImporterService {
  private normalizer: ProductNormalizer;
  private taxonomy: TaxonomyEngine;
  private delta: DeltaEngine;
  private ai: AICategorizer;
  private quality: QualityScorer;
  private repo: ProductMasterRepository;

  constructor(repository?: ProductMasterRepository) {
    this.repo = repository || new ProductMasterRepository();
    this.normalizer = new ProductNormalizer();
    this.taxonomy = new TaxonomyEngine();
    this.delta = new DeltaEngine();
    this.quality = new QualityScorer();
    this.ai = new AICategorizer({
      taxonomyEngine: this.taxonomy,
      normalizer: this.normalizer,
    });
  }

  getRepository(): ProductMasterRepository {
    return this.repo;
  }

  getTaxonomy(): TaxonomyEngine {
    return this.taxonomy;
  }

  /**
   * Processes a single raw product from eD system into MasterProduct or Quarantine
   */
  async processRawProduct(raw: EDRawProductDetail): Promise<{
    status: 'CREATED' | 'UPDATED' | 'UNCHANGED' | 'QUARANTINED';
    product?: MasterProduct;
    quarantine?: QuarantineRecord;
  }> {
    // 1. Validation & Quarantine checks
    if (!raw.Code || !raw.PartNumber) {
      const q: QuarantineRecord = {
        id: `q-${raw.Code || Date.now()}`,
        supplierCode: raw.Code || 'UNKNOWN',
        proId: raw.ProId,
        reason: 'MISSING_MPN',
        errorDetails: 'Chýba povinný kód produktu alebo PartNumber výrobcu.',
        rawPayload: raw as any,
        createdAt: new Date().toISOString(),
        resolved: false,
      };
      await this.repo.addQuarantine(q);
      return { status: 'QUARANTINED', quarantine: q };
    }

    const price = Number(raw.YourPrice) || 0;
    if (price <= 0) {
      const q: QuarantineRecord = {
        id: `q-${raw.Code}`,
        supplierCode: raw.Code,
        proId: raw.ProId,
        reason: 'ZERO_PRICE',
        errorDetails: 'Nákupná cena od dodávateľa je nulová alebo neplatná.',
        rawPayload: raw as any,
        createdAt: new Date().toISOString(),
        resolved: false,
      };
      await this.repo.addQuarantine(q);
      return { status: 'QUARANTINED', quarantine: q };
    }

    // 2. Delta check via Hash
    const newHash = this.delta.hashProduct(raw);
    const existing = await this.repo.getProductByCode(raw.Code);

    if (existing && existing.dataHash === newHash) {
      return { status: 'UNCHANGED', product: existing };
    }

    // 3. Normalization
    const brand = this.normalizer.normalizeBrand(raw.ProducerName || raw.ProducerCode);
    const pricing = this.normalizer.computePricing(raw);
    const cleanTitle = this.normalizer.cleanText(raw.Name);
    const slug = this.normalizer.generateSlug(cleanTitle, raw.PartNumber);
    const images = this.normalizer.normalizeImages(raw.ImageList, cleanTitle);

    // 4. AI / Rule Categorization & Enrichment
    const enrichment = await this.ai.processProduct(raw, brand);

    // 5. Attributes extraction
    const attributes: MasterProduct['attributes'] = {};
    if (raw.ProductNavigatorDataList) {
      for (const item of raw.ProductNavigatorDataList) {
        const codeStr = String(item.AttributeCode);
        const valStr = String(item.ValueCode);
        attributes[`attr_${codeStr}`] = {
          code: codeStr,
          name: `Atribút ${codeStr}`,
          value: this.normalizer.normalizeCapacity(valStr),
          rawValue: valStr,
        };
      }
    }

    // Review Status determination
    let reviewStatus: ReviewStatus = 'AUTO_APPROVED';
    if (enrichment.flags?.lowConfidence || enrichment.flags?.missingEAN) {
      reviewStatus = 'NEEDS_REVIEW';
    }

    const isStockAvailable = Boolean(raw.OnStock) && (Number(raw.OnStockCount) > 0 || String(raw.OnStock).toLowerCase() === 'true');

    // 6. Assemble Master Product
    const masterProduct: MasterProduct = {
      id: existing ? existing.id : `prod-${raw.Code.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      supplierCode: raw.Code,
      supplierProId: raw.ProId,
      sku: raw.Code,
      mpn: raw.PartNumber,
      mpn2: raw.PartNumber2,
      ean: raw.EANCode,
      
      brand,
      rawBrand: raw.ProducerName,
      categorySlug: enrichment.assignedCategorySlug,
      categoryHierarchy: enrichment.categoryPath,
      commodityCode: raw.CommodityCode,
      commodityName: raw.CommodityName,

      title: cleanTitle,
      slug,
      shortDescription: raw.DescriptionShort ? this.normalizer.cleanText(raw.DescriptionShort) : undefined,
      supplierDescription: this.normalizer.cleanText(raw.Description),
      seoTitle: enrichment.seoTitle,
      seoDescription: enrichment.seoDescription,
      searchKeywords: enrichment.searchKeywords || [],

      pricing,
      stockCount: Number(raw.OnStockCount) || (isStockAvailable ? 5 : 0),
      isInStock: isStockAvailable,
      stockText: raw.OnStockText || (isStockAvailable ? 'Skladom' : 'Na objednávku'),
      expectedRestockDate: raw.DateAvailible && raw.DateAvailible !== '1.1.1900' ? raw.DateAvailible : undefined,
      minOrderQuantity: Number(raw.MultipleQuantity) || 1,
      warrantyMonths: raw.WarrantyTerm || 24,

      attributes,
      rawNavigatorData: raw.ProductNavigatorDataList ? raw.ProductNavigatorDataList.map((n) => ({ attributeCode: n.AttributeCode, valueCode: n.ValueCode })) : undefined,
      images,
      dimensions: raw.LogisticDataList && raw.LogisticDataList[0] ? {
        weightKg: raw.LogisticDataList[0].weight,
        lengthCm: raw.LogisticDataList[0].length,
        widthCm: raw.LogisticDataList[0].width,
        heightCm: raw.LogisticDataList[0].height,
      } : undefined,

      status: isStockAvailable ? 'ACTIVE' : 'OUT_OF_STOCK',
      reviewStatus,
      aiEnrichment: enrichment,
      qualityScore: { total: 0, breakdown: {} as any }, // calculated below
      dataHash: newHash,
      lastSyncedAt: new Date().toISOString(),
      lastReprocessedAt: new Date().toISOString(),
      createdAt: existing ? existing.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 7. Calculate Quality Score
    masterProduct.qualityScore = this.quality.calculateScore(masterProduct);

    // 8. Upsert in repository
    await this.repo.upsertProduct(masterProduct);

    return {
      status: existing ? 'UPDATED' : 'CREATED',
      product: masterProduct,
    };
  }

  /**
   * Fast Stock & Price sync from getProductCatalogueStockDownloadXML
   */
  async updateStockAndPrices(stockItems: EDRawProductStock[]): Promise<{
    updated: number;
    priceChanged: number;
    stockChanged: number;
    skipped: number;
  }> {
    let updated = 0;
    let priceChanged = 0;
    let stockChanged = 0;
    let skipped = 0;

    for (const item of stockItems) {
      const existing = await this.repo.getProductByCode(item.Code);
      if (!existing) {
        skipped++;
        continue;
      }

      const newCost = Number(item.YourPriceWithFees) || Number(item.YourPrice);
      const isPriceDiff = Math.abs(existing.pricing.totalCostWithFees - newCost) > 0.001;
      const newStock = Number(item.OnStockCount) || 0;
      const isStockDiff = existing.stockCount !== newStock;

      if (isPriceDiff || isStockDiff) {
        if (isPriceDiff) {
          priceChanged++;
          existing.pricing.supplierCost = Number(item.YourPrice);
          existing.pricing.totalCostWithFees = newCost;
          existing.pricing.basePrice = Math.round(newCost * 1.15 * 100) / 100;
          existing.pricing.finalPrice = Math.round(existing.pricing.basePrice * (1 + existing.pricing.vatRate / 100) * 100) / 100;
        }
        if (isStockDiff) {
          stockChanged++;
          existing.stockCount = newStock;
          existing.isInStock = newStock > 0;
          existing.status = newStock > 0 ? 'ACTIVE' : 'OUT_OF_STOCK';
        }

        existing.lastSyncedAt = new Date().toISOString();
        existing.qualityScore = this.quality.calculateScore(existing);
        await this.repo.upsertProduct(existing);
        updated++;
      } else {
        skipped++;
      }
    }

    return { updated, priceChanged, stockChanged, skipped };
  }

  /**
   * Batch imports an array of raw products and returns run summary
   */
  async importBatch(items: EDRawProductDetail[]): Promise<ImportRunSummary> {
    const startTime = new Date().toISOString();
    const runId = `run-${Date.now()}`;

    let createdCount = 0;
    let updatedCount = 0;
    let unchangedCount = 0;
    let quarantinedCount = 0;
    let needsReviewCount = 0;

    for (const item of items) {
      const result = await this.processRawProduct(item);
      if (result.status === 'CREATED') {
        createdCount++;
        if (result.product?.reviewStatus === 'NEEDS_REVIEW') needsReviewCount++;
      } else if (result.status === 'UPDATED') {
        updatedCount++;
        if (result.product?.reviewStatus === 'NEEDS_REVIEW') needsReviewCount++;
      } else if (result.status === 'UNCHANGED') {
        unchangedCount++;
      } else if (result.status === 'QUARANTINED') {
        quarantinedCount++;
      }
    }

    const summary: ImportRunSummary = {
      id: runId,
      type: 'FULL_CATALOG',
      startTime,
      endTime: new Date().toISOString(),
      durationMs: Date.now() - new Date(startTime).getTime(),
      totalFetched: items.length,
      createdCount,
      updatedCount,
      unchangedCount,
      priceChangedCount: 0,
      stockChangedCount: 0,
      quarantinedCount,
      needsReviewCount,
      errorsCount: 0,
      status: 'COMPLETED',
    };

    await this.repo.recordImportRun(summary);
    return summary;
  }
}
