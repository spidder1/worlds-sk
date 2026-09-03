alter function integration.ingest_canonical_product(jsonb)
  set search_path = public, catalog, commerce, integration, search, extensions, pg_temp;

alter function integration.ingest_canonical_products_batch(jsonb)
  set search_path = public, catalog, commerce, integration, search, extensions, pg_temp;
