-- Keep the fast storefront projection in sync with both catalogue content and
-- recurring stock/price imports. The normalized commerce tables remain the
-- source of truth; this table is only the public read projection.

create or replace function integration.refresh_ed_storefront_item(
  p_item jsonb,
  p_update_commercial boolean
) returns void
language plpgsql
security definer
set search_path = public, catalog, commerce, integration, pg_temp
as $$
declare
  v_code text := nullif(p_item->>'code', '');
  v_supplier_id uuid;
  v_source_system_id uuid;
  v_product_id uuid;
  v_catalog_payload jsonb := '{}'::jsonb;
  v_effective jsonb;
  v_title text;
  v_slug text;
  v_images jsonb := '[]'::jsonb;
begin
  if v_code is null then return; end if;

  select id into strict v_supplier_id
  from commerce.suppliers where code = 'ED_SYSTEM';
  select id into strict v_source_system_id
  from integration.source_systems where code = 'ED_SYSTEM_SK';

  select coalesce(catalog_payload, '{}'::jsonb)
  into v_catalog_payload
  from integration.ed_catalog_compact
  where source_system_id = v_source_system_id and supplier_sku = v_code;

  v_effective := coalesce(v_catalog_payload, '{}'::jsonb) || p_item;

  select link.product_id
  into v_product_id
  from catalog.supplier_products supplier_product
  join catalog.product_supplier_links link
    on link.supplier_product_id = supplier_product.id
  where supplier_product.supplier_id = v_supplier_id
    and supplier_product.supplier_sku = v_code
  limit 1;

  -- A full-catalog record without commercial data intentionally stays only in
  -- compact staging until a priced stock record makes it sellable.
  if v_product_id is null then return; end if;

  v_title := coalesce(nullif(v_effective->>'title', ''), v_code);
  v_slug := coalesce(
    nullif(v_effective->>'slug', ''),
    lower(regexp_replace(v_title, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || lower(v_code)
  );

  -- One supplier image is sufficient for catalogue cards and keeps the public
  -- cache compact. The normalized media model stores the canonical primary.
  if jsonb_typeof(v_effective->'images') = 'array'
     and jsonb_array_length(v_effective->'images') > 0
     and nullif(v_effective->'images'->0->>'url', '') ~* '^https?://' then
    v_images := jsonb_build_array(v_effective->'images'->0);
  end if;

  insert into catalog.storefront_products_cache (
    id, supplier_code, supplier_pro_id, sku, mpn, ean, brand,
    category_slug, category_hierarchy, commodity_code, commodity_name,
    title, name_b2c, slug, short_description, supplier_description,
    enriched_description, seo_title, seo_description, search_keywords,
    vat_rate, base_price, final_price, currency, stock_count, is_in_stock,
    stock_text, min_order_quantity, warranty_months, warranty_unit,
    attributes, images, status, data_hash, last_synced_at, created_at, updated_at
  ) values (
    v_product_id::text,
    v_code,
    coalesce(nullif(v_effective->>'pro_id', ''), v_code),
    v_code,
    coalesce(nullif(v_effective->>'mpn', ''), v_code),
    nullif(v_effective->>'ean', ''),
    nullif(v_effective->>'brand', ''),
    nullif(v_effective->>'category_slug', ''),
    coalesce(v_effective->'category_hierarchy', '[]'::jsonb),
    nullif(v_effective->>'commodity_code', ''),
    nullif(v_effective->>'commodity_name', ''),
    v_title,
    v_title,
    v_slug,
    left(nullif(v_effective->>'supplier_description', ''), 220),
    nullif(v_effective->>'supplier_description', ''),
    nullif(v_effective->>'enriched_description', ''),
    v_title || ' | Worlds.sk',
    'Kúpiť ' || v_title || ' na Worlds.sk.',
    jsonb_build_array(
      lower(coalesce(nullif(v_effective->>'brand', ''), '')),
      coalesce(nullif(v_effective->>'category_slug', ''), '')
    ),
    greatest(0, coalesce((v_effective->>'vat_rate')::numeric, 20)),
    case when p_update_commercial then greatest(0, coalesce((v_effective->>'base_price')::numeric, 0)) else 0 end,
    case when p_update_commercial then greatest(0, coalesce((v_effective->>'final_price')::numeric, 0)) else 0 end,
    'EUR',
    case when p_update_commercial then greatest(0, coalesce((v_effective->>'stock_count')::numeric, 0)) else 0 end,
    case when p_update_commercial then coalesce((v_effective->>'is_in_stock')::boolean, false) else false end,
    case when p_update_commercial then coalesce(nullif(v_effective->>'stock_text', ''), 'Na objednávku') else 'Na objednávku' end,
    greatest(1, coalesce((v_effective->>'order_multiple')::integer, 1)),
    greatest(0, coalesce((v_effective->>'warranty_months')::integer, 24)),
    'M',
    coalesce(v_effective->'attributes', '{}'::jsonb),
    v_images,
    'ACTIVE',
    coalesce(nullif(v_effective->>'data_hash', ''), nullif(v_effective->>'content_hash', '')),
    now(), now(), now()
  )
  on conflict (id) do update
  set supplier_pro_id = excluded.supplier_pro_id,
      sku = excluded.sku,
      mpn = excluded.mpn,
      ean = excluded.ean,
      brand = excluded.brand,
      category_slug = excluded.category_slug,
      category_hierarchy = excluded.category_hierarchy,
      commodity_code = excluded.commodity_code,
      commodity_name = excluded.commodity_name,
      title = excluded.title,
      name_b2c = excluded.name_b2c,
      slug = excluded.slug,
      short_description = excluded.short_description,
      supplier_description = excluded.supplier_description,
      enriched_description = excluded.enriched_description,
      seo_title = excluded.seo_title,
      seo_description = excluded.seo_description,
      search_keywords = excluded.search_keywords,
      vat_rate = case when p_update_commercial then excluded.vat_rate else catalog.storefront_products_cache.vat_rate end,
      base_price = case when p_update_commercial then excluded.base_price else catalog.storefront_products_cache.base_price end,
      final_price = case when p_update_commercial then excluded.final_price else catalog.storefront_products_cache.final_price end,
      stock_count = case when p_update_commercial then excluded.stock_count else catalog.storefront_products_cache.stock_count end,
      is_in_stock = case when p_update_commercial then excluded.is_in_stock else catalog.storefront_products_cache.is_in_stock end,
      stock_text = case when p_update_commercial then excluded.stock_text else catalog.storefront_products_cache.stock_text end,
      min_order_quantity = excluded.min_order_quantity,
      warranty_months = excluded.warranty_months,
      attributes = excluded.attributes,
      images = excluded.images,
      status = 'ACTIVE',
      data_hash = excluded.data_hash,
      last_synced_at = now(),
      updated_at = now();
end;
$$;

create or replace function integration.refresh_ed_storefront_batch(
  p_items jsonb,
  p_mode text
) returns void
language plpgsql
security definer
set search_path = public, integration, pg_temp
as $$
declare
  v_item jsonb;
begin
  if jsonb_typeof(p_items) <> 'array' then
    raise exception 'p_items must be a JSON array';
  end if;
  if p_mode not in ('FULL', 'STOCK_PRICE') then
    raise exception 'Unsupported storefront refresh mode: %', p_mode;
  end if;

  for v_item in select value from jsonb_array_elements(p_items)
  loop
    perform integration.refresh_ed_storefront_item(
      v_item,
      p_mode = 'STOCK_PRICE' or coalesce((v_item->>'has_commercial_data')::boolean, false)
    );
  end loop;
end;
$$;

create or replace function public.stage_ed_catalog_batch(p_batch_id uuid, p_items jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, integration, pg_temp
as $$
declare
  v_result jsonb;
begin
  v_result := integration.stage_ed_catalog_batch(p_batch_id, p_items);
  perform integration.refresh_ed_storefront_batch(p_items, 'FULL');
  return v_result;
end;
$$;

create or replace function public.sync_ed_stock_price_batch(p_batch_id uuid, p_items jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, integration, pg_temp
as $$
declare
  v_result jsonb;
begin
  v_result := integration.apply_ed_batch(p_batch_id, p_items, false);
  perform integration.refresh_ed_storefront_batch(p_items, 'STOCK_PRICE');
  return v_result;
end;
$$;

revoke all on function integration.refresh_ed_storefront_item(jsonb, boolean) from public, anon, authenticated;
revoke all on function integration.refresh_ed_storefront_batch(jsonb, text) from public, anon, authenticated;
revoke all on function public.stage_ed_catalog_batch(uuid, jsonb) from public, anon, authenticated;
revoke all on function public.sync_ed_stock_price_batch(uuid, jsonb) from public, anon, authenticated;
grant execute on function public.stage_ed_catalog_batch(uuid, jsonb) to service_role;
grant execute on function public.sync_ed_stock_price_batch(uuid, jsonb) to service_role;

comment on function integration.refresh_ed_storefront_item(jsonb, boolean) is
  'Refreshes the denormalized public read projection after normalized eD ingestion.';
