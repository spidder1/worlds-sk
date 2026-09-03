alter table catalog.supplier_products
  disable trigger supplier_products_external_identity_immutable;

update catalog.supplier_products sp
set external_product_id = sp.supplier_sku,
    raw_extra = coalesce(sp.raw_extra, '{}'::jsonb)
      || jsonb_build_object('legacyExternalProductId', sp.external_product_id),
    updated_at = now()
from commerce.suppliers supplier, integration.source_systems source_system
where sp.supplier_id = supplier.id
  and sp.source_system_id = source_system.id
  and supplier.code = 'ED_SYSTEM'
  and source_system.code = 'ED_SYSTEM_SK'
  and sp.external_product_id is distinct from sp.supplier_sku;

alter table catalog.supplier_products
  enable trigger supplier_products_external_identity_immutable;
