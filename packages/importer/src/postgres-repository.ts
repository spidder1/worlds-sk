import pg from 'pg';
import { MasterProduct, QuarantineRecord, ImportRunSummary, TaxonomyCategory } from '@worlds/types';
import { requiredEnv } from './runtime-config.js';

const { Pool } = pg;

export class PostgresProductRepository {
  private pool: pg.Pool;

  constructor(connectionString?: string) {
    const url = connectionString || requiredEnv('DATABASE_URL');

    this.pool = new Pool({
      connectionString: url,
      ssl: { rejectUnauthorized: false },
      max: 10,
      connectionTimeoutMillis: 5000,
    });

    this.pool.on('error', (err) => {
      console.warn('Postgres connection pool notice:', err.message);
    });
  }

  getPool(): pg.Pool {
    return this.pool;
  }

  async upsertCategory(cat: TaxonomyCategory): Promise<void> {
    const query = `
      INSERT INTO categories (id, slug, name, parent_slug, level, is_seo_indexed, display_order, meta_title, meta_description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        parent_slug = EXCLUDED.parent_slug,
        level = EXCLUDED.level,
        display_order = EXCLUDED.display_order;
    `;
    await this.pool.query(query, [
      cat.id,
      cat.slug,
      cat.name,
      cat.parentSlug || null,
      cat.level,
      cat.isSeoIndexed,
      cat.displayOrder,
      cat.metaTitle || null,
      cat.metaDescription || null,
    ]);
  }

  async upsertProduct(p: MasterProduct): Promise<void> {
    const query = `
      INSERT INTO master_products (
        id, supplier_code, supplier_pro_id, sku, mpn, mpn2, ean, brand, raw_brand,
        category_slug, category_hierarchy, commodity_code, commodity_name,
        title, slug, short_description, supplier_description, enriched_description,
        seo_title, seo_description, search_keywords,
        supplier_cost, garbage_fee, author_fee, total_cost_with_fees,
        vat_rate, margin_percentage, base_price, final_price, recommended_retail_price, currency,
        stock_count, is_in_stock, stock_text, expected_restock_date, min_order_quantity, warranty_months,
        attributes, images, dimensions,
        status, review_status, ai_enrichment, quality_score, quality_score_total,
        data_hash, last_synced_at, last_reprocessed_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9,
        $10, $11, $12, $13,
        $14, $15, $16, $17, $18,
        $19, $20, $21,
        $22, $23, $24, $25,
        $26, $27, $28, $29, $30, $31,
        $32, $33, $34, $35, $36, $37,
        $38, $39, $40,
        $41, $42, $43, $44, $45,
        $46, NOW(), NOW(), NOW()
      )
      ON CONFLICT (supplier_code) DO UPDATE SET
        title = EXCLUDED.title,
        slug = EXCLUDED.slug,
        mpn = EXCLUDED.mpn,
        ean = EXCLUDED.ean,
        brand = EXCLUDED.brand,
        category_slug = EXCLUDED.category_slug,
        category_hierarchy = EXCLUDED.category_hierarchy,
        supplier_cost = EXCLUDED.supplier_cost,
        garbage_fee = EXCLUDED.garbage_fee,
        author_fee = EXCLUDED.author_fee,
        total_cost_with_fees = EXCLUDED.total_cost_with_fees,
        base_price = EXCLUDED.base_price,
        final_price = EXCLUDED.final_price,
        stock_count = EXCLUDED.stock_count,
        is_in_stock = EXCLUDED.is_in_stock,
        stock_text = EXCLUDED.stock_text,
        attributes = EXCLUDED.attributes,
        images = EXCLUDED.images,
        status = EXCLUDED.status,
        review_status = EXCLUDED.review_status,
        quality_score_total = EXCLUDED.quality_score_total,
        data_hash = EXCLUDED.data_hash,
        last_synced_at = NOW(),
        updated_at = NOW();
    `;

    await this.pool.query(query, [
      p.id,
      p.supplierCode,
      p.supplierProId || null,
      p.sku,
      p.mpn,
      p.mpn2 || null,
      p.ean || null,
      p.brand,
      p.rawBrand || null,
      p.categorySlug,
      JSON.stringify(p.categoryHierarchy),
      p.commodityCode || null,
      p.commodityName || null,
      p.title,
      p.slug,
      p.shortDescription || null,
      p.supplierDescription || null,
      p.enrichedDescription || null,
      p.seoTitle || null,
      p.seoDescription || null,
      JSON.stringify(p.searchKeywords),
      p.pricing.supplierCost,
      p.pricing.supplierFees.garbageFee,
      p.pricing.supplierFees.authorFee,
      p.pricing.totalCostWithFees,
      p.pricing.vatRate,
      p.pricing.marginPercentage,
      p.pricing.basePrice,
      p.pricing.finalPrice,
      p.pricing.recommendedRetailPrice || null,
      p.pricing.currency,
      p.stockCount,
      p.isInStock,
      p.stockText || null,
      p.expectedRestockDate || null,
      p.minOrderQuantity,
      p.warrantyMonths || 24,
      JSON.stringify(p.attributes),
      JSON.stringify(p.images),
      p.dimensions ? JSON.stringify(p.dimensions) : null,
      p.status,
      p.reviewStatus,
      p.aiEnrichment ? JSON.stringify(p.aiEnrichment) : null,
      JSON.stringify(p.qualityScore),
      p.qualityScore.total,
      p.dataHash,
    ]);
  }

  async recordImportRun(summary: ImportRunSummary): Promise<void> {
    const query = `
      INSERT INTO import_runs (id, type, start_time, end_time, duration_ms, total_fetched, created_count, updated_count, unchanged_count, quarantined_count, needs_review_count, status, error_message)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      ON CONFLICT (id) DO NOTHING;
    `;
    await this.pool.query(query, [
      summary.id,
      summary.type,
      summary.startTime,
      summary.endTime || null,
      summary.durationMs || null,
      summary.totalFetched,
      summary.createdCount,
      summary.updatedCount,
      summary.unchangedCount,
      summary.quarantinedCount,
      summary.needsReviewCount,
      summary.status,
      summary.errorMessage || null,
    ]);
  }

  async getStats() {
    const res = await this.pool.query(`
      SELECT 
        COUNT(*)::int as "totalProducts",
        COUNT(*) FILTER (WHERE status = 'ACTIVE')::int as "activeProducts",
        COUNT(*) FILTER (WHERE is_in_stock = true)::int as "inStockProducts",
        COUNT(*) FILTER (WHERE review_status = 'NEEDS_REVIEW')::int as "needsReviewCount",
        COUNT(*) FILTER (WHERE ean IS NULL OR ean = '')::int as "missingEanCount",
        COUNT(*) FILTER (WHERE images = '[]'::jsonb)::int as "missingImagesCount",
        COALESCE(AVG(quality_score_total), 0)::int as "averageQualityScore"
      FROM master_products;
    `);
    return res.rows[0];
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}
