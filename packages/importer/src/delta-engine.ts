import crypto from 'node:crypto';
import { EDImageInput, EDRawProductDetail, EDRawProductStock } from '@worlds/types';

function imageUrls(input?: EDImageInput): string[] {
  if (!input) return [];
  const list = !Array.isArray(input) && typeof input === 'object' && ('ProductImage' in input || 'Image' in input)
    ? input.ProductImage ?? input.Image
    : input;
  const items = Array.isArray(list) ? list : [list];
  return items
    .map((item) => (item && typeof item === 'object' && 'URL' in item ? String(item.URL || '') : ''))
    .filter(Boolean)
    .sort();
}

export class DeltaEngine {
  /**
   * Generates a deterministic hash from a raw product payload
   */
  hashProduct(raw: EDRawProductDetail): string {
    const core = {
      Code: raw.Code,
      Name: raw.Name,
      PartNumber: raw.PartNumber,
      EANCode: raw.EANCode,
      YourPrice: raw.YourPrice,
      YourPriceWithFees: raw.YourPriceWithFees,
      GarbageFee: raw.GarbageFee,
      AuthorFee: raw.AuthorFee,
      EndUserPrice: raw.EndUserPrice,
      OnStock: raw.OnStock,
      OnStockCount: raw.OnStockCount,
      Warranty: raw.Warranty,
      Description: raw.Description,
      ImageList: imageUrls(raw.ImageList),
      ProductNavigatorDataList: (raw.ProductNavigatorDataList || [])
        .map((n) => `${n.AttributeCode}:${n.ValueCode}`)
        .sort(),
    };

    return crypto.createHash('md5').update(JSON.stringify(core)).digest('hex');
  }

  /**
   * Checks if price or stock changed between hourly update and existing product
   */
  hasPriceOrStockChanged(existing: { price: number; stock: number }, update: EDRawProductStock): boolean {
    const priceChanged = Math.abs(existing.price - Number(update.YourPriceWithFees)) > 0.001;
    const stockChanged = existing.stock !== Number(update.OnStockCount);
    return priceChanged || stockChanged;
  }
}
