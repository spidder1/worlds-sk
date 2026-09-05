CREATE TABLE IF NOT EXISTS currencies (
  code text PRIMARY KEY CHECK (length(code) = 3),
  name text NOT NULL,
  decimal_places smallint NOT NULL DEFAULT 2 CHECK (decimal_places BETWEEN 0 AND 6),
  active boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO currencies (code, name, decimal_places)
VALUES ('EUR', 'Euro', 2)
ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name, updated_at = now();

CREATE TABLE IF NOT EXISTS tax_rates (
  country_code text NOT NULL DEFAULT 'SK',
  tax_code text NOT NULL DEFAULT 'STANDARD',
  rate numeric(7,4) NOT NULL CHECK (rate >= 0 AND rate <= 100),
  valid_from date NOT NULL DEFAULT current_date,
  valid_to date,
  active boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (country_code, tax_code, valid_from),
  CHECK (valid_to IS NULL OR valid_to >= valid_from)
);

INSERT INTO tax_rates (country_code, tax_code, rate)
VALUES ('SK', 'STANDARD', 20)
ON CONFLICT (country_code, tax_code, valid_from) DO NOTHING;

CREATE TABLE IF NOT EXISTS price_lists (
  code text PRIMARY KEY,
  name text NOT NULL,
  currency_code text NOT NULL REFERENCES currencies(code),
  includes_vat boolean NOT NULL DEFAULT true,
  active boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO price_lists (code, name, currency_code, includes_vat)
VALUES ('RETAIL', 'Maloobchodná cena B2C', 'EUR', true)
ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name, updated_at = now();

CREATE TABLE IF NOT EXISTS product_prices (
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  price_list_code text NOT NULL REFERENCES price_lists(code),
  net_price numeric(19,4) NOT NULL DEFAULT 0 CHECK (net_price >= 0),
  gross_price numeric(19,4) NOT NULL DEFAULT 0 CHECK (gross_price >= 0),
  currency_code text NOT NULL REFERENCES currencies(code),
  vat_rate numeric(7,4) NOT NULL DEFAULT 20 CHECK (vat_rate >= 0 AND vat_rate <= 100),
  margin_percentage numeric(7,4),
  valid_from timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (product_id, price_list_code)
);

CREATE INDEX IF NOT EXISTS idx_product_prices_sellable
  ON product_prices (price_list_code, gross_price, product_id);

CREATE OR REPLACE FUNCTION worlds_sync_product_price_read_model()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO currencies (code, name)
  VALUES (CASE WHEN length(COALESCE(NEW.currency, '')) = 3 THEN upper(NEW.currency) ELSE 'EUR' END,
          CASE WHEN length(COALESCE(NEW.currency, '')) = 3 THEN upper(NEW.currency) ELSE 'EUR' END)
  ON CONFLICT (code) DO NOTHING;
  INSERT INTO product_prices
    (product_id, price_list_code, net_price, gross_price, currency_code, vat_rate,
     margin_percentage, updated_at)
  VALUES
    (NEW.id, 'RETAIL', GREATEST(COALESCE(NEW.base_price, 0), 0),
     GREATEST(COALESCE(NEW.final_price, 0), 0),
     CASE WHEN length(COALESCE(NEW.currency, '')) = 3 THEN upper(NEW.currency) ELSE 'EUR' END,
     GREATEST(LEAST(COALESCE(NEW.vat_rate, 20), 100), 0), NEW.margin_percentage, now())
  ON CONFLICT (product_id, price_list_code) DO UPDATE SET
    net_price = EXCLUDED.net_price, gross_price = EXCLUDED.gross_price,
    currency_code = EXCLUDED.currency_code, vat_rate = EXCLUDED.vat_rate,
    margin_percentage = EXCLUDED.margin_percentage, updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS products_price_read_model ON products;
CREATE TRIGGER products_price_read_model
AFTER INSERT OR UPDATE OF base_price, final_price, currency, vat_rate, margin_percentage
ON products
FOR EACH ROW EXECUTE FUNCTION worlds_sync_product_price_read_model();

INSERT INTO currencies (code, name)
SELECT DISTINCT CASE WHEN length(COALESCE(p.currency, '')) = 3 THEN upper(p.currency) ELSE 'EUR' END,
       CASE WHEN length(COALESCE(p.currency, '')) = 3 THEN upper(p.currency) ELSE 'EUR' END
  FROM products p
ON CONFLICT (code) DO NOTHING;

INSERT INTO product_prices
  (product_id, price_list_code, net_price, gross_price, currency_code, vat_rate, margin_percentage)
SELECT p.id, 'RETAIL', GREATEST(COALESCE(p.base_price, 0), 0), GREATEST(COALESCE(p.final_price, 0), 0),
       CASE WHEN length(COALESCE(p.currency, '')) = 3 THEN upper(p.currency) ELSE 'EUR' END,
       GREATEST(LEAST(COALESCE(p.vat_rate, 20), 100), 0), p.margin_percentage
  FROM products p
ON CONFLICT (product_id, price_list_code) DO UPDATE SET
  net_price = EXCLUDED.net_price, gross_price = EXCLUDED.gross_price,
  currency_code = EXCLUDED.currency_code, vat_rate = EXCLUDED.vat_rate,
  margin_percentage = EXCLUDED.margin_percentage, updated_at = now();
