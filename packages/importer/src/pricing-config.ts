import { Pool } from 'pg';

export interface MarginBand {
  minCost: number;
  maxCost: number | null;
  percent: number;
}

export interface PricingConfig {
  vatRate: number;
  minimumCostEur: number;
  marginBands: MarginBand[];
}

export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  vatRate: 20,
  minimumCostEur: 0,
  marginBands: [
    { minCost: 0, maxCost: 100, percent: 3 },
    { minCost: 100, maxCost: 300, percent: 8 },
    { minCost: 300, maxCost: 1000, percent: 12 },
    { minCost: 1000, maxCost: null, percent: 10 },
  ],
};

function numeric(value: unknown, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/** Load administrator-managed commercial rules once per import run. */
export async function loadPricingConfig(connectionString = process.env.DATABASE_URL): Promise<PricingConfig> {
  if (!connectionString) return DEFAULT_PRICING_CONFIG;
  const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false }, max: 1, connectionTimeoutMillis: 5000 });
  try {
    const settings = await pool.query<{ key: string; value: { value?: unknown } }>(
      `SELECT key, value FROM store_settings WHERE key IN ('pricing.vat_rate', 'feed.minimum_cost_eur')`,
    );
    const setting = new Map(settings.rows.map((row) => [row.key, row.value?.value]));
    const rules = await pool.query<{ min_cost: string; max_cost: string | null; margin_percent: string }>(
      `SELECT min_cost, max_cost, margin_percent FROM pricing_rules WHERE active = true ORDER BY display_order, min_cost`,
    );
    const marginBands = rules.rows.map((row) => ({
      minCost: Math.max(0, numeric(row.min_cost, 0)),
      maxCost: row.max_cost === null ? null : Math.max(0, numeric(row.max_cost, 0)),
      percent: numeric(row.margin_percent, 0),
    }));
    return {
      vatRate: Math.max(0, Math.min(100, numeric(setting.get('pricing.vat_rate'), DEFAULT_PRICING_CONFIG.vatRate))),
      minimumCostEur: Math.max(0, numeric(setting.get('feed.minimum_cost_eur'), 0)),
      marginBands: marginBands.length > 0 ? marginBands : DEFAULT_PRICING_CONFIG.marginBands,
    };
  } catch (error) {
    console.warn(`[import] pricing settings unavailable; using defaults: ${error instanceof Error ? error.message : String(error)}`);
    return DEFAULT_PRICING_CONFIG;
  } finally {
    await pool.end();
  }
}

export function marginFor(cost: number, bands: MarginBand[]): number {
  const match = bands.find((band) => cost >= band.minCost && (band.maxCost === null || cost < band.maxCost));
  return match?.percent ?? bands.at(-1)?.percent ?? 0;
}
