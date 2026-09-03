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
import { getSupabaseRestConfig } from './runtime-config.js';
import { classifyProductIndependently } from './taxonomy-definition.js';
import { assessCatalogScope } from './catalog-scope.js';

type SyncMode = 'full' | 'stock-price';
type CatalogScope = 'it-only' | 'all';
type ImportTransport = 'rest' | 'supabase-cli';

interface CliOptions {
  mode: SyncMode;
  sourceFile?: string;
  limit?: number;
  batchSize: number;
  allowCachedFull: boolean;
  scope: CatalogScope;
  dryRun: boolean;
  transport: ImportTransport;
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
  const rawTransport = valueOf('--transport') ?? process.env.SUPABASE_IMPORT_TRANSPORT ?? 'rest';
  const limit = rawLimit && rawLimit !== 'all' ? Number.parseInt(rawLimit, 10) : undefined;
  const batchSize = Number.parseInt(rawBatchSize, 10);
  if (limit !== undefined && (!Number.isSafeInteger(limit) || limit < 1)) {
    throw new Error('--limit must be a positive integer or "all".');
  }
  const maximumBatchSize = rawTransport === 'supabase-cli' ? 500 : 200;
  if (!Number.isSafeInteger(batchSize) || batchSize < 1 || batchSize > maximumBatchSize) {
    throw new Error(`--batch-size must be between 1 and ${maximumBatchSize} for ${rawTransport}.`);
  }
  if (rawScope !== 'it-only' && rawScope !== 'all') {
    throw new Error('--scope must be "it-only" or "all".');
  }
  if (rawTransport !== 'rest' && rawTransport !== 'supabase-cli') {
    throw new Error('--transport must be "rest" or "supabase-cli".');
  }

  return {
    mode: rawMode,
    sourceFile: valueOf('--source-file') ?? process.env.ED_SOURCE_FILE,
    limit,
    batchSize,
    allowCachedFull: argv.includes('--allow-cached-full') || process.env.ALLOW_CACHED_FULL === 'true',
    scope: rawScope,
    dryRun: argv.includes('--dry-run'),
    transport: rawTransport,
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

function marginFor(cost: number): number {
  if (cost < 50) return 18;
  if (cost > 1000) return 10;
  return 12;
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

function transformFullProduct(product: Record<string, unknown>): Record<string, unknown> | null {
  const code = value(product.Code ?? product.ProId);
  const title = value(product.Name ?? product.ProductName);
  if (!code || title.length < 3) return null;

  const supplierCost = Math.max(0, numberValue(product.YourPrice));
  const garbageFee = Math.max(0, numberValue(product.GarbageFee));
  const authorFee = Math.max(0, numberValue(product.AuthorFee));
  const totalCostWithFees = Math.max(
    0,
    numberValue(product.YourPriceWithFees, supplierCost + garbageFee + authorFee),
  );
  const hasCommercialData = totalCostWithFees > 0;

  const vatRate = Math.max(0, numberValue(product.Vat, 20));
  const marginPercentage = marginFor(totalCostWithFees);
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
  const rawDescription = value(product.Description ?? product.DescriptionShort);
  const { cleanHtml, plainText, specs } = sanitizeAndFormatHtml(rawDescription);
  const category = classifyProductIndependently({
    title,
    mpn,
    ean: ean ?? '',
    description: rawDescription,
    descriptionShort: value(product.DescriptionShort),
    producerName: brand,
  });
  const extracted = extractStructuredAttributes(title, rawDescription, specs, brand, mpn, warrantyMonths);
  const imageUrls = extractProductImageUrls(product);
  const proId = value(product.ProId) || code;
  const contentHash = hash([title, brand, mpn, mpn2, ean, cleanHtml, category.slug, imageUrls, extracted.allAttributes]);
  const priceHash = hash([supplierCost, garbageFee, authorFee, totalCostWithFees, vatRate, basePrice, finalPrice]);
  const inventoryHash = hash([stockCount, isInStock, value(product.DateOfDelivery)]);

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
    stock_text: isInStock ? (Number.isFinite(stockCountRaw) ? `Skladom ${stockCount} ks` : 'Skladom') : 'Na objednávku',
    expected_at: normalizeIdentifier(product.DateOfDelivery),
    warranty_months: warrantyMonths,
    category_slug: category.slug,
    category_hierarchy: category.hierarchy,
    commodity_code: normalizeIdentifier(product.CommodityCode),
    commodity_name: normalizeIdentifier(product.CommodityName),
    order_multiple: Math.max(1, numberValue(product.MultipleQuantity, 1)),
    b2c_eligible: booleanValue(product.B2C ?? true),
    is_premium: booleanValue(product.IsPremium ?? product.Premium) || finalPrice > 1500,
    images: imageUrls.map((url, position) => ({
      url,
      position,
      isPrimary: position === 0,
      altText: title,
    })),
    attributes: extracted.allAttributes,
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

function transformStockProduct(product: Record<string, unknown>): Record<string, unknown> | null {
  const code = value(product.Code ?? product.ProId ?? product.PartNumber);
  if (!code) return null;
  const supplierCost = Math.max(0, numberValue(product.YourPrice));
  const garbageFee = Math.max(0, numberValue(product.GarbageFee));
  const authorFee = Math.max(0, numberValue(product.AuthorFee));
  const totalCostWithFees = Math.max(0, numberValue(product.YourPriceWithFees, supplierCost + garbageFee + authorFee));
  const hasCommercialData = totalCostWithFees > 0;
  const vatRate = Math.max(0, numberValue(product.Vat, 20));
  const marginPercentage = marginFor(totalCostWithFees);
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
    stock_text: isInStock ? (Number.isFinite(stockCountRaw) ? `Skladom ${stockCount} ks` : 'Skladom') : 'Na objednávku',
    expected_at: normalizeIdentifier(product.DateOfDelivery),
    price_hash: hash([supplierCost, garbageFee, authorFee, totalCostWithFees, vatRate, basePrice, finalPrice]),
    inventory_hash: hash([stockCount, isInStock, value(product.DateOfDelivery)]),
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

async function resolveSource(options: CliOptions): Promise<{ filePath: string; sourceMethod: string }> {
  if (options.sourceFile) {
    const explicit = path.resolve(options.sourceFile);
    if (!fs.existsSync(explicit)) throw new Error(`Source file does not exist: ${explicit}`);
    if (explicit.toLowerCase().endsWith('.zip')) {
      return { filePath: extractXml(explicit, path.resolve('downloads/cache/catalog-source.xml')), sourceMethod: 'LOCAL_FULL_ZIP' };
    }
    return { filePath: explicit, sourceMethod: options.mode === 'full' ? 'LOCAL_FULL_XML' : 'LOCAL_STOCK_XML' };
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
      return { filePath: target, sourceMethod: 'getProductCatalogueStockDownloadXML' };
    }

    const status = await client.getProductCatalogueFullDownloadZIPv1({ onStock: false });
    if (!status.IsReady || !status.Url) {
      const message = status.Status
        ? `${status.Status.StatusCode}${status.Status.ErrorText ? `: ${status.Status.ErrorText}` : ''}`
        : 'unknown status';
      throw new Error(`eD full catalog is not ready: ${message}`);
    }
    const zipPath = path.resolve('downloads/cache/latest-full.zip');
    await downloadToFile(status.Url, zipPath);
    return {
      filePath: extractXml(zipPath, path.resolve('downloads/cache/latest-full.xml')),
      sourceMethod: 'getProductCatalogueFullDownloadZIPv1',
    };
  }

  if (options.mode === 'full' && options.allowCachedFull) {
    const candidates = [
      path.resolve('downloads/productCatalogue_39536264-b5ab-4b6c-9137-0cec8817bf51.xml'),
      path.resolve('downloads/productCatalogue_main.zip'),
    ];
    const cached = candidates.find((candidate) => fs.existsSync(candidate));
    if (cached) {
      if (cached.toLowerCase().endsWith('.zip')) {
        return { filePath: extractXml(cached, path.resolve('downloads/cache/catalog-source.xml')), sourceMethod: 'CACHED_FULL_ZIP' };
      }
      return { filePath: cached, sourceMethod: 'CACHED_FULL_XML' };
    }
  }

  throw new Error(
    options.mode === 'full'
      ? 'Full import needs ED_LOGIN/ED_PASSWORD, --source-file, or the explicit --allow-cached-full flag.'
      : 'Stock/price sync needs ED_LOGIN/ED_PASSWORD or --source-file.',
  );
}

function sqlLiteral(raw: unknown): string {
  return `'${String(raw ?? '').replace(/'/g, "''")}'`;
}

function cliRpcSql(functionName: string, parameters: Record<string, unknown>): string {
  const json = (name: string) => `${sqlLiteral(JSON.stringify(parameters[name] ?? null))}::jsonb`;
  const uuid = (name: string) => `${sqlLiteral(parameters[name])}::uuid`;
  switch (functionName) {
    case 'begin_ed_import':
      return `select public.begin_ed_import(${sqlLiteral(parameters.p_batch_type)}, ${sqlLiteral(parameters.p_source_method)}, ${json('p_parameters')}) as result;`;
    case 'stage_ed_catalog_batch':
    case 'sync_ed_stock_price_batch':
      return `select public.${functionName}(${uuid('p_batch_id')}, ${json('p_items')}) as result;`;
    case 'heartbeat_ed_import':
      return `select public.heartbeat_ed_import(${uuid('p_batch_id')}) as result;`;
    case 'complete_ed_import':
      return `select public.complete_ed_import(${uuid('p_batch_id')}, ${json('p_metrics')}) as result;`;
    case 'fail_ed_import':
      return `select public.fail_ed_import(${uuid('p_batch_id')}, ${sqlLiteral(parameters.p_error)}) as result;`;
    default:
      throw new Error(`Unsupported Supabase CLI RPC: ${functionName}`);
  }
}

function createCliRpcClient() {
  const execFileAsync = promisify(execFile);
  const windowsPnpmCandidates = [
    process.env.PNPM_HOME ? path.join(process.env.PNPM_HOME, 'pnpm.ps1') : '',
    process.env.APPDATA ? path.join(process.env.APPDATA, 'npm', 'pnpm.ps1') : '',
  ].filter(Boolean);
  const windowsPnpmScript = windowsPnpmCandidates.find((candidate) => fs.existsSync(candidate));
  const windowsPnpmModule = windowsPnpmScript
    ? path.join(path.dirname(windowsPnpmScript), 'node_modules', 'pnpm', 'bin', 'pnpm.cjs')
    : undefined;
  if (process.platform === 'win32' && (!windowsPnpmModule || !fs.existsSync(windowsPnpmModule))) {
    throw new Error('Supabase CLI transport needs an installed pnpm Node module on Windows.');
  }
  const command = process.platform === 'win32' ? process.execPath : 'pnpm';
  const commandPrefix = process.platform === 'win32'
    ? [windowsPnpmModule as string]
    : [];
  const tempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'worlds-supabase-query-'));
  process.once('exit', () => {
    try {
      fs.rmSync(tempDirectory, { recursive: true, force: true });
    } catch {
      // Best-effort cleanup only; individual SQL files are removed after every call.
    }
  });
  let sequence = 0;

  return async function rpc<T>(functionName: string, parameters: Record<string, unknown>): Promise<T> {
    const queryFile = path.join(tempDirectory, `${String(sequence += 1).padStart(6, '0')}.sql`);
    fs.writeFileSync(queryFile, cliRpcSql(functionName, parameters), { encoding: 'utf8', mode: 0o600 });
    try {
      const { stdout } = await execFileAsync(command, [...commandPrefix,
        'dlx', 'supabase', 'db', 'query', '--linked', '--output', 'json', '--file', queryFile,
      ], {
        cwd: process.cwd(),
        encoding: 'utf8',
        maxBuffer: 10 * 1024 * 1024,
        timeout: 180_000,
        windowsHide: true,
      });
      const start = stdout.indexOf('{');
      if (start < 0) throw new Error(`Supabase CLI returned an invalid response for ${functionName}.`);
      const response = JSON.parse(stdout.slice(start)) as { rows?: Array<{ result?: T }> };
      if (!response.rows?.length || response.rows[0].result === undefined) {
        throw new Error(`Supabase CLI returned no result for ${functionName}.`);
      }
      return response.rows[0].result as T;
    } finally {
      if (fs.existsSync(queryFile)) fs.unlinkSync(queryFile);
    }
  };
}

function createRestRpcClient() {
  const { url, secretKey } = getSupabaseRestConfig();
  return async function rpc<T>(functionName: string, parameters: Record<string, unknown>): Promise<T> {
    let lastError: unknown;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        const response = await fetch(`${url}/rest/v1/rpc/${functionName}`, {
          method: 'POST',
          headers: {
            apikey: secretKey,
            Authorization: `Bearer ${secretKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(parameters),
          signal: AbortSignal.timeout(120_000),
        });
        const body = await response.text();
        if (response.ok) return (body ? JSON.parse(body) : null) as T;
        const error = new Error(`${functionName} failed (${response.status}): ${body.slice(0, 1000)}`);
        if (response.status < 500 && response.status !== 429) throw error;
        lastError = error;
      } catch (error) {
        lastError = error;
        const message = error instanceof Error ? error.message : String(error);
        if (/failed \((4\d\d)\)/.test(message) && !message.includes('(429)')) throw error;
      }
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** (attempt - 1)));
    }
    throw lastError instanceof Error ? lastError : new Error(String(lastError));
  };
}

function createRpcClient(transport: ImportTransport) {
  return transport === 'supabase-cli' ? createCliRpcClient() : createRestRpcClient();
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
  const rpc = options.dryRun ? undefined : createRpcClient(options.transport);
  const source = await resolveSource(options);
  const sourceStats = fs.statSync(source.filePath);
  console.log(`[import] mode=${options.mode} source=${source.sourceMethod} bytes=${sourceStats.size}`);

  const batchId = rpc ? await rpc<string>('begin_ed_import', {
    p_batch_type: options.mode === 'full' ? 'FULL_CATALOG' : 'STOCK_PRICE',
    p_source_method: source.sourceMethod,
    p_parameters: {
      sourceFile: path.basename(source.filePath),
      limit: options.limit ?? null,
      batchSize: options.batchSize,
      scope: options.scope,
      transport: options.transport,
    },
  }) : 'dry-run';
  const result: RpcBatchResult = { processed: 0, created: 0, changed: 0, unchanged: 0, missing: 0 };
  let parsed = 0;
  let skipped = 0;
  let filtered = 0;
  const filteredByReason: Record<string, number> = {};
  let lastHeartbeatAt = Date.now();
  let payload: Record<string, unknown>[] = [];
  const elementName = options.mode === 'full' ? 'Product' : 'ProductShort';
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
      const transformed = options.mode === 'full' ? transformFullProduct(rawProduct) : transformStockProduct(rawProduct);
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
      else skipped += 1;
      if (payload.length >= options.batchSize) await flush();
      if (options.limit && result.processed + payload.length >= options.limit) break;
    }
    await flush();
    const durationMs = Date.now() - startedAt;
    const metrics = { parsed, skipped, filtered, filteredByReason, scope: options.scope, durationMs, sourceBytes: sourceStats.size };
    const completion = rpc ? await rpc<RpcBatchResult>('complete_ed_import', {
      p_batch_id: batchId,
      p_metrics: metrics,
    }) : result;
    result.missing = completion.missing ?? result.missing;
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
