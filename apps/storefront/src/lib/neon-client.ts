import { Pool } from 'pg';

declare global {
  var __neonPool: Pool | undefined;
}

export function getNeonPool(): Pool {
  if (!globalThis.__neonPool) {
    const rawConnectionString = process.env.DATABASE_URL?.trim();
    if (!rawConnectionString) throw new Error('DATABASE_URL is required for Neon access.');
    const connectionUrl = new URL(rawConnectionString);
    connectionUrl.searchParams.delete('sslmode');
    globalThis.__neonPool = new Pool({
      connectionString: connectionUrl.toString(),
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
