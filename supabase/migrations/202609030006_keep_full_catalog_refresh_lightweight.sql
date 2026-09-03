-- The full eD feed is the source for catalogue content and the compact public
-- projection. Rewriting every normalized price, inventory, warranty and media
-- history row on that job makes a 62k-product refresh exceed the workflow
-- window. Commercial normalization remains owned by the frequent stock/price
-- feed, which merges this compact payload before creating new sellable offers.

do $migration$
declare
  v_definition text;
  v_replaced boolean := false;
begin
  select pg_get_functiondef('integration.stage_ed_catalog_item(jsonb,uuid)'::regprocedure)
  into v_definition;

  if position('if v_existing_active_product and not v_has_commercial_data then' in v_definition) > 0 then
    v_definition := replace(
      v_definition,
      $old$if v_existing_active_product and not v_has_commercial_data then
    perform integration.apply_ed_content_preserving_commerce(p_item, p_batch_id);
  elsif v_has_commercial_data then
    perform integration.apply_ed_offer_state(p_item, p_batch_id, true);
  end if;$old$,
      $new$if false then
    perform integration.apply_ed_offer_state(p_item, p_batch_id, true);
  end if;$new$
    );
    v_replaced := true;
  elsif position('if v_existing_active_product or v_has_commercial_data then' in v_definition) > 0 then
    v_definition := replace(
      v_definition,
      'if v_existing_active_product or v_has_commercial_data then',
      'if false then'
    );
    v_replaced := true;
  elsif position('if v_existing_supplier_product or v_has_commercial_data then' in v_definition) > 0 then
    v_definition := replace(
      v_definition,
      'if v_existing_supplier_product or v_has_commercial_data then',
      'if false then'
    );
    v_replaced := true;
  end if;

  if not v_replaced then
    raise exception 'Unexpected integration.stage_ed_catalog_item definition';
  end if;

  execute v_definition;
end;
$migration$;

comment on function integration.stage_ed_catalog_item(jsonb, uuid) is
  'Stages filtered full-feed content without rewriting commercial history; stock/price sync materializes sellable offers.';
