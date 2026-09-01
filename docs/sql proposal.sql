-- Worlds.sk / eD system target schema - PostgreSQL 16+
-- Baseline architecture DDL. Review naming and migration ownership before production.

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE SCHEMA IF NOT EXISTS integration;
CREATE SCHEMA IF NOT EXISTS catalog;
CREATE SCHEMA IF NOT EXISTS commerce;
CREATE SCHEMA IF NOT EXISTS search;
CREATE SCHEMA IF NOT EXISTS ai;

-- -----------------------------------------------------------------------------
-- Integration, batches, raw evidence and reliable events
-- -----------------------------------------------------------------------------

CREATE TABLE integration.source_systems (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code text NOT NULL UNIQUE,
    name text NOT NULL,
    base_url text NOT NULL,
    locale text NOT NULL DEFAULT 'sk-SK',
    timezone text NOT NULL DEFAULT 'Europe/Bratislava',
    enabled boolean NOT NULL DEFAULT true,
    config jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE commerce.suppliers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code text NOT NULL UNIQUE,
    legal_name text NOT NULL,
    display_name text NOT NULL,
    enabled boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE integration.supplier_accounts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_id uuid NOT NULL REFERENCES commerce.suppliers(id),
    source_system_id uuid NOT NULL REFERENCES integration.source_systems(id),
    account_code text NOT NULL,
    secret_reference text NOT NULL,
    mode text NOT NULL DEFAULT 'PRODUCTION' CHECK (mode IN ('TEST','PRODUCTION')),
    enabled boolean NOT NULL DEFAULT true,
    last_successful_batch_id uuid,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (source_system_id, account_code)
);

CREATE TABLE integration.import_batches (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    source_system_id uuid NOT NULL REFERENCES integration.source_systems(id),
    supplier_account_id uuid NOT NULL REFERENCES integration.supplier_accounts(id),
    batch_type text NOT NULL CHECK (batch_type IN (
        'REFERENCE','FULL_CATALOG','STOCK_PRICE','RELATIONS','PREMIUM_AUDIT',
        'TRANSPORT','DETAIL_RECOVERY','ORDER_EXPORT','OTHER'
    )),
    source_method text NOT NULL,
    parameters_redacted jsonb NOT NULL DEFAULT '{}'::jsonb,
    status text NOT NULL DEFAULT 'CREATED' CHECK (status IN (
        'CREATED','FETCHING','LANDED','PARSING','VALIDATING','APPLYING',
        'SUCCEEDED','FAILED','REJECTED','CANCELLED'
    )),
    supplier_status_code text,
    supplier_error_text text,
    source_generate_at timestamptz,
    started_at timestamptz NOT NULL DEFAULT now(),
    completed_at timestamptz,
    records_read bigint NOT NULL DEFAULT 0 CHECK (records_read >= 0),
    records_new bigint NOT NULL DEFAULT 0 CHECK (records_new >= 0),
    records_changed bigint NOT NULL DEFAULT 0 CHECK (records_changed >= 0),
    records_unchanged bigint NOT NULL DEFAULT 0 CHECK (records_unchanged >= 0),
    records_quarantined bigint NOT NULL DEFAULT 0 CHECK (records_quarantined >= 0),
    records_missing bigint NOT NULL DEFAULT 0 CHECK (records_missing >= 0),
    metrics jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE integration.supplier_accounts
    ADD CONSTRAINT supplier_accounts_last_batch_fk
    FOREIGN KEY (last_successful_batch_id) REFERENCES integration.import_batches(id);

CREATE TABLE integration.raw_documents (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id uuid NOT NULL REFERENCES integration.import_batches(id) ON DELETE RESTRICT,
    source_url_redacted text,
    source_file_name text,
    object_key text NOT NULL,
    media_type text,
    compression text,
    byte_size bigint NOT NULL CHECK (byte_size >= 0),
    sha256 char(64) NOT NULL,
    supplier_is_ready boolean,
    received_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (batch_id, sha256)
);

CREATE TABLE integration.raw_records (
    batch_id uuid NOT NULL REFERENCES integration.import_batches(id) ON DELETE RESTRICT,
    ordinal bigint NOT NULL CHECK (ordinal > 0),
    entity_type text NOT NULL,
    external_key text,
    payload_xml text,
    payload_json jsonb,
    sha256 char(64) NOT NULL,
    PRIMARY KEY (batch_id, ordinal),
    CHECK ((payload_xml IS NOT NULL)::int + (payload_json IS NOT NULL)::int = 1)
);

CREATE TABLE integration.staging_products (
    batch_id uuid NOT NULL REFERENCES integration.import_batches(id) ON DELETE CASCADE,
    ordinal bigint NOT NULL,
    supplier_sku text,
    external_product_id text,
    parsed_data jsonb NOT NULL,
    identity_hash char(64),
    content_hash char(64),
    taxonomy_hash char(64),
    attribute_hash char(64),
    media_hash char(64),
    price_hash char(64),
    inventory_hash char(64),
    is_valid boolean NOT NULL DEFAULT false,
    PRIMARY KEY (batch_id, ordinal)
);

CREATE TABLE integration.import_issues (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    batch_id uuid NOT NULL REFERENCES integration.import_batches(id) ON DELETE CASCADE,
    raw_ordinal bigint,
    entity_type text,
    external_key text,
    severity text NOT NULL CHECK (severity IN ('INFO','WARNING','ERROR','FATAL')),
    issue_code text NOT NULL,
    field_path text,
    message text NOT NULL,
    details jsonb NOT NULL DEFAULT '{}'::jsonb,
    resolved_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX import_issues_batch_severity_idx
    ON integration.import_issues (batch_id, severity, issue_code);

CREATE TABLE integration.entity_change_log (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    batch_id uuid REFERENCES integration.import_batches(id),
    entity_type text NOT NULL,
    entity_id uuid NOT NULL,
    change_type text NOT NULL CHECK (change_type IN ('INSERT','UPDATE','STATUS','LINK','UNLINK','DELETE')),
    before_hash char(64),
    after_hash char(64),
    changed_fields text[] NOT NULL DEFAULT '{}',
    details jsonb NOT NULL DEFAULT '{}'::jsonb,
    changed_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX entity_change_log_entity_idx
    ON integration.entity_change_log (entity_type, entity_id, changed_at DESC);

CREATE TABLE integration.outbox_events (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    aggregate_type text NOT NULL,
    aggregate_id uuid NOT NULL,
    event_type text NOT NULL,
    aggregate_version bigint NOT NULL,
    payload jsonb NOT NULL,
    available_at timestamptz NOT NULL DEFAULT now(),
    processed_at timestamptz,
    attempts integer NOT NULL DEFAULT 0 CHECK (attempts >= 0),
    last_error text,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (aggregate_type, aggregate_id, aggregate_version, event_type)
);

CREATE INDEX outbox_pending_idx
    ON integration.outbox_events (available_at, id) WHERE processed_at IS NULL;

-- -----------------------------------------------------------------------------
-- Canonical products, supplier identities and manufacturers
-- -----------------------------------------------------------------------------

CREATE TABLE catalog.manufacturers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    canonical_name citext NOT NULL UNIQUE,
    slug text,
    website_url text,
    status text NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE','HIDDEN','MERGED')),
    merged_into_id uuid REFERENCES catalog.manufacturers(id),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE catalog.supplier_manufacturers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    source_system_id uuid NOT NULL REFERENCES integration.source_systems(id),
    external_producer_id text,
    external_code text NOT NULL,
    source_name text NOT NULL,
    source_hash char(64),
    first_seen_batch_id uuid REFERENCES integration.import_batches(id),
    last_seen_batch_id uuid REFERENCES integration.import_batches(id),
    UNIQUE (source_system_id, external_code),
    UNIQUE (source_system_id, external_producer_id)
);

CREATE TABLE catalog.manufacturer_mappings (
    supplier_manufacturer_id uuid PRIMARY KEY REFERENCES catalog.supplier_manufacturers(id),
    manufacturer_id uuid NOT NULL REFERENCES catalog.manufacturers(id),
    method text NOT NULL CHECK (method IN ('EXACT','ALIAS','RULE','AI','HUMAN')),
    confidence numeric(5,4) CHECK (confidence BETWEEN 0 AND 1),
    review_status text NOT NULL DEFAULT 'PENDING' CHECK (review_status IN ('PENDING','APPROVED','REJECTED')),
    decided_by text,
    decided_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE catalog.products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    manufacturer_id uuid REFERENCES catalog.manufacturers(id),
    product_type text NOT NULL DEFAULT 'PHYSICAL' CHECK (product_type IN ('PHYSICAL','SERVICE','BUNDLE')),
    lifecycle_status text NOT NULL DEFAULT 'DRAFT' CHECK (lifecycle_status IN (
        'DRAFT','ACTIVE','OUT_OF_STOCK','DISCONTINUED','HIDDEN','REMOVED'
    )),
    canonical_sku text UNIQUE,
    quality_score numeric(5,2) CHECK (quality_score BETWEEN 0 AND 100),
    version bigint NOT NULL DEFAULT 1 CHECK (version > 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE catalog.product_localizations (
    product_id uuid NOT NULL REFERENCES catalog.products(id) ON DELETE CASCADE,
    locale text NOT NULL,
    title text NOT NULL,
    short_description text,
    long_description text,
    source_type text NOT NULL DEFAULT 'HUMAN' CHECK (source_type IN ('SUPPLIER','RULE','AI','HUMAN')),
    approval_status text NOT NULL DEFAULT 'DRAFT' CHECK (approval_status IN ('DRAFT','APPROVED','REJECTED')),
    approved_by text,
    approved_at timestamptz,
    updated_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (product_id, locale)
);

CREATE TABLE catalog.product_identifiers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id uuid NOT NULL REFERENCES catalog.products(id) ON DELETE CASCADE,
    identifier_type text NOT NULL CHECK (identifier_type IN ('GTIN','MPN','SKU','ISBN','OTHER')),
    value text NOT NULL,
    normalized_value text NOT NULL,
    manufacturer_id uuid REFERENCES catalog.manufacturers(id),
    is_primary boolean NOT NULL DEFAULT false,
    validation_status text NOT NULL DEFAULT 'UNVERIFIED' CHECK (validation_status IN ('VALID','INVALID','UNVERIFIED','CONFLICT')),
    provenance text NOT NULL DEFAULT 'HUMAN',
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (product_id, identifier_type, normalized_value)
);

CREATE UNIQUE INDEX product_valid_gtin_uq
    ON catalog.product_identifiers (normalized_value)
    WHERE identifier_type = 'GTIN' AND validation_status = 'VALID';

CREATE TABLE catalog.supplier_products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_id uuid NOT NULL REFERENCES commerce.suppliers(id),
    source_system_id uuid NOT NULL REFERENCES integration.source_systems(id),
    supplier_manufacturer_id uuid REFERENCES catalog.supplier_manufacturers(id),
    external_product_id text,
    supplier_sku text NOT NULL,
    source_name text,
    source_b2c_name text,
    source_description text,
    source_short_description text,
    mpn text,
    mpn2 text,
    sales_unit text,
    order_multiple numeric(19,4) CHECK (order_multiple IS NULL OR order_multiple > 0),
    source_vat_percent numeric(7,4) CHECK (source_vat_percent IS NULL OR source_vat_percent >= 0),
    duty_rate_code text,
    reverse_charge_status char(1) CHECK (reverse_charge_status IS NULL OR reverse_charge_status IN ('Y','N','U')),
    reverse_charge_code text,
    b2c_eligible boolean,
    is_premium boolean,
    source_warranty_text text,
    img_count integer CHECK (img_count IS NULL OR img_count >= 0),
    img_last_changed_at timestamptz,
    pix_img_code text,
    offer_status text NOT NULL DEFAULT 'ACTIVE' CHECK (offer_status IN ('ACTIVE','DISABLED','MISSING','DISCONTINUED')),
    missing_streak integer NOT NULL DEFAULT 0 CHECK (missing_streak >= 0),
    first_seen_at timestamptz NOT NULL DEFAULT now(),
    last_seen_at timestamptz NOT NULL DEFAULT now(),
    first_seen_batch_id uuid REFERENCES integration.import_batches(id),
    last_seen_batch_id uuid REFERENCES integration.import_batches(id),
    identity_hash char(64),
    content_hash char(64),
    compliance_hash char(64),
    raw_extra jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (supplier_id, supplier_sku),
    UNIQUE (source_system_id, external_product_id)
);

CREATE INDEX supplier_products_mpn_idx ON catalog.supplier_products (lower(mpn));
CREATE INDEX supplier_products_last_seen_idx ON catalog.supplier_products (supplier_id, last_seen_at);

CREATE TABLE catalog.supplier_product_identifiers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_product_id uuid NOT NULL REFERENCES catalog.supplier_products(id) ON DELETE CASCADE,
    identifier_type text NOT NULL CHECK (identifier_type IN ('GTIN','MPN','MPN_ALT','OTHER')),
    raw_value text NOT NULL,
    normalized_value text,
    validation_status text NOT NULL DEFAULT 'UNVERIFIED' CHECK (validation_status IN ('VALID','INVALID','UNVERIFIED','CONFLICT')),
    first_seen_batch_id uuid REFERENCES integration.import_batches(id),
    last_seen_batch_id uuid REFERENCES integration.import_batches(id),
    UNIQUE (supplier_product_id, identifier_type, raw_value)
);

CREATE INDEX supplier_identifier_lookup_idx
    ON catalog.supplier_product_identifiers (identifier_type, normalized_value)
    WHERE normalized_value IS NOT NULL;

CREATE TABLE catalog.product_supplier_links (
    supplier_product_id uuid PRIMARY KEY REFERENCES catalog.supplier_products(id) ON DELETE CASCADE,
    product_id uuid NOT NULL REFERENCES catalog.products(id) ON DELETE RESTRICT,
    match_method text NOT NULL CHECK (match_method IN ('CREATED','GTIN','MPN_BRAND','RULE','AI','HUMAN')),
    confidence numeric(5,4) CHECK (confidence BETWEEN 0 AND 1),
    review_status text NOT NULL CHECK (review_status IN ('AUTO_APPROVED','PENDING','APPROVED','REJECTED')),
    linked_at timestamptz NOT NULL DEFAULT now(),
    linked_by text
);

CREATE INDEX product_supplier_links_product_idx ON catalog.product_supplier_links (product_id);

-- -----------------------------------------------------------------------------
-- Parallel taxonomies, closure, mappings and assignments
-- -----------------------------------------------------------------------------

CREATE TABLE catalog.taxonomies (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code text NOT NULL UNIQUE,
    name text NOT NULL,
    taxonomy_type text NOT NULL CHECK (taxonomy_type IN (
        'SUPPLIER_SUPERCATEGORY','SUPPLIER_NAVIGATOR','SUPPLIER_COMMODITY',
        'SUPPLIER_INDEX_1','SUPPLIER_INDEX_2','WORLDS_CATALOG','OTHER'
    )),
    source_system_id uuid REFERENCES integration.source_systems(id),
    locale text,
    version bigint NOT NULL DEFAULT 1,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE catalog.taxonomy_nodes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    taxonomy_id uuid NOT NULL REFERENCES catalog.taxonomies(id) ON DELETE CASCADE,
    parent_id uuid REFERENCES catalog.taxonomy_nodes(id),
    external_code text,
    external_system_id text,
    name text NOT NULL,
    slug text,
    commodity_external_code text,
    source_sort_path text,
    source_sort_code text,
    source_level integer CHECK (source_level IS NULL OR source_level >= 0),
    source_order integer,
    external_code_name text,
    active boolean NOT NULL DEFAULT true,
    source_hash char(64),
    first_seen_batch_id uuid REFERENCES integration.import_batches(id),
    last_seen_batch_id uuid REFERENCES integration.import_batches(id),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (taxonomy_id, external_code),
    CHECK (parent_id IS NULL OR parent_id <> id)
);

CREATE INDEX taxonomy_nodes_parent_idx ON catalog.taxonomy_nodes (taxonomy_id, parent_id);

CREATE TABLE catalog.taxonomy_node_closure (
    taxonomy_id uuid NOT NULL REFERENCES catalog.taxonomies(id) ON DELETE CASCADE,
    ancestor_id uuid NOT NULL REFERENCES catalog.taxonomy_nodes(id) ON DELETE CASCADE,
    descendant_id uuid NOT NULL REFERENCES catalog.taxonomy_nodes(id) ON DELETE CASCADE,
    depth integer NOT NULL CHECK (depth >= 0),
    PRIMARY KEY (taxonomy_id, ancestor_id, descendant_id)
);

CREATE INDEX taxonomy_closure_descendant_idx
    ON catalog.taxonomy_node_closure (taxonomy_id, descendant_id, depth);

CREATE TABLE catalog.taxonomy_node_links (
    from_node_id uuid NOT NULL REFERENCES catalog.taxonomy_nodes(id) ON DELETE CASCADE,
    to_node_id uuid NOT NULL REFERENCES catalog.taxonomy_nodes(id) ON DELETE CASCADE,
    link_type text NOT NULL,
    source_batch_id uuid REFERENCES integration.import_batches(id),
    PRIMARY KEY (from_node_id, to_node_id, link_type)
);

CREATE TABLE catalog.supplier_product_taxonomy_assignments (
    supplier_product_id uuid NOT NULL REFERENCES catalog.supplier_products(id) ON DELETE CASCADE,
    taxonomy_node_id uuid NOT NULL REFERENCES catalog.taxonomy_nodes(id) ON DELETE CASCADE,
    is_primary boolean NOT NULL DEFAULT false,
    is_implicit boolean,
    source_order integer,
    source_batch_id uuid REFERENCES integration.import_batches(id),
    PRIMARY KEY (supplier_product_id, taxonomy_node_id)
);

CREATE INDEX supplier_taxonomy_products_idx
    ON catalog.supplier_product_taxonomy_assignments (taxonomy_node_id, supplier_product_id);

CREATE TABLE catalog.product_taxonomy_assignments (
    product_id uuid NOT NULL REFERENCES catalog.products(id) ON DELETE CASCADE,
    taxonomy_node_id uuid NOT NULL REFERENCES catalog.taxonomy_nodes(id) ON DELETE CASCADE,
    assignment_method text NOT NULL CHECK (assignment_method IN ('SOURCE','MAPPING','RULE','AI_AUTO','HUMAN')),
    confidence numeric(5,4) CHECK (confidence BETWEEN 0 AND 1),
    is_primary boolean NOT NULL DEFAULT false,
    approval_status text NOT NULL DEFAULT 'APPROVED' CHECK (approval_status IN ('PENDING','APPROVED','REJECTED')),
    assigned_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (product_id, taxonomy_node_id)
);

CREATE INDEX product_taxonomy_node_idx
    ON catalog.product_taxonomy_assignments (taxonomy_node_id, product_id);

CREATE TABLE catalog.category_mappings (
    source_node_id uuid NOT NULL REFERENCES catalog.taxonomy_nodes(id) ON DELETE CASCADE,
    target_node_id uuid NOT NULL REFERENCES catalog.taxonomy_nodes(id) ON DELETE CASCADE,
    mapping_method text NOT NULL CHECK (mapping_method IN ('RULE','AI','HUMAN')),
    confidence numeric(5,4) CHECK (confidence BETWEEN 0 AND 1),
    status text NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','APPROVED','REJECTED')),
    condition_json jsonb NOT NULL DEFAULT '{}'::jsonb,
    decided_by text,
    decided_at timestamptz,
    PRIMARY KEY (source_node_id, target_node_id)
);

-- -----------------------------------------------------------------------------
-- Attributes, allowed values and product values
-- -----------------------------------------------------------------------------

CREATE TABLE catalog.attributes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    source_system_id uuid REFERENCES integration.source_systems(id),
    external_code text,
    code text NOT NULL,
    name text NOT NULL,
    data_type text NOT NULL DEFAULT 'ENUM' CHECK (data_type IN ('ENUM','TEXT','INTEGER','DECIMAL','BOOLEAN','DATE')),
    unit_code text,
    allows_multiple boolean NOT NULL DEFAULT true,
    active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (code),
    UNIQUE (source_system_id, external_code)
);

CREATE TABLE catalog.attribute_values (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    attribute_id uuid NOT NULL REFERENCES catalog.attributes(id) ON DELETE CASCADE,
    external_value_code text,
    canonical_value text NOT NULL,
    normalized_value text,
    sort_order integer,
    active boolean NOT NULL DEFAULT true,
    UNIQUE (attribute_id, external_value_code)
);

CREATE INDEX attribute_value_lookup_idx
    ON catalog.attribute_values (attribute_id, normalized_value);

CREATE TABLE catalog.category_attributes (
    taxonomy_node_id uuid NOT NULL REFERENCES catalog.taxonomy_nodes(id) ON DELETE CASCADE,
    attribute_id uuid NOT NULL REFERENCES catalog.attributes(id) ON DELETE CASCADE,
    is_primary boolean NOT NULL DEFAULT false,
    filter_operator text NOT NULL DEFAULT 'OR' CHECK (filter_operator IN ('AND','OR')),
    is_required boolean NOT NULL DEFAULT false,
    is_filterable boolean NOT NULL DEFAULT true,
    display_order integer,
    source_batch_id uuid REFERENCES integration.import_batches(id),
    PRIMARY KEY (taxonomy_node_id, attribute_id)
);

CREATE TABLE catalog.supplier_product_attribute_values (
    supplier_product_id uuid NOT NULL REFERENCES catalog.supplier_products(id) ON DELETE CASCADE,
    attribute_id uuid NOT NULL REFERENCES catalog.attributes(id) ON DELETE CASCADE,
    attribute_value_id uuid NOT NULL REFERENCES catalog.attribute_values(id) ON DELETE CASCADE,
    source_batch_id uuid REFERENCES integration.import_batches(id),
    PRIMARY KEY (supplier_product_id, attribute_id, attribute_value_id)
);

CREATE INDEX supplier_attribute_facet_idx
    ON catalog.supplier_product_attribute_values (attribute_id, attribute_value_id, supplier_product_id);

CREATE TABLE catalog.product_attribute_values (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id uuid NOT NULL REFERENCES catalog.products(id) ON DELETE CASCADE,
    attribute_id uuid NOT NULL REFERENCES catalog.attributes(id) ON DELETE CASCADE,
    attribute_value_id uuid REFERENCES catalog.attribute_values(id),
    value_text text,
    value_integer bigint,
    value_decimal numeric(24,8),
    value_boolean boolean,
    value_date date,
    unit_code text,
    provenance text NOT NULL CHECK (provenance IN ('SUPPLIER','MAPPING','RULE','AI','HUMAN')),
    approval_status text NOT NULL DEFAULT 'PENDING' CHECK (approval_status IN ('PENDING','APPROVED','REJECTED')),
    source_supplier_product_id uuid REFERENCES catalog.supplier_products(id),
    confidence numeric(5,4) CHECK (confidence BETWEEN 0 AND 1),
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (
        (attribute_value_id IS NOT NULL)::int +
        (value_text IS NOT NULL)::int +
        (value_integer IS NOT NULL)::int +
        (value_decimal IS NOT NULL)::int +
        (value_boolean IS NOT NULL)::int +
        (value_date IS NOT NULL)::int = 1
    )
);

CREATE INDEX product_attribute_facet_idx
    ON catalog.product_attribute_values (attribute_id, attribute_value_id, product_id)
    WHERE approval_status = 'APPROVED';

CREATE TABLE catalog.attribute_mappings (
    source_attribute_id uuid NOT NULL REFERENCES catalog.attributes(id) ON DELETE CASCADE,
    target_attribute_id uuid NOT NULL REFERENCES catalog.attributes(id) ON DELETE CASCADE,
    transform_rule jsonb NOT NULL DEFAULT '{}'::jsonb,
    status text NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','APPROVED','REJECTED')),
    PRIMARY KEY (source_attribute_id, target_attribute_id)
);

CREATE TABLE catalog.attribute_value_mappings (
    source_value_id uuid NOT NULL REFERENCES catalog.attribute_values(id) ON DELETE CASCADE,
    target_value_id uuid NOT NULL REFERENCES catalog.attribute_values(id) ON DELETE CASCADE,
    status text NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','APPROVED','REJECTED')),
    PRIMARY KEY (source_value_id, target_value_id)
);

-- -----------------------------------------------------------------------------
-- Media, packaging, warranties and marketing relations
-- -----------------------------------------------------------------------------

CREATE TABLE catalog.media_assets (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    object_key text NOT NULL UNIQUE,
    sha256 char(64) NOT NULL,
    media_type text NOT NULL,
    byte_size bigint NOT NULL CHECK (byte_size >= 0),
    width_px integer CHECK (width_px IS NULL OR width_px > 0),
    height_px integer CHECK (height_px IS NULL OR height_px > 0),
    retrieval_status text NOT NULL DEFAULT 'PENDING' CHECK (retrieval_status IN ('PENDING','READY','FAILED','REJECTED')),
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE catalog.source_media_assets (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    source_system_id uuid NOT NULL REFERENCES integration.source_systems(id),
    source_url text NOT NULL,
    media_asset_id uuid REFERENCES catalog.media_assets(id),
    source_kind text NOT NULL CHECK (source_kind IN ('PRODUCT','CATEGORY','UNKNOWN_ED')),
    etag text,
    last_modified text,
    source_hash char(64),
    first_seen_batch_id uuid REFERENCES integration.import_batches(id),
    last_seen_batch_id uuid REFERENCES integration.import_batches(id),
    UNIQUE (source_system_id, source_url)
);

CREATE TABLE catalog.supplier_product_media (
    supplier_product_id uuid NOT NULL REFERENCES catalog.supplier_products(id) ON DELETE CASCADE,
    source_media_asset_id uuid NOT NULL REFERENCES catalog.source_media_assets(id) ON DELETE CASCADE,
    source_position integer NOT NULL DEFAULT 0 CHECK (source_position >= 0),
    source_provenance text NOT NULL DEFAULT 'UNKNOWN_ED' CHECK (source_provenance IN ('DIRECT_PRODUCT','INDEX_INHERITED','UNKNOWN_ED')),
    source_batch_id uuid REFERENCES integration.import_batches(id),
    PRIMARY KEY (supplier_product_id, source_media_asset_id)
);

CREATE TABLE catalog.product_media (
    product_id uuid NOT NULL REFERENCES catalog.products(id) ON DELETE CASCADE,
    media_asset_id uuid NOT NULL REFERENCES catalog.media_assets(id) ON DELETE CASCADE,
    locale text NOT NULL DEFAULT 'sk-SK',
    role text NOT NULL DEFAULT 'GALLERY' CHECK (role IN ('PRIMARY','GALLERY','MANUAL','DATASHEET','OTHER')),
    position integer NOT NULL DEFAULT 0 CHECK (position >= 0),
    alt_text text,
    provenance text NOT NULL CHECK (provenance IN ('SUPPLIER','HUMAN','GENERATED')),
    approved boolean NOT NULL DEFAULT false,
    PRIMARY KEY (product_id, media_asset_id, locale, role)
);

CREATE UNIQUE INDEX one_primary_media_per_product_locale
    ON catalog.product_media (product_id, locale)
    WHERE role = 'PRIMARY';

CREATE TABLE catalog.taxonomy_node_media (
    taxonomy_node_id uuid NOT NULL REFERENCES catalog.taxonomy_nodes(id) ON DELETE CASCADE,
    source_media_asset_id uuid NOT NULL REFERENCES catalog.source_media_assets(id) ON DELETE CASCADE,
    position integer NOT NULL DEFAULT 0,
    PRIMARY KEY (taxonomy_node_id, source_media_asset_id)
);

CREATE TABLE catalog.supplier_packaging (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_product_id uuid NOT NULL REFERENCES catalog.supplier_products(id) ON DELETE CASCADE,
    unit_type text NOT NULL CHECK (unit_type IN ('JEDN','PACK','OTHER')),
    item_count numeric(19,4) CHECK (item_count IS NULL OR item_count > 0),
    weight_kg numeric(19,6) CHECK (weight_kg IS NULL OR weight_kg >= 0),
    length_cm numeric(19,4) CHECK (length_cm IS NULL OR length_cm >= 0),
    width_cm numeric(19,4) CHECK (width_cm IS NULL OR width_cm >= 0),
    height_cm numeric(19,4) CHECK (height_cm IS NULL OR height_cm >= 0),
    source_batch_id uuid REFERENCES integration.import_batches(id),
    UNIQUE (supplier_product_id, unit_type, item_count)
);

CREATE TABLE catalog.product_warranties (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id uuid REFERENCES catalog.products(id) ON DELETE CASCADE,
    supplier_product_id uuid REFERENCES catalog.supplier_products(id) ON DELETE CASCADE,
    warranty_type text NOT NULL DEFAULT 'STANDARD',
    term numeric(19,4) CHECK (term IS NULL OR term >= 0),
    unit text,
    raw_text text,
    provenance text NOT NULL CHECK (provenance IN ('SUPPLIER','HUMAN')),
    CHECK (product_id IS NOT NULL OR supplier_product_id IS NOT NULL)
);

CREATE TABLE catalog.marketing_flags (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    source_system_id uuid NOT NULL REFERENCES integration.source_systems(id),
    external_code text NOT NULL,
    name text NOT NULL,
    is_top_flag boolean NOT NULL DEFAULT false,
    UNIQUE (source_system_id, external_code)
);

CREATE TABLE catalog.supplier_product_marketing_flags (
    supplier_product_id uuid NOT NULL REFERENCES catalog.supplier_products(id) ON DELETE CASCADE,
    marketing_flag_id uuid NOT NULL REFERENCES catalog.marketing_flags(id) ON DELETE CASCADE,
    source_channel text NOT NULL CHECK (source_channel IN ('STATUS','INFO_CODE','EXT_INFO','IS_TOP')),
    source_batch_id uuid REFERENCES integration.import_batches(id),
    PRIMARY KEY (supplier_product_id, marketing_flag_id, source_channel)
);

CREATE TABLE catalog.relation_types (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    source_system_id uuid REFERENCES integration.source_systems(id),
    external_type_id text,
    source_name text,
    canonical_code text NOT NULL,
    UNIQUE (source_system_id, external_type_id)
);

CREATE TABLE catalog.product_relations (
    parent_product_id uuid NOT NULL REFERENCES catalog.products(id) ON DELETE CASCADE,
    child_product_id uuid NOT NULL REFERENCES catalog.products(id) ON DELETE CASCADE,
    relation_type_id uuid NOT NULL REFERENCES catalog.relation_types(id),
    quantity numeric(19,4) CHECK (quantity IS NULL OR quantity > 0),
    provenance text NOT NULL CHECK (provenance IN ('SUPPLIER','RULE','AI','HUMAN')),
    source_batch_id uuid REFERENCES integration.import_batches(id),
    PRIMARY KEY (parent_product_id, child_product_id, relation_type_id),
    CHECK (parent_product_id <> child_product_id)
);

CREATE TABLE integration.unresolved_product_relations (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    batch_id uuid NOT NULL REFERENCES integration.import_batches(id),
    parent_external_id text,
    parent_supplier_sku text,
    child_external_id text,
    child_supplier_sku text,
    external_relation_type_id text,
    source_relation_name text,
    quantity numeric(19,4),
    resolution_status text NOT NULL DEFAULT 'PENDING' CHECK (resolution_status IN ('PENDING','RESOLVED','REJECTED')),
    details jsonb NOT NULL DEFAULT '{}'::jsonb
);

-- -----------------------------------------------------------------------------
-- Supplier prices, selling prices, inventory and availability
-- -----------------------------------------------------------------------------

CREATE TABLE commerce.currencies (
    code char(3) PRIMARY KEY,
    decimal_places smallint NOT NULL DEFAULT 2 CHECK (decimal_places BETWEEN 0 AND 6),
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE commerce.tax_codes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code text NOT NULL UNIQUE,
    name text NOT NULL,
    reverse_charge_eligible boolean NOT NULL DEFAULT false
);

CREATE TABLE commerce.tax_rates (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tax_code_id uuid NOT NULL REFERENCES commerce.tax_codes(id),
    country_code char(2) NOT NULL,
    rate_percent numeric(7,4) NOT NULL CHECK (rate_percent >= 0),
    valid_from date NOT NULL,
    valid_to date,
    CHECK (valid_to IS NULL OR valid_to > valid_from),
    UNIQUE (tax_code_id, country_code, valid_from)
);

CREATE TABLE commerce.supplier_price_snapshots (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    supplier_product_id uuid NOT NULL REFERENCES catalog.supplier_products(id) ON DELETE CASCADE,
    batch_id uuid NOT NULL REFERENCES integration.import_batches(id),
    observed_at timestamptz NOT NULL,
    currency_code char(3) NOT NULL REFERENCES commerce.currencies(code),
    net_cost_excluding_fees numeric(19,4) CHECK (net_cost_excluding_fees IS NULL OR net_cost_excluding_fees >= 0),
    net_cost_including_fees numeric(19,4) CHECK (net_cost_including_fees IS NULL OR net_cost_including_fees >= 0),
    dealer_price numeric(19,4) CHECK (dealer_price IS NULL OR dealer_price >= 0),
    dealer_price_1 numeric(19,4) CHECK (dealer_price_1 IS NULL OR dealer_price_1 >= 0),
    recommended_retail_price numeric(19,4) CHECK (recommended_retail_price IS NULL OR recommended_retail_price >= 0),
    source_vat_percent numeric(7,4) CHECK (source_vat_percent IS NULL OR source_vat_percent >= 0),
    price_hash char(64) NOT NULL,
    UNIQUE (supplier_product_id, batch_id)
);

CREATE INDEX supplier_price_latest_idx
    ON commerce.supplier_price_snapshots (supplier_product_id, observed_at DESC);

CREATE TABLE commerce.supplier_price_breaks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_price_snapshot_id bigint NOT NULL REFERENCES commerce.supplier_price_snapshots(id) ON DELETE CASCADE,
    break_type text NOT NULL DEFAULT 'VALUE_PACK',
    minimum_quantity numeric(19,4) NOT NULL CHECK (minimum_quantity > 0),
    source_value numeric(19,4) NOT NULL CHECK (source_value >= 0),
    interpretation_status text NOT NULL DEFAULT 'UNVERIFIED' CHECK (interpretation_status IN ('UNVERIFIED','DISCOUNT_AMOUNT','UNIT_PRICE','OTHER')),
    raw_semantics jsonb NOT NULL DEFAULT '{}'::jsonb,
    UNIQUE (supplier_price_snapshot_id, break_type, minimum_quantity)
);

CREATE TABLE commerce.supplier_price_fees (
    supplier_price_snapshot_id bigint NOT NULL REFERENCES commerce.supplier_price_snapshots(id) ON DELETE CASCADE,
    fee_type text NOT NULL,
    amount numeric(19,4) NOT NULL CHECK (amount >= 0),
    currency_code char(3) NOT NULL REFERENCES commerce.currencies(code),
    PRIMARY KEY (supplier_price_snapshot_id, fee_type)
);

CREATE TABLE commerce.price_lists (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code text NOT NULL UNIQUE,
    name text NOT NULL,
    currency_code char(3) NOT NULL REFERENCES commerce.currencies(code),
    country_code char(2) NOT NULL,
    customer_segment text,
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE commerce.pricing_rules (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    price_list_id uuid NOT NULL REFERENCES commerce.price_lists(id) ON DELETE CASCADE,
    priority integer NOT NULL,
    condition_json jsonb NOT NULL,
    calculation_json jsonb NOT NULL,
    valid_from timestamptz,
    valid_to timestamptz,
    active boolean NOT NULL DEFAULT true,
    CHECK (valid_to IS NULL OR valid_from IS NULL OR valid_to > valid_from),
    UNIQUE (price_list_id, priority, id)
);

CREATE TABLE commerce.product_prices (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id uuid NOT NULL REFERENCES catalog.products(id) ON DELETE CASCADE,
    price_list_id uuid NOT NULL REFERENCES commerce.price_lists(id) ON DELETE CASCADE,
    net_amount numeric(19,4) NOT NULL CHECK (net_amount >= 0),
    gross_amount numeric(19,4) NOT NULL CHECK (gross_amount >= 0),
    tax_rate_percent numeric(7,4) NOT NULL CHECK (tax_rate_percent >= 0),
    source_supplier_product_id uuid REFERENCES catalog.supplier_products(id),
    pricing_rule_id uuid REFERENCES commerce.pricing_rules(id),
    valid_from timestamptz NOT NULL,
    valid_to timestamptz,
    calculation_trace jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    CHECK (gross_amount >= net_amount),
    CHECK (valid_to IS NULL OR valid_to > valid_from)
);

CREATE INDEX product_prices_current_idx
    ON commerce.product_prices (product_id, price_list_id, valid_from DESC)
    WHERE valid_to IS NULL;

ALTER TABLE commerce.product_prices
    ADD CONSTRAINT product_prices_no_overlap
    EXCLUDE USING gist (
        product_id WITH =,
        price_list_id WITH =,
        tstzrange(valid_from, valid_to, '[)') WITH &&
    );

CREATE TABLE commerce.inventory_locations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_id uuid REFERENCES commerce.suppliers(id),
    code text NOT NULL,
    name text NOT NULL,
    location_type text NOT NULL CHECK (location_type IN ('SUPPLIER_CENTRAL','SUPPLIER_EXTERNAL','LOCAL','VIRTUAL')),
    country_code char(2),
    active boolean NOT NULL DEFAULT true,
    UNIQUE NULLS NOT DISTINCT (supplier_id, code)
);

CREATE TABLE commerce.supplier_inventory_current (
    supplier_product_id uuid NOT NULL REFERENCES catalog.supplier_products(id) ON DELETE CASCADE,
    inventory_location_id uuid NOT NULL REFERENCES commerce.inventory_locations(id),
    available_quantity numeric(19,4) NOT NULL CHECK (available_quantity >= 0),
    is_central_in_stock boolean,
    source_status_text text,
    expected_at timestamptz,
    raw_expected_date text,
    availability_date_known boolean NOT NULL DEFAULT false,
    observed_at timestamptz NOT NULL,
    batch_id uuid NOT NULL REFERENCES integration.import_batches(id),
    inventory_hash char(64) NOT NULL,
    PRIMARY KEY (supplier_product_id, inventory_location_id)
);

CREATE TABLE commerce.supplier_inventory_snapshots (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    supplier_product_id uuid NOT NULL REFERENCES catalog.supplier_products(id) ON DELETE CASCADE,
    inventory_location_id uuid NOT NULL REFERENCES commerce.inventory_locations(id),
    available_quantity numeric(19,4) NOT NULL CHECK (available_quantity >= 0),
    is_central_in_stock boolean,
    source_status_text text,
    expected_at timestamptz,
    raw_expected_date text,
    observed_at timestamptz NOT NULL,
    batch_id uuid NOT NULL REFERENCES integration.import_batches(id),
    inventory_hash char(64) NOT NULL,
    UNIQUE (supplier_product_id, inventory_location_id, batch_id)
);

CREATE INDEX supplier_inventory_history_idx
    ON commerce.supplier_inventory_snapshots (supplier_product_id, observed_at DESC);

CREATE TABLE commerce.supplier_future_availability (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_product_id uuid NOT NULL REFERENCES catalog.supplier_products(id) ON DELETE CASCADE,
    expected_at timestamptz,
    expected_quantity numeric(19,4) CHECK (expected_quantity IS NULL OR expected_quantity >= 0),
    raw_expected_date text,
    date_known boolean NOT NULL DEFAULT false,
    source_batch_id uuid NOT NULL REFERENCES integration.import_batches(id),
    observed_at timestamptz NOT NULL
);

CREATE TABLE commerce.inventory_reservations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id uuid NOT NULL REFERENCES catalog.products(id),
    supplier_product_id uuid REFERENCES catalog.supplier_products(id),
    quantity numeric(19,4) NOT NULL CHECK (quantity > 0),
    status text NOT NULL CHECK (status IN ('ACTIVE','CONSUMED','RELEASED','EXPIRED')),
    order_id uuid,
    expires_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX inventory_reservations_active_idx
    ON commerce.inventory_reservations (product_id, supplier_product_id)
    WHERE status = 'ACTIVE';

CREATE TABLE commerce.sellable_inventory (
    product_id uuid NOT NULL REFERENCES catalog.products(id) ON DELETE CASCADE,
    supplier_product_id uuid NOT NULL REFERENCES catalog.supplier_products(id) ON DELETE CASCADE,
    sellable_quantity numeric(19,4) NOT NULL CHECK (sellable_quantity >= 0),
    safety_stock numeric(19,4) NOT NULL DEFAULT 0 CHECK (safety_stock >= 0),
    expected_at timestamptz,
    calculated_at timestamptz NOT NULL,
    calculation_trace jsonb NOT NULL DEFAULT '{}'::jsonb,
    PRIMARY KEY (product_id, supplier_product_id)
);

-- -----------------------------------------------------------------------------
-- SEO, slugs and redirects
-- -----------------------------------------------------------------------------

CREATE TABLE catalog.product_seo (
    product_id uuid NOT NULL REFERENCES catalog.products(id) ON DELETE CASCADE,
    locale text NOT NULL,
    seo_title text,
    meta_description text,
    h1 text,
    canonical_policy text NOT NULL DEFAULT 'SELF' CHECK (canonical_policy IN ('SELF','OTHER','NOINDEX')),
    canonical_target_product_id uuid REFERENCES catalog.products(id),
    robots_policy text NOT NULL DEFAULT 'INDEX_FOLLOW' CHECK (robots_policy IN ('INDEX_FOLLOW','NOINDEX_FOLLOW','NOINDEX_NOFOLLOW')),
    structured_data_eligible boolean NOT NULL DEFAULT false,
    provenance text NOT NULL DEFAULT 'HUMAN' CHECK (provenance IN ('RULE','AI','HUMAN')),
    approval_status text NOT NULL DEFAULT 'DRAFT' CHECK (approval_status IN ('DRAFT','APPROVED','REJECTED')),
    updated_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (product_id, locale)
);

CREATE TABLE catalog.slugs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type text NOT NULL CHECK (entity_type IN ('PRODUCT','TAXONOMY_NODE','MANUFACTURER','CONTENT')),
    entity_id uuid NOT NULL,
    locale text NOT NULL,
    path citext NOT NULL,
    is_current boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX slugs_current_path_uq ON catalog.slugs (locale, path) WHERE is_current;
CREATE UNIQUE INDEX slugs_current_entity_uq ON catalog.slugs (entity_type, entity_id, locale) WHERE is_current;

CREATE TABLE catalog.redirects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    locale text NOT NULL,
    source_path citext NOT NULL,
    target_path text NOT NULL,
    http_status smallint NOT NULL CHECK (http_status IN (301,302,307,308,410)),
    reason text NOT NULL,
    source_entity_type text,
    source_entity_id uuid,
    active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (locale, source_path)
);

-- -----------------------------------------------------------------------------
-- AI suggestions, reviews and final decisions
-- -----------------------------------------------------------------------------

CREATE TABLE ai.ai_runs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    run_type text NOT NULL,
    provider text NOT NULL,
    model text NOT NULL,
    model_version text,
    prompt_version text NOT NULL,
    schema_version text NOT NULL,
    input_hash char(64) NOT NULL,
    parameters jsonb NOT NULL DEFAULT '{}'::jsonb,
    token_usage jsonb,
    cost_amount numeric(19,6),
    started_at timestamptz NOT NULL DEFAULT now(),
    completed_at timestamptz,
    status text NOT NULL DEFAULT 'RUNNING' CHECK (status IN ('RUNNING','SUCCEEDED','FAILED'))
);

CREATE TABLE ai.ai_suggestions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    ai_run_id uuid NOT NULL REFERENCES ai.ai_runs(id) ON DELETE CASCADE,
    product_id uuid REFERENCES catalog.products(id) ON DELETE CASCADE,
    supplier_product_id uuid REFERENCES catalog.supplier_products(id) ON DELETE CASCADE,
    suggestion_type text NOT NULL CHECK (suggestion_type IN (
        'CATEGORY','ATTRIBUTE','ATTRIBUTE_VALUE','MANUFACTURER','TITLE','DESCRIPTION','SEO','RELATION'
    )),
    target_entity_id uuid,
    proposed_value jsonb NOT NULL,
    confidence numeric(5,4) NOT NULL CHECK (confidence BETWEEN 0 AND 1),
    alternatives jsonb NOT NULL DEFAULT '[]'::jsonb,
    evidence jsonb NOT NULL DEFAULT '[]'::jsonb,
    status text NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','AUTO_ACCEPTED','ACCEPTED','REJECTED','SUPERSEDED')),
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX ai_suggestions_review_idx
    ON ai.ai_suggestions (suggestion_type, status, confidence DESC);

CREATE TABLE ai.review_tasks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    task_type text NOT NULL,
    product_id uuid REFERENCES catalog.products(id) ON DELETE CASCADE,
    supplier_product_id uuid REFERENCES catalog.supplier_products(id) ON DELETE CASCADE,
    ai_suggestion_id uuid REFERENCES ai.ai_suggestions(id),
    priority integer NOT NULL DEFAULT 100,
    status text NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN','ASSIGNED','APPROVED','REJECTED','CANCELLED')),
    assigned_to text,
    decision_reason text,
    decided_by text,
    decided_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX review_tasks_queue_idx ON ai.review_tasks (status, priority, created_at);

CREATE TABLE ai.classification_decisions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id uuid NOT NULL REFERENCES catalog.products(id) ON DELETE CASCADE,
    taxonomy_id uuid NOT NULL REFERENCES catalog.taxonomies(id),
    taxonomy_node_id uuid NOT NULL REFERENCES catalog.taxonomy_nodes(id),
    method text NOT NULL CHECK (method IN ('RULE','AI_AUTO','HUMAN')),
    confidence numeric(5,4) CHECK (confidence BETWEEN 0 AND 1),
    ai_suggestion_id uuid REFERENCES ai.ai_suggestions(id),
    evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
    is_current boolean NOT NULL DEFAULT true,
    decided_by text,
    decided_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX one_current_classification_per_taxonomy
    ON ai.classification_decisions (product_id, taxonomy_id)
    WHERE is_current;

-- -----------------------------------------------------------------------------
-- Search projection and synchronization
-- -----------------------------------------------------------------------------

CREATE TABLE search.search_documents (
    product_id uuid NOT NULL REFERENCES catalog.products(id) ON DELETE CASCADE,
    locale text NOT NULL,
    catalog_version bigint NOT NULL,
    title text NOT NULL,
    manufacturer text,
    identifiers text[] NOT NULL DEFAULT '{}',
    category_paths text[] NOT NULL DEFAULT '{}',
    searchable_text text NOT NULL,
    filter_values jsonb NOT NULL DEFAULT '{}'::jsonb,
    price_amount numeric(19,4),
    currency_code char(3),
    sellable_quantity numeric(19,4),
    availability_status text,
    slug_path text,
    content_hash char(64) NOT NULL,
    indexed_at timestamptz,
    updated_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (product_id, locale)
);

CREATE INDEX search_documents_filter_gin ON search.search_documents USING gin (filter_values);
CREATE INDEX search_documents_identifiers_gin ON search.search_documents USING gin (identifiers);

CREATE TABLE search.search_sync_queue (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id uuid NOT NULL REFERENCES catalog.products(id) ON DELETE CASCADE,
    locale text NOT NULL,
    requested_version bigint NOT NULL,
    operation text NOT NULL CHECK (operation IN ('UPSERT','DELETE')),
    status text NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','PROCESSING','SUCCEEDED','FAILED')),
    attempts integer NOT NULL DEFAULT 0,
    next_attempt_at timestamptz NOT NULL DEFAULT now(),
    last_error text,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (product_id, locale, requested_version, operation)
);

CREATE INDEX search_sync_pending_idx
    ON search.search_sync_queue (next_attempt_at, id)
    WHERE status IN ('PENDING','FAILED');

-- -----------------------------------------------------------------------------
-- Customer orders and eD supplier-order integration
-- -----------------------------------------------------------------------------

CREATE TABLE commerce.orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number text NOT NULL UNIQUE,
    customer_id uuid,
    customer_email citext,
    customer_telephone text,
    currency_code char(3) NOT NULL REFERENCES commerce.currencies(code),
    net_total numeric(19,4) NOT NULL CHECK (net_total >= 0),
    tax_total numeric(19,4) NOT NULL CHECK (tax_total >= 0),
    gross_total numeric(19,4) NOT NULL CHECK (gross_total >= 0),
    status text NOT NULL CHECK (status IN ('DRAFT','PLACED','ALLOCATED','SUBMITTED','PARTIALLY_FULFILLED','FULFILLED','CANCELLED')),
    placed_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CHECK (gross_total = net_total + tax_total)
);

CREATE TABLE commerce.order_addresses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id uuid NOT NULL REFERENCES commerce.orders(id) ON DELETE CASCADE,
    address_type text NOT NULL CHECK (address_type IN ('SHIPPING','BILLING')),
    name text NOT NULL,
    company text,
    street text NOT NULL,
    city text NOT NULL,
    postal_code text NOT NULL,
    country_code char(2) NOT NULL,
    snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
    UNIQUE (order_id, address_type)
);

CREATE TABLE commerce.order_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id uuid NOT NULL REFERENCES commerce.orders(id) ON DELETE CASCADE,
    product_id uuid NOT NULL REFERENCES catalog.products(id),
    sku_snapshot text,
    title_snapshot text NOT NULL,
    quantity numeric(19,4) NOT NULL CHECK (quantity > 0),
    currency_code char(3) NOT NULL REFERENCES commerce.currencies(code),
    unit_net numeric(19,4) NOT NULL CHECK (unit_net >= 0),
    unit_tax numeric(19,4) NOT NULL CHECK (unit_tax >= 0),
    unit_gross numeric(19,4) NOT NULL CHECK (unit_gross >= 0),
    vat_percent numeric(7,4) NOT NULL CHECK (vat_percent >= 0),
    line_net numeric(19,4) NOT NULL CHECK (line_net >= 0),
    line_tax numeric(19,4) NOT NULL CHECK (line_tax >= 0),
    line_gross numeric(19,4) NOT NULL CHECK (line_gross >= 0),
    CHECK (unit_gross = unit_net + unit_tax),
    CHECK (line_gross = line_net + line_tax)
);

ALTER TABLE commerce.inventory_reservations
    ADD CONSTRAINT inventory_reservations_order_fk
    FOREIGN KEY (order_id) REFERENCES commerce.orders(id);

CREATE TABLE commerce.supplier_transport_methods (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_id uuid NOT NULL REFERENCES commerce.suppliers(id),
    source_system_id uuid NOT NULL REFERENCES integration.source_systems(id),
    order_mode text NOT NULL CHECK (order_mode IN ('B2B','B2C')),
    external_code text NOT NULL,
    name text NOT NULL,
    external_type_code text,
    active boolean NOT NULL DEFAULT true,
    source_batch_id uuid REFERENCES integration.import_batches(id),
    UNIQUE (source_system_id, order_mode, external_code)
);

CREATE TABLE commerce.supplier_orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id uuid NOT NULL REFERENCES commerce.orders(id),
    supplier_id uuid NOT NULL REFERENCES commerce.suppliers(id),
    supplier_account_id uuid NOT NULL REFERENCES integration.supplier_accounts(id),
    order_mode text NOT NULL CHECK (order_mode IN ('B2B','B2C')),
    customer_order_symbol text NOT NULL,
    customer_invoice_code text,
    supplier_order_symbol text,
    transport_method_id uuid REFERENCES commerce.supplier_transport_methods(id),
    delivery_without_invoice boolean NOT NULL DEFAULT false,
    delivery_without_delivery_note boolean NOT NULL DEFAULT false,
    no_cash_on_delivery boolean NOT NULL DEFAULT false,
    deferred_invoicing boolean NOT NULL DEFAULT false,
    price_total_mode boolean NOT NULL DEFAULT false,
    customer_currency char(3),
    status text NOT NULL DEFAULT 'CREATED' CHECK (status IN (
        'CREATED','VALIDATING','READY','SUBMITTING','ACCEPTED','EXPLICIT_ERROR',
        'SUBMISSION_UNKNOWN','RECONCILED','CANCELLED'
    )),
    test_mode boolean NOT NULL DEFAULT false,
    order_note text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (supplier_id, customer_order_symbol),
    UNIQUE (supplier_id, customer_invoice_code)
);

CREATE TABLE commerce.supplier_order_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_order_id uuid NOT NULL REFERENCES commerce.supplier_orders(id) ON DELETE CASCADE,
    order_item_id uuid REFERENCES commerce.order_items(id),
    supplier_product_id uuid REFERENCES catalog.supplier_products(id),
    supplier_product_code_snapshot text NOT NULL,
    line_type text NOT NULL DEFAULT 'PRODUCT' CHECK (line_type IN ('PRODUCT','TRANSPORT','FEE')),
    quantity numeric(19,4) NOT NULL CHECK (quantity > 0),
    currency_code char(3) REFERENCES commerce.currencies(code),
    unit_price numeric(19,4),
    unit_price_vat numeric(19,4),
    vat_multiplier numeric(9,6),
    source_cost_snapshot numeric(19,4),
    CHECK (unit_price IS NULL OR unit_price >= 0),
    CHECK (unit_price_vat IS NULL OR unit_price_vat >= 0),
    CHECK (vat_multiplier IS NULL OR vat_multiplier >= 1)
);

CREATE TABLE commerce.supplier_order_requests (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_order_id uuid NOT NULL REFERENCES commerce.supplier_orders(id) ON DELETE CASCADE,
    attempt_no integer NOT NULL CHECK (attempt_no > 0),
    method_name text NOT NULL,
    request_redacted jsonb NOT NULL,
    request_hash char(64) NOT NULL,
    dispatched_at timestamptz,
    response_received_at timestamptz,
    response_redacted jsonb,
    supplier_status_code text,
    supplier_error_text text,
    outcome text NOT NULL CHECK (outcome IN ('PREPARED','DONE','ERROR','UNKNOWN')),
    UNIQUE (supplier_order_id, attempt_no)
);

CREATE TABLE commerce.supplier_order_events (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    supplier_order_id uuid NOT NULL REFERENCES commerce.supplier_orders(id) ON DELETE CASCADE,
    event_type text NOT NULL,
    source text NOT NULL CHECK (source IN ('WORLDS','ED_RESPONSE','RECONCILIATION','HUMAN')),
    details jsonb NOT NULL DEFAULT '{}'::jsonb,
    occurred_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX supplier_order_events_order_idx
    ON commerce.supplier_order_events (supplier_order_id, occurred_at);

CREATE TABLE commerce.supplier_document_changes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_order_id uuid NOT NULL REFERENCES commerce.supplier_orders(id),
    external_document_code text,
    external_document_id text,
    document_type text NOT NULL CHECK (document_type IN ('ORDER_HEAD','ORDER_ITEM')),
    change_type text NOT NULL CHECK (change_type IN ('DEFERRED_INVOICING','QTY')),
    change_parameter jsonb NOT NULL,
    support_status text NOT NULL CHECK (support_status IN ('SUPPORTED','NOT_IMPLEMENTED','UNSUPPORTED')),
    request_id uuid REFERENCES commerce.supplier_order_requests(id),
    created_at timestamptz NOT NULL DEFAULT now()
);

COMMIT;

-- Deployment notes:
-- 1. Add updated_at triggers or enforce version/timestamps in the application unit of work.
-- 2. Partition integration.raw_records, commerce.supplier_price_snapshots and
--    commerce.supplier_inventory_snapshots after measuring retention volume.
-- 3. Row-level permissions, PII encryption and retention policies are deployment-specific.
-- 4. The duplicated IndexSort2 label, ValuePack numeric semantics and VAT multiplier
--    must be verified against the live eD WSDL/payloads before adapter release.
