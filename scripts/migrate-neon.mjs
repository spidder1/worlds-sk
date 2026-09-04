import fs from 'node:fs/promises';
import path from 'node:path';
import pg from 'pg';

const rawDatabaseUrl = process.env.DATABASE_URL?.trim();
if (!rawDatabaseUrl) throw new Error('DATABASE_URL is required');
const databaseUrl = new URL(rawDatabaseUrl);
databaseUrl.searchParams.delete('sslmode');

const { Client } = pg;
const client = new Client({ connectionString: databaseUrl.toString(), ssl: { rejectUnauthorized: false } });
const migrationsDir = path.resolve('db/migrations');

await client.connect();
try {
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `);

  const files = (await fs.readdir(migrationsDir))
    .filter((file) => file.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const alreadyApplied = await client.query(
      'SELECT 1 FROM schema_migrations WHERE version = $1',
      [file],
    );
    if (alreadyApplied.rowCount) {
      console.log(`[migrate] skip ${file}`);
      continue;
    }

    const sql = await fs.readFile(path.join(migrationsDir, file), 'utf8');
    await client.query('BEGIN');
    try {
      await client.query(sql);
      await client.query('INSERT INTO schema_migrations (version) VALUES ($1)', [file]);
      await client.query('COMMIT');
      console.log(`[migrate] applied ${file}`);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    }
  }
} finally {
  await client.end();
}
