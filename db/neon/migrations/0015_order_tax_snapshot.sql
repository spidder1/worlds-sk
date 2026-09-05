ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS vat_rate numeric(5,2) NOT NULL DEFAULT 20,
  ADD COLUMN IF NOT EXISTS subtotal_net numeric(12,2),
  ADD COLUMN IF NOT EXISTS vat_total numeric(12,2),
  ADD COLUMN IF NOT EXISTS reverse_charge boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS vat_validation_status text;

UPDATE orders
   SET subtotal_net = COALESCE(subtotal_net, subtotal),
       vat_total = COALESCE(vat_total, total - subtotal)
 WHERE subtotal_net IS NULL OR vat_total IS NULL;

ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_vat_validation_status_check;
ALTER TABLE orders ADD CONSTRAINT orders_vat_validation_status_check
  CHECK (vat_validation_status IS NULL OR vat_validation_status IN ('NOT_CHECKED', 'VALID', 'INVALID', 'UNAVAILABLE'));
