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
  'category_source',
  'category_confidence',
  'category_reasoning',
  'commodity_code',
  'commodity_name',
  'title',
  'name_b2c',
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
  'dealer_price_1',
  'recommended_retail_price',
  'margin_percentage',
  'base_price',
  'final_price',
  'currency',
  'value_pack',
  'value_pack_qty',
  'unit',
  'logistic_data',
  'ext_info_codes',
  'index_code_1',
  'index_code_2',
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
  'source_extra',
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
  const adminOwnedCategoryColumns = new Set([
    'category_slug',
    'category_hierarchy',
    'category_source',
    'category_confidence',
    'category_reasoning',
  ]);
  const updates = FULL_UPDATE_COLUMNS.map((column) => adminOwnedCategoryColumns.has(column)
    ? `${column} = CASE WHEN products.category_source = 'ADMIN' THEN products.${column} ELSE EXCLUDED.${column} END`
    : `${column} = EXCLUDED.${column}`).join(',\n        ');

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
    COALESCE(item.category_source, 'HEURISTIC')     AS category_source,
    item.category_confidence,
    item.category_reasoning,
    item.commodity_code,
    item.commodity_name,
    item.title,
    item.name_b2c,
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
    item.dealer_price_1,
    item.recommended_retail_price,
    item.margin_percentage,
    item.base_price,
    item.final_price,
    item.currency,
    item.value_pack,
    item.value_pack_qty,
    item.unit,
    COALESCE(item.logistic_data, 'null'::jsonb),
    COALESCE(item.ext_info_codes, 'null'::jsonb),
    item.index_code_1,
    item.index_code_2,
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
    COALESCE(item.source_extra, '{}'::jsonb)        AS source_extra,
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
    category_slug text, category_hierarchy jsonb, category_source text, category_confidence numeric,
    category_reasoning text, commodity_code text, commodity_name text,
    title text, name_b2c text, slug text, short_description text, supplier_description text,
    enriched_description text, seo_title text, seo_description text, search_keywords jsonb,
    vat_rate numeric, supplier_cost numeric, garbage_fee numeric, author_fee numeric,
    total_cost_with_fees numeric, dealer_price numeric, dealer_price_1 numeric, recommended_retail_price numeric,
    margin_percentage numeric, base_price numeric, final_price numeric, currency text,
    value_pack numeric, value_pack_qty numeric, unit text, logistic_data jsonb, ext_info_codes jsonb,
    index_code_1 text, index_code_2 text,
    has_commercial_data boolean, stock_count numeric, is_in_stock boolean, stock_text text,
    expected_at text, order_multiple integer, b2c_eligible boolean, is_premium boolean,
    warranty_months integer, attributes jsonb, source_extra jsonb, images jsonb, quality_score integer,
    scope_reason text, scope_signal text, identity_hash text, content_hash text,
    data_hash text, price_hash text, inventory_hash text
  )
),
manufacturer_upsert AS (
  INSERT INTO manufacturers (id, name, slug)
  SELECT
    'manufacturer-' || md5(lower(trim(brand))),
    trim(brand),
    regexp_replace(lower(trim(brand)), '[^a-z0-9]+', '-', 'g') || '-' || substr(md5(lower(trim(brand))), 1, 8)
    FROM (SELECT DISTINCT brand FROM input WHERE brand IS NOT NULL AND trim(brand) <> '') AS brands
  ON CONFLICT (name) DO UPDATE SET updated_at = now()
  RETURNING name
),
before AS (
  SELECT p.supplier_code, p.content_hash, p.price_hash, p.inventory_hash
    FROM products p
    JOIN input i ON i.supplier_code = p.supplier_code
),
upserted AS (
  INSERT INTO products (${columns}, last_import_batch, last_seen_at, last_synced_at, updated_at)
  SELECT ${columns}, $1::uuid, now(), now(), now()
    FROM input
    LEFT JOIN manufacturer_upsert ON manufacturer_upsert.name = input.brand
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
),
attributes_cleared AS (
  DELETE FROM product_attribute_values existing
   USING upserted changed
   WHERE existing.product_id = 'ed-' || changed.supplier_code
  RETURNING existing.product_id
),
attributes_written AS (
  INSERT INTO product_attribute_values
    (product_id, attribute_key, source_attribute_code, attribute_name, raw_value, normalized_value, source_payload, updated_at)
  SELECT
    'ed-' || changed.supplier_code,
    attr.key,
    NULLIF(attr.value->>'code', ''),
    COALESCE(attr.value->>'name', ''),
    COALESCE(attr.value->>'rawValue', attr.value->>'value', ''),
    COALESCE(attr.value->>'value', attr.value->>'rawValue', ''),
    attr.value,
    now()
  FROM upserted changed
  JOIN input source ON source.code = changed.supplier_code
  CROSS JOIN LATERAL jsonb_each(COALESCE(source.attributes, '{}'::jsonb)) AS attr
  CROSS JOIN (SELECT count(*) FROM attributes_cleared) AS barrier
  ON CONFLICT (product_id, attribute_key) DO UPDATE SET
    source_attribute_code = EXCLUDED.source_attribute_code,
    attribute_name = EXCLUDED.attribute_name,
    raw_value = EXCLUDED.raw_value,
    normalized_value = EXCLUDED.normalized_value,
    source_payload = EXCLUDED.source_payload,
    updated_at = now()
  RETURNING product_id
),
media_cleared AS (
  DELETE FROM product_media existing
   USING upserted changed
   WHERE existing.product_id = 'ed-' || changed.supplier_code
  RETURNING existing.product_id
),
media_written AS (
  INSERT INTO product_media
    (product_id, source_url, position, is_primary, alt_text, provenance, updated_at)
  SELECT
    'ed-' || changed.supplier_code,
    NULLIF(media.value->>'url', ''),
    COALESCE(NULLIF(media.value->>'position', '')::integer, 0),
    COALESCE((media.value->>'isPrimary')::boolean, false),
    COALESCE(media.value->>'altText', source.title, ''),
    'UNKNOWN_ED',
    now()
  FROM upserted changed
  JOIN input source ON source.code = changed.supplier_code
  CROSS JOIN LATERAL jsonb_array_elements(COALESCE(source.images, '[]'::jsonb)) AS media
  CROSS JOIN (SELECT count(*) FROM media_cleared) AS barrier
  WHERE NULLIF(media.value->>'url', '') IS NOT NULL
  ON CONFLICT (product_id, source_url) DO UPDATE SET
    position = EXCLUDED.position,
    is_primary = EXCLUDED.is_primary,
    alt_text = EXCLUDED.alt_text,
    updated_at = now()
  RETURNING product_id
),
search_queue AS (
  INSERT INTO search_sync_queue (product_id, reason, enqueued_at, processed_at, last_error)
  SELECT 'ed-' || supplier_code, 'catalog_sync', now(), NULL, NULL FROM upserted
  ON CONFLICT (product_id) DO UPDATE SET
    reason = EXCLUDED.reason,
    enqueued_at = EXCLUDED.enqueued_at,
    processed_at = NULL,
    last_error = NULL
  RETURNING product_id
)
SELECT
  (SELECT count(*) FROM input)::int                                     AS processed,
  (SELECT count(*) FROM upserted WHERE inserted)::int                   AS created,
  (SELECT count(*) FROM upserted WHERE NOT inserted)::int               AS changed,
  (SELECT count(*) FROM input)::int
    - (SELECT count(*) FROM upserted)::int                              AS unchanged,
  0::int                                                                AS missing,
  (SELECT count(*) FROM seen)::int                                      AS touched,
  (SELECT count(*) FROM search_queue)::int                             AS queued;
`;
}

export const STOCK_PRICE_SQL = `
WITH input AS (
  SELECT
    item.code AS supplier_code,
    item.supplier_cost, item.garbage_fee, item.author_fee, item.total_cost_with_fees,
    item.dealer_price, item.dealer_price_1, item.recommended_retail_price, item.margin_percentage,
    item.base_price, item.final_price, item.vat_rate, item.has_commercial_data,
    item.stock_count, item.is_in_stock, item.stock_text, item.expected_at,
    item.price_hash, item.inventory_hash
  FROM jsonb_to_recordset($2::jsonb) AS item(
    code text, supplier_cost numeric, garbage_fee numeric, author_fee numeric,
    total_cost_with_fees numeric, dealer_price numeric, dealer_price_1 numeric, recommended_retail_price numeric,
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
         dealer_price_1 = i.dealer_price_1,
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
),
queued AS (
  INSERT INTO search_sync_queue (product_id, reason, enqueued_at, processed_at, last_error)
  SELECT 'ed-' || supplier_code, 'stock_price_sync', now(), NULL, NULL FROM updated
  ON CONFLICT (product_id) DO UPDATE SET
    reason = EXCLUDED.reason,
    enqueued_at = EXCLUDED.enqueued_at,
    processed_at = NULL,
    last_error = NULL
  RETURNING product_id
)
SELECT
  (SELECT count(*) FROM input)::int                                   AS processed,
  0::int                                                              AS created,
  (SELECT count(*) FROM updated)::int                                 AS changed,
  (SELECT count(*) FROM matched)::int - (SELECT count(*) FROM updated)::int AS unchanged,
  (SELECT count(*) FROM input)::int - (SELECT count(*) FROM matched)::int   AS missing,
  (SELECT count(*) FROM queued)::int                                      AS queued;
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
