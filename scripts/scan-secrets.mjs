#!/usr/bin/env node
/**
 * Fails if a database connection string, API key or password literal has been
 * committed to tracked source. Run in CI before anything else.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const PATTERNS = [
  { name: 'postgres connection string with password', re: /postgres(?:ql)?:\/\/[^\s'"$}]+:[^\s'"$@}]+@/i },
  { name: 'Neon role password', re: /\bnpg_[A-Za-z0-9]{8,}/ },
  { name: 'Supabase secret key', re: /\bsb_secret_[A-Za-z0-9_-]{8,}/ },
  { name: 'JWT-shaped service key', re: /\beyJhbGciOi[A-Za-z0-9_-]{20,}/ },
  { name: 'inline password literal', re: /\b(?:password|passwd|secret_key|api_key|apikey)\s*[:=]\s*['"][^'"\n]{8,}['"]/i },
];

const SKIP_DIRECTORIES = /^(?:old\/|docs\/|node_modules\/|\.git\/)/;
const SKIP_FILES = new Set(['.env.example', 'scripts/scan-secrets.mjs', 'pnpm-lock.yaml']);
const SCANNED_EXTENSIONS = /\.(?:ts|tsx|js|jsx|mjs|cjs|json|ya?ml|sql|env)$/i;

const tracked = execFileSync('git', ['ls-files'], { encoding: 'utf8' }).split('\n').filter(Boolean);
const findings = [];

for (const file of tracked) {
  if (SKIP_DIRECTORIES.test(file) || SKIP_FILES.has(file) || !SCANNED_EXTENSIONS.test(file)) continue;
  const contents = fs.readFileSync(file, 'utf8');
  contents.split('\n').forEach((line, index) => {
    if (line.includes('scan-secrets-allow')) return;
    for (const { name, re } of PATTERNS) {
      if (re.test(line)) findings.push({ file, line: index + 1, name });
    }
  });
}

if (findings.length > 0) {
  console.error('Committed credentials detected:\n');
  for (const finding of findings) {
    console.error(`  ${finding.file}:${finding.line} — ${finding.name}`);
  }
  console.error('\nMove the value into an environment variable and rotate the exposed credential.');
  process.exit(1);
}

console.log(`No credentials found in ${tracked.length} tracked files.`);
