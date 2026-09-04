import { Pool } from 'pg';

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_nLuIOvXw7dZ3@ep-withered-thunder-au37ajrg-pooler.c-10.us-east-1.aws.neon.tech/neondb?sslmode=require';

declare global {
  var __neonPool: Pool | undefined;
}

export function getNeonPool(): Pool {
  if (!globalThis.__neonPool) {
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
