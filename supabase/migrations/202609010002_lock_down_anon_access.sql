-- Remove the bootstrap-era blanket access granted to anonymous clients.

begin;

do $$
declare
  policy_record record;
begin
  for policy_record in
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname in ('ai', 'catalog', 'commerce', 'integration', 'search')
      and roles && array['public', 'anon', 'authenticated']::name[]
  loop
    execute format('drop policy if exists %I on %I.%I', policy_record.policyname, policy_record.schemaname, policy_record.tablename);
  end loop;
end
$$;

revoke all on all tables in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;
revoke all on all functions in schema public from public, anon, authenticated;
revoke all on all tables in schema ai, catalog, commerce, integration, search from anon, authenticated;
revoke all on all sequences in schema ai, catalog, commerce, integration, search from anon, authenticated;
revoke all on all functions in schema ai, catalog, commerce, integration, search from public, anon, authenticated;
revoke all on schema ai, catalog, commerce, integration, search from anon, authenticated;

grant usage on schema catalog, commerce, search to anon, authenticated;
grant select (id, manufacturer_id, canonical_sku, lifecycle_status, created_at, updated_at)
  on catalog.products to anon, authenticated;
grant select (id, canonical_name, status)
  on catalog.manufacturers to anon, authenticated;
grant select (product_id, locale, title, short_description, long_description, approval_status)
  on catalog.product_localizations to anon, authenticated;
grant select (product_id, identifier_type, value, is_primary, validation_status, created_at)
  on catalog.product_identifiers to anon, authenticated;
grant select (product_id, supplier_product_id, review_status, confidence, linked_at)
  on catalog.product_supplier_links to anon, authenticated;
grant select (id, supplier_sku, external_product_id, mpn, source_name, source_b2c_name,
  source_short_description, source_description, source_warranty_text, offer_status)
  on catalog.supplier_products to anon, authenticated;
grant select (product_id, taxonomy_node_id, is_primary, confidence, assigned_at, approval_status)
  on catalog.product_taxonomy_assignments to anon, authenticated;
grant select (id, parent_id, name, slug, commodity_external_code, source_level, source_order, active)
  on catalog.taxonomy_nodes to anon, authenticated;
grant select (product_id, locale, seo_title, meta_description, approval_status)
  on catalog.product_seo to anon, authenticated;
grant select (product_id, media_asset_id, role, position, approved)
  on catalog.product_media to anon, authenticated;
grant select (media_asset_id, source_url)
  on catalog.source_media_assets to anon, authenticated;
grant select (product_id, gross_amount, tax_rate_percent, valid_from, valid_to, created_at)
  on commerce.product_prices to anon, authenticated;
grant select (product_id, sellable_quantity)
  on commerce.sellable_inventory to anon, authenticated;
grant select (product_id, locale, filter_values, content_hash)
  on search.search_documents to anon, authenticated;

alter table catalog.products enable row level security;
alter table catalog.manufacturers enable row level security;
alter table catalog.product_localizations enable row level security;
alter table catalog.product_identifiers enable row level security;
alter table catalog.product_supplier_links enable row level security;
alter table catalog.supplier_products enable row level security;
alter table catalog.product_taxonomy_assignments enable row level security;
alter table catalog.taxonomy_nodes enable row level security;
alter table catalog.product_seo enable row level security;
alter table catalog.product_media enable row level security;
alter table catalog.source_media_assets enable row level security;
alter table commerce.product_prices enable row level security;
alter table commerce.sellable_inventory enable row level security;
alter table search.search_documents enable row level security;

create policy storefront_read_products on catalog.products for select to anon, authenticated using (lifecycle_status in ('ACTIVE', 'OUT_OF_STOCK'));
create policy storefront_read_manufacturers on catalog.manufacturers for select to anon, authenticated using (status = 'ACTIVE');
create policy storefront_read_product_localizations on catalog.product_localizations for select to anon, authenticated using (locale = 'sk-SK' and approval_status <> 'REJECTED');
create policy storefront_read_product_identifiers on catalog.product_identifiers for select to anon, authenticated using (validation_status <> 'INVALID');
create policy storefront_read_product_supplier_links on catalog.product_supplier_links for select to anon, authenticated using (review_status <> 'REJECTED');
create policy storefront_read_supplier_products on catalog.supplier_products for select to anon, authenticated using (offer_status = 'ACTIVE');
create policy storefront_read_product_taxonomy on catalog.product_taxonomy_assignments for select to anon, authenticated using (approval_status <> 'REJECTED');
create policy storefront_read_taxonomy_nodes on catalog.taxonomy_nodes for select to anon, authenticated using (active = true);
create policy storefront_read_product_seo on catalog.product_seo for select to anon, authenticated using (locale = 'sk-SK' and approval_status <> 'REJECTED');
create policy storefront_read_product_media on catalog.product_media for select to anon, authenticated using (approved = true);
create policy storefront_read_source_media on catalog.source_media_assets for select to anon, authenticated using (source_url is not null);
create policy storefront_read_product_prices on commerce.product_prices for select to anon, authenticated using (gross_amount >= 0 and (valid_to is null or valid_to > now()));
create policy storefront_read_sellable_inventory on commerce.sellable_inventory for select to anon, authenticated using (true);
create policy storefront_read_search_documents on search.search_documents for select to anon, authenticated using (locale = 'sk-SK');

grant select on public.storefront_products, public.storefront_taxonomy_nodes to anon, authenticated;
grant execute on function public.ingest_canonical_products_batch(jsonb) to service_role;
grant execute on function integration.ingest_canonical_product(jsonb) to service_role;
grant execute on function integration.ingest_canonical_products_batch(jsonb) to service_role;

alter default privileges in schema public revoke all on tables from anon, authenticated;
alter default privileges in schema public revoke all on sequences from anon, authenticated;
alter default privileges in schema public revoke execute on functions from public, anon, authenticated;
alter default privileges in schema ai, catalog, commerce, integration, search revoke all on tables from anon, authenticated;
alter default privileges in schema ai, catalog, commerce, integration, search revoke all on sequences from anon, authenticated;
alter default privileges in schema ai, catalog, commerce, integration, search revoke execute on functions from public, anon, authenticated;

commit;
