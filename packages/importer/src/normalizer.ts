import slugify from 'slugify';
import { EDRawProductDetail, EDImageInput, MasterProduct, PricingBreakdown, ProductImage, ProductDimensions } from '@worlds/types';

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
  private defaultMargin = 20; // 20% default margin matching PHP Settings fallback

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
   * Cleans SKU code matching PHP Feed_ED rule:
   * Strips single and double quotes, replaces backslashes with '-'
   */
  normalizeSku(code?: string): string {
    if (!code) return '';
    let sku = code.trim().replace(/['"]/g, '');
    sku = sku.replace(/\\/g, '-');
    return sku;
  }

  /**
   * Cleans EAN code matching PHP Feed_ED rule:
   * Strips backticks `
   */
  normalizeEan(ean?: string): string {
    if (!ean) return '';
    return String(ean).replace(/`/g, '').trim();
  }

  /**
   * Cleans title matching PHP Feed_ED rule:
   * Replaces backslashes '\' with '-' and strips HTML tags/extra spaces
   */
  normalizeTitle(name?: string): string {
    if (!name) return '';
    const withDashes = name.replace(/\\/g, '-');
    return this.cleanText(withDashes);
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
   * Parses stock count matching PHP Feed_ED rules:
   * "100+" -> 1000, "50-99" -> 99, "10-49" -> 49, numeric string -> integer
   */
  parseStockCount(rawCount?: string | number): number {
    if (rawCount === undefined || rawCount === null) return 0;
    const str = String(rawCount).trim();
    if (str === '100+') return 1000;
    if (str === '50-99') return 99;
    if (str === '10-49') return 49;
    const num = parseInt(str, 10);
    return isNaN(num) ? 0 : num;
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
   * Returns margin % based on price range matching PHP Settings::get_margin_from_price
   */
  getMarginFromPrice(price: number, marginsText?: string): number {
    if (!marginsText || !marginsText.trim()) {
      return this.defaultMargin;
    }
    let lastMargin = this.defaultMargin;
    const lines = marginsText.trim().split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      const parts = trimmed.split(':');
      if (parts.length < 2) continue;
      const range = parts[0].split('-');
      if (range.length < 2) continue;
      const min = parseFloat(range[0].replace(',', '.').trim());
      const max = parseFloat(range[1].replace(',', '.').trim());
      const margin = parseFloat(parts[1].replace(',', '.').trim());
      if (isNaN(margin)) continue;
      lastMargin = margin;
      if (price >= min && price <= max) {
        return margin;
      }
    }
    return lastMargin;
  }

  /**
   * Computes accurate prices matching PHP Feed_ED & Settings rules:
   * - supplierCost = YourPrice
   * - ecotax = GarbageFee + AuthorFee
   * - Margin is calculated on supplierCost: supplierCost * (1 + margin / 100)
   * - ecotax is added afterwards: basePrice = calculatedPrice + ecotax
   * - finalPrice = basePrice * (1 + vatRate / 100)
   */
  computePricing(
    raw: EDRawProductDetail,
    categoryMargin?: number,
    marginsText?: string
  ): PricingBreakdown {
    const supplierCost = Number(raw.YourPrice) || 0;
    const garbageFee = Number(raw.GarbageFee) || 0;
    const authorFee = Number(raw.AuthorFee) || 0;
    const ecotax = garbageFee + authorFee;
    const totalCostWithFees = Number(raw.YourPriceWithFees) || (supplierCost + ecotax);
    const vatRate = Number(raw.Vat) || this.defaultVatRate;

    let marginPct: number;
    if (categoryMargin !== undefined && categoryMargin !== null && !isNaN(categoryMargin) && categoryMargin > 0) {
      marginPct = categoryMargin;
    } else {
      marginPct = this.getMarginFromPrice(supplierCost, marginsText);
    }

    const calculatedPrice = supplierCost * (1 + marginPct / 100);
    const basePrice = Math.round((calculatedPrice + ecotax) * 100) / 100;
    const finalPrice = Math.round((basePrice * (1 + vatRate / 100)) * 100) / 100;

    const endUserPrice = Number(raw.EndUserPrice) || 0;

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
      marginPercentage: marginPct,
      basePrice,
      finalPrice,
      recommendedRetailPrice: endUserPrice > 0 ? endUserPrice : undefined,
      currency: raw.PriceCurrency || 'EUR',
    };
  }

  /**
   * Builds combined long description matching PHP Feed_ED rule:
   * Description + "<br>" + DescriptionShort, fallback to title, plus "<br><br>Záruka: {Warranty}"
   */
  buildLongDescription(raw: EDRawProductDetail): string {
    const desc = raw.Description ? raw.Description.trim() : '';
    const descShort = raw.DescriptionShort ? raw.DescriptionShort.trim() : '';
    const title = this.normalizeTitle(raw.Name);

    let descLong = (desc !== '' ? desc + '<br>' : '') + descShort;
    if (!descLong) {
      descLong = title;
    }
    if (raw.Warranty && String(raw.Warranty).trim() !== '') {
      descLong += `<br><br>Záruka: ${String(raw.Warranty).trim()}`;
    }
    return descLong;
  }

  /**
   * Normalizes images array matching PHP Feed_ED rule:
   * Replaces _3. and _8. with . and converts http:// to https://
   */
  normalizeImages(rawImages?: EDImageInput, title?: string): ProductImage[] {
    if (!rawImages) return [];
    const imageList = !Array.isArray(rawImages) && typeof rawImages === 'object' && ('ProductImage' in rawImages || 'Image' in rawImages)
      ? rawImages.ProductImage ?? rawImages.Image
      : rawImages;
    const images = Array.isArray(imageList) ? imageList : [imageList];
    return images.flatMap((img, idx) => {
      const rawUrl = typeof img === 'object' && img !== null && 'URL' in img ? String(img.URL || '') : '';
      if (!rawUrl.trim()) return [];
      let url = rawUrl.trim();
      url = url.replace(/_3\./g, '.').replace(/_8\./g, '.');
      url = url.replace(/^http:\/\//i, 'https://');
      return [{
        id: `img-${idx + 1}`,
        url,
        position: idx,
        altText: title ? `${title} - obrázok ${idx + 1}` : undefined,
        isPrimary: idx === 0,
      }];
    });
  }

  /**
   * Parses logistic dimensions & weight matching PHP Feed_ED rule:
   * Weight in raw logistic data is divided by 100 (converting dekagrams/grams to kg).
   */
  parseDimensions(logisticList?: any[]): ProductDimensions | undefined {
    if (!logisticList || logisticList.length === 0) return undefined;
    for (const item of logisticList) {
      if (Number(item.count) === 1) {
        return {
          lengthCm: Number(item.length) || 0,
          widthCm: Number(item.width) || 0,
          heightCm: Number(item.height) || 0,
          weightKg: (Number(item.weight) || 0) / 100,
        };
      }
    }
    return undefined;
  }
}
