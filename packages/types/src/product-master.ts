/**
 * Worlds.sk Product Master (PIM) and Normalization Data Models
 */

export type ProductLifecycleStatus =
  | 'ACTIVE'
  | 'OUT_OF_STOCK'
  | 'DISCONTINUED'
  | 'HIDDEN'
  | 'REMOVED';

export type ReviewStatus = 'APPROVED' | 'NEEDS_REVIEW' | 'REJECTED' | 'AUTO_APPROVED';

export interface AttributeValue {
  code: string;
  name: string;
  value: string | number | boolean;
  unit?: string;
  rawValue?: string;
}

export interface ProductDimensions {
  weightKg?: number;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
}

export interface PricingBreakdown {
  supplierCost: number; // YourPrice
  supplierFees: {
    garbageFee: number; // SNC
    authorFee: number; // AO
    valuePackDiscount?: number;
    valuePackQty?: number;
  };
  totalCostWithFees: number; // YourPriceWithFees
  vatRate: number; // e.g. 20 (or 23 in SK)
  marginPercentage: number;
  basePrice: number; // Selling price without VAT
  finalPrice: number; // Selling price with VAT
  recommendedRetailPrice?: number; // EndUserPrice
  currency: string; // EUR
}

export interface ProductImage {
  id: string;
  url: string;
  position: number;
  altText?: string;
  isPrimary: boolean;
  checksum?: string;
}

export interface AIEnrichmentResult {
  assignedCategorySlug: string;
  categoryPath: string[];
  confidence: number; // 0.0 to 1.0
  reasoning?: string;
  seoTitle?: string;
  seoDescription?: string;
  generatedBulletPoints?: string[];
  searchKeywords?: string[];
  flags?: {
    lowConfidence?: boolean;
    missingEAN?: boolean;
    missingImages?: boolean;
    unclearSpecs?: boolean;
  };
}

export interface QualityScore {
  total: number; // 0 - 100
  breakdown: {
    ean: number;
    brand: number;
    mpn: number;
    category: number;
    images: number;
    attributes: number;
    description: number;
    seo: number;
    price: number;
    stock: number;
  };
}

/**
 * Normalized Master Product - canonical representation used by Storefront and Commerce Engine
 */
export interface MasterProduct {
  id: string;
  supplierCode: string; // eD Code
  supplierProId: string;
  sku: string;
  mpn: string; // PartNumber
  mpn2?: string;
  ean?: string;
  
  // Brand & Taxonomy
  brand: string;
  rawBrand?: string;
  /** Local manufacturer logo path, when the logo sync found one. */
  manufacturerLogoUrl?: string | null;
  categorySlug: string;
  categoryHierarchy: string[];
  commodityCode?: string;
  commodityName?: string;

  // Presentation & SEO
  title: string;
  slug: string;
  shortDescription?: string;
  supplierDescription?: string;
  enrichedDescription?: string;
  seoTitle?: string;
  seoDescription?: string;
  searchKeywords: string[];

  // Pricing & Inventory
  pricing: PricingBreakdown;
  stockCount: number;
  isInStock: boolean;
  stockText?: string;
  expectedRestockDate?: string;
  minOrderQuantity: number;
  warrantyMonths?: number;

  // Specifications & Media
  attributes: Record<string, AttributeValue>;
  rawNavigatorData?: Array<{ attributeCode: string | number; valueCode: string | number }>;
  images: ProductImage[];
  dimensions?: ProductDimensions;

  // Management & AI Audit
  status: ProductLifecycleStatus;
  reviewStatus: ReviewStatus;
  aiEnrichment?: AIEnrichmentResult;
  qualityScore: QualityScore;
  
  // Change Tracking
  dataHash: string; // MD5/SHA256 of raw data to skip unchanged records
  lastSyncedAt: string;
  lastReprocessedAt: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Quarantine record for invalid products that cannot be processed
 */
export interface QuarantineRecord {
  id: string;
  supplierCode: string;
  proId?: string;
  reason: 'MISSING_MPN' | 'INVALID_EAN' | 'ZERO_PRICE' | 'MALFORMED_DATA' | 'OTHER';
  errorDetails: string;
  rawPayload: Record<string, unknown>;
  createdAt: string;
  resolved: boolean;
}

/**
 * Import Run Statistics
 */
export interface ImportRunSummary {
  id: string;
  type: 'FULL_CATALOG' | 'STOCK_HOURLY' | 'NAVIGATOR_SYNC';
  startTime: string;
  endTime?: string;
  durationMs?: number;
  totalFetched: number;
  createdCount: number;
  updatedCount: number;
  unchangedCount: number;
  priceChangedCount: number;
  stockChangedCount: number;
  quarantinedCount: number;
  needsReviewCount: number;
  errorsCount: number;
  status: 'RUNNING' | 'COMPLETED' | 'FAILED';
  errorMessage?: string;
}
