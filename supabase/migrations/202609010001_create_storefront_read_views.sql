-- Public storefront projections. These views intentionally exclude supplier costs,
-- import metadata, customer data, and operational tables.

create or replace view public.storefront_products
with (security_invoker = true)
as
select
  p.id::text as id,
  coalesce(sp.supplier_sku, p.canonical_sku) as supplier_code,
  coalesce(sp.external_product_id, p.canonical_sku) as supplier_pro_id,
  p.canonical_sku as sku,
  coalesce(pi_mpn.value, sp.mpn, p.canonical_sku) as mpn,
  pi_ean.value as ean,
  coalesce(m.canonical_name::text, 'Unbranded') as brand,
  coalesce(tn.slug, 'nezaradene') as category_slug,
  jsonb_build_array(coalesce(tn.slug, 'nezaradene')) as category_hierarchy,
  tn.commodity_external_code as commodity_code,
  tn.name as commodity_name,
  coalesce(pl.title, sp.source_name, p.canonical_sku) as title,
  coalesce(pl.title, sp.source_b2c_name, sp.source_name, p.canonical_sku) as name_b2c,
  lower(regexp_replace(regexp_replace(coalesce(pl.title, p.canonical_sku), '[^a-zA-Z0-9]+', '-', 'g'), '^-+|-+$', '', 'g'))
    || '-' || p.canonical_sku as slug,
  coalesce(pl.short_description, sp.source_short_description, '') as short_description,
  coalesce(sp.source_description, '') as supplier_description,
  coalesce(pl.long_description, sp.source_description, '') as enriched_description,
  coalesce(ps.seo_title, pl.title || ' | Worlds.sk') as seo_title,
  coalesce(ps.meta_description, 'Kúpiť ' || coalesce(pl.title, p.canonical_sku) || ' na Worlds.sk.') as seo_description,
  jsonb_build_array(lower(coalesce(m.canonical_name::text, '')), lower(coalesce(sp.mpn, '')), coalesce(tn.slug, '')) as search_keywords,
  coalesce(pp.tax_rate_percent, 20.0) as vat_rate,
  round(coalesce(pp.gross_amount, 0) / (1 + coalesce(pp.tax_rate_percent, 20.0) / 100), 2) as base_price,
  coalesce(pp.gross_amount, 0) as final_price,
  'EUR'::text as currency,
  coalesce(si.sellable_quantity, 0) as stock_count,
  coalesce(si.sellable_quantity > 0, false) as is_in_stock,
  case when coalesce(si.sellable_quantity, 0) > 0 then 'Skladom' else 'Na objednávku' end as stock_text,
  1 as min_order_quantity,
  case
    when sp.source_warranty_text ~ '^\s*[0-9]+\s*M\s*$'
      then substring(sp.source_warranty_text from '[0-9]+')::integer
    else 0
  end as warranty_months,
  case when sp.source_warranty_text ~ '^\s*[0-9]+\s*M\s*$' then 'M' else null end as warranty_unit,
  coalesce(sd.filter_values, '{}'::jsonb) as attributes,
  case when primary_media.source_url is not null then
    jsonb_build_array(jsonb_build_object(
      'id', 'img-' || p.canonical_sku || '-0',
      'url', primary_media.source_url,
      'position', 0,
      'isPrimary', true,
      'altText', coalesce(pl.title, sp.source_name, p.canonical_sku)
    ))
  else '[]'::jsonb end as images,
  'ACTIVE'::text as status,
  coalesce(sd.content_hash, '') as data_hash,
  p.updated_at as last_synced_at,
  p.created_at,
  p.updated_at
from catalog.products p
left join catalog.manufacturers m on m.id = p.manufacturer_id
left join catalog.product_localizations pl on pl.product_id = p.id and pl.locale = 'sk-SK'
left join lateral (
  select pi.value from catalog.product_identifiers pi
  where pi.product_id = p.id and pi.identifier_type = 'MPN'
  order by pi.is_primary desc, pi.created_at desc
  limit 1
) pi_mpn on true
left join lateral (
  select pi.value from catalog.product_identifiers pi
  where pi.product_id = p.id and pi.identifier_type = 'GTIN'
  order by pi.is_primary desc, pi.created_at desc
  limit 1
) pi_ean on true
left join lateral (
  select linked_product.supplier_sku, linked_product.external_product_id,
    linked_product.mpn, linked_product.source_name, linked_product.source_b2c_name,
    linked_product.source_short_description, linked_product.source_description,
    linked_product.source_warranty_text
  from catalog.product_supplier_links link
  join catalog.supplier_products linked_product on linked_product.id = link.supplier_product_id
  where link.product_id = p.id and link.review_status <> 'REJECTED'
  order by link.confidence desc nulls last, link.linked_at desc
  limit 1
) sp on true
left join lateral (
  select node.slug, node.commodity_external_code, node.name
  from catalog.product_taxonomy_assignments assignment
  join catalog.taxonomy_nodes node on node.id = assignment.taxonomy_node_id
  where assignment.product_id = p.id and assignment.is_primary = true
  order by assignment.confidence desc nulls last, assignment.assigned_at desc
  limit 1
) tn on true
left join catalog.product_seo ps on ps.product_id = p.id and ps.locale = 'sk-SK'
left join lateral (
  select price.gross_amount, price.tax_rate_percent from commerce.product_prices price
  where price.product_id = p.id and (price.valid_to is null or price.valid_to > now())
  order by price.valid_from desc nulls last, price.created_at desc
  limit 1
) pp on true
left join lateral (
  select coalesce(sum(inventory.sellable_quantity), 0) as sellable_quantity
  from commerce.sellable_inventory inventory
  where inventory.product_id = p.id
) si on true
left join search.search_documents sd on sd.product_id = p.id and sd.locale = 'sk-SK'
left join lateral (
  select sma.source_url
  from catalog.product_media pm
  join catalog.source_media_assets sma on sma.media_asset_id = pm.media_asset_id
  where pm.product_id = p.id and pm.role = 'PRIMARY' and pm.approved = true
  order by pm.position
  limit 1
) primary_media on true;

create or replace view public.storefront_taxonomy_nodes
with (security_invoker = true)
as
select id, parent_id, name, slug, source_level, source_order, active
from catalog.taxonomy_nodes;

comment on view public.storefront_products is 'Public, price-safe product projection for the Worlds.sk storefront.';
comment on view public.storefront_taxonomy_nodes is 'Public active taxonomy projection for the Worlds.sk storefront.';
