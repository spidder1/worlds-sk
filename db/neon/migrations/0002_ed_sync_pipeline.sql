-- Adds the columns the eD ingestion pipeline needs so catalog-sync can write
-- straight into Neon (the database the storefront actually reads) instead of
-- the retired Supabase project.
--
-- Safe to re-run: every statement is IF NOT EXISTS / idempotent.

-- 1. Commercial data the eD feed already provides but Neon had nowhere to store.
ALTER TABLE products ADD COLUMN IF NOT EXISTS supplier_cost numeric(12,2) DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS garbage_fee numeric(12,2) DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS author_fee numeric(12,2) DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS total_cost_with_fees numeric(12,2) DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS dealer_price numeric(12,2);
ALTER TABLE products ADD COLUMN IF NOT EXISTS recommended_retail_price numeric(12,2);
ALTER TABLE products ADD COLUMN IF NOT EXISTS margin_percentage numeric(6,2);
ALTER TABLE products ADD COLUMN IF NOT EXISTS has_commercial_data boolean DEFAULT true;

-- 2. Identity and supplier metadata.
ALTER TABLE products ADD COLUMN IF NOT EXISTS mpn2 text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS producer_code text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS expected_at text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS order_multiple integer DEFAULT 1;
ALTER TABLE products ADD COLUMN IF NOT EXISTS b2c_eligible boolean DEFAULT true;
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_premium boolean DEFAULT false;

-- 3. Delta hashes, so unchanged products cost nothing on re-import.
ALTER TABLE products ADD COLUMN IF NOT EXISTS identity_hash text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS content_hash text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS price_hash text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS inventory_hash text;

-- 4. Catalogue quality and scope bookkeeping.
ALTER TABLE products ADD COLUMN IF NOT EXISTS quality_score integer;
ALTER TABLE products ADD COLUMN IF NOT EXISTS scope_reason text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS scope_signal text;

-- 5. Import provenance, used to retire products that disappear from the feed.
ALTER TABLE products ADD COLUMN IF NOT EXISTS last_import_batch uuid;
ALTER TABLE products ADD COLUMN IF NOT EXISTS last_seen_at timestamptz;

-- 8. Incremental detail-image enrichment. The full catalogue can contain only
-- the primary image; getProductDetail is used by the nightly loader to fill
-- the complete ImageList without re-importing prices or stock.
ALTER TABLE products ADD COLUMN IF NOT EXISTS image_count integer;
ALTER TABLE products ADD COLUMN IF NOT EXISTS images_last_changed timestamptz;
ALTER TABLE products ADD COLUMN IF NOT EXISTS image_sync_checked_at timestamptz;
CREATE INDEX IF NOT EXISTS idx_products_image_sync ON products (image_sync_checked_at NULLS FIRST, updated_at);

CREATE UNIQUE INDEX IF NOT EXISTS idx_products_supplier_code ON products (supplier_code);
CREATE INDEX IF NOT EXISTS idx_products_last_import_batch ON products (last_import_batch);
CREATE INDEX IF NOT EXISTS idx_products_status ON products (status);
CREATE INDEX IF NOT EXISTS idx_products_mpn_trgm ON products USING gin (mpn gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_products_brand_trgm ON products USING gin (brand gin_trgm_ops);

-- 6. Import run bookkeeping the sync driver reports into.
ALTER TABLE sync_batches ADD COLUMN IF NOT EXISTS source_method text;
ALTER TABLE sync_batches ADD COLUMN IF NOT EXISTS parameters jsonb DEFAULT '{}'::jsonb;
ALTER TABLE sync_batches ADD COLUMN IF NOT EXISTS metrics jsonb DEFAULT '{}'::jsonb;
ALTER TABLE sync_batches ADD COLUMN IF NOT EXISTS heartbeat_at timestamptz;
ALTER TABLE sync_batches ADD COLUMN IF NOT EXISTS created_count integer DEFAULT 0;
ALTER TABLE sync_batches ADD COLUMN IF NOT EXISTS changed_count integer DEFAULT 0;
ALTER TABLE sync_batches ADD COLUMN IF NOT EXISTS unchanged_count integer DEFAULT 0;
ALTER TABLE sync_batches ADD COLUMN IF NOT EXISTS missing_count integer DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_sync_batches_started_at ON sync_batches (started_at DESC);

-- 7. Backfill: existing rows were imported before fees were stored. Treat the
--    stored base_price as the already-margined price and leave fees at 0 rather
--    than inventing values; the next full sync writes the real figures.
UPDATE products
   SET has_commercial_data = (final_price > 0)
 WHERE has_commercial_data IS NULL;
