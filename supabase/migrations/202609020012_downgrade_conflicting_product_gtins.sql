create or replace function catalog.guard_unique_valid_gtin()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, catalog
as $$
begin
  if new.identifier_type = 'GTIN'
     and new.validation_status = 'VALID'
     and coalesce(new.normalized_value, '') <> '' then
    -- Serialize decisions for the same GTIN so concurrent imports cannot race
    -- past the partial unique index.
    perform pg_advisory_xact_lock(hashtextextended(new.normalized_value, 0));

    if exists (
      select 1
      from catalog.product_identifiers identifier
      where identifier.identifier_type = 'GTIN'
        and identifier.validation_status = 'VALID'
        and identifier.normalized_value = new.normalized_value
        and identifier.product_id <> new.product_id
    ) then
      new.validation_status := 'INVALID';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists product_identifiers_guard_unique_valid_gtin
  on catalog.product_identifiers;

create trigger product_identifiers_guard_unique_valid_gtin
before insert or update of product_id, identifier_type, normalized_value, validation_status
on catalog.product_identifiers
for each row
execute function catalog.guard_unique_valid_gtin();

comment on function catalog.guard_unique_valid_gtin() is
  'Preserves conflicting supplier GTINs as INVALID instead of aborting an otherwise valid import batch.';
