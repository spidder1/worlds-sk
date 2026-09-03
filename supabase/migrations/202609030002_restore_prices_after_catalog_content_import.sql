create temporary table restore_product_prices on commit drop as
select
  current_price.id as current_zero_id,
  current_price.product_id,
  current_price.price_list_id,
  historic.net_amount,
  historic.gross_amount,
  historic.tax_rate_percent,
  historic.source_supplier_product_id,
  historic.pricing_rule_id,
  historic.calculation_trace
from commerce.product_prices current_price
cross join lateral (
  select historic_price.*
  from commerce.product_prices historic_price
  where historic_price.product_id = current_price.product_id
    and historic_price.price_list_id = current_price.price_list_id
    and historic_price.gross_amount > 0
    and historic_price.id <> current_price.id
  order by historic_price.valid_from desc, historic_price.created_at desc
  limit 1
) historic
join catalog.products product on product.id = current_price.product_id
where current_price.valid_to is null
  and current_price.gross_amount = 0
  and product.lifecycle_status = 'ACTIVE';

update commerce.product_prices price
set valid_to = now()
where price.id in (select current_zero_id from restore_product_prices);

insert into commerce.product_prices (
  product_id, price_list_id, net_amount, gross_amount, tax_rate_percent,
  source_supplier_product_id, pricing_rule_id, valid_from, valid_to,
  calculation_trace
)
select
  product_id, price_list_id, net_amount, gross_amount, tax_rate_percent,
  source_supplier_product_id, pricing_rule_id, now(), null,
  coalesce(calculation_trace, '{}'::jsonb)
    || jsonb_build_object('recoveredAfterContentImport', true, 'recoveredAt', now())
from restore_product_prices;

update search.search_documents document
set price_amount = restored.gross_amount,
    content_hash = encode(
      extensions.digest(
        coalesce(document.title, '') || '|' ||
        coalesce(document.searchable_text, '') || '|' ||
        coalesce(restored.gross_amount::text, '') || '|' ||
        coalesce(document.sellable_quantity::text, ''),
        'sha256'
      ),
      'hex'
    ),
    indexed_at = now(),
    updated_at = now()
from restore_product_prices restored
where document.product_id = restored.product_id;
