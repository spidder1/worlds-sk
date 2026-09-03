do $$
declare
  v_definition text;
  v_updated_definition text;
  v_old_body text := E'  if v_existing_active_product or v_has_commercial_data then\n    perform integration.apply_ed_offer_state(p_item, p_batch_id, true);\n  end if;';
  v_new_body text := E'  if v_existing_active_product and not v_has_commercial_data then\n    perform integration.apply_ed_content_preserving_commerce(p_item, p_batch_id);\n  elsif v_has_commercial_data then\n    perform integration.apply_ed_offer_state(p_item, p_batch_id, true);\n  end if;';
begin
  select pg_get_functiondef(
    'integration.stage_ed_catalog_item(jsonb,uuid)'::regprocedure
  ) into strict v_definition;

  v_updated_definition := replace(v_definition, v_old_body, v_new_body);
  if v_updated_definition = v_definition then
    raise exception 'Expected stage_ed_catalog_item commerce branch was not found';
  end if;

  execute v_updated_definition;
end;
$$;

comment on function integration.stage_ed_catalog_item(jsonb, uuid) is
  'Stages every in-scope item, preserving price and inventory when a full catalog record has no commercial data.';
