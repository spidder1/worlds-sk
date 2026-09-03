-- Supplier external identity is immutable after first sighting. eD ProId remains
-- available in raw_extra, while Code is the stable external/supplier key used by imports.
create or replace function catalog.keep_supplier_external_identity_stable()
returns trigger
language plpgsql
set search_path = catalog, pg_temp
as $$
begin
  if new.external_product_id is distinct from old.external_product_id then
    new.external_product_id := old.external_product_id;
  end if;
  return new;
end;
$$;

drop trigger if exists supplier_products_external_identity_immutable on catalog.supplier_products;
create trigger supplier_products_external_identity_immutable
before update of external_product_id on catalog.supplier_products
for each row execute function catalog.keep_supplier_external_identity_stable();
