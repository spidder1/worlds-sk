-- Durable, idempotent eD catalog import orchestration.
-- The public RPC surface is service-role only; browser roles cannot start or write imports.

create table if not exists integration.import_leases (
  job_name text primary key,
  batch_id uuid not null references integration.import_batches(id) on delete cascade,
  locked_until timestamptz not null,
  updated_at timestamptz not null default now()
);

alter table catalog.supplier_products
  add column if not exists price_hash char(64),
  add column if not exists inventory_hash char(64);

create index if not exists import_batches_active_idx
  on integration.import_batches (started_at desc)
  where completed_at is null and status in ('CREATED', 'FETCHING', 'LANDED', 'PARSING', 'VALIDATING', 'APPLYING');

create index if not exists supplier_products_sync_hashes_idx
  on catalog.supplier_products (supplier_id, price_hash, inventory_hash);

create or replace function integration.begin_ed_import(
  p_batch_type text,
  p_source_method text,
  p_parameters jsonb default '{}'::jsonb
) returns uuid
language plpgsql
security definer
set search_path = public, catalog, commerce, integration, search, extensions, pg_temp
as $$
declare
  v_batch_id uuid := gen_random_uuid();
  v_source_system_id uuid;
  v_locked integer;
begin
  if p_batch_type not in ('FULL_CATALOG', 'STOCK_PRICE') then
    raise exception 'Unsupported eD import batch type: %', p_batch_type;
  end if;

  select id into strict v_source_system_id
  from integration.source_systems
  where code = 'ED_SYSTEM_SK' and enabled = true;

  update integration.import_batches
  set status = 'FAILED',
      completed_at = now(),
      supplier_error_text = coalesce(supplier_error_text, 'Import lease expired before completion')
  where completed_at is null
    and status in ('CREATED', 'FETCHING', 'LANDED', 'PARSING', 'VALIDATING', 'APPLYING')
    and started_at < now() - interval '4 hours';

  delete from integration.import_leases where locked_until < now();

  insert into integration.import_batches (
    id, source_system_id, batch_type, source_method, parameters_redacted, status, started_at
  ) values (
    v_batch_id, v_source_system_id, p_batch_type, left(p_source_method, 200),
    coalesce(p_parameters, '{}'::jsonb), 'APPLYING', now()
  );

  insert into integration.import_leases (job_name, batch_id, locked_until, updated_at)
  values ('ED_CATALOG_SYNC', v_batch_id, now() + interval '20 minutes', now())
  on conflict (job_name) do update
    set batch_id = excluded.batch_id,
        locked_until = excluded.locked_until,
        updated_at = excluded.updated_at
    where integration.import_leases.locked_until < now();

  get diagnostics v_locked = row_count;
  if v_locked <> 1 then
    delete from integration.import_batches where id = v_batch_id;
    raise exception 'Another eD import is already running';
  end if;

  return v_batch_id;
end;
$$;

create or replace function integration.heartbeat_ed_import(p_batch_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public, integration, pg_temp
as $$
begin
  update integration.import_leases
  set locked_until = now() + interval '20 minutes', updated_at = now()
  where job_name = 'ED_CATALOG_SYNC' and batch_id = p_batch_id;
  if not found then
    raise exception 'Import lease is missing or belongs to another batch';
  end if;
  return true;
end;
$$;

create or replace function integration.apply_ed_offer_state(
  p_item jsonb,
  p_batch_id uuid,
  p_is_full boolean
) returns text
language plpgsql
security definer
set search_path = public, catalog, commerce, integration, search, extensions, pg_temp
as $$
declare
  v_supplier_id uuid;
  v_source_system_id uuid;
  v_price_list_id uuid;
  v_location_id uuid;
  v_supplier_product_id uuid;
  v_product_id uuid;
  v_existing_supplier_product_id uuid;
  v_old_content_hash text;
  v_old_price_hash text;
  v_old_inventory_hash text;
  v_code text := nullif(p_item->>'code', '');
  v_mpn text;
  v_ean text;
  v_image_url text;
  v_content_hash text := nullif(coalesce(p_item->>'content_hash', p_item->>'data_hash'), '');
  v_price_hash text := nullif(p_item->>'price_hash', '');
  v_inventory_hash text := nullif(p_item->>'inventory_hash', '');
  v_base_price numeric(19,4) := greatest(0, coalesce((p_item->>'base_price')::numeric, 0));
  v_final_price numeric(19,4) := greatest(0, coalesce((p_item->>'final_price')::numeric, 0));
  v_vat_rate numeric(7,4) := greatest(0, coalesce((p_item->>'vat_rate')::numeric, 20));
  v_stock_count numeric(18,4) := greatest(0, coalesce((p_item->>'stock_count')::numeric, 0));
  v_is_in_stock boolean := coalesce((p_item->>'is_in_stock')::boolean, false);
  v_previous_price_id uuid;
  v_previous_net numeric(19,4);
  v_previous_gross numeric(19,4);
  v_new_price_id uuid;
  v_new_price_from timestamptz;
  v_snapshot_id bigint;
  v_media_asset_id uuid;
  v_source_media_asset_id uuid;
  v_attr_code text;
  v_attr jsonb;
  v_attr_id uuid;
  v_attr_value_id uuid;
  v_attr_value text;
  v_attr_value_code text;
  v_numeric_text text;
begin
  if v_code is null then raise exception 'Missing product code'; end if;
  if not exists (
    select 1 from integration.import_leases
    where job_name = 'ED_CATALOG_SYNC' and batch_id = p_batch_id and locked_until >= now()
  ) then
    raise exception 'Import batch % does not own the active lease', p_batch_id;
  end if;

  select id into strict v_supplier_id from commerce.suppliers where code = 'ED_SYSTEM';
  select id into strict v_source_system_id from integration.source_systems where code = 'ED_SYSTEM_SK';
  select id into strict v_price_list_id from commerce.price_lists where code = 'RETAIL_B2C_SK';
  select id into strict v_location_id from commerce.inventory_locations where code = 'ED_CENTRAL';

  select sp.id, sp.content_hash, sp.price_hash, sp.inventory_hash
  into v_existing_supplier_product_id, v_old_content_hash, v_old_price_hash, v_old_inventory_hash
  from catalog.supplier_products sp
  where sp.supplier_id = v_supplier_id and sp.supplier_sku = v_code;

  if p_is_full then
    perform integration.ingest_canonical_product(p_item);
  elsif v_existing_supplier_product_id is null then
    return 'MISSING';
  end if;

  select sp.id, link.product_id
  into strict v_supplier_product_id, v_product_id
  from catalog.supplier_products sp
  join catalog.product_supplier_links link on link.supplier_product_id = sp.id
  where sp.supplier_id = v_supplier_id and sp.supplier_sku = v_code
  order by link.linked_at desc
  limit 1;

  update catalog.supplier_products
  set external_product_id = coalesce(nullif(p_item->>'pro_id', ''), external_product_id),
      mpn = coalesce(nullif(p_item->>'mpn', ''), mpn),
      mpn2 = coalesce(nullif(p_item->>'mpn2', ''), mpn2),
      order_multiple = coalesce((p_item->>'order_multiple')::numeric, order_multiple, 1),
      b2c_eligible = coalesce((p_item->>'b2c_eligible')::boolean, b2c_eligible, true),
      is_premium = coalesce((p_item->>'is_premium')::boolean, is_premium, false),
      offer_status = 'ACTIVE',
      missing_streak = 0,
      first_seen_at = coalesce(first_seen_at, now()),
      first_seen_batch_id = coalesce(first_seen_batch_id, p_batch_id),
      last_seen_at = now(),
      last_seen_batch_id = p_batch_id,
      identity_hash = coalesce(nullif(p_item->>'identity_hash', ''), identity_hash),
      content_hash = coalesce(v_content_hash, content_hash),
      price_hash = coalesce(v_price_hash, price_hash),
      inventory_hash = coalesce(v_inventory_hash, inventory_hash),
      img_count = coalesce(jsonb_array_length(coalesce(p_item->'images', '[]'::jsonb)), img_count, 0),
      raw_extra = coalesce(raw_extra, '{}'::jsonb) || coalesce(p_item->'raw_extra', '{}'::jsonb),
      updated_at = now()
  where id = v_supplier_product_id;

  if p_is_full then
    v_mpn := nullif(p_item->>'mpn', '');
    v_ean := nullif(p_item->>'ean', '');
    if v_mpn is not null then
      insert into catalog.supplier_product_identifiers (
        supplier_product_id, identifier_type, raw_value, normalized_value,
        validation_status, first_seen_batch_id, last_seen_batch_id
      ) values (
        v_supplier_product_id, 'MPN', v_mpn, lower(regexp_replace(v_mpn, '[^a-zA-Z0-9]', '', 'g')),
        'VALID', p_batch_id, p_batch_id
      )
      on conflict (supplier_product_id, identifier_type, raw_value) do update
      set normalized_value = excluded.normalized_value,
          validation_status = excluded.validation_status,
          last_seen_batch_id = excluded.last_seen_batch_id;
    end if;
    if v_ean is not null then
      insert into catalog.product_identifiers (
        product_id, identifier_type, value, normalized_value, is_primary, validation_status
      ) values (
        v_product_id, 'GTIN', v_ean, regexp_replace(v_ean, '[^0-9]', '', 'g'), true, 'VALID'
      ) on conflict (product_id, identifier_type, normalized_value) do nothing;

      insert into catalog.supplier_product_identifiers (
        supplier_product_id, identifier_type, raw_value, normalized_value,
        validation_status, first_seen_batch_id, last_seen_batch_id
      ) values (
        v_supplier_product_id, 'GTIN', v_ean, regexp_replace(v_ean, '[^0-9]', '', 'g'),
        'VALID', p_batch_id, p_batch_id
      )
      on conflict (supplier_product_id, identifier_type, raw_value) do update
      set normalized_value = excluded.normalized_value,
          validation_status = excluded.validation_status,
          last_seen_batch_id = excluded.last_seen_batch_id;
    end if;

    delete from catalog.product_warranties
    where supplier_product_id = v_supplier_product_id and warranty_type = 'STANDARD';
    insert into catalog.product_warranties (
      product_id, supplier_product_id, warranty_type, term, unit, raw_text, provenance
    ) values (
      v_product_id, v_supplier_product_id, 'STANDARD',
      greatest(0, coalesce((p_item->>'warranty_months')::numeric, 24)), 'M',
      greatest(0, coalesce((p_item->>'warranty_months')::numeric, 24)) || ' M', 'SUPPLIER'
    );

    v_image_url := nullif(p_item->'images'->0->>'url', '');
    if v_image_url is not null and v_image_url ~* '^https?://' then
      insert into catalog.media_assets (object_key, sha256, media_type, byte_size, retrieval_status)
      values (
        v_image_url,
        encode(extensions.digest(convert_to(v_image_url, 'UTF8'), 'sha256'), 'hex'),
        'image/jpeg', 0, 'READY'
      )
      on conflict (object_key) do update set retrieval_status = 'READY'
      returning id into v_media_asset_id;

      insert into catalog.source_media_assets (
        source_system_id, source_url, media_asset_id, source_kind, source_hash,
        first_seen_batch_id, last_seen_batch_id
      ) values (
        v_source_system_id, v_image_url, v_media_asset_id, 'PRODUCT',
        encode(extensions.digest(convert_to(v_image_url, 'UTF8'), 'sha256'), 'hex'),
        p_batch_id, p_batch_id
      )
      on conflict (source_system_id, source_url) do update
      set media_asset_id = excluded.media_asset_id,
          source_hash = excluded.source_hash,
          last_seen_batch_id = excluded.last_seen_batch_id
      returning id into v_source_media_asset_id;

      insert into catalog.supplier_product_media (
        supplier_product_id, source_media_asset_id, source_position, source_provenance, source_batch_id
      ) values (
        v_supplier_product_id, v_source_media_asset_id, 0, 'DIRECT_PRODUCT', p_batch_id
      )
      on conflict (supplier_product_id, source_media_asset_id) do update
      set source_position = excluded.source_position,
          source_provenance = excluded.source_provenance,
          source_batch_id = excluded.source_batch_id;

      update catalog.product_media
      set approved = false
      where product_id = v_product_id and locale = 'sk-SK' and role = 'PRIMARY' and media_asset_id <> v_media_asset_id;
      insert into catalog.product_media (
        product_id, media_asset_id, locale, role, position, alt_text, provenance, approved
      ) values (
        v_product_id, v_media_asset_id, 'sk-SK', 'PRIMARY', 0,
        nullif(p_item->>'title', ''), 'SUPPLIER', true
      )
      on conflict (product_id, media_asset_id, locale, role) do update
      set position = excluded.position, alt_text = excluded.alt_text, approved = true;
    end if;

    for v_attr_code, v_attr in
      select key, val from jsonb_each(coalesce(p_item->'attributes', '{}'::jsonb)) as attrs(key, val)
    loop
      v_attr_code := left(lower(regexp_replace(v_attr_code, '[^a-zA-Z0-9_]+', '_', 'g')), 100);
      v_attr_value := nullif(coalesce(v_attr->>'value', v_attr->>'rawValue'), '');
      if v_attr_code = '' or v_attr_value is null then continue; end if;
      v_numeric_text := nullif(v_attr->>'numericValue', '');
      insert into catalog.attributes (source_system_id, external_code, code, name, data_type, unit_code, allows_multiple, active)
      values (
        v_source_system_id, v_attr_code, v_attr_code,
        coalesce(nullif(v_attr->>'name', ''), v_attr_code),
        case when v_numeric_text ~ '^-?[0-9]+([.][0-9]+)?$' then 'DECIMAL' else 'TEXT' end,
        nullif(v_attr->>'unit', ''), false, true
      )
      on conflict (code) do update
      set name = excluded.name,
          unit_code = coalesce(excluded.unit_code, catalog.attributes.unit_code),
          active = true
      returning id into v_attr_id;

      v_attr_value_code := left(lower(regexp_replace(v_attr_value, '[^a-zA-Z0-9]+', '_', 'g')), 120);
      if v_attr_value_code = '' then
        v_attr_value_code := left(encode(extensions.digest(convert_to(v_attr_value, 'UTF8'), 'sha256'), 'hex'), 32);
      end if;
      insert into catalog.attribute_values (
        attribute_id, external_value_code, canonical_value, normalized_value, active
      ) values (
        v_attr_id, v_attr_value_code, v_attr_value, lower(v_attr_value), true
      )
      on conflict (attribute_id, external_value_code) do update
      set canonical_value = excluded.canonical_value,
          normalized_value = excluded.normalized_value,
          active = true
      returning id into v_attr_value_id;

      delete from catalog.supplier_product_attribute_values
      where supplier_product_id = v_supplier_product_id and attribute_id = v_attr_id;
      insert into catalog.supplier_product_attribute_values (
        supplier_product_id, attribute_id, attribute_value_id, source_batch_id
      ) values (v_supplier_product_id, v_attr_id, v_attr_value_id, p_batch_id);

      delete from catalog.product_attribute_values
      where product_id = v_product_id and attribute_id = v_attr_id and source_supplier_product_id = v_supplier_product_id;
      if v_numeric_text ~ '^-?[0-9]+([.][0-9]+)?$' then
        insert into catalog.product_attribute_values (
          product_id, attribute_id, value_decimal, unit_code, provenance, approval_status,
          source_supplier_product_id, confidence
        ) values (
          v_product_id, v_attr_id, v_numeric_text::numeric, nullif(v_attr->>'unit', ''),
          'RULE', 'APPROVED', v_supplier_product_id, 1
        );
      else
        insert into catalog.product_attribute_values (
          product_id, attribute_id, attribute_value_id, unit_code, provenance, approval_status,
          source_supplier_product_id, confidence
        ) values (
          v_product_id, v_attr_id, v_attr_value_id, nullif(v_attr->>'unit', ''),
          'RULE', 'APPROVED', v_supplier_product_id, 1
        );
      end if;
    end loop;
  end if;

  select id, net_amount, gross_amount
  into v_previous_price_id, v_previous_net, v_previous_gross
  from commerce.product_prices
  where product_id = v_product_id and price_list_id = v_price_list_id and valid_to is null
  order by valid_from desc, created_at desc
  limit 1;

  if p_is_full then
    select id, valid_from into v_new_price_id, v_new_price_from
    from commerce.product_prices
    where product_id = v_product_id and price_list_id = v_price_list_id and valid_to is null
    order by valid_from desc, created_at desc
    limit 1;
    select id, net_amount, gross_amount
    into v_previous_price_id, v_previous_net, v_previous_gross
    from commerce.product_prices
    where product_id = v_product_id and price_list_id = v_price_list_id and valid_to is null and id <> v_new_price_id
    order by valid_from desc, created_at desc
    limit 1;
    if v_previous_price_id is not null and v_previous_net = v_base_price and v_previous_gross = v_final_price then
      delete from commerce.product_prices where id = v_new_price_id;
    elsif v_previous_price_id is not null then
      update commerce.product_prices
      set valid_to = v_new_price_from
      where product_id = v_product_id and price_list_id = v_price_list_id
        and valid_to is null and id <> v_new_price_id;
    end if;
  elsif v_previous_price_id is null then
    insert into commerce.product_prices (
      product_id, price_list_id, net_amount, gross_amount, tax_rate_percent,
      source_supplier_product_id, valid_from, calculation_trace
    ) values (
      v_product_id, v_price_list_id, v_base_price, v_final_price, v_vat_rate,
      v_supplier_product_id, now(), jsonb_build_object('source', 'ED_STOCK_PRICE', 'batchId', p_batch_id)
    );
  elsif v_previous_net is distinct from v_base_price or v_previous_gross is distinct from v_final_price then
    update commerce.product_prices set valid_to = now() where id = v_previous_price_id;
    insert into commerce.product_prices (
      product_id, price_list_id, net_amount, gross_amount, tax_rate_percent,
      source_supplier_product_id, valid_from, calculation_trace
    ) values (
      v_product_id, v_price_list_id, v_base_price, v_final_price, v_vat_rate,
      v_supplier_product_id, now(), jsonb_build_object('source', 'ED_STOCK_PRICE', 'batchId', p_batch_id)
    );
  end if;

  if p_is_full or v_old_price_hash is distinct from v_price_hash then
    insert into commerce.supplier_price_snapshots (
      supplier_product_id, batch_id, observed_at, currency_code,
      net_cost_excluding_fees, net_cost_including_fees, dealer_price, dealer_price_1,
      recommended_retail_price, source_vat_percent, price_hash
    ) values (
      v_supplier_product_id, p_batch_id, now(), 'EUR',
      greatest(0, coalesce((p_item->>'supplier_cost')::numeric, 0)),
      greatest(0, coalesce((p_item->>'total_cost_with_fees')::numeric, 0)),
      greatest(0, coalesce((p_item->>'dealer_price')::numeric, 0)),
      greatest(0, coalesce((p_item->>'dealer_price_1')::numeric, 0)),
      greatest(0, coalesce((p_item->>'recommended_retail_price')::numeric, 0)),
      v_vat_rate, coalesce(v_price_hash, repeat('0', 64))
    )
    on conflict (supplier_product_id, batch_id) do update
    set observed_at = excluded.observed_at,
        net_cost_excluding_fees = excluded.net_cost_excluding_fees,
        net_cost_including_fees = excluded.net_cost_including_fees,
        dealer_price = excluded.dealer_price,
        dealer_price_1 = excluded.dealer_price_1,
        recommended_retail_price = excluded.recommended_retail_price,
        source_vat_percent = excluded.source_vat_percent,
        price_hash = excluded.price_hash
    returning id into v_snapshot_id;

    insert into commerce.supplier_price_fees (supplier_price_snapshot_id, fee_type, amount, currency_code)
    values
      (v_snapshot_id, 'GARBAGE', greatest(0, coalesce((p_item->>'garbage_fee')::numeric, 0)), 'EUR'),
      (v_snapshot_id, 'AUTHOR', greatest(0, coalesce((p_item->>'author_fee')::numeric, 0)), 'EUR')
    on conflict (supplier_price_snapshot_id, fee_type) do update set amount = excluded.amount;
  end if;

  insert into commerce.supplier_inventory_current (
    supplier_product_id, inventory_location_id, available_quantity, is_central_in_stock,
    source_status_text, expected_at, raw_expected_date, availability_date_known,
    observed_at, batch_id, inventory_hash
  ) values (
    v_supplier_product_id, v_location_id, v_stock_count, v_is_in_stock,
    nullif(p_item->>'stock_text', ''),
    case when coalesce(p_item->>'expected_at', '') ~ '^\d{4}-\d{2}-\d{2}' then (p_item->>'expected_at')::timestamptz else null end,
    nullif(p_item->>'expected_at', ''), coalesce(p_item->>'expected_at', '') ~ '^\d{4}-\d{2}-\d{2}',
    now(), p_batch_id, coalesce(v_inventory_hash, repeat('0', 64))
  )
  on conflict (supplier_product_id, inventory_location_id) do update
  set available_quantity = excluded.available_quantity,
      is_central_in_stock = excluded.is_central_in_stock,
      source_status_text = excluded.source_status_text,
      expected_at = excluded.expected_at,
      raw_expected_date = excluded.raw_expected_date,
      availability_date_known = excluded.availability_date_known,
      observed_at = excluded.observed_at,
      batch_id = excluded.batch_id,
      inventory_hash = excluded.inventory_hash;

  if p_is_full or v_old_inventory_hash is distinct from v_inventory_hash then
    insert into commerce.supplier_inventory_snapshots (
      supplier_product_id, inventory_location_id, available_quantity, is_central_in_stock,
      source_status_text, expected_at, raw_expected_date, observed_at, batch_id, inventory_hash
    ) values (
      v_supplier_product_id, v_location_id, v_stock_count, v_is_in_stock,
      nullif(p_item->>'stock_text', ''),
      case when coalesce(p_item->>'expected_at', '') ~ '^\d{4}-\d{2}-\d{2}' then (p_item->>'expected_at')::timestamptz else null end,
      nullif(p_item->>'expected_at', ''), now(), p_batch_id, coalesce(v_inventory_hash, repeat('0', 64))
    ) on conflict (supplier_product_id, inventory_location_id, batch_id) do nothing;
  end if;

  insert into commerce.sellable_inventory (product_id, supplier_product_id, sellable_quantity, safety_stock, calculated_at)
  values (v_product_id, v_supplier_product_id, v_stock_count, 0, now())
  on conflict (product_id, supplier_product_id) do update
  set sellable_quantity = excluded.sellable_quantity, calculated_at = excluded.calculated_at;

  update search.search_documents
  set price_amount = v_final_price,
      sellable_quantity = v_stock_count,
      availability_status = case when v_is_in_stock then 'IN_STOCK' else 'OUT_OF_STOCK' end,
      updated_at = now()
  where product_id = v_product_id and locale = 'sk-SK';

  if v_existing_supplier_product_id is null then return 'NEW'; end if;
  if v_old_content_hash is distinct from v_content_hash
     or v_old_price_hash is distinct from v_price_hash
     or v_old_inventory_hash is distinct from v_inventory_hash then
    return 'CHANGED';
  end if;
  return 'UNCHANGED';
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
  v_status text;
  v_processed integer := 0;
  v_created integer := 0;
  v_changed integer := 0;
  v_unchanged integer := 0;
  v_missing integer := 0;
begin
  if jsonb_typeof(p_items) <> 'array' then raise exception 'p_items must be a JSON array'; end if;
  for v_item in select value from jsonb_array_elements(p_items)
  loop
    v_status := integration.apply_ed_offer_state(v_item, p_batch_id, p_is_full);
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
  v_result jsonb;
begin
  select batch_type, parameters_redacted, source_system_id
  into strict v_batch_type, v_parameters, v_source_system_id
  from integration.import_batches where id = p_batch_id and completed_at is null;
  select id into strict v_supplier_id from commerce.suppliers where code = 'ED_SYSTEM';

  if v_batch_type = 'FULL_CATALOG' and (v_parameters->>'limit') is null then
    update catalog.supplier_products
    set missing_streak = missing_streak + 1,
        offer_status = case when missing_streak + 1 >= 2 then 'DISCONTINUED' else 'MISSING' end,
        updated_at = now()
    where supplier_id = v_supplier_id
      and source_system_id = v_source_system_id
      and last_seen_batch_id is distinct from p_batch_id;
    get diagnostics v_missing = row_count;
  end if;

  update integration.import_batches
  set status = 'SUCCEEDED', completed_at = now(), records_missing = records_missing + v_missing,
      metrics = coalesce(metrics, '{}'::jsonb) || coalesce(p_metrics, '{}'::jsonb)
  where id = p_batch_id;

  delete from integration.import_leases where job_name = 'ED_CATALOG_SYNC' and batch_id = p_batch_id;

  select jsonb_build_object(
    'processed', records_read, 'created', records_new, 'changed', records_changed,
    'unchanged', records_unchanged, 'missing', records_missing
  ) into v_result from integration.import_batches where id = p_batch_id;
  return v_result;
end;
$$;

create or replace function integration.fail_ed_import(p_batch_id uuid, p_error text)
returns boolean
language plpgsql
security definer
set search_path = public, integration, pg_temp
as $$
begin
  update integration.import_batches
  set status = 'FAILED', completed_at = now(), supplier_error_text = left(p_error, 4000)
  where id = p_batch_id and completed_at is null;
  delete from integration.import_leases where job_name = 'ED_CATALOG_SYNC' and batch_id = p_batch_id;
  return true;
end;
$$;

create or replace function public.begin_ed_import(
  p_batch_type text,
  p_source_method text,
  p_parameters jsonb default '{}'::jsonb
) returns uuid
language sql
security definer
set search_path = public, integration, pg_temp
as $$ select integration.begin_ed_import(p_batch_type, p_source_method, p_parameters); $$;

create or replace function public.heartbeat_ed_import(p_batch_id uuid)
returns boolean
language sql
security definer
set search_path = public, integration, pg_temp
as $$ select integration.heartbeat_ed_import(p_batch_id); $$;

create or replace function public.ingest_ed_catalog_batch(p_batch_id uuid, p_items jsonb)
returns jsonb
language sql
security definer
set search_path = public, integration, pg_temp
as $$ select integration.apply_ed_batch(p_batch_id, p_items, true); $$;

create or replace function public.sync_ed_stock_price_batch(p_batch_id uuid, p_items jsonb)
returns jsonb
language sql
security definer
set search_path = public, integration, pg_temp
as $$ select integration.apply_ed_batch(p_batch_id, p_items, false); $$;

create or replace function public.complete_ed_import(p_batch_id uuid, p_metrics jsonb default '{}'::jsonb)
returns jsonb
language sql
security definer
set search_path = public, integration, pg_temp
as $$ select integration.complete_ed_import(p_batch_id, p_metrics); $$;

create or replace function public.fail_ed_import(p_batch_id uuid, p_error text)
returns boolean
language sql
security definer
set search_path = public, integration, pg_temp
as $$ select integration.fail_ed_import(p_batch_id, p_error); $$;

revoke all on integration.import_leases from public, anon, authenticated;
revoke all on function public.begin_ed_import(text, text, jsonb) from public, anon, authenticated;
revoke all on function public.heartbeat_ed_import(uuid) from public, anon, authenticated;
revoke all on function public.ingest_ed_catalog_batch(uuid, jsonb) from public, anon, authenticated;
revoke all on function public.sync_ed_stock_price_batch(uuid, jsonb) from public, anon, authenticated;
revoke all on function public.complete_ed_import(uuid, jsonb) from public, anon, authenticated;
revoke all on function public.fail_ed_import(uuid, text) from public, anon, authenticated;

grant execute on function public.begin_ed_import(text, text, jsonb) to service_role;
grant execute on function public.heartbeat_ed_import(uuid) to service_role;
grant execute on function public.ingest_ed_catalog_batch(uuid, jsonb) to service_role;
grant execute on function public.sync_ed_stock_price_batch(uuid, jsonb) to service_role;
grant execute on function public.complete_ed_import(uuid, jsonb) to service_role;
grant execute on function public.fail_ed_import(uuid, text) to service_role;

comment on table integration.import_leases is 'Single-writer lease preventing concurrent full and stock/price eD imports.';
comment on function public.ingest_ed_catalog_batch(uuid, jsonb) is 'Service-role-only idempotent full catalog ingestion RPC.';
comment on function public.sync_ed_stock_price_batch(uuid, jsonb) is 'Service-role-only stock/price delta synchronization RPC.';
