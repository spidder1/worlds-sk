update catalog.product_identifiers
set validation_status = 'INVALID'
where identifier_type = 'GTIN'
  and validation_status = 'VALID'
  and normalized_value !~ '^[0-9]{8,14}$';

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
  v_ean text;
  v_normalized_ean text;
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
    v_effective_item := v_item;
    if p_is_full then
      v_ean := nullif(v_item->>'ean', '');
      v_normalized_ean := regexp_replace(coalesce(v_ean, ''), '[^0-9]', '', 'g');
      if v_ean is not null and v_normalized_ean !~ '^[0-9]{8,14}$' then
        v_effective_item := (v_item - 'ean') || jsonb_build_object(
          'raw_extra', coalesce(v_item->'raw_extra', '{}'::jsonb)
            || jsonb_build_object('invalidEan', v_ean)
        );
      elsif v_normalized_ean <> '' and exists (
        select 1
        from catalog.product_identifiers identifier
        join catalog.products product on product.id = identifier.product_id
        where identifier.identifier_type = 'GTIN'
          and identifier.validation_status = 'VALID'
          and identifier.normalized_value = v_normalized_ean
          and product.canonical_sku <> v_item->>'code'
      ) then
        v_effective_item := (v_item - 'ean') || jsonb_build_object(
          'raw_extra', coalesce(v_item->'raw_extra', '{}'::jsonb)
            || jsonb_build_object('conflictingEan', v_ean)
        );
      end if;
    end if;

    if p_is_full and not coalesce((v_effective_item->>'has_commercial_data')::boolean, false) then
      v_status := integration.apply_ed_content_preserving_commerce(v_effective_item, p_batch_id);
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
