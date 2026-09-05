import crypto from 'node:crypto';
import { execFile } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import AdmZip from 'adm-zip';
import { XMLParser } from 'fast-xml-parser';
import slugify from 'slugify';
import { EDSystemClient } from '@worlds/ed-client';
import { extractStructuredAttributes } from './attribute-extractor.js';
import { sanitizeAndFormatHtml } from './html-sanitizer.js';
import { classifyProductIndependently } from './taxonomy-definition.js';
import { assessCatalogScope } from './catalog-scope.js';
import { createNeonRpcClient } from './neon-rpc.js';
import { loadPricingConfig, marginFor, type PricingConfig } from './pricing-config.js';
import { calculateQualityScore } from '@worlds/types';

type SyncMode = 'full' | 'stock-price';
type CatalogScope = 'it-only' | 'all';

interface CliOptions {
  mode: SyncMode;
  sourceFile?: string;
  limit?: number;
  batchSize: number;
  allowCachedFull: boolean;
  scope: CatalogScope;
  dryRun: boolean;
  brandScope: string[];
}

interface RpcBatchResult {
  processed: number;
  created: number;
  changed: number;
  unchanged: number;
  missing: number;
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  parseTagValue: true,
  trimValues: true,
  processEntities: false,
});

function parseArgs(argv: string[]): CliOptions {
  const valueOf = (name: string) => argv.find((arg) => arg.startsWith(`${name}=`))?.slice(name.length + 1);
  const rawMode = valueOf('--mode') ?? process.env.IMPORT_MODE ?? 'full';
  if (rawMode !== 'full' && rawMode !== 'stock-price') {
    throw new Error(`Unsupported import mode: ${rawMode}`);
  }

  const rawLimit = valueOf('--limit');
  const rawBatchSize = valueOf('--batch-size') ?? process.env.IMPORT_BATCH_SIZE ?? '50';
  const rawScope = valueOf('--scope') ?? process.env.ED_CATALOG_SCOPE ?? 'it-only';
  const rawBrandScope = valueOf('--brands') ?? process.env.ED_BRAND_SCOPE ?? '';
  const brandScope = rawBrandScope
    .split(',')
    .map((brand) => brand.trim())
    .filter(Boolean);
  const limit = rawLimit && rawLimit !== 'all' ? Number.parseInt(rawLimit, 10) : undefined;
  const batchSize = Number.parseInt(rawBatchSize, 10);
  if (limit !== undefined && (!Number.isSafeInteger(limit) || limit < 1)) {
    throw new Error('--limit must be a positive integer or "all".');
  }
  const maximumBatchSize = 200;
  if (!Number.isSafeInteger(batchSize) || batchSize < 1 || batchSize > maximumBatchSize) {
    throw new Error(`--batch-size must be between 1 and ${maximumBatchSize}.`);
  }
  if (rawScope !== 'it-only' && rawScope !== 'all') {
    throw new Error('--scope must be "it-only" or "all".');
  }

  return {
    mode: rawMode,
    sourceFile: valueOf('--source-file') ?? process.env.ED_SOURCE_FILE,
    limit,
    batchSize,
    allowCachedFull: argv.includes('--allow-cached-full') || process.env.ALLOW_CACHED_FULL === 'true',
    scope: rawScope,
    dryRun: argv.includes('--dry-run'),
    brandScope,
  };
}

function optionalEdCredentials() {
  const login = process.env.ED_LOGIN?.trim();
  const password = process.env.ED_PASSWORD?.trim();
  if (!login || !password) return undefined;
  return {
    login,
    password,
    endpointUrl: process.env.ED_ENDPOINT_URL?.trim(),
  };
}

function value(raw: unknown): string {
  if (raw === null || raw === undefined) return '';
  if (typeof raw === 'object' && '#text' in (raw as Record<string, unknown>)) {
    return value((raw as Record<string, unknown>)['#text']);
  }
  return String(raw).trim();
}

function numberValue(raw: unknown, fallback = 0): number {
  const normalized = value(raw).replace(',', '.');
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function booleanValue(raw: unknown): boolean {
  if (typeof raw === 'boolean') return raw;
  const normalized = value(raw).toLowerCase();
  return normalized === 'true' || normalized === '1' || normalized === 'y' || normalized === 'yes';
}

function hash(parts: unknown[]): string {
  return crypto.createHash('sha256').update(JSON.stringify(parts)).digest('hex');
}

async function sha256File(filePath: string): Promise<string> {
  const digest = crypto.createHash('sha256');
  const stream = fs.createReadStream(filePath);
  for await (const chunk of stream) digest.update(chunk as Buffer);
  return digest.digest('hex');
}

function normalizeIdentifier(raw: unknown): string | null {
  const normalized = value(raw);
  return normalized && normalized !== '0' ? normalized : null;
}

function extractBrand(title: string, rawBrand?: unknown): string {
  const supplied = value(rawBrand);
  if (supplied && supplied.toLowerCase() !== 'neznámy') return supplied;
  const firstToken = title.split(/[\s/]+/).find(Boolean);
  return firstToken ? firstToken.slice(0, 120) : 'Unbranded';
}

function parseWarrantyMonths(raw: unknown): number {
  const match = value(raw).match(/\d+/);
  const parsed = match ? Number.parseInt(match[0], 10) : 24;
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 24;
}

function safeSlug(title: string, code: string): string {
  const titleSlug = slugify(title, { lower: true, strict: true, locale: 'sk', trim: true }).slice(0, 90);
  return `${titleSlug || 'produkt'}-${slugify(code, { lower: true, strict: true })}`;
}

function asArray<T>(input: T | T[] | null | undefined): T[] {
  if (input === null || input === undefined) return [];
  return Array.isArray(input) ? input : [input];
}

/** Preserve every eD navigator attribute even when no label dictionary is
 * available in the catalogue file. The reference codes remain stable and can
 * be resolved later by an enrichment/admin job without losing the source data.
 */
export function extractNavigatorAttributes(product: Record<string, unknown>): Record<string, {
  code: string;
  name: string;
  value: string;
  rawValue: string;
}> {
  const rawList = product.ProductNavigatorDataList;
  const wrapped = rawList && typeof rawList === 'object' && !Array.isArray(rawList)
    ? (rawList as Record<string, unknown>).ProductNavigatorData ?? rawList
    : rawList;
  const attributes: Record<string, { code: string; name: string; value: string; rawValue: string }> = {};
  for (const item of asArray(wrapped as Record<string, unknown> | Record<string, unknown>[] | null | undefined)) {
    if (!item || typeof item !== 'object') continue;
    const attribute = value(item.AttributeCode ?? item.attributeCode);
    const rawValue = value(item.ValueCode ?? item.Value ?? item.valueCode ?? item.value);
    if (!attribute || !rawValue) continue;
    attributes[`attr_${attribute}`] = {
      code: attribute,
      name: `Atribút ${attribute}`,
      value: rawValue,
      rawValue,
    };
  }
  return attributes;
}

/**
 * eD serializes images as ImageList.ProductImage.URL. fast-xml-parser keeps
 * that wrapper, and a single ProductImage is an object while multiple images
 * are an array. Accept the older flat variants as well so cached/test feeds
 * remain compatible.
 */
export function extractProductImageUrls(product: Record<string, unknown>): string[] {
  const imageList = product.ImageList;
  const wrappedImages = imageList && typeof imageList === 'object' && !Array.isArray(imageList)
    ? (imageList as Record<string, unknown>).ProductImage
      ?? (imageList as Record<string, unknown>).Image
      ?? imageList
    : imageList;
  const candidates = [
    ...asArray(wrappedImages),
    product.ImageUrl,
    product.ImgUrl,
  ];
  const urls = new Set<string>();

  for (const candidate of candidates) {
    const rawUrl = candidate && typeof candidate === 'object'
      ? value((candidate as Record<string, unknown>).URL ?? (candidate as Record<string, unknown>).Url)
      : value(candidate);
    if (!/^https?:\/\//i.test(rawUrl)) continue;

    const normalized = rawUrl
      .replace(/^http:\/\//i, 'https://')
      .replace(/_3(?=\.[a-z0-9]+(?:\?|$))/i, '')
      .replace(/_8(?=\.[a-z0-9]+(?:\?|$))/i, '');
    urls.add(normalized);
  }

  return [...urls];
}

function transformFullProduct(product: Record<string, unknown>, pricing: PricingConfig): Record<string, unknown> | null {
  const code = value(product.Code ?? product.ProId);
  const title = value(product.Name ?? product.ProductName);
  if (!code || title.length < 3) return null;
  const nameB2c = value(product.NameB2C ?? product.NameB2c ?? product.NameB2cTitle) || title;
  const currency = normalizeIdentifier(product.PriceCurrency ?? product.Currency) || 'EUR';

  const supplierCost = Math.max(0, numberValue(product.YourPrice));
  const garbageFee = Math.max(0, numberValue(product.GarbageFee));
  const authorFee = Math.max(0, numberValue(product.AuthorFee));
  const totalCostWithFees = Math.max(
    0,
    numberValue(product.YourPriceWithFees, supplierCost + garbageFee + authorFee),
  );
  const hasCommercialData = totalCostWithFees > 0;

  const vatRate = pricing.vatRate;
  const marginPercentage = marginFor(totalCostWithFees, pricing.marginBands);
  const basePrice = hasCommercialData
    ? Number((totalCostWithFees * (1 + marginPercentage / 100)).toFixed(2))
    : 0;
  const finalPrice = hasCommercialData ? Number((basePrice * (1 + vatRate / 100)).toFixed(2)) : 0;
  const stockCountRaw = numberValue(product.OnStockCount, Number.NaN);
  const isInStock = Number.isFinite(stockCountRaw) ? stockCountRaw > 0 : booleanValue(product.OnStock);
  const stockCount = Number.isFinite(stockCountRaw) ? Math.max(0, stockCountRaw) : isInStock ? 1 : 0;
  const brand = extractBrand(title, product.ProducerName ?? product.ProducerCode);
  const mpn = normalizeIdentifier(product.PartNumber) ?? code;
  const mpn2 = normalizeIdentifier(product.PartNumber2);
  const sourceEan = normalizeIdentifier(product.EANCode ?? product.EAN);
  const eanDigits = sourceEan?.replace(/[^0-9]/g, '') ?? '';
  const ean = eanDigits.length >= 8 && eanDigits.length <= 14 ? sourceEan : null;
  const warrantyMonths = parseWarrantyMonths(product.WarrantyTerm ?? product.Warranty);
  const warrantyUnit = normalizeIdentifier(product.WarrantyUnit) || 'M';
  const warrantyRaw = value(product.Warranty ?? product.WarrantyTerm);
  const rawDescription = value(product.Description ?? product.DescriptionShort);
  const { cleanHtml, plainText, specs } = sanitizeAndFormatHtml(rawDescription);
  const category = classifyProductIndependently({
    title,
    commodityName: value(product.CommodityName),
    mpn,
    ean: ean ?? '',
    description: rawDescription,
    descriptionShort: value(product.DescriptionShort),
    producerName: brand,
  });
  const extracted = extractStructuredAttributes(title, rawDescription, specs, brand, mpn, warrantyMonths);
  Object.assign(extracted.allAttributes, extractNavigatorAttributes(product));
  const imageUrls = extractProductImageUrls(product);
  const proId = value(product.ProId) || code;
  const shortDescription = plainText.slice(0, 300);
  const seoTitle = `${title} | Worlds.sk`;
  const seoDescription = (plainText || title).replace(/\s+/g, ' ').trim().slice(0, 155);
  const searchKeywords = [...new Set([brand, mpn, mpn2, ean, ...title.split(/[\s/,]+/)]
    .filter((keyword): keyword is string => Boolean(keyword && keyword.length > 1))
    .map((keyword) => keyword.toLowerCase()))].slice(0, 30);
  const images = imageUrls.map((url, position) => ({
    url,
    position,
    isPrimary: position === 0,
    altText: title,
  }));
  const qualityScore = calculateQualityScore({
    ean: ean ?? undefined,
    brand,
    mpn,
    categorySlug: category.slug,
    categoryHierarchy: category.hierarchy,
    images: images.map((image) => ({ ...image, id: `${code}-${image.position}` })),
    attributes: extracted.allAttributes,
    supplierDescription: plainText,
    enrichedDescription: cleanHtml,
    seoTitle,
    seoDescription,
    pricing: {
      supplierCost,
      supplierFees: { garbageFee, authorFee },
      totalCostWithFees,
      vatRate,
      marginPercentage,
      basePrice,
      finalPrice,
      currency,
    },
    stockCount,
  }).total;
  const dealerPrice = Math.max(0, numberValue(product.DealerPrice, supplierCost));
  const dealerPrice1 = Math.max(0, numberValue(product.DealerPrice1, supplierCost));
  const valuePack = numberValue(product.ValuePack);
  const valuePackQty = numberValue(product.ValuePackQty);
  const unit = normalizeIdentifier(product.Unit);
  const logisticData = asArray(product.LogisticDataList);
  const extInfoCodes = asArray(product.ExtInfoCodes);
  const indexCode1 = normalizeIdentifier(product.IndexCode1);
  const indexCode2 = normalizeIdentifier(product.IndexCode2);
  const contentHash = hash([title, nameB2c, brand, mpn, mpn2, ean, currency, cleanHtml, category.slug, imageUrls, extracted.allAttributes, valuePack, valuePackQty, unit, logisticData, extInfoCodes, indexCode1, indexCode2]);
  const priceHash = hash([supplierCost, garbageFee, authorFee, totalCostWithFees, dealerPrice, dealerPrice1, vatRate, basePrice, finalPrice]);
  const expectedAtRaw = normalizeIdentifier(product.DateAvailible ?? product.DateAvailable ?? product.DateOfDelivery);
  const expectedAt = expectedAtRaw && !/^0?1[./-]0?1[./-]1900(?:$|\s)/.test(expectedAtRaw) ? expectedAtRaw : null;
  const stockText = normalizeIdentifier(product.OnStockText) || (isInStock
    ? (Number.isFinite(stockCountRaw) ? `Skladom ${stockCount} ks` : 'Skladom')
    : 'Na objednávku');
  const inventoryHash = hash([stockCount, isInStock, stockText, expectedAt]);

  return {
    code,
    has_commercial_data: hasCommercialData,
    pro_id: proId,
    title,
    brand,
    producer_code: normalizeIdentifier(product.ProducerCode),
    mpn,
    mpn2,
    ean,
    slug: safeSlug(title, code),
    enriched_description: cleanHtml,
    supplier_description: plainText,
    short_description: shortDescription,
    seo_title: seoTitle,
    seo_description: seoDescription,
    search_keywords: searchKeywords,
    quality_score: qualityScore,
    supplier_cost: supplierCost,
    garbage_fee: garbageFee,
    author_fee: authorFee,
    total_cost_with_fees: totalCostWithFees,
    dealer_price: dealerPrice,
    dealer_price_1: dealerPrice1,
    recommended_retail_price: Math.max(0, numberValue(product.EndUserPrice, finalPrice)),
    base_price: basePrice,
    final_price: finalPrice,
    vat_rate: vatRate,
    margin_percentage: marginPercentage,
    stock_count: stockCount,
    is_in_stock: isInStock,
    stock_text: stockText,
    expected_at: expectedAt,
    warranty_months: warrantyMonths,
    warranty_unit: warrantyUnit,
    category_source: 'HEURISTIC',
    category_confidence: 0.75,
    category_reasoning: 'Lokálna kategorizácia podľa názvu, popisu a CommodityName.',
    category_slug: category.slug,
    category_hierarchy: category.hierarchy,
    commodity_code: normalizeIdentifier(product.CommodityCode),
    commodity_name: normalizeIdentifier(product.CommodityName),
    name_b2c: nameB2c,
    currency,
    value_pack: valuePack,
    value_pack_qty: valuePackQty,
    unit,
    logistic_data: logisticData,
    ext_info_codes: extInfoCodes,
    index_code_1: indexCode1,
    index_code_2: indexCode2,
    order_multiple: Math.max(1, numberValue(product.MultipleQuantity, 1)),
    b2c_eligible: booleanValue(product.B2C ?? true),
    is_premium: booleanValue(product.IsPremium ?? product.Premium) || finalPrice > 1500,
    images,
    attributes: extracted.allAttributes,
    source_extra: {
      valuePack: numberValue(product.ValuePack),
      valuePackQty: numberValue(product.ValuePackQty),
      unit: normalizeIdentifier(product.Unit),
      logisticData,
      extInfoCodes: product.ExtInfoCodes ?? null,
      rateOfDutyCode: normalizeIdentifier(product.RateOfDutyCode),
      rcStatus: normalizeIdentifier(product.RCStatus),
      rcCode: normalizeIdentifier(product.RCCode),
      warrantyRaw,
      warrantyUnit,
      status: normalizeIdentifier(product.Status) || 'ACTIVE',
      isTop: booleanValue(product.IsTop),
      infoCode: normalizeIdentifier(product.InfoCode),
      index: [1, 2].map((position) => ({
        code: normalizeIdentifier(product[`IndexCode${position}`]),
        sort: normalizeIdentifier(product[`IndexSort${position}`]),
        order: normalizeIdentifier(product[`IndexOrder${position}`]),
        implicit: booleanValue(product[`IndexImplicit${position}`]),
      })).filter((entry) => entry.code || entry.sort || entry.order),
    },
    identity_hash: hash([code, proId, mpn, mpn2, ean]),
    content_hash: contentHash,
    data_hash: contentHash,
    price_hash: hasCommercialData ? priceHash : null,
    inventory_hash: hasCommercialData ? inventoryHash : null,
    raw_extra: {
      proId,
      sourceEan,
      commodityCode: normalizeIdentifier(product.CommodityCode),
      commodityName: normalizeIdentifier(product.CommodityName),
      valuePack: numberValue(product.ValuePack),
      valuePackQty: numberValue(product.ValuePackQty),
      stockQuantityExact: Number.isFinite(stockCountRaw),
    },
  };
}

function transformStockProduct(product: Record<string, unknown>, pricing: PricingConfig): Record<string, unknown> | null {
  const code = value(product.Code ?? product.ProId ?? product.PartNumber);
  if (!code) return null;
  const supplierCost = Math.max(0, numberValue(product.YourPrice));
  const garbageFee = Math.max(0, numberValue(product.GarbageFee));
  const authorFee = Math.max(0, numberValue(product.AuthorFee));
  const totalCostWithFees = Math.max(0, numberValue(product.YourPriceWithFees, supplierCost + garbageFee + authorFee));
  const hasCommercialData = totalCostWithFees > 0;
  const vatRate = pricing.vatRate;
  const marginPercentage = marginFor(totalCostWithFees, pricing.marginBands);
  const basePrice = Number((totalCostWithFees * (1 + marginPercentage / 100)).toFixed(2));
  const finalPrice = Number((basePrice * (1 + vatRate / 100)).toFixed(2));
  const stockCountRaw = numberValue(product.OnStockCount, Number.NaN);
  const isInStock = Number.isFinite(stockCountRaw) ? stockCountRaw > 0 : booleanValue(product.OnStock);
  const stockCount = Number.isFinite(stockCountRaw) ? Math.max(0, stockCountRaw) : isInStock ? 1 : 0;
  return {
    code,
    has_commercial_data: hasCommercialData,
    supplier_cost: supplierCost,
    garbage_fee: garbageFee,
    author_fee: authorFee,
    total_cost_with_fees: totalCostWithFees,
    dealer_price: Math.max(0, numberValue(product.DealerPrice, supplierCost)),
    dealer_price_1: Math.max(0, numberValue(product.DealerPrice1, supplierCost)),
    recommended_retail_price: Math.max(0, numberValue(product.EndUserPrice, finalPrice)),
    base_price: basePrice,
    final_price: finalPrice,
    vat_rate: vatRate,
    margin_percentage: marginPercentage,
    stock_count: stockCount,
    is_in_stock: isInStock,
    stock_text: normalizeIdentifier(product.OnStockText) || (isInStock
      ? (Number.isFinite(stockCountRaw) ? `Skladom ${stockCount} ks` : 'Skladom')
      : 'Na objednávku'),
    expected_at: (() => {
      const raw = normalizeIdentifier(product.DateAvailible ?? product.DateAvailable ?? product.DateOfDelivery);
      return raw && !/^0?1[./-]0?1[./-]1900(?:$|\s)/.test(raw) ? raw : null;
    })(),
    price_hash: hash([
      supplierCost,
      garbageFee,
      authorFee,
      totalCostWithFees,
      numberValue(product.DealerPrice, supplierCost),
      numberValue(product.DealerPrice1, supplierCost),
      vatRate,
      basePrice,
      finalPrice,
    ]),
    inventory_hash: hash([
      stockCount,
      isInStock,
      normalizeIdentifier(product.OnStockText),
      (() => {
        const raw = normalizeIdentifier(product.DateAvailible ?? product.DateAvailable ?? product.DateOfDelivery);
        return raw && !/^0?1[./-]0?1[./-]1900(?:$|\s)/.test(raw) ? raw : null;
      })(),
    ]),
  };
}

async function* streamXmlElements(filePath: string, elementName: string): AsyncGenerator<Record<string, unknown>> {
  const startToken = `<${elementName}>`;
  const endToken = `</${elementName}>`;
  let buffer = '';
  const stream = fs.createReadStream(filePath, { encoding: 'utf8', highWaterMark: 1024 * 1024 });

  for await (const chunk of stream) {
    buffer += chunk;
    while (true) {
      const start = buffer.indexOf(startToken);
      if (start < 0) {
        buffer = buffer.slice(-(startToken.length - 1));
        break;
      }
      const end = buffer.indexOf(endToken, start + startToken.length);
      if (end < 0) {
        buffer = buffer.slice(start);
        break;
      }
      const xml = buffer.slice(start, end + endToken.length);
      buffer = buffer.slice(end + endToken.length);
      const parsed = parser.parse(xml) as Record<string, Record<string, unknown>>;
      const item = parsed[elementName];
      if (item) yield item;
    }
  }

  if (buffer.includes(startToken)) {
    throw new Error(`Incomplete <${elementName}> element at the end of ${filePath}.`);
  }
}

export function detectFullProductElementName(filePath: string): 'Product' | 'ProductComplete' | null {
  const descriptor = fs.openSync(filePath, 'r');
  try {
    const size = Math.min(fs.fstatSync(descriptor).size, 1024 * 1024);
    const buffer = Buffer.alloc(size);
    fs.readSync(descriptor, buffer, 0, size, 0);
    const head = buffer.toString('utf8');
    if (/<ProductComplete(?:\s|>)/.test(head)) return 'ProductComplete';
    if (/<Product(?:\s|>)/.test(head)) return 'Product';
    return null;
  } finally {
    fs.closeSync(descriptor);
  }
}

async function downloadToFile(url: string, targetPath: string): Promise<void> {
  const response = await fetch(url, { signal: AbortSignal.timeout(120_000) });
  if (!response.ok || !response.body) {
    throw new Error(`Download failed (${response.status}) for ${new URL(url).origin}.`);
  }
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  const tempPath = `${targetPath}.partial`;
  const file = fs.createWriteStream(tempPath);
  try {
    for await (const chunk of response.body) {
      if (!file.write(chunk)) await new Promise<void>((resolve) => file.once('drain', resolve));
    }
    await new Promise<void>((resolve, reject) => file.end((error?: Error | null) => error ? reject(error) : resolve()));
    fs.renameSync(tempPath, targetPath);
  } catch (error) {
    file.destroy();
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    throw error;
  }
}

function extractXml(zipPath: string, targetPath: string): string {
  const zip = new AdmZip(zipPath);
  const entry = zip.getEntries().find((candidate) => candidate.entryName.toLowerCase().endsWith('.xml'));
  if (!entry) throw new Error(`No XML file found in ${zipPath}.`);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, entry.getData());
  return targetPath;
}

interface ResolvedSource {
  filePath: string;
  sourceMethod: string;
}

async function resolveSources(options: CliOptions): Promise<ResolvedSource[]> {
  if (options.sourceFile) {
    const explicit = path.resolve(options.sourceFile);
    if (!fs.existsSync(explicit)) throw new Error(`Source file does not exist: ${explicit}`);
    if (explicit.toLowerCase().endsWith('.zip')) {
      return [{ filePath: extractXml(explicit, path.resolve('downloads/cache/catalog-source.xml')), sourceMethod: 'LOCAL_FULL_ZIP' }];
    }
    return [{ filePath: explicit, sourceMethod: options.mode === 'full' ? 'LOCAL_FULL_XML' : 'LOCAL_STOCK_XML' }];
  }

  const credentials = optionalEdCredentials();
  if (credentials) {
    const client = new EDSystemClient(credentials);
    if (options.mode === 'stock-price') {
      const status = await client.getProductCatalogueStockDownloadXML();
      if (!status.IsReady || !status.Url) {
        const message = status.Status
          ? `${status.Status.StatusCode}${status.Status.ErrorText ? `: ${status.Status.ErrorText}` : ''}`
          : 'unknown status';
        throw new Error(`eD stock feed is not ready: ${message}`);
      }
      const target = path.resolve('downloads/cache/latest-stock.xml');
      await downloadToFile(status.Url, target);
      return [{ filePath: target, sourceMethod: 'getProductCatalogueStockDownloadXML' }];
    }

    const commodities = await client.getProductCommodityList();
    const commodityRoots = commodities
      .filter((commodity) => value(commodity.CommodityCode) && !value(commodity.CommodityParentCode))
      .map((commodity) => value(commodity.CommodityCode));
    if (commodityRoots.length === 0) {
      throw new Error('eD commodity list did not contain any root commodities.');
    }

    const sources: ResolvedSource[] = [];
    for (const commodityRoot of commodityRoots) {
      const status = await client.getProductCatalogueFullDownloadZIPv1({
        onStock: false,
        commoditiesTree: commodityRoot,
      });
      if (!status.IsReady || !status.Url) {
        const message = status.Status
          ? `${status.Status.StatusCode}${status.Status.ErrorText ? `: ${status.Status.ErrorText}` : ''}`
          : 'unknown status';
        throw new Error(`eD full catalog for commodity tree ${commodityRoot} is not ready: ${message}`);
      }
      const safeRoot = commodityRoot.replace(/[^a-zA-Z0-9_-]/g, '_');
      const zipPath = path.resolve(`downloads/cache/full-${safeRoot}.zip`);
      const xmlPath = path.resolve(`downloads/cache/full-${safeRoot}.xml`);
      console.log(`[import] downloading commodityTree=${safeRoot}`);
      await downloadToFile(status.Url, zipPath);
      sources.push({
        filePath: extractXml(zipPath, xmlPath),
        sourceMethod: `getProductCatalogueFullDownloadZIPv1:${safeRoot}`,
      });
    }
    return sources;
  }

  if (options.mode === 'full' && options.allowCachedFull) {
    const candidates = [
      path.resolve('downloads/productCatalogue_39536264-b5ab-4b6c-9137-0cec8817bf51.xml'),
      path.resolve('downloads/productCatalogue_main.zip'),
    ];
    const cached = candidates.find((candidate) => fs.existsSync(candidate));
    if (cached) {
      if (cached.toLowerCase().endsWith('.zip')) {
        return [{ filePath: extractXml(cached, path.resolve('downloads/cache/catalog-source.xml')), sourceMethod: 'CACHED_FULL_ZIP' }];
      }
      return [{ filePath: cached, sourceMethod: 'CACHED_FULL_XML' }];
    }
  }

  throw new Error(
    options.mode === 'full'
      ? 'Full import needs ED_LOGIN/ED_PASSWORD, --source-file, or the explicit --allow-cached-full flag.'
      : 'Stock/price sync needs ED_LOGIN/ED_PASSWORD or --source-file.',
  );
}

function createRpcClient(brandScope: string[]) {
  return createNeonRpcClient({ brandScope });
}

function addResult(target: RpcBatchResult, update: Partial<RpcBatchResult>): void {
  target.processed += update.processed ?? 0;
  target.created += update.created ?? 0;
  target.changed += update.changed ?? 0;
  target.unchanged += update.unchanged ?? 0;
  target.missing += update.missing ?? 0;
}

export async function runCatalogSync(options = parseArgs(process.argv.slice(2))): Promise<RpcBatchResult> {
  const startedAt = Date.now();
  const pricing = await loadPricingConfig();
  const rpc = options.dryRun ? undefined : createRpcClient(options.brandScope);
  const sources = await resolveSources(options);
  const sourceBytes = sources.reduce((total, source) => total + fs.statSync(source.filePath).size, 0);
  const sourceMethod = sources.map((source) => source.sourceMethod).join(',');
  const sourceMetadata = await Promise.all(sources.map(async (source) => ({
    sourceMethod: source.sourceMethod,
    sourceName: path.basename(source.filePath),
    storageUri: source.filePath,
    byteSize: fs.statSync(source.filePath).size,
    sha256: await sha256File(source.filePath),
    mediaType: source.filePath.toLowerCase().endsWith('.zip') ? 'application/zip' : 'application/xml',
  })));
  console.log(`[import] mode=${options.mode} transport=neon scope=${options.scope} brands=${options.brandScope.join(',') || 'all'} minCost=${pricing.minimumCostEur} vat=${pricing.vatRate} marginBands=${pricing.marginBands.length} sources=${sources.length} bytes=${sourceBytes}`);

  const batchId = rpc ? await rpc<string>('begin_ed_import', {
    p_batch_type: options.mode === 'full' ? 'FULL_CATALOG' : 'STOCK_PRICE',
    p_source_method: sourceMethod,
    p_parameters: {
      sourceFiles: sources.map((source) => path.basename(source.filePath)),
      limit: options.limit ?? null,
      batchSize: options.batchSize,
      scope: options.scope,
      minimumCostEur: pricing.minimumCostEur,
      vatRate: pricing.vatRate,
      marginBands: pricing.marginBands,
      transport: 'neon',
    },
  }) : 'dry-run';
  if (rpc) await rpc<boolean>('record_import_sources', { p_batch_id: batchId, p_sources: sourceMetadata });
  const result: RpcBatchResult = { processed: 0, created: 0, changed: 0, unchanged: 0, missing: 0 };
  let parsed = 0;
  let skipped = 0;
  let filtered = 0;
  const filteredByReason: Record<string, number> = {};
  let lastHeartbeatAt = Date.now();
  let payload: Record<string, unknown>[] = [];
  const quarantinePayload: Record<string, unknown>[] = [];
  const rpcName = options.mode === 'full' ? 'stage_ed_catalog_batch' : 'sync_ed_stock_price_batch';

  const sendItems = async (items: Record<string, unknown>[]): Promise<RpcBatchResult> => {
    if (!rpc) {
      return { processed: items.length, created: 0, changed: 0, unchanged: items.length, missing: 0 };
    }
    try {
      return await rpc<RpcBatchResult>(rpcName, { p_batch_id: batchId, p_items: items });
    } catch (error) {
      if (items.length <= 1) throw error;
      const middle = Math.ceil(items.length / 2);
      console.warn(`[import] splitting failed block size=${items.length} into ${middle}+${items.length - middle}`);
      const left = await sendItems(items.slice(0, middle));
      const right = await sendItems(items.slice(middle));
      const combined: RpcBatchResult = { processed: 0, created: 0, changed: 0, unchanged: 0, missing: 0 };
      addResult(combined, left);
      addResult(combined, right);
      return combined;
    }
  };

  const flush = async () => {
    if (payload.length === 0) return;
    const pending = payload;
    payload = [];
    const batchResult = await sendItems(pending);
    addResult(result, batchResult);
    if (result.processed % 1000 < options.batchSize) {
      console.log(`[import] processed=${result.processed} created=${result.created} changed=${result.changed} unchanged=${result.unchanged}`);
    }
    if (rpc && Date.now() - lastHeartbeatAt >= 60_000) {
      await rpc<boolean>('heartbeat_ed_import', { p_batch_id: batchId });
      lastHeartbeatAt = Date.now();
    }
  };

  try {
    let limitReached = false;
    for (const source of sources) {
      const elementName = options.mode === 'full'
        ? detectFullProductElementName(source.filePath)
        : 'ProductShort';
      if (!elementName) {
        console.log(`[import] skipping empty source=${path.basename(source.filePath)}`);
        continue;
      }
      console.log(`[import] parsing source=${path.basename(source.filePath)}`);
      for await (const rawProduct of streamXmlElements(source.filePath, elementName)) {
        parsed += 1;
        if (options.mode === 'full' && options.scope === 'it-only') {
          const scope = assessCatalogScope({
            title: rawProduct.Name ?? rawProduct.ProductName,
            description: rawProduct.Description,
            descriptionShort: rawProduct.DescriptionShort,
            commodityName: rawProduct.CommodityName,
          });
          if (!scope.included) {
            filtered += 1;
            const key = scope.matchedTerm ? `${scope.reason}:${scope.matchedTerm}` : scope.reason;
            filteredByReason[key] = (filteredByReason[key] ?? 0) + 1;
            continue;
          }
        }
        const supplierCost = Math.max(0, numberValue(rawProduct.YourPriceWithFees, numberValue(rawProduct.YourPrice)));
        if (supplierCost < pricing.minimumCostEur) {
          filtered += 1;
          filteredByReason.MINIMUM_COST_EUR = (filteredByReason.MINIMUM_COST_EUR ?? 0) + 1;
          continue;
        }
        const transformed = options.mode === 'full' ? transformFullProduct(rawProduct, pricing) : transformStockProduct(rawProduct, pricing);
        if (transformed && options.mode === 'full' && ['zaruky-a-sluzby', 'predlzenia-zaruky', 'licencie-a-predplatne', 'servisne-a-profesionalne-sluzby'].includes(String(transformed.category_slug))) {
          filtered += 1;
          filteredByReason.SERVICE_CATEGORY = (filteredByReason.SERVICE_CATEGORY ?? 0) + 1;
          continue;
        }
        if (transformed && options.mode === 'full' && options.brandScope.length > 0) {
          const brand = String(transformed.brand ?? '').toLowerCase();
          const inScope = options.brandScope.some((allowed) => allowed.toLowerCase() === brand);
          if (!inScope) {
            filtered += 1;
            const key = `BRAND_OUT_OF_SCOPE:${transformed.brand}`;
            filteredByReason[key] = (filteredByReason[key] ?? 0) + 1;
            continue;
          }
        }
        if (transformed && options.mode === 'full') {
          const scope = assessCatalogScope({
            title: rawProduct.Name ?? rawProduct.ProductName,
            description: rawProduct.Description,
            descriptionShort: rawProduct.DescriptionShort,
            commodityName: rawProduct.CommodityName,
          });
          transformed.scope_reason = options.scope === 'all' ? 'SCOPE_ALL' : scope.reason;
          transformed.scope_signal = scope.matchedTerm ?? null;
        }
        if (transformed) payload.push(transformed);
        else {
          skipped += 1;
          if (options.mode === 'full') {
            const supplierCode = value(rawProduct.Code ?? rawProduct.ProId);
            const title = value(rawProduct.Name ?? rawProduct.ProductName);
            quarantinePayload.push({
              supplier_code: supplierCode || 'UNKNOWN',
              pro_id: value(rawProduct.ProId) || null,
              reason: !supplierCode ? 'MISSING_SUPPLIER_CODE' : 'MALFORMED_DATA',
              error_details: !supplierCode
                ? 'Chýba kód produktu alebo ProId.'
                : `Neplatný názov produktu (${title.length} znakov).`,
              raw_payload: rawProduct,
            });
          }
        }
        if (payload.length >= options.batchSize) await flush();
        if (options.limit && result.processed + payload.length >= options.limit) {
          limitReached = true;
          break;
        }
      }
      if (limitReached) break;
    }
    await flush();
    if (rpc && quarantinePayload.length > 0) {
      for (let offset = 0; offset < quarantinePayload.length; offset += options.batchSize) {
        await rpc<boolean>('record_product_quarantine', {
          p_batch_id: batchId,
          p_items: quarantinePayload.slice(offset, offset + options.batchSize),
        });
      }
    }
    if (options.mode === 'full' && parsed === 0) {
      throw new Error('Full catalogue contained no Product or ProductComplete records; refusing to mark existing products missing.');
    }
    const durationMs = Date.now() - startedAt;
    const metrics = { parsed, skipped, filtered, filteredByReason, scope: options.scope, durationMs, sourceBytes, sourceFiles: sources.length };
    const completion = rpc ? await rpc<RpcBatchResult>('complete_ed_import', {
      p_batch_id: batchId,
      p_metrics: metrics,
    }) : result;
    result.missing = completion.missing ?? result.missing;
    if (rpc) {
      await rpc<void>('refresh_storefront_products', {});
      console.log('[import] refreshed storefront_products projection');
    }
    console.log(`[import] completed batch=${batchId} parsed=${parsed} skipped=${skipped} filtered=${filtered} processed=${result.processed} durationMs=${durationMs}`);
    if (filtered > 0) console.log(`[import] filteredByReason=${JSON.stringify(filteredByReason)}`);
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      if (rpc) await rpc<boolean>('fail_ed_import', { p_batch_id: batchId, p_error: message.slice(0, 4000) });
    } catch (reportingError) {
      console.error('[import] failed to persist failure state:', reportingError);
    }
    throw error;
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runCatalogSync().catch((error) => {
    console.error('[import] fatal:', error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
