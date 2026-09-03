-- Preserve an already published canonical slug during supplier reimports.
-- Redirect/slug changes remain an explicit application concern.
create or replace function catalog.skip_duplicate_current_entity_slug()
returns trigger
language plpgsql
set search_path = catalog, pg_temp
as $$
begin
  if new.is_current and exists (
    select 1 from catalog.slugs existing
    where existing.entity_type = new.entity_type
      and existing.entity_id = new.entity_id
      and existing.locale = new.locale
      and existing.is_current
  ) then
    return null;
  end if;
  return new;
end;
$$;

drop trigger if exists slugs_preserve_current_entity on catalog.slugs;
create trigger slugs_preserve_current_entity
before insert on catalog.slugs
for each row execute function catalog.skip_duplicate_current_entity_slug();
