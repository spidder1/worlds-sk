import { Pool } from 'pg';

declare global {
  var __neonPool: Pool | undefined;
}

export function getNeonPool(): Pool {
  if (!globalThis.__neonPool) {
    const connectionString = process.env.DATABASE_URL?.trim();
    if (!connectionString) throw new Error('DATABASE_URL is required for Neon access.');
    globalThis.__neonPool = new Pool({
      connectionString,
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
  return res.rows;
}
