#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'db', 'neon', 'migrations');
const files = fs.readdirSync(root).filter((file) => file.endsWith('.sql')).sort();
const seenVersions = new Set();
let previous = -1;

function splitStatements(sql) {
  const statements = [];
  let current = '';
  let quote = null;
  let dollar = null;
  for (let i = 0; i < sql.length; i += 1) {
    const char = sql[i];
    if (dollar) {
      if (sql.startsWith(dollar, i)) { current += dollar; i += dollar.length - 1; dollar = null; } else current += char;
      continue;
    }
    if (quote) { current += char; if (char === quote && sql[i - 1] !== '\\') quote = null; continue; }
    if (char === "'" || char === '"') { quote = char; current += char; continue; }
    if (char === '$') {
      const marker = sql.slice(i).match(/^\$[A-Za-z_0-9]*\$/)?.[0];
      if (marker) { dollar = marker; current += marker; i += marker.length - 1; continue; }
    }
    if (sql.startsWith('--', i)) { const end = sql.indexOf('\n', i); i = end < 0 ? sql.length : end; current += '\n'; continue; }
    if (char === ';') { if (current.trim()) statements.push(current.trim()); current = ''; } else current += char;
  }
  if (current.trim()) statements.push(current.trim());
  return statements;
}

for (const file of files) {
  const match = file.match(/^(\d{4})_[a-z0-9_]+\.sql$/);
  if (!match) throw new Error(`Invalid migration filename: ${file}`);
  const version = Number(match[1]);
  if (seenVersions.has(version)) throw new Error(`Duplicate migration version: ${version}`);
  if (version <= previous) throw new Error(`Migration versions are not strictly increasing at ${file}`);
  seenVersions.add(version);
  previous = version;
  const statements = splitStatements(fs.readFileSync(path.join(root, file), 'utf8'));
  if (statements.length === 0) throw new Error(`Migration has no SQL statements: ${file}`);
  if (statements.some((statement) => statement.includes('\0'))) throw new Error(`Migration contains a NUL byte: ${file}`);
  console.log(`[migrations] ${file}: ${statements.length} statement(s)`);
}
console.log(`[migrations] validated ${files.length} migration file(s)`);
