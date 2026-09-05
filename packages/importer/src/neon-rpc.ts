import pg from 'pg';
import { requiredEnv } from './runtime-config.js';

const { Pool } = pg;

export interface RpcBatchResult {
  processed: number;
  created: number;
  changed: number;
  unchanged: number;
  missing: number;
}

export type RpcClient = <T>(functionName: string, parameters: Record<string, unknown>) => Promise<T>;

/** Columns written by a full-catalogue import, in insert order. */
const FULL_COLUMNS = [
  'id',
  'sku',
  'supplier_code',
  'supplier_pro_id',
  'mpn',
  'mpn2',
  'ean',
  'brand',
  'producer_code',
  'category_slug',
  'category_hierarchy',
  'commodity_code',
  'commodity_name',
  'title',
  'slug',
  'short_description',
  'supplier_description',
  'enriched_description',
  'seo_title',
  'seo_description',
  'search_keywords',
  'vat_rate',
  'supplier_cost',
  'garbage_fee',
  'author_fee',
  'total_cost_with_fees',
  'dealer_price',
  'recommended_retail_price',
  'margin_percentage',
  'base_price',
  'final_price',
  'has_commercial_data',
  'stock_count',
  'is_in_stock',
  'stock_text',
  'expected_at',
  'min_order_quantity',
  'order_multiple',
  'b2c_eligible',
  'is_premium',
  'warranty_months',
  'attributes',
  'images',
  'quality_score',
  'scope_reason',
  'scope_signal',
  'identity_hash',
  'content_hash',
  'data_hash',
  'price_hash',
  'inventory_hash',
] as const;

/**
 * Columns refreshed when an existing product is re-imported.
 *
 * `slug` is deliberately absent: a live product URL is an SEO asset and must not
 * change because the supplier retitled the item. New products get their slug on
 * insert and keep it.
 */
const FULL_UPDATE_COLUMNS = FULL_COLUMNS.filter(
  (column) => column !== 'id' && column !== 'sku' && column !== 'supplier_code' && column !== 'slug',
);

function jsonParameter(value: unknown): string {
  return JSON.stringify(value ?? null);
}

export function buildFullUpsertSql(): string {
  const columns = FULL_COLUMNS.join(', ');
  const updates = FULL_UPDATE_COLUMNS.map((column) => `${column} = EXCLUDED.${column}`).join(',\n        ');

  return `
WITH input AS (
  SELECT
    'ed-' || item.code            AS id,
    item.code                     AS sku,
    item.code                     AS supplier_code,
    item.pro_id                   AS supplier_pro_id,
    item.mpn,
    item.mpn2,
    item.ean,
    item.brand,
    item.producer_code,
    item.category_slug,
    COALESCE(item.category_hierarchy, '[]'::jsonb)  AS category_hierarchy,
    item.commodity_code,
    item.commodity_name,
    item.title,
    item.slug,
    item.short_description,
    item.supplier_description,
    item.enriched_description,
    item.seo_title,
    item.seo_description,
    COALESCE(item.search_keywords, '[]'::jsonb)     AS search_keywords,
    item.vat_rate,
    item.supplier_cost,
    item.garbage_fee,
    item.author_fee,
    item.total_cost_with_fees,
    item.dealer_price,
    item.recommended_retail_price,
    item.margin_percentage,
    item.base_price,
    item.final_price,
    item.has_commercial_data,
    item.stock_count,
    item.is_in_stock,
    item.stock_text,
    item.expected_at,
    GREATEST(1, COALESCE(item.order_multiple, 1))   AS min_order_quantity,
    GREATEST(1, COALESCE(item.order_multiple, 1))   AS order_multiple,
    item.b2c_eligible,
    item.is_premium,
    item.warranty_months,
    COALESCE(item.attributes, '{}'::jsonb)          AS attributes,
    COALESCE(item.images, '[]'::jsonb)              AS images,
    item.quality_score,
    item.scope_reason,
    item.scope_signal,
    item.identity_hash,
    item.content_hash,
    item.data_hash,
    item.price_hash,
    item.inventory_hash
  FROM jsonb_to_recordset($2::jsonb) AS item(
    code text, pro_id text, mpn text, mpn2 text, ean text, brand text, producer_code text,
    category_slug text, category_hierarchy jsonb, commodity_code text, commodity_name text,
    title text, slug text, short_description text, supplier_description text,
    enriched_description text, seo_title text, seo_description text, search_keywords jsonb,
    vat_rate numeric, supplier_cost numeric, garbage_fee numeric, author_fee numeric,
    total_cost_with_fees numeric, dealer_price numeric, recommended_retail_price numeric,
    margin_percentage numeric, base_price numeric, final_price numeric,
    has_commercial_data boolean, stock_count numeric, is_in_stock boolean, stock_text text,
    expected_at text, order_multiple integer, b2c_eligible boolean, is_premium boolean,
    warranty_months integer, attributes jsonb, images jsonb, quality_score integer,
    scope_reason text, scope_signal text, identity_hash text, content_hash text,
    data_hash text, price_hash text, inventory_hash text
  )
),
before AS (
  SELECT p.supplier_code, p.content_hash, p.price_hash, p.inventory_hash
    FROM products p
    JOIN input i ON i.supplier_code = p.supplier_code
),
upserted AS (
  INSERT INTO products (${columns}, last_import_batch, last_seen_at, last_synced_at, updated_at)
  SELECT ${columns}, $1::uuid, now(), now(), now() FROM input
  ON CONFLICT (supplier_code) DO UPDATE SET
        ${updates},
        last_import_batch = EXCLUDED.last_import_batch,
        last_seen_at = EXCLUDED.last_seen_at,
        last_synced_at = EXCLUDED.last_synced_at,
        updated_at = now()
  WHERE products.content_hash IS DISTINCT FROM EXCLUDED.content_hash
     OR products.price_hash IS DISTINCT FROM EXCLUDED.price_hash
     OR products.inventory_hash IS DISTINCT FROM EXCLUDED.inventory_hash
  RETURNING supplier_code, (xmax = 0) AS inserted
),
seen AS (
  -- Unchanged rows are skipped by the upsert, but they were still present in
  -- this feed and must not be treated as disappeared.
  UPDATE products p
     SET last_import_batch = $1::uuid, last_seen_at = now()
    FROM input i
   WHERE p.supplier_code = i.supplier_code
     AND p.last_import_batch IS DISTINCT FROM $1::uuid
  RETURNING p.supplier_code
)
SELECT
  (SELECT count(*) FROM input)::int                                     AS processed,
  (SELECT count(*) FROM upserted WHERE inserted)::int                   AS created,
  (SELECT count(*) FROM upserted WHERE NOT inserted)::int               AS changed,
  (SELECT count(*) FROM input)::int
    - (SELECT count(*) FROM upserted)::int                              AS unchanged,
  0::int                                                                AS missing,
  (SELECT count(*) FROM seen)::int                                      AS touched;
`;
}

export const STOCK_PRICE_SQL = `
WITH input AS (
  SELECT
    item.code AS supplier_code,
    item.supplier_cost, item.garbage_fee, item.author_fee, item.total_cost_with_fees,
    item.dealer_price, item.recommended_retail_price, item.margin_percentage,
    item.base_price, item.final_price, item.vat_rate, item.has_commercial_data,
    item.stock_count, item.is_in_stock, item.stock_text, item.expected_at,
    item.price_hash, item.inventory_hash
  FROM jsonb_to_recordset($2::jsonb) AS item(
    code text, supplier_cost numeric, garbage_fee numeric, author_fee numeric,
    total_cost_with_fees numeric, dealer_price numeric, recommended_retail_price numeric,
    margin_percentage numeric, base_price numeric, final_price numeric, vat_rate numeric,
    has_commercial_data boolean, stock_count numeric, is_in_stock boolean, stock_text text,
    expected_at text, price_hash text, inventory_hash text
  )
),
matched AS (
  SELECT i.* FROM input i JOIN products p ON p.supplier_code = i.supplier_code
),
updated AS (
  UPDATE products p
     SET supplier_cost = i.supplier_cost,
         garbage_fee = i.garbage_fee,
         author_fee = i.author_fee,
         total_cost_with_fees = i.total_cost_with_fees,
         dealer_price = i.dealer_price,
         recommended_retail_price = i.recommended_retail_price,
         margin_percentage = i.margin_percentage,
         base_price = i.base_price,
         final_price = i.final_price,
         vat_rate = i.vat_rate,
         has_commercial_data = i.has_commercial_data,
         stock_count = i.stock_count,
         is_in_stock = i.is_in_stock,
         stock_text = i.stock_text,
         expected_at = i.expected_at,
         price_hash = i.price_hash,
         inventory_hash = i.inventory_hash,
         last_import_batch = $1::uuid,
         last_seen_at = now(),
         last_synced_at = now(),
         updated_at = now()
    FROM matched i
   WHERE p.supplier_code = i.supplier_code
     AND (p.price_hash IS DISTINCT FROM i.price_hash
          OR p.inventory_hash IS DISTINCT FROM i.inventory_hash)
  RETURNING p.supplier_code
)
SELECT
  (SELECT count(*) FROM input)::int                                   AS processed,
  0::int                                                              AS created,
  (SELECT count(*) FROM updated)::int                                 AS changed,
  (SELECT count(*) FROM matched)::int - (SELECT count(*) FROM updated)::int AS unchanged,
  (SELECT count(*) FROM input)::int - (SELECT count(*) FROM matched)::int   AS missing;
`;

/**
 * Direct-to-Neon implementation of the import RPC surface.
 *
 * The sync driver was written against Supabase RPC names; keeping the same
 * names here means the driver does not care which database it is talking to.
 */
export function createNeonRpcClient(options: { brandScope?: string[] } = {}): RpcClient {
  const pool = new Pool({
    connectionString: requiredEnv('DATABASE_URL'),
    ssl: { rejectUnauthorized: false },
    max: 4,
    connectionTimeoutMillis: 15_000,
    statement_timeout: 180_000,
  });

  const fullUpsertSql = buildFullUpsertSql();
  const brandScope = options.brandScope?.length ? options.brandScope : null;

  const rpc = async <T>(functionName: string, parameters: Record<string, unknown>): Promise<T> => {
    switch (functionName) {
      case 'begin_ed_import': {
        const { rows } = await pool.query<{ id: string }>(
          `INSERT INTO sync_batches (batch_number, mode, source_method, parameters, status, started_at, heartbeat_at)
           VALUES (to_char(now(), 'YYYYMMDDHH24MISS'), $1, $2, $3::jsonb, 'RUNNING', now(), now())
           RETURNING id`,
          [parameters.p_batch_type, parameters.p_source_method, jsonParameter(parameters.p_parameters)],
        );
        return rows[0].id as unknown as T;
      }

      case 'heartbeat_ed_import': {
        await pool.query(`UPDATE sync_batches SET heartbeat_at = now() WHERE id = $1::uuid`, [
          parameters.p_batch_id,
        ]);
        return true as unknown as T;
      }

      case 'stage_ed_catalog_batch': {
        const { rows } = await pool.query<RpcBatchResult>(fullUpsertSql, [
          parameters.p_batch_id,
          jsonParameter(parameters.p_items),
        ]);
        return rows[0] as unknown as T;
      }

      case 'sync_ed_stock_price_batch': {
        const { rows } = await pool.query<RpcBatchResult>(STOCK_PRICE_SQL, [
          parameters.p_batch_id,
          jsonParameter(parameters.p_items),
        ]);
        return rows[0] as unknown as T;
      }

      case 'record_product_quarantine': {
        await pool.query(
          `INSERT INTO product_quarantine (batch_id, supplier_code, pro_id, reason, error_details, raw_payload)
           SELECT $1::uuid, COALESCE(item.supplier_code, 'UNKNOWN'), item.pro_id, item.reason,
                  item.error_details, COALESCE(item.raw_payload, '{}'::jsonb)
             FROM jsonb_to_recordset($2::jsonb) AS item(
               supplier_code text, pro_id text, reason text, error_details text, raw_payload jsonb
             )`,
          [parameters.p_batch_id, jsonParameter(parameters.p_items)],
        );
        return true as unknown as T;
      }

      case 'complete_ed_import': {
        const metrics = (parameters.p_metrics ?? {}) as Record<string, unknown>;
        let missing = 0;

        // Only a full catalogue run is authoritative about what still exists.
        // A stock feed carries a subset and must never retire anything.
        const isFullRun = await pool
          .query<{ mode: string }>(`SELECT mode FROM sync_batches WHERE id = $1::uuid`, [parameters.p_batch_id])
          .then(({ rows }) => rows[0]?.mode === 'FULL_CATALOG');

        if (isFullRun) {
          const { rows } = await pool.query<{ missing: number }>(
            `WITH retired AS (
               UPDATE products
                  SET status = 'DISCONTINUED', updated_at = now()
                WHERE status = 'ACTIVE'
                  AND (last_import_batch IS NULL OR last_import_batch <> $1::uuid)
                  AND ($2::text[] IS NULL OR brand = ANY($2::text[]))
               RETURNING id
             )
             SELECT count(*)::int AS missing FROM retired`,
            [parameters.p_batch_id, brandScope],
          );
          missing = rows[0]?.missing ?? 0;
        }

        await pool.query(
          `UPDATE sync_batches
              SET status = 'COMPLETED',
                  completed_at = now(),
                  metrics = $2::jsonb,
                  total_read = COALESCE(($2::jsonb ->> 'parsed')::int, 0),
                  filtered_count = COALESCE(($2::jsonb ->> 'filtered')::int, 0),
                  missing_count = $3
            WHERE id = $1::uuid`,
          [parameters.p_batch_id, jsonParameter(metrics), missing],
        );

        return { processed: 0, created: 0, changed: 0, unchanged: 0, missing } as unknown as T;
      }

      case 'fail_ed_import': {
        await pool.query(
          `UPDATE sync_batches SET status = 'FAILED', completed_at = now(), error_message = $2 WHERE id = $1::uuid`,
          [parameters.p_batch_id, parameters.p_error],
        );
        return true as unknown as T;
      }

      case 'refresh_storefront_products':
        // The storefront reads the products table directly on Neon; there is no
        // separate projection to refresh.
        return undefined as unknown as T;

      default:
        throw new Error(`Unsupported Neon RPC: ${functionName}`);
    }
  };

  return rpc;
}
