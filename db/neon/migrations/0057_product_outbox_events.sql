CREATE OR REPLACE FUNCTION worlds_enqueue_product_outbox_event()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO outbox_events (aggregate_type, aggregate_id, event_type, payload)
  VALUES (
    'PRODUCT', NEW.id, 'PRODUCT_CHANGED',
    jsonb_build_object(
      'productId', NEW.id,
      'supplierCode', NEW.supplier_code,
      'identityHash', NEW.identity_hash,
      'contentHash', NEW.content_hash,
      'priceHash', NEW.price_hash,
      'inventoryHash', NEW.inventory_hash,
      'batchId', NEW.last_import_batch
    )
  );
  INSERT INTO search_sync_queue (product_id, reason, enqueued_at, processed_at, last_error)
  VALUES (NEW.id, 'product_outbox', now(), NULL, NULL)
  ON CONFLICT (product_id) DO UPDATE SET reason = EXCLUDED.reason,
    enqueued_at = now(), processed_at = NULL, last_error = NULL;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS products_outbox_event ON products;
CREATE TRIGGER products_outbox_event
AFTER INSERT OR UPDATE OF supplier_code, title, name_b2c, category_slug, attributes, images,
  base_price, final_price, currency, stock_count, is_in_stock, status, seo_title, seo_description
ON products
FOR EACH ROW EXECUTE FUNCTION worlds_enqueue_product_outbox_event();
