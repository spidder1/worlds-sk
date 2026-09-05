import pg from 'pg';
import { EDSystemClient } from '../packages/ed-client/dist/index.js';

const connectionString = process.env.DATABASE_URL?.trim();
const endpointUrl = process.env.ED_ENDPOINT_URL?.trim();
const login = process.env.ED_LOGIN?.trim();
const password = process.env.ED_PASSWORD?.trim();
if (!connectionString || !endpointUrl || !login || !password) throw new Error('DATABASE_URL, ED_ENDPOINT_URL, ED_LOGIN and ED_PASSWORD are required');

const pool = new pg.Pool({ connectionString, max: 2 });
const client = new EDSystemClient({ endpointUrl, login, password });
try {
  const methods = await client.getTransportationListCustomer();
  if (!methods.length) throw new Error('eD returned no B2C transport methods; verify eD credentials and account permissions');
  const db = await pool.connect();
  try {
    await db.query('BEGIN');
    await db.query('UPDATE supplier_transport_methods SET active = false');
    for (const method of methods) {
      const code = String(method.Code).trim();
      const name = String(method.Name || code).trim();
      if (!code || !name) continue;
      await db.query(`INSERT INTO supplier_transport_methods (code, name, type_code, active, fetched_at)
        VALUES ($1, $2, $3, true, NOW())
        ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name, type_code = EXCLUDED.type_code, active = true, fetched_at = NOW()`,
      [code, name, method.TypeCode !== undefined && method.TypeCode !== null ? String(method.TypeCode) : null]);
    }
    await db.query('COMMIT');
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  } finally {
    db.release();
  }
  console.log(JSON.stringify({ synced: methods.length }));
} finally {
  await pool.end();
}
