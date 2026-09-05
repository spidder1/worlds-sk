
# Worlds.sk - complete eD import architecture and PostgreSQL target model

**Document status:** implementation design  
**Source reviewed:** `PRIVATEdoc.pdf`, "Datova vymena :: verze PRIVATE", version 2.30, 33 pages, created 2026-01-05  
**Scope:** eD system catalogue/reference-data ingestion, Worlds.sk product master, search/SEO projections, AI-assisted classification, and supplier-order integration

## 1. Executive decision

Build the new shop around a supplier-independent product master, not around eD XML rows.

The decisive separation is:

```text
eD web service / generated XML or ZIP
        -> immutable raw landing zone
        -> typed staging and validation
        -> supplier offers and supplier taxonomies
        -> Worlds.sk canonical product master
        -> commerce/read models
        -> search, storefront, Merchant Center and supplier ordering
```

An eD product is a **supplier offer/identity**. A Worlds.sk product is the customer-facing canonical item. They may initially be one-to-one, but the schema must support multiple suppliers for one canonical product without a redesign.

The implementation should use PostgreSQL as the authoritative catalogue and commerce datastore. XML/ZIP files are evidence and replay inputs; the search engine is a rebuildable projection; AI output is a suggestion until accepted; and the storefront never reads an upstream feed directly.

## 2. Evidence convention

Every field or behavior in this document is classified as:

- **[PDF]** explicitly documented in `PRIVATEdoc.pdf` version 2.30.
- **[DERIVED]** a deterministic normalization of a PDF field, such as converting `1.1.1900` to `NULL` while retaining the raw value.
- **[PROPOSED]** an application field, policy, workflow, or constraint required for a production e-shop but not supplied by the PDF.
- **[VERIFY]** ambiguous or incomplete in the PDF and must be checked against the live WSDL and representative payloads before production.

No proposed field is represented as supplier-provided data.

## 3. What the eD interface supports

### 3.1 Transport, authentication and generated files

- **[PDF]** SOAP/web-service methods return SOAP/XML directly or return `Url`, `FileName` and `IsReady` for a generated document.
- **[PDF]** System status uses `Status`, `StatusCode` (`DONE` or `ERROR`) and `ErrorText`; catalogue downloads also expose `ProductListStatus`.
- **[PDF]** All documented methods use `login` and `password`.
- **[PDF]** Localized endpoints exist for Czech, Slovak and English environments. Worlds.sk should use the Slovak endpoint.
- **[PDF]** URL-returning methods normally return the already generated file on repeated calls; `getProductCatalogueStockDownloadXML` is the exception.
- **[PROPOSED]** Credentials belong in a secret manager. Never persist them in raw payloads, logs, exceptions or database rows.
- **[PROPOSED]** Download only HTTPS URLs from an allow-listed eD host, with size limits, timeouts, checksum calculation and XML external-entity processing disabled.

### 3.2 Reference and taxonomy methods

| Method | PDF-backed output | Target use |
|---|---|---|
| `getProductSuperCategoryList` | supercategory code/name/parent and included category list | supplier navigator hierarchy and category membership |
| `getProductCategoryList` | category code/name, category attributes, optional category images | supplier categories and filter configuration |
| `getProductCategoryAttributeList` | navigator attributes | attribute definitions |
| `getProductCategoryAttributeValueList` | value code, attribute code, display value, value sort | allowed enumerated values |
| `getNavigator` | all four navigator structures above | preferred consistent navigator snapshot |
| `getProductProducerList` | producer code/name/system ID | supplier manufacturer identities |
| `getProductCommodityList` | commodity code/name/parent code | supplier commodity tree |
| `getProductIndexTree1` / `2` | index code, commodity, name, sort path/code, level, order, code-name and children | two independent supplier index trees |
| `getProductInformationList` | marketing/status code and name, excluding TOP | status dictionary |
| `getTransportationList` | B2B transport code/name/type | supplier-order shipping methods |
| `getTransportationListCustomer` | B2C transport code/name/type | dropship/B2C shipping methods |
| `getProductRelationList` | parent/child product IDs and codes, quantity, relation type ID/name | accessories, replacements and other relations |

Important navigator semantics:

- **[PDF]** A category has a set of attributes; a product in that category is expected to have values for those attributes.
- **[PDF]** An attribute can belong to multiple categories.
- **[PDF]** `IsPrimary` marks the attribute whose values simulate a third navigation level.
- **[PDF]** `FilterOperator` is `AND` for values that must all match and `OR` for alternatives.
- **[PDF]** A category may belong to multiple supercategories.
- **[PDF]** Commodities, two price-index trees and the product navigator are parallel classification systems, not one hierarchy.

### 3.3 Catalogue methods and cadence

| Method family | Intended content | Recommended use |
|---|---|---|
| `getProductCatalogueDownloadXML/ZIP` | basic product list; several commercial fields are documented as zero/default here | discovery only, not master ingestion |
| `getProductCatalogueStockDownloadXML` | product identity, stock count, future availability, price, fees, ValuePack and currency | frequent price/stock synchronization |
| `getProductDetail(code)` | one complete product | diagnostics, recovery and sampling; not a 70k-item primary importer |
| `getProductCatalogueFullDownloadXML/ZIP` | complete products, filterable by stock and commodity | full import |
| `...Full...Ext` | adds producer and category filters | filtered recovery/import |
| `...Full...v1` | adds `ComoditiesTree` expansion | preferred full import where live behavior is verified |
| `...FullNavFilter...` | full products filtered through navigator string or SOAP object | targeted QA/recovery, not the main full load |
| `getProductCatalogueFullPremiumDownloadXML` | complete premium products | premium audit/reconciliation |
| `getProductCatalogueShortDownloadXML` | compact product/price/stock set | secondary reconciliation option |
| `...WithTransform` | explicitly not implemented | do not use |

- **[PDF]** The precomputed full/detail source is refreshed twice daily at 06:00 and 20:00; price and availability data in that source are refreshed hourly.
- **[PDF]** The dedicated stock catalogue provides current data 12 times per day.
- **[PROPOSED]** Run full catalogue ingestion after the two documented refresh windows and stock/price ingestion every two hours. Use `Europe/Bratislava` explicitly and add a small randomized delay.
- **[VERIFY]** Confirm the supplier's actual publication completion time, whether timestamps are local time, and how parameter-specific generated-file caching behaves.

## 4. Complete product-field mapping

### 4.1 Identity and descriptive content

| eD field | Evidence | Normalized target | Notes |
|---|---|---|---|
| `ProId` | [PDF] | `supplier_products.external_product_id` | eD system ID; never use as the canonical product PK |
| `Code` | [PDF] | `supplier_products.supplier_sku` | authoritative eD order code; unique per supplier/source |
| `Name` | [PDF] | `supplier_products.source_name` | retain verbatim |
| `NameB2C` | [PDF] | `supplier_products.source_b2c_name` | short B2C name |
| `PartNumber` | [PDF] | `supplier_products.mpn` | not globally unique |
| `PartNumber2` | [PDF] | `supplier_product_identifiers` (`MPN_ALT`) | second part number |
| `EANCode` | [PDF] | `supplier_product_identifiers` (`GTIN`) | validate, but retain malformed raw values |
| `Description` | [PDF] | `supplier_products.source_description` | supplier content, not editable Worlds copy |
| `DescriptionShort` | [PDF] | `supplier_products.source_short_description` | supplier short copy |
| `Unit` | [PDF] | `supplier_products.sales_unit` | source unit |
| `MultipleQuantity` | [PDF] | `supplier_products.order_multiple` | minimum order multiple |

**[PROPOSED]** Canonical `products`, `product_localizations` and `product_identifiers` hold approved Worlds.sk title, descriptions and identifiers. Source fields remain unchanged for audit and reprocessing.

### 4.2 Manufacturer and classification

| eD field | Evidence | Normalized target |
|---|---|---|
| `ProducerCode`, `ProducerName`, producer `ProducerId` | [PDF] | `supplier_manufacturers` -> `manufacturer_mappings` -> `manufacturers` |
| `CommodityCode`, `CommodityName`, `CommodityParentCode` | [PDF] | supplier `taxonomy_nodes` for taxonomy `ED_COMMODITY` |
| `CategoryCode` | [PDF] | supplier category membership in taxonomy `ED_NAVIGATOR` |
| `IndexSort1`, `IndexCode1`, `IndexOrder1`, `IndexImplicit1` | [PDF] | membership in `ED_INDEX_1` plus source membership metadata |
| second-tree sort/code/order/implicit | [PDF] | membership in `ED_INDEX_2` |
| `ProductNavigatorDataList.AttributeCode` | [PDF] | `source_product_attribute_values.attribute_external_code` |
| `ProductNavigatorDataList.ValueCode` | [PDF] | enumerated allowed value reference |

**[VERIFY]** Page 13 labels both the second-tree sort path and the second-tree system code as `IndexSort2`. This appears to be a documentation typo. Preserve the exact XML tag in raw storage and inspect WSDL/live XML before mapping the presumed code field to `external_node_code`.

### 4.3 Prices, fees, VAT and currency

| eD field | Evidence | Normalized target | Rule |
|---|---|---|---|
| `YourPrice` | [PDF] | `supplier_prices.net_cost_excluding_fees` | includes eligible ValuePack discount according to PDF text |
| `YourPriceWithFees` | [PDF] | `supplier_prices.net_cost_including_fees` | includes SNC/AO and ValuePack discount |
| `GarbageFee` | [PDF] | `supplier_price_fees` type `SNC` | explicit fee component |
| `AuthorFee` | [PDF] | `supplier_price_fees` type `AO` | explicit fee component |
| `ValuePack` | [PDF] | `supplier_price_breaks.source_value_pack` | retain exact numeric meaning until verified |
| `ValuePackQty` | [PDF] | `supplier_price_breaks.minimum_quantity` | threshold for ValuePack benefit |
| `DealerPrice`, `DealerPrice1` | [PDF] | `supplier_prices` typed price components | do not expose directly |
| `EndUserPrice` | [PDF] | `supplier_prices.recommended_retail_price` | supplier recommendation, not Worlds selling price |
| `Vat` | [PDF] | `supplier_products.source_vat_percent` | documented as percent |
| `PriceCurrency` | [PDF] | `supplier_prices.currency_code` | validate ISO-like three-character code |

**[VERIFY]** The B2C order example uses `VatRate = 1.19`, while product `Vat` is documented as a percentage. The adapter must have separate `vat_percent` and `vat_multiplier` types and contract tests; never reuse one field for both.

**[PROPOSED]** Worlds.sk selling prices are calculated in `price_lists`/`product_prices` from supplier cost, fees, tax rules, margin rules, rounding and campaign adjustments. A supplier price is an input, not the storefront source of truth.

### 4.4 Inventory and availability

| eD field | Evidence | Normalized target |
|---|---|---|
| `OnStock` | [PDF] | `supplier_inventory.is_central_in_stock` |
| `OnStockCount` | [PDF] | `supplier_inventory.available_quantity` |
| `OnStockText` | [PDF, optional] | `supplier_inventory.source_status_text` |
| `DateAvailible` | [PDF] | `supplier_availability.expected_at` |

- **[PDF]** `OnStock` refers to the central warehouse.
- **[DERIVED]** `1.1.1900` means unknown. Store raw text/date, set normalized `expected_at = NULL`, and set `availability_date_known = false`.
- **[PROPOSED]** Sellable quantity is a derived commerce value after safety stock, pending reservations, supplier eligibility and order-multiple rules. Never overwrite the supplier snapshot with the derived value.

### 4.5 Warranty, tax/customs and commercial eligibility

| eD field | Evidence | Normalized target |
|---|---|---|
| `Warranty`, `WarrantyTerm`, `WarrantyUnit` | [PDF] | raw warranty text plus normalized `product_warranties.term`/`unit` |
| `RateOfDutyCode` | [PDF] | `supplier_products.duty_rate_code` |
| `RCStatus` (`Y`,`N`,`U`) | [PDF] | `supplier_products.reverse_charge_status` enum |
| `RCCode` | [PDF] | `supplier_products.reverse_charge_code` |
| `B2C` | [PDF] | `supplier_products.b2c_eligible` |
| `IsPremium` | [PDF] | `supplier_products.is_premium` |

### 4.6 Images, packaging and marketing flags

| eD field | Evidence | Normalized target |
|---|---|---|
| `ImgCount`, `ImgLastChanged`, `PixImgCode` | [PDF] | supplier media metadata/raw-only internal code |
| `ImageList.ProductImage.URL` | [PDF] | `source_media_assets.source_url` |
| category `ImageList.URL` | [PDF, optional] | taxonomy-node media |
| logistics `typ` (`JEDN`,`PACK`) | [PDF] | `supplier_packaging.unit_type` |
| logistics `count`, `weight`, `length`, `width`, `height` | [PDF] | typed packaging dimensions; kg/cm |
| `Status`, `IsTop`, `InfoCode`, `ExtInfoCodes(InfoCode, Infoname)` | [PDF] | dictionary-backed supplier marketing flags |

- **[PDF]** Version history says product image lists also include images assigned to the price-index node.
- **[PROPOSED]** Media downloading is asynchronous. Store source URL, retrieval status, MIME type, byte size, dimensions, hash, object-storage key, role, position and provenance. Because the PDF does not label whether a returned image is direct or index-inherited, use `provenance = UNKNOWN_ED` unless live data supplies evidence.
- **[PROPOSED]** Human-approved media/order overrides survive future supplier imports.

### 4.7 Product relations

`getProductRelationList` supplies parent/child `ProId`, product `Code`, relation quantity, `RelTypeId` and `RelTypeName` **[PDF]**. Store directed relations using a dictionary table. Do not infer symmetry. Unresolved products remain in a quarantine table and are resolved after all catalogue chunks are loaded.

## 5. Target PostgreSQL model

The companion `worldssk_target_schema.sql` contains the executable baseline. The logical table groups are below.

### 5.1 Source integration and audit

| Table | Purpose | Origin |
|---|---|---|
| `source_systems` | eD Slovak endpoint and future feeds | [PROPOSED] |
| `suppliers` | commercial supplier identity | [PROPOSED] |
| `supplier_accounts` | non-secret account reference/configuration | [PROPOSED] |
| `import_batches` | one invocation/file snapshot, status, counts and checksums | [PROPOSED], populated from PDF status/file fields |
| `raw_documents` | immutable object-storage pointer, hash and metadata | [PROPOSED] |
| `raw_records` | optional per-record raw XML/JSON and source identity | [PROPOSED] |
| `staging_products` | typed, batch-scoped parse result | [PROPOSED] |
| `import_issues` | validation/quarantine errors | [PROPOSED] |
| `entity_change_log` | before/after hashes and changed fields | [PROPOSED] |
| `outbox_events` | reliable downstream search/cache/feed events | [PROPOSED] |

Raw payloads are immutable. Staging is disposable. Production upserts occur only after batch validation gates pass.

### 5.2 Product identity and supplier offers

| Table | Purpose |
|---|---|
| `products` | canonical Worlds.sk product with lifecycle state |
| `product_localizations` | approved localized title, descriptions and SEO-supporting copy |
| `product_identifiers` | canonical GTIN/MPN/other identifiers with verification state |
| `suppliers` | supplier company |
| `supplier_products` | eD identity/offer and all stable supplier fields |
| `supplier_product_identifiers` | exact source identifiers including malformed/raw values |
| `product_supplier_links` | explicit link between canonical product and supplier offer, with match method/confidence/review |
| `manufacturers` | canonical manufacturer/brand |
| `supplier_manufacturers` | eD producer code/name/ID |
| `manufacturer_mappings` | reviewed source-to-canonical mapping |

Identity rules:

1. `supplier_id + supplier_sku` is the authoritative supplier-offer key.
2. `source_system_id + external_product_id` is an alternate unique key when present.
3. Exact validated GTIN may propose a canonical match, but conflicts go to review.
4. Manufacturer + normalized MPN may propose a match only within the same verified manufacturer.
5. Names never auto-merge products.
6. A product may link to several supplier offers; a supplier offer links to at most one canonical product at a time.

### 5.3 Taxonomies and mappings

Use a generic taxonomy model rather than separate hard-coded category tables:

- `taxonomies`: `ED_SUPERCATEGORY`, `ED_NAVIGATOR`, `ED_COMMODITY`, `ED_INDEX_1`, `ED_INDEX_2`, and `WORLDS_CATALOG`.
- `taxonomy_nodes`: external code/name, parent, sort/order and source metadata.
- `taxonomy_node_closure`: ancestor/descendant paths for efficient trees and breadcrumbs.
- `taxonomy_node_links`: many-to-many links such as supercategory-to-category.
- `product_taxonomy_assignments`: product/offer membership, source, primary/implicit flags.
- `category_mappings`: supplier node -> Worlds node with rule/AI/human provenance, confidence and status.

Do not make eD taxonomy nodes editable Worlds categories. Supplier changes must be replayable without overwriting merchandising decisions.

### 5.4 Attributes and filters

- `attributes`: canonical or source attribute definition, datatype, unit and multivalue policy.
- `attribute_values`: enumerated values and supplier `ValueCode`.
- `category_attributes`: category-specific applicability, primary flag, filter operator, required/filterable flags and display order.
- `supplier_product_attribute_values`: exact eD `AttributeCode + ValueCode` assignments.
- `product_attribute_values`: canonical values, supporting enumerated and typed scalar values, source/provenance and review state.
- `attribute_mappings` and `attribute_value_mappings`: source-to-canonical normalization.

The relational assignment tables are authoritative for filtering. A JSONB attribute document may be generated for APIs/search, but it is a projection and must not replace normalized values.

### 5.5 Prices, fees, tax and currency

- `currencies`, `tax_codes` and `tax_rates` are controlled commerce reference data **[PROPOSED]**.
- `supplier_price_snapshots` records time-series supplier costs, fees, VAT and recommended prices **[PDF fields + PROPOSED history]**.
- `supplier_price_breaks` records ValuePack threshold data **[PDF]**.
- `supplier_price_fees` records SNC/AO and future fee types **[PDF + extensibility]**.
- `price_lists`, `pricing_rules` and `product_prices` own Worlds selling prices **[PROPOSED]**.

Money uses `numeric(19,4)` in storage. Never use floating point. Order lines persist immutable price/tax snapshots, including gross/net totals and currency.

### 5.6 Inventory and future availability

- `inventory_locations`: eD central warehouse now; future local/other supplier locations.
- `supplier_inventory_current`: latest source position per supplier product/location.
- `supplier_inventory_snapshots`: append-only history, partitionable by observation month.
- `supplier_future_availability`: expected dates/quantities if supplied; eD currently gives a date but not a documented future quantity.
- `inventory_reservations`: Worlds checkout/order reservations.
- `sellable_inventory`: rebuildable projection applying safety-stock and supplier rules.

### 5.7 Media, packaging, warranties and flags

- `media_assets`, `source_media_assets`, `product_media`, `taxonomy_node_media`.
- `supplier_packaging` supports one row per `JEDN`/`PACK` record and retains source units.
- `product_warranties` retains raw warranty plus normalized term/unit.
- `marketing_flags` and `supplier_product_marketing_flags` preserve both `Status`/`InfoCode` and `ExtInfoCodes` without flattening them into booleans.

### 5.8 SEO, URLs and lifecycle

- `product_seo` stores approved/generated title, meta description, canonical policy, robots policy, structured-data eligibility and provenance.
- `slugs` owns the current localized canonical path per entity.
- `redirects` stores immutable redirect history, target and reason.
- `products.lifecycle_status` uses `DRAFT`, `ACTIVE`, `OUT_OF_STOCK`, `DISCONTINUED`, `HIDDEN`, `REMOVED`.

Missing from one supplier file never means immediate deletion. Mark `last_seen_at`; after two successful full snapshots and a configurable grace period, move the supplier offer to `MISSING`; only a reviewed lifecycle rule changes the canonical product. Keep discontinued pages when they have value and show alternatives. Redirect only to a genuine successor/equivalent.

### 5.9 AI categorization and enrichment

- `ai_runs`: model/provider/prompt/schema versions, input hash, timing and cost metadata.
- `ai_suggestions`: suggested taxonomy node, attribute/value, manufacturer mapping, title, description or SEO content.
- `review_tasks`: workflow status, assignee, decision and reason.
- `classification_decisions`: final accepted category with method (`RULE`, `AI_AUTO`, `HUMAN`) and evidence.

Guardrails:

- AI selects only from versioned allowed IDs.
- Technical facts must trace to a structured source or approved human entry.
- Auto-accept thresholds are configured per decision type and taxonomy branch, not one global number.
- Store confidence, alternatives, input hash, model/prompt version and reviewer outcome.
- Re-running AI creates a new suggestion; it never silently rewrites approved data.

Suggested initial thresholds: category suggestions at >=0.98 with no rule conflicts may auto-accept after sampled QA; 0.80-0.98 requires review; below 0.80 is quarantined. These are **[PROPOSED]** starting points, not guarantees.

### 5.10 Search indexing

- `search_documents` is a versioned PostgreSQL projection containing approved localized text, identifiers, category paths, manufacturer, current selling price, availability and filterable canonical attributes.
- `search_sync_queue`/`outbox_events` drives Meilisearch or OpenSearch.
- Every document carries `catalog_version`, `content_hash` and `indexed_at`.
- Exact `supplier_sku`, MPN and GTIN fields are indexed separately from analyzed text.
- Facets are generated only from approved `category_attributes.is_filterable` values.
- Search is never the source of truth; full reindexing from PostgreSQL must be possible.

## 6. Initial full import

### Phase 0 - contract verification

1. Fetch the live WSDL and archive its checksum/version. **[PROPOSED]**
2. Make test calls with a non-production API account and the documented test-order flag. **[PDF test flag in examples; VERIFY exact signature]**
3. Capture one payload for every used method, especially second index-tree fields, VAT formats, `ValuePack`, empty elements and numeric/date formats.
4. Confirm file encoding, namespaces, compression, maximum file size, publication time and rate limits.
5. Define redaction tests so login/password and customer data cannot enter logs.

### Phase 1 - reference snapshot

In one coordinated reference batch:

1. `getNavigator`.
2. `getProductProducerList`.
3. `getProductCommodityList`.
4. `getProductIndexTree1` and `getProductIndexTree2`.
5. `getProductInformationList`.
6. B2B and B2C transportation lists.

Load source taxonomies before products so every foreign key can resolve. Build closure rows after the nodes are valid. Reject cycles, dangling parents and duplicate source codes.

### Phase 2 - complete catalogue landing

Use a ZIP full-catalogue method to minimize transfer size. Prefer `getProductCatalogueFullDownloadZIPv1` after live verification. Because the PDF requires filters when `onStock=false`, request all commodity roots through `ComoditiesTree`, or chunk by non-overlapping commodity subtrees. Deduplicate idempotently by `supplier_id + Code`.

For every returned file:

1. Persist response metadata and the compressed body before parsing.
2. Verify HTTPS host, status, non-zero length, ZIP integrity, allowed entry names and uncompressed-size ratio.
3. Calculate SHA-256 and reject an unexpected duplicate or rollback according to batch policy.
4. Stream parse XML; disable DTD/external entities and enforce depth/text limits.
5. Write `raw_records`/typed staging without touching live products.
6. Validate required identity, decimal/date/boolean formats, reference codes and record counts.
7. Produce an import report: read/new/changed/unchanged/quarantined/missing.

### Phase 3 - normalize and match

1. Upsert supplier manufacturers and mappings.
2. Upsert `supplier_products` by supplier + `Code`; use `ProId` as a checked alternate identity.
3. Normalize identifiers without discarding raw values.
4. Link commodities, navigator categories and both index trees.
5. Load `AttributeCode + ValueCode`; unknown codes are quarantined, not invented.
6. Load images, packaging, warranty, status flags, prices and inventory.
7. Compute independent hashes: identity/content, taxonomy, attributes, media, price, inventory and compliance.
8. Match or create canonical products under the identity rules in section 5.2.
9. Queue unresolved/ambiguous matches and category mappings for review.

### Phase 4 - relations and enrichment

After all product identities exist, load `getProductRelationList`. Resolve both endpoints; retain unresolved relations for the next batch. Then run deterministic mapping rules, AI suggestions and human review. Finally build selling prices, SEO/read models and search documents.

### Phase 5 - reconciliation and cutover gate

The initial batch cannot be promoted until:

- all expected chunks/files succeeded;
- record count is within an approved baseline range;
- duplicate source keys are zero;
- unresolved manufacturer/category/value rates are below thresholds;
- price/currency/VAT validation passes;
- stock quantities are non-negative or explicitly quarantined;
- a stratified sample matches `getProductDetail`;
- image URLs and representative downloads pass QA;
- taxonomy closure is cycle-free;
- search document count matches eligible catalogue count;
- storefront price/availability equals PostgreSQL read models;
- rollback to the previous published catalogue version has been tested.

Promotion is a version switch, not row-by-row public mutation.

## 7. Recurring synchronization

### 7.1 Proposed schedule

| Job | Schedule | Source | Scope |
|---|---|---|---|
| reference data | daily 05:15 and on demand | navigator, producers, commodity/index/status dictionaries | small full replacement/upsert |
| full catalogue A | daily about 06:20 | full ZIP v1 | content/taxonomy/media/compliance plus reconciliation |
| full catalogue B | daily about 20:20 | full ZIP v1 | same |
| stock/price | every two hours | stock catalogue XML | quantity, future date, costs, fees, ValuePack, currency |
| relations | after successful evening full import | relation list | directed links |
| premium audit | daily after evening full import | premium catalogue | reconcile `IsPremium` |
| transport dictionaries | nightly | B2B/B2C transportation lists | supplier-order validation |
| media fetch | continuous bounded queue | image URLs changed by catalogue import | object-store mirror and QA |
| search indexing | event-driven, with nightly reconciliation | PostgreSQL outbox | changed public documents only |

The exact minutes are **[PROPOSED]** and must be moved if live publication completes later.

### 7.2 Delta logic

The supplier sends snapshots, so Worlds.sk computes deltas:

```text
raw snapshot
 -> normalize canonical representation
 -> calculate domain hashes
 -> compare with current supplier_product version
 -> update only changed domains
 -> append change log
 -> publish outbox event in the same transaction
```

Examples:

- only inventory hash changed -> update inventory/read model; do not rerun AI or SEO;
- only price hash changed -> recalculate selling price and reindex price; do not fetch images;
- attribute/category hash changed -> reclassify and update facets/search;
- image list/`ImgLastChanged` changed -> enqueue media reconciliation;
- content changed -> preserve approved Worlds copy, record source change and optionally create an enrichment review.

Use a PostgreSQL advisory lock per supplier/job type. Batches are idempotent. A failed batch never advances `last_successful_batch_id` and never publishes partial snapshots.

### 7.3 Missing and discontinued handling

A supplier offer missing from one chunk or failed import remains unchanged. It becomes a missing candidate only after a complete, successful full-catalogue batch in which its partition was present. Proposed policy:

1. first confirmed miss -> `missing_streak = 1`, suppress new supplier ordering if risk policy requires;
2. second consecutive confirmed miss -> supplier offer `MISSING`, quantity zero;
3. grace period/review -> `DISCONTINUED` at supplier-offer level;
4. canonical product lifecycle derives from all offers, sales/SEO history and merchandising policy.

## 8. Constraints, indexes and partitioning

Required database rules include:

- unique `(supplier_id, supplier_sku)` and `(source_system_id, external_product_id)` when not null;
- unique source taxonomy node `(taxonomy_id, external_code)`;
- unique `(attribute_id, external_value_code)` for source enumerations;
- unique active slug `(locale, path)` and redirect source path;
- non-negative quantities, dimensions, weights, money and warranty terms;
- `currency_code` length 3; country code length 2;
- GTIN digits/length validation recorded separately from raw preservation;
- `RCStatus` limited to `Y`,`N`,`U` when sourced from eD;
- exactly one current inventory row per supplier product/location;
- one product-media primary image per product/locale/role using a partial unique index;
- directed product relations unique by parent, child and type;
- closure-table primary key `(taxonomy_id, ancestor_id, descendant_id)` and depth >= 0;
- no source batch can be marked `SUCCEEDED` with unresolved fatal issues.

Index hot paths:

- supplier product lookup by `supplier_sku`, `external_product_id`, normalized MPN and validated GTIN;
- category/product joins in both directions;
- product attributes by `(attribute_id, value_id, product_id)` for faceting;
- current sellable offers by product, supplier and price;
- search outbox by unprocessed status and sequence;
- slugs/redirects by locale and normalized path;
- review tasks by status/type/confidence;
- import issues by batch/severity/code.

Partition append-only `supplier_inventory_snapshots`, `supplier_price_snapshots`, `raw_records` and high-volume change/audit tables by month or batch range after measured growth. Keep current-state tables unpartitioned for simple fast reads.

## 9. Source-of-truth matrix

| Domain | Authoritative source | Override rule |
|---|---|---|
| eD product code, ProId and source text | latest successful eD full batch | immutable history; no manual edit |
| eD price/fees/stock/future date | latest successful stock/price batch | no manual overwrite; policy may disable an offer |
| eD taxonomies/attributes/values | latest successful eD reference batch | never edited as Worlds taxonomy |
| canonical product identity | Worlds product master | reviewed merge/split only |
| public title/descriptions | approved Worlds localization | supplier change creates diff/review, not overwrite |
| Worlds category and facets | Worlds taxonomy/mappings | human/rule/approved AI decision |
| selling price | Worlds pricing engine | supplier cost is an input; manual campaigns are explicit rules |
| sellable quantity | Worlds inventory projection | derived from supplier stock/reservations/safety rules |
| SEO fields, slug and redirects | Worlds SEO/URL tables | generated suggestions require policy/approval |
| AI classification/enrichment | accepted decision tables | raw AI suggestions are never authoritative |
| search index | PostgreSQL projection | disposable and rebuildable |
| order financial facts | immutable order snapshots | post-order adjustments are separate records |
| supplier order state | supplier response plus reconciled events | uncertain calls require reconciliation, not blind retry |

## 10. Supplier-order integration

### 10.1 PDF-backed capabilities

- `createNewOrder`: B2B order with product code/quantity, shipping address, transport code, customer symbol, note, email and telephone; returns `OrderSymbol` and status. **[PDF]**
- `createNewOrderCustomer`: B2C/dropship order with item selling prices, price-with-VAT, VAT rate, shipping and optional invoice address, customer/invoice/contact/total data, transport and delivery flags. **[PDF]**
- `createNewOrderXML`: the live WSDL exposes a mixed `order` XML node, string `options` and boolean `test`; the client now provides a low-level wrapper. The business meaning and exact order XML schema remain **[VERIFY]** before production use.
- `changeDocument`: typed client wrapper now supports the WSDL `DEFERRED_INVOICING` and `QTY` change types; quantity changes remain supplier-contract gated because the PDF says that behavior is not yet implemented. **[PDF + live WSDL]**
- B2B and B2C transport dictionaries are distinct. **[PDF]**
- B2C customer invoice code must be unique in eD logistics. **[PDF]**

### 10.2 Target order tables and workflow

Use `orders`, `order_addresses`, `order_items`, `supplier_orders`, `supplier_order_items`, `supplier_order_requests`, `supplier_order_events` and `supplier_transport_methods`.

Workflow:

1. Freeze customer order, address, currency, price and tax snapshots.
2. Select eligible supplier offer per line using availability, total landed cost, order multiple, B2C eligibility and risk rules.
3. Split into one supplier order per mode/account/warehouse as needed.
4. Revalidate current stock, currency, price variance and transport code.
5. Allocate a unique Worlds correlation and, for B2C, unique customer invoice code.
6. Persist the exact outbound request with secrets removed.
7. Route legal customers through `createNewOrder` and private customers through `createNewOrderCustomer`; call eD once and record the response atomically.
8. On `DONE`, persist supplier `OrderSymbol`; on explicit `ERROR`, expose a retryable/non-retryable failure classification.
9. On timeout/connection loss after dispatch, use `SUBMISSION_UNKNOWN`; do not blindly retry because the PDF documents no idempotency key or order lookup method.
10. Reconcile unknown submissions through an additional supplier interface/portal or support-approved procedure before retry.

The document exposes order creation but no general order-status/list/readback method. Therefore full automatic fulfillment status, tracking, invoices and reconciliation are **not supported by this PDF alone**. Obtain the relevant eD document/API contract before promising those features.

## 11. Operational controls and acceptance tests

Minimum controls:

- immutable raw-file retention with configurable privacy/contract retention;
- schema-versioned parsers and golden XML fixtures;
- secrets redaction and customer-PII access controls;
- structured batch metrics and alerts for count/price/stock anomalies;
- dead-letter/quarantine queues with replay;
- point-in-time database recovery and object-store versioning;
- catalogue version rollback;
- signed/audited admin decisions for merges, mappings and content approval;
- supplier-call rate limiting and circuit breakers;
- database migrations and backward-compatible deploy order.

Critical tests:

- parse every PDF field, missing element and empty element;
- comma/dot decimal, timezone and `1.1.1900` handling;
- VAT percent versus B2C multiplier contract;
- duplicate `Code`, changed `ProId`, malformed EAN and reused MPN;
- navigator AND/OR and primary-attribute behavior;
- category in multiple supercategories;
- cycles/dangling nodes in commodity/index trees;
- multi-valued attributes;
- image inheritance/duplicate URLs and changed hashes;
- order-multiple and ValuePack thresholds;
- partial batch failure never publishes;
- unchanged hashes cause no downstream work;
- price/stock-only deltas do not overwrite content;
- approved Worlds content survives supplier updates;
- search/storefront price and stock match PostgreSQL;
- supplier-order timeout enters unknown state without auto-retry.

## 12. Implementation sequence

1. **Contract spike (1-2 weeks):** WSDL/payload verification, authentication, file download, redaction and golden fixtures.
2. **Landing/staging (2-3 weeks):** batch control, raw storage, streaming parser, validation and replay.
3. **Reference/catalogue model (3-5 weeks):** supplier products, taxonomies, attributes, manufacturers, prices, inventory, media metadata and relations.
4. **Canonical product and admin review (3-5 weeks):** identity matching, Worlds taxonomy/mappings, AI suggestions and review queues.
5. **Commerce/search/SEO projections (3-5 weeks):** pricing/sellable inventory, search index, URLs, product pages and feeds.
6. **Order adapter (2-4 weeks):** B2B/B2C submission, transport dictionaries, unknown-state reconciliation and tests.
7. **Migration/cutover hardening (2-4 weeks):** dual run, reconciliation, load/security/SEO tests and rollback.

These ranges overlap for a capable team. A production-grade catalogue/import foundation is roughly **14-22 weeks**, with supplier-order integration and cutover bringing the end-to-end program to roughly **18-28 weeks**. The largest uncertainties are live eD contract behavior, old Worlds.sk data quality/URL migration, pricing rules and the missing downstream order-status contract.

## 13. Decisions required before build

1. Confirm Medusa remains the commerce layer or choose another engine; PostgreSQL product-master boundaries remain the same.
2. Obtain live WSDL and sample payloads for the Slovak account.
3. Define Worlds canonical taxonomy ownership and initial mapping-review team.
4. Define selling-price, safety-stock, B2C eligibility and discontinuation policies.
5. Decide which supplier fields may be public verbatim and which require approval/enrichment.
6. Obtain order-status/tracking/invoice integration documentation, if automation beyond order submission is required.
7. Export legacy Worlds URLs, sales, products and SEO signals for canonical matching and redirect planning.

## Appendix A - method coverage checklist

All 32 documented methods were reviewed. Production recommendation:

- **Use:** `getNavigator`, producer/commodity/index/status lists, full ZIP v1 (after verification), stock XML, relation list, premium audit, transport lists, `createNewOrder`, `createNewOrderCustomer`, and constrained `changeDocument`.
- **Use for diagnostics/recovery:** `getProductDetail`, filtered full/nav methods and short catalogue.
- **Do not use as primary master:** basic catalogue XML/ZIP because commercial fields are defaulted and full detail requires per-item calls.
- **Do not use:** `getProductCatalogueFullDownloadXMLWithTransform` because the PDF states it is not implemented.
- **Implemented wrapper, still verify:** `createNewOrderXML` accepts the WSDL's mixed `order` XML plus string `options` and `test`; do not use in production until a supplier contract fixture confirms the business schema.
- **Blocked pending extra specification:** any order-status/tracking/invoice retrieval.

## Appendix B - PDF-backed field inventory

The imported raw/staging layer must recognize at least:

```text
Status.StatusCode, Status.ErrorText,
ProductListStatus, Url, FileName, IsReady,
AddressId, Count, GenerateDate,
SuperCategoryCode, SuperCategoryName, ParentSuperCategoryCode,
CategoryCode, CategoryName, category ImageList.URL,
AttributeCode, AttributeName, IsPrimary, FilterOperator,
ValueCode, Value, ValueSort,
ProducerCode, ProducerName, ProducerId,
CommodityCode, CommodityName, CommodityParentCode,
IndexCode, IndexName, IndexSort, IndexSortCode, IndexLevel,
IndexOrder, IndexCodeName, ProductIndexList,
InfoCode, InfoName,
ProId, Code, Name, NameB2C, PartNumber, PartNumber2, EANCode,
YourPrice, YourPriceWithFees, GarbageFee, AuthorFee,
ValuePack, ValuePackQty, DealerPrice, DealerPrice1, EndUserPrice,
Vat, PriceCurrency, OnStock, OnStockCount, OnStockText, DateAvailible,
Unit, MultipleQuantity, Status, IsTop, ExtInfoCodes,
Warranty, WarrantyTerm, WarrantyUnit,
Description, DescriptionShort,
IndexSort1, IndexCode1, IndexOrder1, IndexImplicit1,
second-tree sort/code/order/implicit fields (live tag verification required),
ImgCount, ImgLastChanged, PixImgCode, ImageList.ProductImage.URL,
ProductNavigatorDataList.AttributeCode, ProductNavigatorDataList.ValueCode,
B2C, IsPremium, RateOfDutyCode, RCStatus, RCCode,
LogisticDataList.typ, count, weight, length, width, height,
relation parent/child ProId and Code, Qty, RelTypeId, RelTypeName,
transport Code, Name, TypeCode,
order ProductCode, Qty, addresses, TransportCode, OrderNote,
OrderSymbolCustomer, email, telephone, customerName,
customerInvoiceCode (spelled `custumerInvoiceCode` in example),
created, price, priceVat, item Price, PriceVat, VatRate,
deliveryWithoutInvoice, deliveryWithoutDeliveryNote, noCashOnDelivery,
deferredInvoicing, priceTotal, customerCurrency,
change Code, Id, DocumentType, ChangeType, ChangeParametr,
response OrderSymbol and status.
```

Raw parsing must preserve original tag spelling and values. Normalized columns may correct naming only after a traceable mapping.
