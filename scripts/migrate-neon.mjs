#!/usr/bin/env node
/**
 * Applies every .sql file in db/neon/migrations to the Neon database in
 * DATABASE_URL, in filename order. Migrations are written to be idempotent, so
 * re-running is safe.
 *
 *   DATABASE_URL='postgresql://...' node scripts/migrate-neon.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL?.trim();
if (!connectionString) {
  console.error('DATABASE_URL is required. Refusing to guess a production database.');
  process.exit(1);
}

const here = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.resolve(here, '..', 'db', 'neon', 'migrations');
const files = fs.readdirSync(migrationsDir).filter((name) => name.endsWith('.sql')).sort();

/** Splits a migration into statements, ignoring semicolons inside quotes and $$ bodies. */
function splitStatements(sql) {
  const statements = [];
  let current = '';
  let quote = null;
  let dollarQuote = null;
  for (let i = 0; i < sql.length; i += 1) {
    const char = sql[i];
    if (dollarQuote) {
      if (sql.startsWith(dollarQuote, i)) {
        current += dollarQuote;
        i += dollarQuote.length - 1;
        dollarQuote = null;
      } else {
        current += char;
      }
      continue;
    }
    if (quote) {
      current += char;
      if (char === quote) quote = null;
      continue;
    }
    if (char === "'" || char === '"') {
      quote = char;
      current += char;
      continue;
    }
    if (char === '$') {
      const marker = sql.slice(i).match(/^\$[A-Za-z_0-9]*\$/)?.[0];
      if (marker) {
        dollarQuote = marker;
        current += marker;
        i += marker.length - 1;
        continue;
      }
    }
    if (sql.startsWith('--', i)) {
      const end = sql.indexOf('\n', i);
      i = end < 0 ? sql.length : end;
      current += '\n';
      continue;
    }
    if (char === ';') {
      if (current.trim()) statements.push(current.trim());
      current = '';
      continue;
    }
    current += char;
  }
  if (current.trim()) statements.push(current.trim());
  return statements;
}

const sql = neon(connectionString);

await sql.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
  version text PRIMARY KEY,
  applied_at timestamptz NOT NULL DEFAULT now()
)`);

const appliedRows = await sql.query('SELECT version FROM schema_migrations');
const applied = new Set(appliedRows.map((row) => row.version));
let pending = 0;

for (const file of files) {
  if (applied.has(file)) {
    process.stdout.write(`[migrate] ${file} (already applied)\n`);
    continue;
  }
  const contents = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
  const statements = splitStatements(contents);
  process.stdout.write(`[migrate] ${file} (${statements.length} statements)\n`);
  for (const statement of statements) {
    try {
      await sql.query(statement);
    } catch (error) {
      console.error(`[migrate] failed in ${file}:\n${statement.slice(0, 300)}\n${error.message}`);
      process.exit(1);
    }
  }
  await sql.query('INSERT INTO schema_migrations (version) VALUES ($1) ON CONFLICT (version) DO NOTHING', [file]);
  pending += 1;
}

console.log(`[migrate] applied ${pending} new migration file(s); ${files.length - pending} already applied`);
