ALTER TABLE products
  ADD COLUMN IF NOT EXISTS dealer_price_1 numeric(12,2),
  ADD COLUMN IF NOT EXISTS value_pack numeric(12,3),
  ADD COLUMN IF NOT EXISTS value_pack_qty numeric(12,3),
  ADD COLUMN IF NOT EXISTS unit text,
  ADD COLUMN IF NOT EXISTS logistic_data jsonb,
  ADD COLUMN IF NOT EXISTS ext_info_codes jsonb,
  ADD COLUMN IF NOT EXISTS index_code_1 text,
  ADD COLUMN IF NOT EXISTS index_code_2 text;

CREATE INDEX IF NOT EXISTS idx_products_index_codes ON products (index_code_1, index_code_2);
