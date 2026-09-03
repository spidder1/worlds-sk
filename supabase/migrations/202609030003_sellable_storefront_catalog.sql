-- Fast, public storefront projection. Supplier costs and operational fields
-- remain private. Only active products with a positive sell price are exposed.

create table if not exists catalog.storefront_products_cache (
  id text primary key,
  supplier_code text,
  supplier_pro_id text,
  sku text,
  mpn text,
  ean text,
  brand text,
  category_slug text,
  category_hierarchy jsonb not null default '[]'::jsonb,
  commodity_code text,
  commodity_name text,
  title text not null,
  name_b2c text,
  slug text not null,
  short_description text,
  supplier_description text,
  enriched_description text,
  seo_title text,
  seo_description text,
  search_keywords jsonb not null default '[]'::jsonb,
  vat_rate numeric,
  base_price numeric,
  final_price numeric,
  currency text,
  stock_count numeric,
  is_in_stock boolean,
  stock_text text,
  min_order_quantity integer,
  warranty_months integer,
  warranty_unit text,
  attributes jsonb not null default '{}'::jsonb,
  images jsonb not null default '[]'::jsonb,
  status text not null default 'ACTIVE',
  data_hash text,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists storefront_cache_catalog_page_idx
  on catalog.storefront_products_cache (is_in_stock desc, updated_at desc, id)
  where status = 'ACTIVE' and final_price > 0;
create index if not exists storefront_cache_category_page_idx
  on catalog.storefront_products_cache (category_slug, is_in_stock desc, updated_at desc, id)
  where status = 'ACTIVE' and final_price > 0;
create index if not exists storefront_cache_category_price_idx
  on catalog.storefront_products_cache (category_slug, final_price, id)
  where status = 'ACTIVE' and final_price > 0;
create index if not exists storefront_cache_price_idx
  on catalog.storefront_products_cache (final_price, id)
  where status = 'ACTIVE' and final_price > 0;
create index if not exists storefront_cache_title_idx
  on catalog.storefront_products_cache (title, id)
  where status = 'ACTIVE' and final_price > 0;
create index if not exists storefront_cache_slug_idx
  on catalog.storefront_products_cache (slug);

alter table catalog.storefront_products_cache enable row level security;
drop policy if exists storefront_read_sellable_cache on catalog.storefront_products_cache;
create policy storefront_read_sellable_cache
  on catalog.storefront_products_cache for select to anon, authenticated
  using (status = 'ACTIVE' and final_price > 0);
grant select on catalog.storefront_products_cache to anon, authenticated;
grant select, insert, update, delete on catalog.storefront_products_cache to service_role;

create or replace view public.storefront_products
with (security_invoker = true)
as
select
  id, supplier_code, supplier_pro_id, sku, mpn, ean, brand, category_slug,
  category_hierarchy, commodity_code, commodity_name, title, name_b2c, slug,
  short_description, supplier_description, enriched_description, seo_title,
  seo_description, search_keywords, vat_rate, base_price, final_price, currency,
  stock_count, is_in_stock, stock_text, min_order_quantity, warranty_months,
  warranty_unit, attributes,
  case
    when images->0->>'url' ilike '%images.unsplash.com/%' then '[]'::jsonb
    else images
  end as images,
  status, data_hash, last_synced_at, created_at, updated_at
from catalog.storefront_products_cache
where status = 'ACTIVE' and final_price > 0;

grant select on public.storefront_products to anon, authenticated;

create or replace function public.get_storefront_product_count()
returns integer
language sql
stable
security definer
set search_path = public, catalog, pg_temp
as $$
  select count(*)::integer
  from catalog.storefront_products_cache
  where status = 'ACTIVE' and final_price > 0;
$$;

create or replace function public.get_product_sitemap_batch(p_offset integer, p_limit integer)
returns table(slug text, status text, updated_at text)
language sql
stable
security definer
set search_path = public, catalog, pg_temp
as $$
  select cache.slug, cache.status, cache.updated_at::text
  from catalog.storefront_products_cache cache
  where cache.status = 'ACTIVE' and cache.final_price > 0
  order by cache.id
  offset greatest(p_offset, 0)
  limit least(greatest(p_limit, 1), 1000);
$$;

revoke all on function public.get_storefront_product_count() from public;
revoke all on function public.get_product_sitemap_batch(integer, integer) from public;
grant execute on function public.get_storefront_product_count() to anon, authenticated, service_role;
grant execute on function public.get_product_sitemap_batch(integer, integer) to anon, authenticated, service_role;

comment on view public.storefront_products is
  'Public active sellable catalogue projection. Rows without a positive price are excluded; synthetic legacy images are suppressed.';
