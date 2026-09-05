CREATE TABLE IF NOT EXISTS supplier_price_fees (
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  fee_code text NOT NULL,
  amount numeric(19,4) NOT NULL DEFAULT 0 CHECK (amount >= 0),
  currency_code text NOT NULL DEFAULT 'EUR',
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (product_id, fee_code)
);

CREATE TABLE IF NOT EXISTS supplier_price_breaks (
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  break_code text NOT NULL,
  minimum_quantity numeric(19,4) NOT NULL CHECK (minimum_quantity > 0),
  unit_price numeric(19,4) NOT NULL CHECK (unit_price >= 0),
  currency_code text NOT NULL DEFAULT 'EUR',
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (product_id, break_code)
);

CREATE INDEX IF NOT EXISTS idx_supplier_price_breaks_product_qty
  ON supplier_price_breaks (product_id, minimum_quantity);

CREATE OR REPLACE FUNCTION worlds_sync_supplier_price_details()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM supplier_price_fees WHERE product_id = NEW.id;
  INSERT INTO supplier_price_fees (product_id, fee_code, amount, currency_code, source_payload)
  SELECT NEW.id, fee.fee_code, fee.amount,
         CASE WHEN length(COALESCE(NEW.currency, '')) = 3 THEN upper(NEW.currency) ELSE 'EUR' END,
         jsonb_build_object('source', 'products_trigger')
    FROM (VALUES
      ('GARBAGE', GREATEST(COALESCE(NEW.garbage_fee, 0), 0)),
      ('AUTHOR', GREATEST(COALESCE(NEW.author_fee, 0), 0))
    ) AS fee(fee_code, amount)
   WHERE fee.amount > 0;

  DELETE FROM supplier_price_breaks WHERE product_id = NEW.id;
  IF COALESCE(NEW.value_pack_qty, 0) > 0 AND COALESCE(NEW.value_pack, 0) >= 0 THEN
    INSERT INTO supplier_price_breaks
      (product_id, break_code, minimum_quantity, unit_price, currency_code, source_payload)
    VALUES (NEW.id, 'VALUE_PACK', NEW.value_pack_qty, NEW.value_pack,
            CASE WHEN length(COALESCE(NEW.currency, '')) = 3 THEN upper(NEW.currency) ELSE 'EUR' END,
            jsonb_build_object('source', 'products_trigger'));
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS products_supplier_price_details ON products;
CREATE TRIGGER products_supplier_price_details
AFTER INSERT OR UPDATE OF garbage_fee, author_fee, value_pack, value_pack_qty, currency
ON products
FOR EACH ROW EXECUTE FUNCTION worlds_sync_supplier_price_details();

INSERT INTO supplier_price_fees (product_id, fee_code, amount, currency_code)
SELECT p.id, fee.fee_code, fee.amount,
       CASE WHEN length(COALESCE(p.currency, '')) = 3 THEN upper(p.currency) ELSE 'EUR' END
  FROM products p
 CROSS JOIN LATERAL (VALUES
    ('GARBAGE', GREATEST(COALESCE(p.garbage_fee, 0), 0)),
    ('AUTHOR', GREATEST(COALESCE(p.author_fee, 0), 0))
  ) AS fee(fee_code, amount)
 WHERE fee.amount > 0
ON CONFLICT (product_id, fee_code) DO UPDATE SET amount = EXCLUDED.amount, updated_at = now();

INSERT INTO supplier_price_breaks (product_id, break_code, minimum_quantity, unit_price, currency_code)
SELECT p.id, 'VALUE_PACK', p.value_pack_qty, p.value_pack,
       CASE WHEN length(COALESCE(p.currency, '')) = 3 THEN upper(p.currency) ELSE 'EUR' END
  FROM products p
 WHERE COALESCE(p.value_pack_qty, 0) > 0 AND COALESCE(p.value_pack, 0) >= 0
ON CONFLICT (product_id, break_code) DO UPDATE SET
  minimum_quantity = EXCLUDED.minimum_quantity, unit_price = EXCLUDED.unit_price, updated_at = now();
