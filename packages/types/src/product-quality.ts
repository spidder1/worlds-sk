import type { MasterProduct, QualityScore } from './product-master.js';

/**
 * Catalogue quality score (0-100). Lives in @worlds/types so the importer (which
 * writes the score at ingest time) and the storefront (which reads it back, and
 * recomputes it for rows imported before the column existed) can never drift
 * apart.
 *
 * Weights follow the Worlds.sk evaluation criteria:
 * EAN 10, brand 5, MPN 10, category 15, images 10, attributes 20,
 * description 10, SEO 10, price 5, stock 5.
 */
export function calculateQualityScore(product: Partial<MasterProduct>): QualityScore {
  const ean = product.ean && product.ean.trim().length >= 8 ? 10 : 0;

  const brand =
    product.brand && product.brand !== 'Neznámy výrobca' && product.brand.trim().length > 1 ? 5 : 0;

  const mpn = product.mpn && product.mpn.trim().length > 2 ? 10 : 0;

  let category = 0;
  if (product.categorySlug && product.categoryHierarchy && product.categoryHierarchy.length >= 2) {
    category = 15;
  } else if (product.categorySlug) {
    category = 10;
  }

  let images = 0;
  if (product.images && product.images.length > 0) {
    images = product.images.length >= 2 ? 10 : 7;
  }

  const attributeCount = Object.keys(product.attributes || {}).length;
  let attributes = 0;
  if (attributeCount >= 4) attributes = 20;
  else if (attributeCount >= 2) attributes = 12;
  else if (attributeCount >= 1) attributes = 6;

  const descriptionLength = (product.supplierDescription || product.enrichedDescription || '').length;
  let description = 0;
  if (descriptionLength >= 150) description = 10;
  else if (descriptionLength >= 50) description = 5;

  let seo = 0;
  if (product.seoTitle && product.seoDescription && product.seoDescription.length > 20) seo = 10;
  else if (product.seoTitle) seo = 5;

  const price =
    product.pricing && product.pricing.finalPrice > 0 && product.pricing.totalCostWithFees > 0 ? 5 : 0;

  const stock = product.stockCount !== undefined && product.stockCount >= 0 ? 5 : 0;

  const breakdown = {
    ean,
    brand,
    mpn,
    category,
    images,
    attributes,
    description,
    seo,
    price,
    stock,
  };

  const total = Object.values(breakdown).reduce((sum, value) => sum + value, 0);

  return { total, breakdown };
}
