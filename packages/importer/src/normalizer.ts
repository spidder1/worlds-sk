import slugify from 'slugify';
import { EDRawProductDetail, MasterProduct, PricingBreakdown, ProductImage } from '@worlds/types';

// Normalization mappings for brands
const BRAND_MAP: Record<string, string> = {
  'hewlett packard': 'HP',
  'hewlett-packard': 'HP',
  'hp inc.': 'HP',
  'hp enterprise': 'HPE',
  'asustek': 'ASUS',
  'asus computer': 'ASUS',
  'lenovo group': 'Lenovo',
  'western digital': 'WD',
  'kingston technology': 'Kingston',
  'tp link': 'TP-Link',
  'tp-link': 'TP-Link',
  'samsung electronics': 'Samsung',
  'apple inc.': 'Apple',
  'dell technologies': 'Dell',
  'micro-star intl': 'MSI',
  'msi inc.': 'MSI',
};

export class ProductNormalizer {
  private defaultVatRate = 20; // 20% standard VAT
  private defaultMargin = 15; // 15% target margin

  /**
   * Normalizes brand names to standard canonical format
   */
  normalizeBrand(rawBrand?: string): string {
    if (!rawBrand) return 'Neznámy výrobca';
    const trimmed = rawBrand.trim();
    const lower = trimmed.toLowerCase();
    return BRAND_MAP[lower] || trimmed;
  }

  /**
   * Cleans text, removes HTML tags and double spaces
   */
  cleanText(text?: string): string {
    if (!text) return '';
    return text
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Generates URL-friendly slug with SK accent stripping
   */
  generateSlug(title: string, sku: string): string {
    const cleanTitle = (slugify as any).default ? (slugify as any).default(title, { lower: true, strict: true, locale: 'sk' }) : slugify(title, { lower: true, strict: true, locale: 'sk' });
    const cleanSku = (slugify as any).default ? (slugify as any).default(sku, { lower: true, strict: true }) : slugify(sku, { lower: true, strict: true });
    return `${cleanTitle}-${cleanSku}`.toLowerCase();
  }

  /**
   * Normalizes memory and storage sizes (e.g. "512GB", "512 Gb", "512.0 GB" -> "512 GB")
   */
  normalizeCapacity(raw: string): string {
    const match = raw.match(/(\d+(?:\.\d+)?)\s*(gb|tb|mb|kb|g|t|m)/i);
    if (!match) return raw.trim();
    const num = parseFloat(match[1]);
    const unit = match[2].toUpperCase();
    const cleanUnit = unit === 'G' ? 'GB' : unit === 'T' ? 'TB' : unit === 'M' ? 'MB' : unit;
    return `${num} ${cleanUnit}`;
  }

  /**
   * Computes accurate prices including supplier fees (SNC/AO) and VAT
   */
  computePricing(raw: EDRawProductDetail, targetMarginPct = this.defaultMargin): PricingBreakdown {
    const supplierCost = Number(raw.YourPrice) || 0;
    const garbageFee = Number(raw.GarbageFee) || 0;
    const authorFee = Number(raw.AuthorFee) || 0;
    const totalCostWithFees = Number(raw.YourPriceWithFees) || (supplierCost + garbageFee + authorFee);
    const vatRate = Number(raw.Vat) || this.defaultVatRate;
    
    // Selling price without VAT calculated with margin
    const marginMultiplier = 1 + (targetMarginPct / 100);
    const calculatedBasePrice = Math.round((totalCostWithFees * marginMultiplier) * 100) / 100;
    
    // Recommended end-user price from supplier if available, otherwise calculated
    const endUserPrice = Number(raw.EndUserPrice) || 0;
    const basePrice = (endUserPrice > 0 && endUserPrice > totalCostWithFees)
      ? Math.round((endUserPrice / (1 + vatRate / 100)) * 100) / 100
      : calculatedBasePrice;

    const finalPrice = Math.round((basePrice * (1 + vatRate / 100)) * 100) / 100;

    return {
      supplierCost,
      supplierFees: {
        garbageFee,
        authorFee,
        valuePackDiscount: Number(raw.ValuePack) || 0,
        valuePackQty: Number(raw.ValuePackQty) || 0,
      },
      totalCostWithFees,
      vatRate,
      marginPercentage: targetMarginPct,
      basePrice,
      finalPrice,
      recommendedRetailPrice: endUserPrice > 0 ? endUserPrice : undefined,
      currency: raw.PriceCurrency || 'EUR',
    };
  }

  /**
   * Normalizes images array
   */
  normalizeImages(rawImages?: Array<{ URL: string }>, title?: string): ProductImage[] {
    if (!rawImages || rawImages.length === 0) return [];
    return rawImages.map((img, idx) => ({
      id: `img-${idx + 1}`,
      url: img.URL.trim(),
      position: idx,
      altText: title ? `${title} - obrázok ${idx + 1}` : undefined,
      isPrimary: idx === 0,
    }));
  }
}
