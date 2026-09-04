const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_nLuIOvXw7dZ3@ep-withered-thunder-au37ajrg-pooler.c-10.us-east-1.aws.neon.tech/neondb?sslmode=require';

async function initSchema() {
  const client = new Client({ connectionString });
  await client.connect();
  console.log('Connecting to Neon PostgreSQL database...');

  const sql = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE EXTENSION IF NOT EXISTS "pg_trgm";

    CREATE TABLE IF NOT EXISTS categories (
      id text PRIMARY KEY,
      slug text NOT NULL UNIQUE,
      name text NOT NULL,
      parent_id text REFERENCES categories(id) ON DELETE SET NULL,
      parent_slug text,
      level integer DEFAULT 1,
      display_order integer DEFAULT 1,
      active boolean DEFAULT true,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS manufacturers (
      id text PRIMARY KEY,
      name text NOT NULL UNIQUE,
      slug text NOT NULL UNIQUE,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS products (
      id text PRIMARY KEY,
      sku text NOT NULL UNIQUE,
      supplier_code text,
      supplier_pro_id text,
      mpn text,
      ean text,
      brand text NOT NULL,
      category_slug text NOT NULL,
      category_hierarchy jsonb DEFAULT '[]'::jsonb,
      commodity_code text,
      commodity_name text,
      title text NOT NULL,
      name_b2c text,
      slug text NOT NULL UNIQUE,
      short_description text,
      supplier_description text,
      enriched_description text,
      seo_title text,
      seo_description text,
      search_keywords jsonb DEFAULT '[]'::jsonb,
      vat_rate numeric(5,2) DEFAULT 20.0,
      base_price numeric(12,2) DEFAULT 0.0,
      final_price numeric(12,2) DEFAULT 0.0,
      currency text DEFAULT 'EUR',
      stock_count numeric(12,2) DEFAULT 0,
      is_in_stock boolean DEFAULT false,
      stock_text text DEFAULT 'Na objednávku',
      min_order_quantity integer DEFAULT 1,
      warranty_months integer DEFAULT 24,
      warranty_unit text DEFAULT 'M',
      attributes jsonb DEFAULT '{}'::jsonb,
      images jsonb DEFAULT '[]'::jsonb,
      status text DEFAULT 'ACTIVE',
      data_hash text,
      last_synced_at timestamptz DEFAULT now(),
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );

    CREATE INDEX IF NOT EXISTS idx_products_cat_slug ON products (category_slug);
    CREATE INDEX IF NOT EXISTS idx_products_brand ON products (brand);
    CREATE INDEX IF NOT EXISTS idx_products_is_in_stock_price ON products (is_in_stock DESC, final_price ASC);
    CREATE INDEX IF NOT EXISTS idx_products_title_trgm ON products USING gin (title gin_trgm_ops);
    CREATE INDEX IF NOT EXISTS idx_products_mpn ON products (mpn);
    CREATE INDEX IF NOT EXISTS idx_products_ean ON products (ean);

    CREATE TABLE IF NOT EXISTS sync_batches (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      batch_number text NOT NULL,
      mode text NOT NULL,
      total_read integer DEFAULT 0,
      imported_count integer DEFAULT 0,
      filtered_count integer DEFAULT 0,
      status text DEFAULT 'PENDING',
      started_at timestamptz DEFAULT now(),
      completed_at timestamptz,
      error_message text
    );
  `;

  await client.query(sql);
  console.log('✅ Neon PostgreSQL Database Schema Created & Verified Successfully!');
  await client.end();
}

initSchema().catch((err) => {
  console.error('❌ Schema initialization error:', err);
  process.exit(1);
});
