import { Pool } from 'pg';

/**
 * Raised when the deployment has no database configured at all. Distinct from a
 * transient query failure: callers degrade gracefully on the latter, but a
 * missing DATABASE_URL must fail the build rather than quietly publish an empty
 * catalogue.
 */
export class MissingDatabaseConfigError extends Error {
  constructor() {
    super('DATABASE_URL is not set. The storefront cannot read the catalogue without a database connection string.');
    this.name = 'MissingDatabaseConfigError';
  }
}

/**
 * The storefront reads the production catalogue from Neon. There is deliberately
 * no fallback connection string: a missing DATABASE_URL is a deployment fault
 * that must surface loudly, not silently resolve to somebody's database.
 */
function requireConnectionString(): string {
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) throw new MissingDatabaseConfigError();
  return connectionString;
}

declare global {
  var __neonPool: Pool | undefined;
}

export function getNeonPool(): Pool {
  if (!globalThis.__neonPool) {
    globalThis.__neonPool = new Pool({
      connectionString: requireConnectionString(),
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    globalThis.__neonPool.on('error', (err) => {
      console.warn('Neon PostgreSQL pool error:', err.message);
    });
  }

  return globalThis.__neonPool;
}

export async function queryNeon<T = Record<string, unknown>>(text: string, params: unknown[] = []): Promise<T[]> {
  const pool = getNeonPool();
  const res = await pool.query(text, params);
  return res.rows as T[];
}

/**
 * Re-throws configuration faults so they cannot be swallowed by a catch block
 * that exists to tolerate a temporarily unreachable database.
 */
export function rethrowIfMisconfigured(error: unknown): void {
  if (error instanceof MissingDatabaseConfigError) throw error;
}
