create table if not exists integration.ed_catalog_compact (
  source_system_id uuid not null references integration.source_systems(id),
  supplier_sku text not null,
  external_product_id text,
  title text not null,
  brand text,
  producer_code text,
  mpn text,
  mpn2 text,
  ean text,
  category_slug text,
  category_hierarchy jsonb not null default '[]'::jsonb,
  commodity_code text,
  commodity_name text,
  image_url text,
  warranty_months numeric(8,2),
  b2c_eligible boolean not null default true,
  is_premium boolean not null default false,
  scope_reason text not null default 'IT_SIGNAL',
  scope_signal text,
  identity_hash text,
  content_hash text not null,
  catalog_payload jsonb not null,
  offer_status text not null default 'ACTIVE',
  missing_streak integer not null default 0 check (missing_streak >= 0),
  first_seen_at timestamptz not null default now(),
  first_seen_batch_id uuid references integration.import_batches(id),
  last_seen_at timestamptz not null default now(),
  last_seen_batch_id uuid references integration.import_batches(id),
  updated_at timestamptz not null default now(),
  primary key (source_system_id, supplier_sku),
  check (jsonb_typeof(category_hierarchy) = 'array'),
  check (char_length(content_hash) = 64),
  check (identity_hash is null or char_length(identity_hash) = 64)
);

create index if not exists ed_catalog_compact_status_idx
  on integration.ed_catalog_compact (offer_status, last_seen_at desc);
create index if not exists ed_catalog_compact_mpn_idx
  on integration.ed_catalog_compact (lower(mpn)) where mpn is not null;
create index if not exists ed_catalog_compact_ean_idx
  on integration.ed_catalog_compact (ean) where ean is not null;
create index if not exists ed_catalog_compact_category_idx
  on integration.ed_catalog_compact (category_slug, offer_status);

revoke all on integration.ed_catalog_compact from public, anon, authenticated;
grant select, insert, update, delete on integration.ed_catalog_compact to service_role;

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
  v_existing_supplier_product boolean := false;
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
    select 1 from catalog.supplier_products
    where supplier_id = v_supplier_id and supplier_sku = v_code
  ) into v_existing_supplier_product;

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

  if v_existing_supplier_product or v_has_commercial_data then
    perform integration.apply_ed_offer_state(p_item, p_batch_id, true);
  end if;

  if v_old_hash is null then v_status := 'NEW';
  elsif v_old_hash is distinct from p_item->>'content_hash' then v_status := 'CHANGED';
  else v_status := 'UNCHANGED';
  end if;
  return v_status;
end;
$$;

create or replace function integration.stage_ed_catalog_batch(p_batch_id uuid, p_items jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, integration, pg_temp
as $$
declare
  v_item jsonb;
  v_status text;
  v_processed integer := 0;
  v_created integer := 0;
  v_changed integer := 0;
  v_unchanged integer := 0;
begin
  if jsonb_typeof(p_items) <> 'array' then raise exception 'p_items must be a JSON array'; end if;
  for v_item in select value from jsonb_array_elements(p_items)
  loop
    v_status := integration.stage_ed_catalog_item(v_item, p_batch_id);
    v_processed := v_processed + 1;
    if v_status = 'NEW' then v_created := v_created + 1;
    elsif v_status = 'CHANGED' then v_changed := v_changed + 1;
    else v_unchanged := v_unchanged + 1;
    end if;
  end loop;

  update integration.import_batches
  set records_read = records_read + v_processed,
      records_new = records_new + v_created,
      records_changed = records_changed + v_changed,
      records_unchanged = records_unchanged + v_unchanged
  where id = p_batch_id and completed_at is null;

  return jsonb_build_object(
    'processed', v_processed, 'created', v_created, 'changed', v_changed,
    'unchanged', v_unchanged, 'missing', 0
  );
end;
$$;

create or replace function integration.apply_ed_batch(
  p_batch_id uuid,
  p_items jsonb,
  p_is_full boolean
) returns jsonb
language plpgsql
security definer
set search_path = public, catalog, commerce, integration, search, extensions, pg_temp
as $$
declare
  v_item jsonb;
  v_effective_item jsonb;
  v_compact_payload jsonb;
  v_status text;
  v_processed integer := 0;
  v_created integer := 0;
  v_changed integer := 0;
  v_unchanged integer := 0;
  v_missing integer := 0;
  v_supplier_id uuid;
  v_source_system_id uuid;
begin
  if jsonb_typeof(p_items) <> 'array' then raise exception 'p_items must be a JSON array'; end if;
  select id into strict v_supplier_id from commerce.suppliers where code = 'ED_SYSTEM';
  select id into strict v_source_system_id from integration.source_systems where code = 'ED_SYSTEM_SK';

  for v_item in select value from jsonb_array_elements(p_items)
  loop
    v_effective_item := v_item;
    if not p_is_full and not exists (
      select 1 from catalog.supplier_products
      where supplier_id = v_supplier_id and supplier_sku = nullif(v_item->>'code', '')
    ) then
      select catalog_payload into v_compact_payload
      from integration.ed_catalog_compact
      where source_system_id = v_source_system_id
        and supplier_sku = nullif(v_item->>'code', '')
        and offer_status = 'ACTIVE';

      if v_compact_payload is not null
         and coalesce((v_item->>'has_commercial_data')::boolean, false) then
        v_effective_item := v_compact_payload || v_item || jsonb_build_object('has_commercial_data', true);
        v_status := integration.apply_ed_offer_state(v_effective_item, p_batch_id, true);
      else
        v_status := 'MISSING';
      end if;
    else
      v_status := integration.apply_ed_offer_state(v_effective_item, p_batch_id, p_is_full);
    end if;

    v_processed := v_processed + 1;
    if v_status = 'NEW' then v_created := v_created + 1;
    elsif v_status = 'CHANGED' then v_changed := v_changed + 1;
    elsif v_status = 'UNCHANGED' then v_unchanged := v_unchanged + 1;
    elsif v_status = 'MISSING' then v_missing := v_missing + 1;
    end if;
  end loop;

  update integration.import_batches
  set records_read = records_read + v_processed,
      records_new = records_new + v_created,
      records_changed = records_changed + v_changed,
      records_unchanged = records_unchanged + v_unchanged,
      records_missing = records_missing + v_missing
  where id = p_batch_id and completed_at is null;

  return jsonb_build_object(
    'processed', v_processed, 'created', v_created, 'changed', v_changed,
    'unchanged', v_unchanged, 'missing', v_missing
  );
end;
$$;

create or replace function integration.complete_ed_import(p_batch_id uuid, p_metrics jsonb default '{}'::jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, catalog, commerce, integration, pg_temp
as $$
declare
  v_batch_type text;
  v_parameters jsonb;
  v_source_system_id uuid;
  v_supplier_id uuid;
  v_missing bigint := 0;
  v_compact_missing bigint := 0;
  v_result jsonb;
begin
  select batch_type, parameters_redacted, source_system_id
  into strict v_batch_type, v_parameters, v_source_system_id
  from integration.import_batches where id = p_batch_id and completed_at is null;
  select id into strict v_supplier_id from commerce.suppliers where code = 'ED_SYSTEM';

  if v_batch_type = 'FULL_CATALOG' and (v_parameters->>'limit') is null then
    update integration.ed_catalog_compact
    set missing_streak = missing_streak + 1,
        offer_status = case when missing_streak + 1 >= 2 then 'DISCONTINUED' else 'MISSING' end,
        updated_at = now()
    where source_system_id = v_source_system_id
      and last_seen_batch_id is distinct from p_batch_id;
    get diagnostics v_compact_missing = row_count;

    update catalog.supplier_products supplier_product
    set missing_streak = supplier_product.missing_streak + 1,
        offer_status = case when supplier_product.missing_streak + 1 >= 2 then 'DISCONTINUED' else 'MISSING' end,
        updated_at = now()
    where supplier_product.supplier_id = v_supplier_id
      and supplier_product.source_system_id = v_source_system_id
      and exists (
        select 1 from integration.ed_catalog_compact compact
        where compact.source_system_id = v_source_system_id
          and compact.supplier_sku = supplier_product.supplier_sku
          and compact.last_seen_batch_id is distinct from p_batch_id
      );
    get diagnostics v_missing = row_count;
  end if;

  update integration.import_batches
  set status = 'SUCCEEDED', completed_at = now(), records_missing = records_missing + v_missing,
      metrics = coalesce(metrics, '{}'::jsonb) || coalesce(p_metrics, '{}'::jsonb)
        || jsonb_build_object('compactMissing', v_compact_missing)
  where id = p_batch_id;

  delete from integration.import_leases where job_name = 'ED_CATALOG_SYNC' and batch_id = p_batch_id;

  select jsonb_build_object(
    'processed', records_read, 'created', records_new, 'changed', records_changed,
    'unchanged', records_unchanged, 'missing', records_missing
  ) into v_result from integration.import_batches where id = p_batch_id;
  return v_result;
end;
$$;

create or replace function public.stage_ed_catalog_batch(p_batch_id uuid, p_items jsonb)
returns jsonb
language sql
security definer
set search_path = public, integration, pg_temp
as $$ select integration.stage_ed_catalog_batch(p_batch_id, p_items); $$;

revoke all on function public.stage_ed_catalog_batch(uuid, jsonb) from public, anon, authenticated;
grant execute on function public.stage_ed_catalog_batch(uuid, jsonb) to service_role;

comment on table integration.ed_catalog_compact is
  'Compact source-of-truth staging for IT-scoped eD products. Rich normalized commerce rows are created only for sellable products.';
comment on function public.stage_ed_catalog_batch(uuid, jsonb) is
  'Service-role-only staging RPC for the filtered full eD catalogue.';
