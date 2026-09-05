CREATE TABLE IF NOT EXISTS inventory_locations (
  code text PRIMARY KEY,
  name text NOT NULL,
  supplier_id text REFERENCES suppliers(id) ON DELETE SET NULL,
  active boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO inventory_locations (code, name, supplier_id)
VALUES ('ED_MAIN', 'eD centrálne skladové miesto', 'ED_SK')
ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name, updated_at = now();

CREATE TABLE IF NOT EXISTS supplier_inventory_current (
  supplier_product_id uuid NOT NULL REFERENCES supplier_products(id) ON DELETE CASCADE,
  location_code text NOT NULL REFERENCES inventory_locations(code),
  product_id text REFERENCES products(id) ON DELETE SET NULL,
  quantity numeric(19,4) NOT NULL DEFAULT 0 CHECK (quantity >= 0),
  is_in_stock boolean NOT NULL DEFAULT false,
  expected_at text,
  order_multiple integer NOT NULL DEFAULT 1 CHECK (order_multiple > 0),
  observed_at timestamptz NOT NULL DEFAULT now(),
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  PRIMARY KEY (supplier_product_id, location_code)
);

CREATE INDEX IF NOT EXISTS idx_supplier_inventory_current_product
  ON supplier_inventory_current (product_id, location_code, quantity);

CREATE TABLE IF NOT EXISTS supplier_future_availability (
  supplier_product_id uuid NOT NULL REFERENCES supplier_products(id) ON DELETE CASCADE,
  location_code text NOT NULL REFERENCES inventory_locations(code),
  available_at text NOT NULL,
  quantity numeric(19,4),
  source_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (supplier_product_id, location_code, available_at)
);

CREATE TABLE IF NOT EXISTS inventory_reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  location_code text NOT NULL REFERENCES inventory_locations(code),
  order_id text,
  quantity numeric(19,4) NOT NULL CHECK (quantity > 0),
  status text NOT NULL DEFAULT 'ACTIVE'
    CHECK (status IN ('ACTIVE', 'RELEASED', 'FULFILLED', 'CANCELLED')),
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_inventory_reservations_active
  ON inventory_reservations (product_id, location_code, status)
  WHERE status = 'ACTIVE';

CREATE TABLE IF NOT EXISTS sellable_inventory (
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  location_code text NOT NULL REFERENCES inventory_locations(code),
  supplier_quantity numeric(19,4) NOT NULL DEFAULT 0 CHECK (supplier_quantity >= 0),
  reserved_quantity numeric(19,4) NOT NULL DEFAULT 0 CHECK (reserved_quantity >= 0),
  safety_stock numeric(19,4) NOT NULL DEFAULT 0 CHECK (safety_stock >= 0),
  sellable_quantity numeric(19,4) NOT NULL DEFAULT 0 CHECK (sellable_quantity >= 0),
  computed_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (product_id, location_code)
);

CREATE OR REPLACE FUNCTION worlds_refresh_sellable_inventory(p_product_id text)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  source_qty numeric := 0;
  reserved_qty numeric := 0;
  safety numeric := 0;
BEGIN
  SELECT COALESCE(SUM(quantity), 0) INTO source_qty FROM supplier_inventory_current
   WHERE product_id = p_product_id AND location_code = 'ED_MAIN';
  SELECT COALESCE(SUM(quantity), 0) INTO reserved_qty FROM inventory_reservations
   WHERE product_id = p_product_id AND location_code = 'ED_MAIN' AND status = 'ACTIVE'
     AND (expires_at IS NULL OR expires_at > now());
  INSERT INTO sellable_inventory
    (product_id, location_code, supplier_quantity, reserved_quantity, safety_stock, sellable_quantity, computed_at)
  VALUES (p_product_id, 'ED_MAIN', source_qty, reserved_qty, safety,
          GREATEST(source_qty - reserved_qty - safety, 0), now())
  ON CONFLICT (product_id, location_code) DO UPDATE SET
    supplier_quantity = EXCLUDED.supplier_quantity, reserved_quantity = EXCLUDED.reserved_quantity,
    safety_stock = EXCLUDED.safety_stock, sellable_quantity = EXCLUDED.sellable_quantity,
    computed_at = now();
END;
$$;

CREATE OR REPLACE FUNCTION worlds_sync_product_inventory_projection()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO supplier_inventory_current
    (supplier_product_id, location_code, product_id, quantity, is_in_stock, expected_at, order_multiple, observed_at)
  SELECT l.supplier_product_id, 'ED_MAIN', NEW.id, GREATEST(COALESCE(NEW.stock_count, 0), 0),
         COALESCE(NEW.is_in_stock, false), NEW.expected_at, GREATEST(COALESCE(NEW.order_multiple, 1), 1), now()
    FROM product_supplier_links l WHERE l.product_id = NEW.id
  ON CONFLICT (supplier_product_id, location_code) DO UPDATE SET
    product_id = EXCLUDED.product_id, quantity = EXCLUDED.quantity, is_in_stock = EXCLUDED.is_in_stock,
    expected_at = EXCLUDED.expected_at, order_multiple = EXCLUDED.order_multiple, observed_at = now();
  PERFORM worlds_refresh_sellable_inventory(NEW.id);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS products_inventory_projection ON products;
CREATE TRIGGER products_inventory_projection
AFTER INSERT OR UPDATE OF stock_count, is_in_stock, expected_at, order_multiple
ON products
FOR EACH ROW EXECUTE FUNCTION worlds_sync_product_inventory_projection();

CREATE OR REPLACE FUNCTION worlds_sync_linked_inventory_projection()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO supplier_inventory_current
    (supplier_product_id, location_code, product_id, quantity, is_in_stock, expected_at, order_multiple, observed_at)
  SELECT NEW.supplier_product_id, 'ED_MAIN', p.id, GREATEST(COALESCE(p.stock_count, 0), 0),
         COALESCE(p.is_in_stock, false), p.expected_at, GREATEST(COALESCE(p.order_multiple, 1), 1), now()
    FROM products p WHERE p.id = NEW.product_id
  ON CONFLICT (supplier_product_id, location_code) DO UPDATE SET
    product_id = EXCLUDED.product_id, quantity = EXCLUDED.quantity, is_in_stock = EXCLUDED.is_in_stock,
    expected_at = EXCLUDED.expected_at, order_multiple = EXCLUDED.order_multiple, observed_at = now();
  PERFORM worlds_refresh_sellable_inventory(NEW.product_id);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS linked_inventory_projection ON product_supplier_links;
CREATE TRIGGER linked_inventory_projection
AFTER INSERT OR UPDATE ON product_supplier_links
FOR EACH ROW EXECUTE FUNCTION worlds_sync_linked_inventory_projection();

CREATE OR REPLACE FUNCTION worlds_refresh_reservation_inventory()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    PERFORM worlds_refresh_sellable_inventory(OLD.product_id);
    RETURN OLD;
  END IF;
  PERFORM worlds_refresh_sellable_inventory(NEW.product_id);
  IF TG_OP = 'UPDATE' AND OLD.product_id IS DISTINCT FROM NEW.product_id THEN
    PERFORM worlds_refresh_sellable_inventory(OLD.product_id);
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS reservations_inventory_projection ON inventory_reservations;
CREATE TRIGGER reservations_inventory_projection
AFTER INSERT OR UPDATE OR DELETE ON inventory_reservations
FOR EACH ROW EXECUTE FUNCTION worlds_refresh_reservation_inventory();

INSERT INTO supplier_inventory_current
  (supplier_product_id, location_code, product_id, quantity, is_in_stock, expected_at, order_multiple)
SELECT l.supplier_product_id, 'ED_MAIN', p.id, GREATEST(COALESCE(p.stock_count, 0), 0),
       COALESCE(p.is_in_stock, false), p.expected_at, GREATEST(COALESCE(p.order_multiple, 1), 1)
  FROM products p JOIN product_supplier_links l ON l.product_id = p.id
ON CONFLICT (supplier_product_id, location_code) DO UPDATE SET
  product_id = EXCLUDED.product_id, quantity = EXCLUDED.quantity, is_in_stock = EXCLUDED.is_in_stock,
  expected_at = EXCLUDED.expected_at, order_multiple = EXCLUDED.order_multiple, observed_at = now();

INSERT INTO sellable_inventory (product_id, location_code, supplier_quantity, sellable_quantity)
SELECT p.id, 'ED_MAIN', GREATEST(COALESCE(p.stock_count, 0), 0), GREATEST(COALESCE(p.stock_count, 0), 0)
  FROM products p
ON CONFLICT (product_id, location_code) DO UPDATE SET
  supplier_quantity = EXCLUDED.supplier_quantity, sellable_quantity = EXCLUDED.sellable_quantity,
  computed_at = now();
