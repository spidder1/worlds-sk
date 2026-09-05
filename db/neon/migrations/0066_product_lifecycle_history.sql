CREATE TABLE IF NOT EXISTS product_lifecycle_history (
  id bigserial PRIMARY KEY,
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  old_status text,
  new_status text NOT NULL,
  reason text,
  batch_id uuid REFERENCES sync_batches(id) ON DELETE SET NULL,
  changed_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_product_lifecycle_history_product
  ON product_lifecycle_history (product_id, changed_at DESC);
CREATE INDEX IF NOT EXISTS idx_product_lifecycle_history_status
  ON product_lifecycle_history (new_status, changed_at DESC);

CREATE OR REPLACE FUNCTION worlds_record_product_lifecycle_change()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT' OR NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO product_lifecycle_history
      (product_id, old_status, new_status, reason, batch_id, metadata)
    VALUES
      (NEW.id, CASE WHEN TG_OP = 'INSERT' THEN NULL ELSE OLD.status END, NEW.status,
       CASE WHEN NEW.status = 'DISCONTINUED' THEN 'MISSING_RECONCILIATION'
            WHEN NEW.status = 'ACTIVE' AND TG_OP = 'UPDATE' AND OLD.status = 'DISCONTINUED' THEN 'RETURNED_TO_FEED'
            ELSE 'PRODUCT_WRITE' END,
       NEW.last_import_batch, jsonb_build_object('source', 'products_trigger'));
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS products_lifecycle_history ON products;
CREATE TRIGGER products_lifecycle_history
AFTER INSERT OR UPDATE OF status ON products
FOR EACH ROW EXECUTE FUNCTION worlds_record_product_lifecycle_change();
