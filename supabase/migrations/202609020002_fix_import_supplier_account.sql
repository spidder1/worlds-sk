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
  v_supplier_account_id uuid;
  v_locked integer;
begin
  if p_batch_type not in ('FULL_CATALOG', 'STOCK_PRICE') then
    raise exception 'Unsupported eD import batch type: %', p_batch_type;
  end if;

  select id into strict v_source_system_id
  from integration.source_systems
  where code = 'ED_SYSTEM_SK' and enabled = true;

  select id into strict v_supplier_account_id
  from integration.supplier_accounts
  where source_system_id = v_source_system_id and enabled = true
  order by case when mode = 'PRODUCTION' then 0 else 1 end, created_at
  limit 1;

  update integration.import_batches
  set status = 'FAILED',
      completed_at = now(),
      supplier_error_text = coalesce(supplier_error_text, 'Import lease expired before completion')
  where completed_at is null
    and status in ('CREATED', 'FETCHING', 'LANDED', 'PARSING', 'VALIDATING', 'APPLYING')
    and started_at < now() - interval '4 hours';

  delete from integration.import_leases where locked_until < now();

  insert into integration.import_batches (
    id, source_system_id, supplier_account_id, batch_type, source_method,
    parameters_redacted, status, started_at
  ) values (
    v_batch_id, v_source_system_id, v_supplier_account_id, p_batch_type,
    left(p_source_method, 200), coalesce(p_parameters, '{}'::jsonb), 'APPLYING', now()
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
