-- A full catalogue file may intentionally omit customer-specific price data.
-- Import all descriptive data without replacing the last known commercial state with zeroes.

create or replace function integration.apply_ed_content_preserving_commerce(
  p_item jsonb,
  p_batch_id uuid
) returns text
language plpgsql
security definer
set search_path = public, catalog, commerce, integration, search, extensions, pg_temp
as $$
declare
  v_supplier_id uuid;
  v_price_list_id uuid;
  v_location_id uuid;
  v_supplier_product_id uuid;
  v_product_id uuid;
  v_was_existing boolean := false;
  v_old_content_hash text;
  v_old_price_hash text;
  v_old_inventory_hash text;
  v_old_offer_status text;
  v_old_lifecycle_status text;
  v_old_current_price_id uuid;
  v_old_price_ids uuid[];
  v_old_sellable_quantity numeric;
  v_old_safety_stock numeric;
  v_had_sellable boolean := false;
  v_old_inventory commerce.supplier_inventory_current%rowtype;
  v_had_inventory boolean := false;
  v_old_search_price numeric;
  v_old_search_quantity numeric;
  v_old_search_status text;
  v_had_search boolean := false;
  v_new_content_hash text := nullif(coalesce(p_item->>'content_hash', p_item->>'data_hash'), '');
begin
  select id into strict v_supplier_id from commerce.suppliers where code = 'ED_SYSTEM';
  select id into strict v_price_list_id from commerce.price_lists where code = 'RETAIL_B2C_SK';
  select id into strict v_location_id from commerce.inventory_locations where code = 'ED_CENTRAL';

  select sp.id, link.product_id, sp.content_hash, sp.price_hash, sp.inventory_hash,
         sp.offer_status, product.lifecycle_status
  into v_supplier_product_id, v_product_id, v_old_content_hash, v_old_price_hash,
       v_old_inventory_hash, v_old_offer_status, v_old_lifecycle_status
  from catalog.supplier_products sp
  join catalog.product_supplier_links link on link.supplier_product_id = sp.id
  join catalog.products product on product.id = link.product_id
  where sp.supplier_id = v_supplier_id and sp.supplier_sku = p_item->>'code'
  order by link.linked_at desc
  limit 1;
  v_was_existing := found;

  if v_was_existing then
    select array_agg(id),
           (array_agg(id order by valid_from desc, created_at desc) filter (where valid_to is null))[1]
    into v_old_price_ids, v_old_current_price_id
    from commerce.product_prices
    where product_id = v_product_id and price_list_id = v_price_list_id;

    select sellable_quantity, safety_stock
    into v_old_sellable_quantity, v_old_safety_stock
    from commerce.sellable_inventory
    where product_id = v_product_id and supplier_product_id = v_supplier_product_id;
    v_had_sellable := found;

    select * into v_old_inventory
    from commerce.supplier_inventory_current
    where supplier_product_id = v_supplier_product_id and inventory_location_id = v_location_id;
    v_had_inventory := found;

    select price_amount, sellable_quantity, availability_status
    into v_old_search_price, v_old_search_quantity, v_old_search_status
    from search.search_documents where product_id = v_product_id and locale = 'sk-SK';
    v_had_search := found;
  end if;

  perform integration.apply_ed_offer_state(p_item, p_batch_id, true);

  select sp.id, link.product_id
  into strict v_supplier_product_id, v_product_id
  from catalog.supplier_products sp
  join catalog.product_supplier_links link on link.supplier_product_id = sp.id
  where sp.supplier_id = v_supplier_id and sp.supplier_sku = p_item->>'code'
  order by link.linked_at desc
  limit 1;

  delete from commerce.supplier_price_snapshots
  where supplier_product_id = v_supplier_product_id and batch_id = p_batch_id;
  delete from commerce.supplier_inventory_snapshots
  where supplier_product_id = v_supplier_product_id and batch_id = p_batch_id;

  if v_old_price_ids is null then
    delete from commerce.product_prices
    where product_id = v_product_id and price_list_id = v_price_list_id;
  else
    delete from commerce.product_prices
    where product_id = v_product_id and price_list_id = v_price_list_id
      and not (id = any(v_old_price_ids));
    if v_old_current_price_id is not null then
      update commerce.product_prices set valid_to = null where id = v_old_current_price_id;
    end if;
  end if;

  if v_had_inventory then
    insert into commerce.supplier_inventory_current (
      supplier_product_id, inventory_location_id, available_quantity, is_central_in_stock,
      source_status_text, expected_at, raw_expected_date, availability_date_known,
      observed_at, batch_id, inventory_hash
    ) values (
      v_old_inventory.supplier_product_id, v_old_inventory.inventory_location_id,
      v_old_inventory.available_quantity, v_old_inventory.is_central_in_stock,
      v_old_inventory.source_status_text, v_old_inventory.expected_at,
      v_old_inventory.raw_expected_date, v_old_inventory.availability_date_known,
      v_old_inventory.observed_at, v_old_inventory.batch_id, v_old_inventory.inventory_hash
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
  else
    delete from commerce.supplier_inventory_current
    where supplier_product_id = v_supplier_product_id and inventory_location_id = v_location_id;
  end if;

  if v_had_sellable then
    insert into commerce.sellable_inventory (
      product_id, supplier_product_id, sellable_quantity, safety_stock, calculated_at
    ) values (
      v_product_id, v_supplier_product_id, v_old_sellable_quantity, v_old_safety_stock, now()
    )
    on conflict (product_id, supplier_product_id) do update
    set sellable_quantity = excluded.sellable_quantity,
        safety_stock = excluded.safety_stock,
        calculated_at = excluded.calculated_at;
  else
    delete from commerce.sellable_inventory
    where product_id = v_product_id and supplier_product_id = v_supplier_product_id;
  end if;

  update catalog.supplier_products
  set offer_status = case when v_was_existing then v_old_offer_status else 'DISABLED' end,
      price_hash = v_old_price_hash,
      inventory_hash = v_old_inventory_hash,
      updated_at = now()
  where id = v_supplier_product_id;
  update catalog.products
  set lifecycle_status = case when v_was_existing then v_old_lifecycle_status else 'DRAFT' end,
      updated_at = now()
  where id = v_product_id;

  if v_had_search then
    update search.search_documents
    set price_amount = v_old_search_price,
        sellable_quantity = v_old_search_quantity,
        availability_status = v_old_search_status,
        updated_at = now()
    where product_id = v_product_id and locale = 'sk-SK';
  else
    update search.search_documents
    set price_amount = null,
        sellable_quantity = 0,
        availability_status = 'OUT_OF_STOCK',
        updated_at = now()
    where product_id = v_product_id and locale = 'sk-SK';
  end if;

  if not v_was_existing then return 'NEW'; end if;
  if v_old_content_hash is distinct from v_new_content_hash then return 'CHANGED'; end if;
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
    if p_is_full and not coalesce((v_item->>'has_commercial_data')::boolean, false) then
      v_status := integration.apply_ed_content_preserving_commerce(v_item, p_batch_id);
    else
      v_status := integration.apply_ed_offer_state(v_item, p_batch_id, p_is_full);
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
