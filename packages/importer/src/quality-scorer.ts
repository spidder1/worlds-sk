import { MasterProduct, QualityScore } from '@worlds/types';

export class QualityScorer {
  /**
   * Calculates the Product Quality Score (0-100) based on Worlds.sk evaluation criteria
   */
  calculateScore(product: Partial<MasterProduct>): QualityScore {
    let eanScore = 0;
    let brandScore = 0;
    let mpnScore = 0;
    let categoryScore = 0;
    let imagesScore = 0;
    let attributesScore = 0;
    let descriptionScore = 0;
    let seoScore = 0;
    let priceScore = 0;
    let stockScore = 0;

    // 1. EAN (10 pts)
    if (product.ean && product.ean.trim().length >= 8) {
      eanScore = 10;
    }

    // 2. Brand (5 pts)
    if (product.brand && product.brand !== 'Neznámy výrobca' && product.brand.trim().length > 1) {
      brandScore = 5;
    }

    // 3. MPN (10 pts)
    if (product.mpn && product.mpn.trim().length > 2) {
      mpnScore = 10;
    }

    // 4. Category (15 pts)
    if (product.categorySlug && product.categoryHierarchy && product.categoryHierarchy.length >= 2) {
      categoryScore = 15;
    } else if (product.categorySlug) {
      categoryScore = 10;
    }

    // 5. Images (10 pts)
    if (product.images && product.images.length > 0) {
      imagesScore = product.images.length >= 2 ? 10 : 7;
    }

    // 6. Structured Attributes (20 pts)
    const attrCount = Object.keys(product.attributes || {}).length;
    if (attrCount >= 4) {
      attributesScore = 20;
    } else if (attrCount >= 2) {
      attributesScore = 12;
    } else if (attrCount >= 1) {
      attributesScore = 6;
    }

    // 7. Description (10 pts)
    const descLen = (product.supplierDescription || product.enrichedDescription || '').length;
    if (descLen >= 150) {
      descriptionScore = 10;
    } else if (descLen >= 50) {
      descriptionScore = 5;
    }

    // 8. SEO Metadata (10 pts)
    if (product.seoTitle && product.seoDescription && product.seoDescription.length > 20) {
      seoScore = 10;
    } else if (product.seoTitle) {
      seoScore = 5;
    }

    // 9. Price (5 pts)
    if (product.pricing && product.pricing.finalPrice > 0 && product.pricing.totalCostWithFees > 0) {
      priceScore = 5;
    }

    // 10. Stock (5 pts)
    if (product.stockCount !== undefined && product.stockCount >= 0) {
      stockScore = 5;
    }

    const total =
      eanScore +
      brandScore +
      mpnScore +
      categoryScore +
      imagesScore +
      attributesScore +
      descriptionScore +
      seoScore +
      priceScore +
      stockScore;

    return {
      total,
      breakdown: {
        ean: eanScore,
        brand: brandScore,
        mpn: mpnScore,
        category: categoryScore,
        images: imagesScore,
        attributes: attributesScore,
        description: descriptionScore,
        seo: seoScore,
        price: priceScore,
        stock: stockScore,
      },
    };
  }
}
