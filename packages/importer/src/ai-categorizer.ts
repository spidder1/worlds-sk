import { AIEnrichmentResult, EDRawProductDetail } from '@worlds/types';
import { TaxonomyEngine } from './taxonomy-engine.js';
import { ProductNormalizer } from './normalizer.js';

export interface AICategorizerOptions {
  taxonomyEngine: TaxonomyEngine;
  normalizer: ProductNormalizer;
  confidenceThreshold?: number; // e.g. 0.85
}

export class AICategorizer {
  private taxonomy: TaxonomyEngine;
  private normalizer: ProductNormalizer;
  private threshold: number;

  constructor(options: AICategorizerOptions) {
    this.taxonomy = options.taxonomyEngine;
    this.normalizer = options.normalizer;
    this.threshold = options.confidenceThreshold ?? 0.85;
  }

  /**
   * Enriches a product with category classification, SEO titles, descriptions and keywords
   */
  async processProduct(raw: EDRawProductDetail, brand: string): Promise<AIEnrichmentResult> {
    const match = this.taxonomy.matchCategory({
      categoryCode: raw.CategoryCode,
      commodityCode: raw.CommodityCode,
      productName: raw.Name,
    });

    const categorySlug = match.category ? match.category.slug : 'ostatne';
    const categoryPath = match.hierarchy;
    const confidence = match.confidence;

    // Build SEO metadata from verified product attributes (no hallucinated specs)
    const cleanTitle = this.normalizer.cleanText(raw.Name);
    const seoTitle = `${cleanTitle} | Worlds.sk`;
    
    const shortDesc = raw.DescriptionShort
      ? this.normalizer.cleanText(raw.DescriptionShort)
      : this.normalizer.cleanText(raw.Description).slice(0, 155);

    const seoDescription = shortDesc.length > 30
      ? `${shortDesc} - Kúpite výhodne na Worlds.sk.`
      : `Kúpiť ${cleanTitle} za skvelú cenu s rýchlym doručením na Worlds.sk.`;

    // Extract search keywords from brand, MPN, category and title tokens
    const keywordsSet = new Set<string>();
    if (brand) keywordsSet.add(brand.toLowerCase());
    if (raw.PartNumber) keywordsSet.add(raw.PartNumber.toLowerCase());
    if (raw.EANCode) keywordsSet.add(raw.EANCode);
    if (raw.Code) keywordsSet.add(raw.Code.toLowerCase());

    const titleTokens = cleanTitle
      .toLowerCase()
      .split(/[\s,/-]+/)
      .filter((t) => t.length > 2);
    for (const t of titleTokens) {
      keywordsSet.add(t);
    }
    for (const p of categoryPath) {
      keywordsSet.add(p.toLowerCase());
    }

    const hasLowConfidence = confidence < this.threshold;
    const missingEAN = !raw.EANCode || raw.EANCode.trim().length < 8;
    const rawImageList = raw.ImageList as any;
    const imageList = rawImageList && typeof rawImageList === 'object' && !Array.isArray(rawImageList) && ('ProductImage' in rawImageList || 'Image' in rawImageList)
      ? rawImageList.ProductImage ?? rawImageList.Image
      : rawImageList;
    const missingImages = !imageList || (Array.isArray(imageList) ? imageList.length === 0 : false);

    return {
      assignedCategorySlug: categorySlug,
      categoryPath,
      confidence,
      reasoning: `Rule & classifier matched via eD CategoryCode: ${raw.CategoryCode || 'N/A'}, Commodity: ${raw.CommodityCode || 'N/A'}`,
      seoTitle,
      seoDescription,
      searchKeywords: Array.from(keywordsSet),
      flags: {
        lowConfidence: hasLowConfidence,
        missingEAN,
        missingImages,
      },
    };
  }
}
