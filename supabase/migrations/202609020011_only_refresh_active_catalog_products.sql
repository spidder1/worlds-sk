create or replace function integration.stage_ed_catalog_item(p_item jsonb, p_batch_id uuid)
returns text
language plpgsql
security definer
set search_path = public, catalog, commerce, integration, pg_temp
as $$
declare
  v_source_system_id uuid;
  v_supplier_id uuid;
  v_code text := nullif(p_item->>'code', '');
  v_old_hash text;
  v_existing_active_product boolean := false;
  v_has_commercial_data boolean := coalesce((p_item->>'has_commercial_data')::boolean, false);
  v_status text;
  v_minimal_payload jsonb;
begin
  if v_code is null then raise exception 'Missing product code'; end if;
  if not exists (
    select 1 from integration.import_leases
    where job_name = 'ED_CATALOG_SYNC' and batch_id = p_batch_id and locked_until >= now()
  ) then
    raise exception 'Import batch % does not own the active lease', p_batch_id;
  end if;

  select id into strict v_source_system_id from integration.source_systems where code = 'ED_SYSTEM_SK';
  select id into strict v_supplier_id from commerce.suppliers where code = 'ED_SYSTEM';

  select content_hash into v_old_hash
  from integration.ed_catalog_compact
  where source_system_id = v_source_system_id and supplier_sku = v_code;

  select exists (
    select 1
    from catalog.supplier_products supplier_product
    join catalog.product_supplier_links link on link.supplier_product_id = supplier_product.id
    join catalog.products product on product.id = link.product_id
    where supplier_product.supplier_id = v_supplier_id
      and supplier_product.supplier_sku = v_code
      and product.lifecycle_status = 'ACTIVE'
  ) into v_existing_active_product;

  v_minimal_payload := jsonb_strip_nulls(jsonb_build_object(
    'code', v_code,
    'pro_id', nullif(p_item->>'pro_id', ''),
    'title', nullif(p_item->>'title', ''),
    'brand', nullif(p_item->>'brand', ''),
    'producer_code', nullif(p_item->>'producer_code', ''),
    'mpn', nullif(p_item->>'mpn', ''),
    'mpn2', nullif(p_item->>'mpn2', ''),
    'ean', nullif(p_item->>'ean', ''),
    'slug', nullif(p_item->>'slug', ''),
    'enriched_description', '',
    'supplier_description', '',
    'supplier_cost', 0,
    'garbage_fee', 0,
    'author_fee', 0,
    'total_cost_with_fees', 0,
    'dealer_price', 0,
    'dealer_price_1', 0,
    'recommended_retail_price', 0,
    'base_price', 0,
    'final_price', 0,
    'vat_rate', coalesce((p_item->>'vat_rate')::numeric, 20),
    'margin_percentage', 0,
    'stock_count', 0,
    'is_in_stock', false,
    'stock_text', 'Na objednavku',
    'warranty_months', coalesce((p_item->>'warranty_months')::numeric, 24),
    'category_slug', nullif(p_item->>'category_slug', ''),
    'category_hierarchy', coalesce(p_item->'category_hierarchy', '[]'::jsonb),
    'commodity_code', nullif(p_item->>'commodity_code', ''),
    'commodity_name', nullif(p_item->>'commodity_name', ''),
    'order_multiple', coalesce((p_item->>'order_multiple')::numeric, 1),
    'b2c_eligible', coalesce((p_item->>'b2c_eligible')::boolean, true),
    'is_premium', coalesce((p_item->>'is_premium')::boolean, false),
    'images', coalesce(p_item->'images', '[]'::jsonb),
    'attributes', '{}'::jsonb,
    'identity_hash', nullif(p_item->>'identity_hash', ''),
    'content_hash', nullif(p_item->>'content_hash', ''),
    'data_hash', nullif(p_item->>'data_hash', ''),
    'raw_extra', jsonb_build_object(
      'compactCatalog', true,
      'scopeReason', coalesce(nullif(p_item->>'scope_reason', ''), 'IT_SIGNAL'),
      'scopeSignal', nullif(p_item->>'scope_signal', '')
    )
  ));

  insert into integration.ed_catalog_compact (
    source_system_id, supplier_sku, external_product_id, title, brand, producer_code,
    mpn, mpn2, ean, category_slug, category_hierarchy, commodity_code, commodity_name,
    image_url, warranty_months, b2c_eligible, is_premium, scope_reason, scope_signal,
    identity_hash, content_hash, catalog_payload, first_seen_batch_id, last_seen_batch_id
  ) values (
    v_source_system_id, v_code, nullif(p_item->>'pro_id', ''), p_item->>'title',
    nullif(p_item->>'brand', ''), nullif(p_item->>'producer_code', ''),
    nullif(p_item->>'mpn', ''), nullif(p_item->>'mpn2', ''), nullif(p_item->>'ean', ''),
    nullif(p_item->>'category_slug', ''), coalesce(p_item->'category_hierarchy', '[]'::jsonb),
    nullif(p_item->>'commodity_code', ''), nullif(p_item->>'commodity_name', ''),
    nullif(p_item->'images'->0->>'url', ''), coalesce((p_item->>'warranty_months')::numeric, 24),
    coalesce((p_item->>'b2c_eligible')::boolean, true),
    coalesce((p_item->>'is_premium')::boolean, false),
    coalesce(nullif(p_item->>'scope_reason', ''), 'IT_SIGNAL'), nullif(p_item->>'scope_signal', ''),
    nullif(p_item->>'identity_hash', ''), p_item->>'content_hash', v_minimal_payload,
    p_batch_id, p_batch_id
  )
  on conflict (source_system_id, supplier_sku) do update
  set external_product_id = excluded.external_product_id,
      title = excluded.title,
      brand = excluded.brand,
      producer_code = excluded.producer_code,
      mpn = excluded.mpn,
      mpn2 = excluded.mpn2,
      ean = excluded.ean,
      category_slug = excluded.category_slug,
      category_hierarchy = excluded.category_hierarchy,
      commodity_code = excluded.commodity_code,
      commodity_name = excluded.commodity_name,
      image_url = excluded.image_url,
      warranty_months = excluded.warranty_months,
      b2c_eligible = excluded.b2c_eligible,
      is_premium = excluded.is_premium,
      scope_reason = excluded.scope_reason,
      scope_signal = excluded.scope_signal,
      identity_hash = excluded.identity_hash,
      content_hash = excluded.content_hash,
      catalog_payload = excluded.catalog_payload,
      offer_status = 'ACTIVE',
      missing_streak = 0,
      last_seen_at = now(),
      last_seen_batch_id = p_batch_id,
      updated_at = now();

  if v_existing_active_product or v_has_commercial_data then
    perform integration.apply_ed_offer_state(p_item, p_batch_id, true);
  end if;

  if v_old_hash is null then v_status := 'NEW';
  elsif v_old_hash is distinct from p_item->>'content_hash' then v_status := 'CHANGED';
  else v_status := 'UNCHANGED';
  end if;
  return v_status;
end;
$$;

comment on function integration.stage_ed_catalog_item(jsonb, uuid) is
  'Stages every in-scope item, but refreshes normalized content only for active or commercially sellable products.';
