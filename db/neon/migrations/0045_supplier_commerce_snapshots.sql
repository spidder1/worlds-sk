-- Append-only supplier history. The products row remains the current read model;
-- these tables preserve every materially different commercial observation.
-- The legacy source_extra GIN index is not used by the storefront or importer
-- and consumes scarce space on the starter Neon plan. Remove it before adding
-- the normalized history so the migration can complete without changing the
-- product read model.
DROP INDEX IF EXISTS idx_products_source_extra_gin;

CREATE TABLE IF NOT EXISTS supplier_price_snapshots (
  id bigserial PRIMARY KEY,
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  batch_id uuid REFERENCES sync_batches(id) ON DELETE SET NULL,
  observed_at timestamptz NOT NULL DEFAULT now(),
  supplier_cost numeric(19,4),
  garbage_fee numeric(19,4),
  author_fee numeric(19,4),
  total_cost_with_fees numeric(19,4),
  dealer_price numeric(19,4),
  recommended_retail_price numeric(19,4),
  vat_rate numeric(7,4),
  currency text NOT NULL DEFAULT 'EUR',
  price_hash text,
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_supplier_price_snapshots_product_time
  ON supplier_price_snapshots (product_id, observed_at DESC);
CREATE INDEX IF NOT EXISTS idx_supplier_price_snapshots_batch
  ON supplier_price_snapshots (batch_id);

CREATE TABLE IF NOT EXISTS supplier_inventory_snapshots (
  id bigserial PRIMARY KEY,
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  batch_id uuid REFERENCES sync_batches(id) ON DELETE SET NULL,
  observed_at timestamptz NOT NULL DEFAULT now(),
  stock_count numeric(19,4) NOT NULL DEFAULT 0,
  is_in_stock boolean NOT NULL DEFAULT false,
  expected_at text,
  order_multiple integer,
  inventory_hash text,
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_supplier_inventory_snapshots_product_time
  ON supplier_inventory_snapshots (product_id, observed_at DESC);
CREATE INDEX IF NOT EXISTS idx_supplier_inventory_snapshots_batch
  ON supplier_inventory_snapshots (batch_id);

CREATE OR REPLACE FUNCTION worlds_record_supplier_commerce_snapshot()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT'
     OR NEW.price_hash IS DISTINCT FROM OLD.price_hash
     OR NEW.supplier_cost IS DISTINCT FROM OLD.supplier_cost
     OR NEW.final_price IS DISTINCT FROM OLD.final_price THEN
    INSERT INTO supplier_price_snapshots
      (product_id, batch_id, supplier_cost, garbage_fee, author_fee, total_cost_with_fees,
       dealer_price, recommended_retail_price, vat_rate, currency, price_hash, source_payload)
    VALUES
      (NEW.id, NEW.last_import_batch, NEW.supplier_cost, NEW.garbage_fee, NEW.author_fee,
       NEW.total_cost_with_fees, NEW.dealer_price, NEW.recommended_retail_price, NEW.vat_rate,
       NEW.currency, NEW.price_hash, jsonb_build_object('source', 'products_trigger'));
  END IF;

  IF TG_OP = 'INSERT'
     OR NEW.inventory_hash IS DISTINCT FROM OLD.inventory_hash
     OR NEW.stock_count IS DISTINCT FROM OLD.stock_count
     OR NEW.expected_at IS DISTINCT FROM OLD.expected_at THEN
    INSERT INTO supplier_inventory_snapshots
      (product_id, batch_id, stock_count, is_in_stock, expected_at, order_multiple,
       inventory_hash, source_payload)
    VALUES
      (NEW.id, NEW.last_import_batch, COALESCE(NEW.stock_count, 0), COALESCE(NEW.is_in_stock, false),
       NEW.expected_at, NEW.order_multiple, NEW.inventory_hash,
       jsonb_build_object('source', 'products_trigger'));
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS products_supplier_commerce_snapshot ON products;
CREATE TRIGGER products_supplier_commerce_snapshot
AFTER INSERT OR UPDATE OF price_hash, supplier_cost, final_price, inventory_hash, stock_count, expected_at
ON products
FOR EACH ROW EXECUTE FUNCTION worlds_record_supplier_commerce_snapshot();
