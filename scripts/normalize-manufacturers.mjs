#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import pg from 'pg';

const databaseUrl = process.env.DATABASE_URL?.trim();
if (!databaseUrl) throw new Error('DATABASE_URL is required');

const dryRun = process.argv.includes('--dry-run');
const noDownload = process.argv.includes('--no-download');
const logoDir = path.resolve(process.env.MANUFACTURER_LOGO_DIR || 'apps/storefront/public/manufacturers');
const reviewCsvPath = path.resolve(process.env.MANUFACTURER_REVIEW_CSV || 'manufacturers.csv');

const KNOWN_BRANDS = [
  'ASUS', 'Lenovo', 'HP', 'HPE', 'Dell', 'Acer', 'Apple', 'Samsung', 'Intel', 'AMD', 'Kingston',
  'Logitech', 'Microsoft', 'MSI', 'Gigabyte', 'GIGABYTE', 'ASRock', 'NVIDIA', 'Canon', 'Epson',
  'Brother', 'Huawei', 'Xiaomi', 'Sony', 'Philips', 'JBL', 'TCL', 'Razer', 'TP-Link', 'Seagate',
  'Western Digital', 'WD', 'Synology', 'QNAP', 'Cisco', 'D-Link', 'Ubiquiti', 'Belkin', 'SanDisk',
  'Zyxel', 'ESET', 'Kaspersky', 'Pioneer', 'Panasonic', 'LG', 'BenQ', 'ViewSonic', 'EIZO',
  'Corsair', 'Kingston', 'Thermaltake', 'Cooler Master', 'Noctua', 'Arctic', 'Sapphire', 'Palit',
  'Gainward', 'Verbatim', 'Honeywell', 'Fujitsu', 'Toshiba', 'Motorola', 'Garmin', 'Realme',
  'AOC', 'iiyama', 'Evolveo', 'Gembird', 'Trust', 'Adata', 'Transcend', 'SanDisk', 'Lexmark',
  'Sharp', 'Panasonic', 'Triton', 'Epson', 'Ricoh', 'Zebra', 'Hikvision', 'MikroTik', 'Ubiquiti',
  'Mercusys', 'D-Link', 'TP-Link', 'Manhattan', 'Axagon', 'PremiumCord', 'Chieftec', 'Fractal Design',
];

const DOMAIN_OVERRIDES = {
  asus: 'asus.com', lenovo: 'lenovo.com', hp: 'hp.com', hpe: 'hpe.com', dell: 'dell.com', acer: 'acer.com',
  apple: 'apple.com', samsung: 'samsung.com', intel: 'intel.com', amd: 'amd.com', kingston: 'kingston.com',
  logitech: 'logitech.com', microsoft: 'microsoft.com', msi: 'msi.com', gigabyte: 'gigabyte.com',
  asrock: 'asrock.com', nvidia: 'nvidia.com', canon: 'canon.com', epson: 'epson.com', brother: 'brother.com',
  huawei: 'huawei.com', xiaomi: 'mi.com', sony: 'sony.com', philips: 'philips.com', jbl: 'jbl.com',
  razer: 'razer.com', 'tp-link': 'tp-link.com', seagate: 'seagate.com', synology: 'synology.com',
  qnap: 'qnap.com', cisco: 'cisco.com', ubiquiti: 'ui.com', belkin: 'belkin.com', sandisk: 'sandisk.com',
  zyxel: 'zyxel.com', eset: 'eset.com', panasonic: 'panasonic.com', lg: 'lg.com', benq: 'benq.com',
  corsair: 'corsair.com', 'cooler-master': 'coolermaster.com', noctua: 'noctua.at', arctic: 'arctic.de',
};

const NOISE = new Set([
  'dotykovy', 'dotykový', 'notebook', 'notebooky', 'laptop', 'pc', 'pocitac', 'počítač', 'tablet',
  'smartphone', 'mobil', 'neznamy', 'neznámy', 'unknown', 'generic', 'unbranded', 'other', 'ostatne',
  'monitor', 'displej', 'napájací', 'napajaci', 'predlžovací', 'predlzovaci', 'káblový', 'kablovy',
  'adaptér', 'adapter', 'kábel', 'kabel', 'taška', 'taska', 'puzdro', 'obal', 'držák', 'drziak',
  'toner', 'ssd', 'cpu', 'dimm', 'sodimm', 'ups', 'poe', 'usb-c', 'bazar', 'zdroj', 'router',
  'reproduktor', 'reproduktory', 'skener', 'scanner', 'tlaciaren', 'tlačiareň', 'multifunkcny',
  'img', 'span', 'div', 'lt', 'gt', 'záruka', 'zaruka',
]);

const TITLE_NOISE = new Set([...NOISE, 'laserová', 'laserova', 'inkoustová', 'inkoustova', 'herný', 'herny', 'pracovný', 'pracovny']);
const TITLE_BRAND_EXCLUDE = new Set(['pro', 'one', 'in', 'it', 'go', 'home', 'power', 'plus', 'max', 'mini', 'air', 'box', 'kit', 'set', 'line', 'basic', 'universal', 'smart', 'color', 'mobile']);

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (quoted) {
      if (char === '"' && next === '"') { field += '"'; i += 1; }
      else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ',') { row.push(field); field = ''; }
    else if (char === '\n') { row.push(field.replace(/\r$/, '')); rows.push(row); row = []; field = ''; }
    else field += char;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const headers = rows.shift()?.map((header) => header.trim()) || [];
  return rows.filter((values) => values.some(Boolean)).map((values) => Object.fromEntries(headers.map((header, index) => [header, (values[index] || '').trim()])));
}

async function loadReviewedManufacturers() {
  const csv = await fs.readFile(reviewCsvPath, 'utf8');
  const rows = parseCsv(csv);
  const allowedRows = rows.filter((row) => row.audit_class === 'VERIFIED_BRAND' || row.audit_class === 'UNVERIFIED_CANDIDATE');
  const byName = new Map();
  for (const row of allowedRows) {
    const name = stripMarkup(row.name);
    if (!name) continue;
    byName.set(name.toLowerCase(), {
      name,
      slug: manufacturerSlug(name),
      id: manufacturerId(name),
      auditClass: row.audit_class,
      auditConfidence: row.audit_confidence ? Number(row.audit_confidence) : null,
      auditReason: row.audit_reason || null,
      auditSource: row.audit_source || null,
    });
  }
  return { rows, allowedRows: [...byName.values()], byName };
}

function slugify(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'manufacturer';
}

function manufacturerSlug(name) {
  let hash = 0;
  for (const char of name) hash = ((hash << 5) - hash + char.codePointAt(0)) | 0;
  return `${slugify(name)}-${Math.abs(hash).toString(36)}`;
}

function manufacturerId(name) {
  return `manufacturer-${manufacturerSlug(name)}`;
}

function titleCaseBrand(value) {
  const known = KNOWN_BRANDS.find((brand) => brand.toLowerCase() === value.toLowerCase());
  if (known) return known;
  return value.split(/\s+/).map((part) => part ? part[0].toUpperCase() + part.slice(1).toLowerCase() : part).join(' ');
}

function titleBrand(title, knownBrands) {
  const haystack = String(title || '');
  const ordered = [...knownBrands].sort((a, b) => b.length - a.length);
  return ordered.find((brand) => new RegExp(`(^|[^A-Za-z0-9])${brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=$|[^A-Za-z0-9])`, 'i').test(haystack));
}

function titlePrefix(title) {
  const words = String(title || '').replace(/&amp;/gi, '&').split(/\s+/).map((word) => word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}-]+$/gu, '')).filter(Boolean);
  const candidate = words.find((word) => {
    const lower = word.toLowerCase();
    return lower.length >= 2 && lower.length <= 32 && !TITLE_NOISE.has(lower) && !/^\d/.test(lower) && !/^\d+[a-z]*$/i.test(lower);
  });
  return candidate && (/^[A-Z0-9][A-Za-z0-9-]*$/.test(candidate) || candidate.length > 2) ? candidate : undefined;
}

function stripMarkup(value) {
  return String(value || '')
    .replace(/\bLt;/gi, '<')
    .replace(/\bGt;/gi, '>')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(?:lt|gt|amp|quot|apos|nbsp);/gi, (entity) => ({ '&lt;': '<', '&gt;': '>', '&amp;': '&', '&quot;': '"', '&apos;': "'", '&nbsp;': ' ' }[entity.toLowerCase()] || ' '))
    .replace(/<[^>]*>/g, ' ')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isInvalidBrand(value) {
  return !value || value.length > 80 || /https?:\/\//i.test(value) || /[<>]/.test(value) || /&?(?:lt|gt|amp);/i.test(value) || /[{}[\]|]/.test(value);
}

function cleanBrand(raw, title, knownBrands) {
  const value = stripMarkup(raw);
  const cleanTitle = stripMarkup(title);
  const words = value.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  const knownTitleBrand = titleBrand(cleanTitle, knownBrands);
  const candidateFromTitle = knownTitleBrand || (value && !words.every((word) => NOISE.has(word)) ? titlePrefix(cleanTitle) : undefined);
  const isNoise = isInvalidBrand(String(raw || '').trim()) || !value || words.length === 0 || words.every((word) => NOISE.has(word));
  if (isNoise) return candidateFromTitle ? titleCaseBrand(candidateFromTitle) : 'Unbranded';
  if (words.some((word) => NOISE.has(word)) && candidateFromTitle) return titleCaseBrand(candidateFromTitle);
  return titleCaseBrand(value.replace(/\s+/g, ' '));
}

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase().slice(0, 3) || '?';
}

function fallbackSvg(name) {
  const text = initials(name);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80"><rect width="160" height="80" rx="12" fill="#f1f5f9"/><text x="80" y="49" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" font-weight="700" fill="#475569">${text}</text></svg>`;
}

async function downloadLogo(name, target) {
  const providerKey = slugify(name);
  const key = manufacturerSlug(name);
  const domain = DOMAIN_OVERRIDES[providerKey];
  const urls = [
    ...(domain ? [`https://logo.clearbit.com/${domain}`] : []),
    `https://cdn.simpleicons.org/${encodeURIComponent(providerKey)}`,
  ];
  for (const url of urls) {
    try {
      const response = await fetch(url, { headers: { 'user-agent': 'Worlds.sk manufacturer logo sync' }, signal: AbortSignal.timeout(5000) });
      const contentType = response.headers.get('content-type') || '';
      if (!response.ok || (!contentType.includes('image') && !contentType.includes('svg'))) continue;
      const body = Buffer.from(await response.arrayBuffer());
      if (body.length < 100) continue;
      const extension = contentType.includes('svg') || url.includes('simpleicons') ? 'svg' : 'png';
      const file = `${key}.${extension}`;
      await fs.writeFile(path.join(logoDir, file), body);
      return { url: `/manufacturers/${file}`, source: url, status: 'DOWNLOADED' };
    } catch { /* Try the next provider. */ }
  }
  const file = `${key}.svg`;
  await fs.writeFile(path.join(logoDir, file), fallbackSvg(name), 'utf8');
  return { url: `/manufacturers/${file}`, source: 'generated-initials', status: 'FALLBACK' };
}

const { Client } = pg;
const client = new Client({ connectionString: databaseUrl, ssl: { rejectUnauthorized: false } });
await client.connect();
try {
  const review = await loadReviewedManufacturers();
  if (review.allowedRows.length === 0) throw new Error(`No VERIFIED_BRAND or UNVERIFIED_CANDIDATE rows found in ${reviewCsvPath}`);
  const allowedNames = review.allowedRows.map((row) => row.name);
  const titleBrands = [...review.allowedRows]
    .filter((candidate) => (candidate.name.length >= 4 || /[A-Z0-9]/.test(candidate.name)) && !TITLE_BRAND_EXCLUDE.has(candidate.name.toLowerCase()))
    .sort((a, b) => b.name.length - a.name.length);
  // Normalize every stored product, not only currently sellable rows. Hidden
  // and temporarily unpriced products must not keep invalid manufacturer
  // values that would reappear when they become sellable again.
  const result = await client.query(`SELECT id, brand, title FROM products`);
  const changes = [];
  const mappings = new Map();
  let exactMatches = 0;
  let recoveredFromTitle = 0;
  let unbranded = 0;
  for (const row of result.rows) {
    const raw = String(row.brand || '').trim();
    const exact = review.byName.get(stripMarkup(raw).toLowerCase());
    const title = stripMarkup(row.title);
    const relationStart = title.search(/\b(?:pre|pro|for|compatible|kompatibil|vhodn|určen)\b/i);
    const titlePrefix = relationStart > 0 ? title.slice(0, relationStart) : title.split(/\s+/).slice(0, 5).join(' ');
    const fromTitle = !exact && titleBrands.find((candidate) => new RegExp(`(^|[^A-Za-z0-9])${candidate.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=$|[^A-Za-z0-9])`, 'i').test(titlePrefix));
    const canonical = exact?.name || fromTitle?.name || 'Unbranded';
    if (exact) exactMatches += 1;
    else if (fromTitle) recoveredFromTitle += 1;
    else unbranded += 1;
    if (raw !== canonical) changes.push({ id: row.id, raw, canonical, title: row.title || '' });
    const key = raw || '(empty)';
    if (!mappings.has(key)) mappings.set(key, { canonical, titles: [] });
    mappings.get(key).titles.push(row.title);
  }
  const canonicalNames = allowedNames;
  console.log(`[manufacturers] products=${result.rowCount} reviewed=${review.rows.length} allowed=${canonicalNames.length} exact=${exactMatches} title=${recoveredFromTitle} unbranded=${unbranded}`);
  const changedMappings = changes.filter((change) => change.raw !== change.canonical);
  const invalidMappings = changes.filter((change) => isInvalidBrand(change.raw));
  const recoveredMappings = changes.filter((change) => change.canonical !== 'Unbranded' && change.raw !== change.canonical);
  const report = {
    generatedAt: new Date().toISOString(),
    productsScanned: result.rowCount,
    reviewedRows: review.rows.length,
    verifiedBrands: review.allowedRows.filter((row) => row.auditClass === 'VERIFIED_BRAND').length,
    unverifiedCandidates: review.allowedRows.filter((row) => row.auditClass === 'UNVERIFIED_CANDIDATE').length,
    junkRowsRemoved: review.rows.filter((row) => row.audit_class === 'JUNK_DATA').length,
    rawManufacturers: mappings.size,
    canonicalManufacturers: canonicalNames.length,
    changedProducts: changes.length,
    invalidRawManufacturers: invalidMappings.length,
    recoveredFromTitle: recoveredMappings.length,
    unbrandedProducts: unbranded,
    examples: changes.slice(0, 100).map((change) => ({ raw: change.raw, canonical: change.canonical, sampleTitle: change.title })),
  };
  const reportPath = path.resolve(process.env.MANUFACTURER_REPORT_PATH || 'reports/manufacturer-normalization-report.json');
  await fs.mkdir(path.dirname(reportPath), { recursive: true });
  await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  const markdownReport = [
    '# Manufacturer normalization report',
    '',
    `Generated: ${report.generatedAt}`,
    '',
    '| Metric | Count |',
    '| --- | ---: |',
    `| Active priced products scanned | ${report.productsScanned} |`,
    `| Raw manufacturer values | ${report.rawManufacturers} |`,
    `| Canonical manufacturers retained | ${report.canonicalManufacturers} |`,
    `| Changed products | ${report.changedProducts} |`,
    `| Reviewed CSV rows | ${report.reviewedRows} |`,
    `| Verified brands | ${report.verifiedBrands} |`,
    `| Unverified candidates | ${report.unverifiedCandidates} |`,
    `| Junk CSV rows removed | ${report.junkRowsRemoved} |`,
    `| Invalid raw values | ${report.invalidRawManufacturers} |`,
    `| Recovered from product title | ${report.recoveredFromTitle} |`,
    `| Products assigned to Unbranded | ${report.unbrandedProducts} |`,
    '',
    '## Changed examples',
    '',
    '| Source value | Canonical value | Sample title |',
    '| --- | --- | --- |',
    ...report.examples.map((example) => `| ${String(example.raw).replaceAll('|', '\\|')} | ${String(example.canonical).replaceAll('|', '\\|')} | ${String(example.sampleTitle).replaceAll('|', '\\|')} |`),
    '',
  ].join('\n');
  await fs.writeFile(reportPath.replace(/\.json$/i, '.md'), `${markdownReport}\n`, 'utf8');
  console.log(`[manufacturers] report=${reportPath}`);
  for (const change of changedMappings.slice(0, 40)) console.log(`[manufacturers] ${change.raw || '(empty)'} -> ${change.canonical}`);
  if (changedMappings.length > 40) console.log(`[manufacturers] ... plus ${changedMappings.length - 40} additional name changes`);
  if (dryRun) {
    await client.end();
    process.exit(0);
  }

  // Apply product changes in small committed batches. A single JSON payload
  // for the whole catalogue exceeds Neon project storage/WAL limits.
  const changed = changes.map(({ id, canonical }) => ({ id, canonical }));
  for (let offset = 0; offset < changed.length; offset += 500) {
    const chunk = changed.slice(offset, offset + 500);
    await client.query('BEGIN');
    try {
      await client.query(`UPDATE products AS p
        SET brand = m.canonical, updated_at = NOW()
        FROM jsonb_to_recordset($1::jsonb) AS m(id text, canonical text)
        WHERE p.id = m.id`, [JSON.stringify(chunk)]);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    }
    console.log(`[manufacturers] products ${Math.min(offset + chunk.length, changed.length)}/${changed.length}`);
  }
  await client.query('BEGIN');
  await client.query(`DELETE FROM manufacturers WHERE name <> ALL($1::text[])`, [canonicalNames]);
  await client.query(`INSERT INTO manufacturers (id, name, slug, audit_class, audit_confidence, audit_reason, audit_source, logo_status)
    SELECT id, name, slug, audit_class, audit_confidence, audit_reason, audit_source, 'PENDING'
    FROM jsonb_to_recordset($1::jsonb) AS m(id text, name text, slug text, audit_class text, audit_confidence integer, audit_reason text, audit_source text)
    ON CONFLICT (name) DO UPDATE SET slug = EXCLUDED.slug, audit_class = EXCLUDED.audit_class,
      audit_confidence = EXCLUDED.audit_confidence, audit_reason = EXCLUDED.audit_reason,
      audit_source = EXCLUDED.audit_source, updated_at = NOW()`,
    [JSON.stringify(review.allowedRows.map((row) => ({ id: row.id, name: row.name, slug: row.slug, audit_class: row.auditClass, audit_confidence: row.auditConfidence, audit_reason: row.auditReason, audit_source: row.auditSource })))]);
  await client.query('COMMIT');
  if (noDownload) {
    console.log(`[manufacturers] synchronized ${canonicalNames.length} manufacturers; logos=skipped`);
    await client.end();
    process.exit(0);
  }

  await fs.mkdir(logoDir, { recursive: true });
  const logoResults = [];
  for (let i = 0; i < canonicalNames.length; i += 8) {
    const batch = canonicalNames.slice(i, i + 8);
    logoResults.push(...await Promise.all(batch.map(async (name) => ({ name, logo: await downloadLogo(name, logoDir) }))));
    console.log(`[manufacturers] logos ${Math.min(i + batch.length, canonicalNames.length)}/${canonicalNames.length}`);
  }

  const logoClient = new Client({ connectionString: databaseUrl, ssl: { rejectUnauthorized: false } });
  await logoClient.connect();
  try {
    await logoClient.query('BEGIN');
    await logoClient.query(`UPDATE manufacturers AS m
      SET logo_url = l.url, logo_source = l.source, logo_status = l.status, logo_updated_at = NOW(), updated_at = NOW()
      FROM jsonb_to_recordset($1::jsonb) AS l(name text, url text, source text, status text)
      WHERE m.name = l.name`, [JSON.stringify(logoResults.map(({ name, logo }) => ({ name, url: logo.url, source: logo.source, status: logo.status })))]);
    await logoClient.query('COMMIT');
  } catch (error) {
    await logoClient.query('ROLLBACK');
    throw error;
  } finally {
    await logoClient.end();
  }
  console.log(`[manufacturers] synchronized ${canonicalNames.length} manufacturers; logos=${logoDir}`);
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  await client.end();
}
