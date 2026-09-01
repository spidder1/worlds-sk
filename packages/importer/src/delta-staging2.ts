import crypto from 'node:crypto';

export interface StagingProductRow {
  code: string;
  pro_id?: string | null;
  part_number?: string | null;
  ean_code?: string | null;
  name: string;
  producer_name?: string | null;
  producer_code?: string | null;
  commodity_code?: string | null;
  commodity_name?: string | null;
  your_price: number;
  your_price_with_fees: number;
  dealer_price: number;
  end_user_price: number;
  garbage_fee: number;
  author_fee: number;
  vat: number;
  on_stock: boolean;
  on_stock_count: number;
  warranty?: string | null;
  image_url?: string | null;
  description?: string | null;
  description_short?: string | null;
  raw_data?: any;
}

export interface Staging2DeltaRow {
  code: string;
  data_hash: string;
  price_hash: string;
  stock_hash: string;
  content_hash: string;
  delta_status: 'NEW' | 'PRICE_CHANGED' | 'STOCK_CHANGED' | 'CONTENT_CHANGED' | 'UNCHANGED' | 'DISCONTINUED';
  changed_fields: string[];
  last_seen_at: string;
}

export function computeProductHashes(product: StagingProductRow) {
  const priceStr = `${product.your_price}_${product.your_price_with_fees}_${product.dealer_price}_${product.end_user_price}_${product.garbage_fee}_${product.author_fee}_${product.vat}`;
  const priceHash = crypto.createHash('md5').update(priceStr).digest('hex');

  const stockStr = `${product.on_stock}_${product.on_stock_count}`;
  const stockHash = crypto.createHash('md5').update(stockStr).digest('hex');

  const contentStr = `${product.name}_${product.description || ''}_${product.description_short || ''}_${product.image_url || ''}_${product.part_number || ''}_${product.ean_code || ''}_${product.warranty || ''}`;
  const contentHash = crypto.createHash('md5').update(contentStr).digest('hex');

  const totalHash = crypto.createHash('sha256').update(`${priceHash}_${stockHash}_${contentHash}`).digest('hex');

  return {
    priceHash,
    stockHash,
    contentHash,
    totalHash
  };
}

export function detectDelta(
  current: StagingProductRow,
  previous?: Staging2DeltaRow | null
): Staging2DeltaRow {
  const { priceHash, stockHash, contentHash, totalHash } = computeProductHashes(current);
  const now = new Date().toISOString();

  if (!previous) {
    return {
      code: current.code,
      data_hash: totalHash,
      price_hash: priceHash,
      stock_hash: stockHash,
      content_hash: contentHash,
      delta_status: 'NEW',
      changed_fields: ['all'],
      last_seen_at: now
    };
  }

  const changedFields: string[] = [];
  let status: Staging2DeltaRow['delta_status'] = 'UNCHANGED';

  if (previous.price_hash !== priceHash) {
    changedFields.push('price');
    status = 'PRICE_CHANGED';
  }
  if (previous.stock_hash !== stockHash) {
    changedFields.push('stock');
    status = status === 'UNCHANGED' ? 'STOCK_CHANGED' : 'PRICE_CHANGED';
  }
  if (previous.content_hash !== contentHash) {
    changedFields.push('content');
    status = 'CONTENT_CHANGED';
  }

  return {
    code: current.code,
    data_hash: totalHash,
    price_hash: priceHash,
    stock_hash: stockHash,
    content_hash: contentHash,
    delta_status: status,
    changed_fields: changedFields,
    last_seen_at: now
  };
}
