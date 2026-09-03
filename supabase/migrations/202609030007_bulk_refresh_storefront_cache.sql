-- Refresh the public read projection once per JSON batch instead of issuing
-- several lookups and an upsert for every individual product.

create or replace function integration.refresh_ed_storefront_batch(
  p_items jsonb,
  p_mode text
) returns void
language plpgsql
security definer
set search_path = public, catalog, commerce, integration, pg_temp
as $$
begin
  if jsonb_typeof(p_items) <> 'array' then
    raise exception 'p_items must be a JSON array';
  end if;
  if p_mode not in ('FULL', 'STOCK_PRICE') then
    raise exception 'Unsupported storefront refresh mode: %', p_mode;
  end if;

  with source_ids as (
    select
      (select id from integration.source_systems where code = 'ED_SYSTEM_SK') source_system_id,
      (select id from commerce.suppliers where code = 'ED_SYSTEM') supplier_id
  ), input_items as (
    select value item
    from jsonb_array_elements(p_items)
    where nullif(value->>'code', '') is not null
  ), effective_items as (
    select
      case when p_mode = 'STOCK_PRICE'
        then coalesce(compact.catalog_payload, '{}'::jsonb) || input.item
        else input.item
      end item
    from input_items input
    cross join source_ids source
    left join integration.ed_catalog_compact compact
      on compact.source_system_id = source.source_system_id
     and compact.supplier_sku = input.item->>'code'
  ), resolved as (
    select link.product_id, effective.item
    from effective_items effective
    cross join source_ids source
    join catalog.supplier_products supplier_product
      on supplier_product.supplier_id = source.supplier_id
     and supplier_product.supplier_sku = effective.item->>'code'
    join catalog.product_supplier_links link
      on link.supplier_product_id = supplier_product.id
  )
  insert into catalog.storefront_products_cache (
    id, supplier_code, supplier_pro_id, sku, mpn, ean, brand,
    category_slug, category_hierarchy, commodity_code, commodity_name,
    title, name_b2c, slug, short_description, supplier_description,
    enriched_description, seo_title, seo_description, search_keywords,
    vat_rate, base_price, final_price, currency, stock_count, is_in_stock,
    stock_text, min_order_quantity, warranty_months, warranty_unit,
    attributes, images, status, data_hash, last_synced_at, created_at, updated_at
  )
  select
    resolved.product_id::text,
    resolved.item->>'code',
    coalesce(nullif(resolved.item->>'pro_id', ''), resolved.item->>'code'),
    resolved.item->>'code',
    coalesce(nullif(resolved.item->>'mpn', ''), resolved.item->>'code'),
    nullif(resolved.item->>'ean', ''),
    nullif(resolved.item->>'brand', ''),
    nullif(resolved.item->>'category_slug', ''),
    coalesce(resolved.item->'category_hierarchy', '[]'::jsonb),
    nullif(resolved.item->>'commodity_code', ''),
    nullif(resolved.item->>'commodity_name', ''),
    coalesce(nullif(resolved.item->>'title', ''), resolved.item->>'code'),
    coalesce(nullif(resolved.item->>'title', ''), resolved.item->>'code'),
    coalesce(
      nullif(resolved.item->>'slug', ''),
      lower(regexp_replace(coalesce(nullif(resolved.item->>'title', ''), resolved.item->>'code'), '[^a-zA-Z0-9]+', '-', 'g'))
        || '-' || lower(resolved.item->>'code')
    ),
    left(nullif(resolved.item->>'supplier_description', ''), 220),
    nullif(resolved.item->>'supplier_description', ''),
    nullif(resolved.item->>'enriched_description', ''),
    coalesce(nullif(resolved.item->>'title', ''), resolved.item->>'code') || ' | Worlds.sk',
    'Kúpiť ' || coalesce(nullif(resolved.item->>'title', ''), resolved.item->>'code') || ' na Worlds.sk.',
    jsonb_build_array(
      lower(coalesce(nullif(resolved.item->>'brand', ''), '')),
      coalesce(nullif(resolved.item->>'category_slug', ''), '')
    ),
    greatest(0, coalesce((resolved.item->>'vat_rate')::numeric, 20)),
    greatest(0, coalesce((resolved.item->>'base_price')::numeric, 0)),
    greatest(0, coalesce((resolved.item->>'final_price')::numeric, 0)),
    'EUR',
    greatest(0, coalesce((resolved.item->>'stock_count')::numeric, 0)),
    coalesce((resolved.item->>'is_in_stock')::boolean, false),
    coalesce(nullif(resolved.item->>'stock_text', ''), 'Na objednávku'),
    greatest(1, coalesce((resolved.item->>'order_multiple')::integer, 1)),
    greatest(0, coalesce((resolved.item->>'warranty_months')::integer, 24)),
    'M',
    coalesce(resolved.item->'attributes', '{}'::jsonb),
    case
      when jsonb_typeof(resolved.item->'images') = 'array'
       and jsonb_array_length(resolved.item->'images') > 0
       and nullif(resolved.item->'images'->0->>'url', '') ~* '^https?://'
      then jsonb_build_array(resolved.item->'images'->0)
      else '[]'::jsonb
    end,
    'ACTIVE',
    coalesce(nullif(resolved.item->>'data_hash', ''), nullif(resolved.item->>'content_hash', '')),
    now(), now(), now()
  from resolved
  on conflict (id) do update
  set supplier_pro_id = case when p_mode = 'FULL' then excluded.supplier_pro_id else catalog.storefront_products_cache.supplier_pro_id end,
      sku = excluded.sku,
      mpn = case when p_mode = 'FULL' then excluded.mpn else catalog.storefront_products_cache.mpn end,
      ean = case when p_mode = 'FULL' then excluded.ean else catalog.storefront_products_cache.ean end,
      brand = case when p_mode = 'FULL' then excluded.brand else catalog.storefront_products_cache.brand end,
      category_slug = case when p_mode = 'FULL' then excluded.category_slug else catalog.storefront_products_cache.category_slug end,
      category_hierarchy = case when p_mode = 'FULL' then excluded.category_hierarchy else catalog.storefront_products_cache.category_hierarchy end,
      commodity_code = case when p_mode = 'FULL' then excluded.commodity_code else catalog.storefront_products_cache.commodity_code end,
      commodity_name = case when p_mode = 'FULL' then excluded.commodity_name else catalog.storefront_products_cache.commodity_name end,
      title = case when p_mode = 'FULL' then excluded.title else catalog.storefront_products_cache.title end,
      name_b2c = case when p_mode = 'FULL' then excluded.name_b2c else catalog.storefront_products_cache.name_b2c end,
      slug = case when p_mode = 'FULL' then excluded.slug else catalog.storefront_products_cache.slug end,
      short_description = case when p_mode = 'FULL' then excluded.short_description else catalog.storefront_products_cache.short_description end,
      supplier_description = case when p_mode = 'FULL' then excluded.supplier_description else catalog.storefront_products_cache.supplier_description end,
      enriched_description = case when p_mode = 'FULL' then excluded.enriched_description else catalog.storefront_products_cache.enriched_description end,
      seo_title = case when p_mode = 'FULL' then excluded.seo_title else catalog.storefront_products_cache.seo_title end,
      seo_description = case when p_mode = 'FULL' then excluded.seo_description else catalog.storefront_products_cache.seo_description end,
      search_keywords = case when p_mode = 'FULL' then excluded.search_keywords else catalog.storefront_products_cache.search_keywords end,
      vat_rate = case when p_mode = 'STOCK_PRICE' or coalesce((excluded.final_price > 0), false) then excluded.vat_rate else catalog.storefront_products_cache.vat_rate end,
      base_price = case when p_mode = 'STOCK_PRICE' or coalesce((excluded.final_price > 0), false) then excluded.base_price else catalog.storefront_products_cache.base_price end,
      final_price = case when p_mode = 'STOCK_PRICE' or coalesce((excluded.final_price > 0), false) then excluded.final_price else catalog.storefront_products_cache.final_price end,
      stock_count = case when p_mode = 'STOCK_PRICE' or coalesce((excluded.final_price > 0), false) then excluded.stock_count else catalog.storefront_products_cache.stock_count end,
      is_in_stock = case when p_mode = 'STOCK_PRICE' or coalesce((excluded.final_price > 0), false) then excluded.is_in_stock else catalog.storefront_products_cache.is_in_stock end,
      stock_text = case when p_mode = 'STOCK_PRICE' or coalesce((excluded.final_price > 0), false) then excluded.stock_text else catalog.storefront_products_cache.stock_text end,
      min_order_quantity = case when p_mode = 'FULL' then excluded.min_order_quantity else catalog.storefront_products_cache.min_order_quantity end,
      warranty_months = case when p_mode = 'FULL' then excluded.warranty_months else catalog.storefront_products_cache.warranty_months end,
      attributes = case when p_mode = 'FULL' then excluded.attributes else catalog.storefront_products_cache.attributes end,
      images = case when p_mode = 'FULL' then excluded.images else catalog.storefront_products_cache.images end,
      status = 'ACTIVE',
      data_hash = case when p_mode = 'FULL' then excluded.data_hash else catalog.storefront_products_cache.data_hash end,
      last_synced_at = now(),
      updated_at = now();
end;
$$;

-- Remove an obsolete per-item three-table existence lookup from the compact
-- staging function. Commercial normalization was already disabled by the
-- preceding migration.
do $migration$
declare
  v_definition text;
  v_lookup text := $old$  select exists (
    select 1
    from catalog.supplier_products supplier_product
    join catalog.product_supplier_links link on link.supplier_product_id = supplier_product.id
    join catalog.products product on product.id = link.product_id
    where supplier_product.supplier_id = v_supplier_id
      and supplier_product.supplier_sku = v_code
      and product.lifecycle_status = 'ACTIVE'
  ) into v_existing_active_product;

$old$;
begin
  select pg_get_functiondef('integration.stage_ed_catalog_item(jsonb,uuid)'::regprocedure)
  into v_definition;
  if position(v_lookup in v_definition) > 0 then
    execute replace(v_definition, v_lookup, '');
  end if;
end;
$migration$;

revoke all on function integration.refresh_ed_storefront_batch(jsonb, text) from public, anon, authenticated;

comment on function integration.refresh_ed_storefront_batch(jsonb, text) is
  'Bulk refreshes the denormalized storefront cache after an eD import RPC batch.';
