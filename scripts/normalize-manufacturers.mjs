#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import pg from 'pg';

const databaseUrl = process.env.DATABASE_URL?.trim();
if (!databaseUrl) throw new Error('DATABASE_URL is required');

const dryRun = process.argv.includes('--dry-run');
const noDownload = process.argv.includes('--no-download');
const logoDir = path.resolve(process.env.MANUFACTURER_LOGO_DIR || 'apps/storefront/public/manufacturers');

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
]);

const TITLE_NOISE = new Set([...NOISE, 'laserová', 'laserova', 'inkoustová', 'inkoustova', 'herný', 'herny', 'pracovný', 'pracovny']);

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

function cleanBrand(raw, title, knownBrands) {
  const value = String(raw || '').replace(/&amp;/gi, '&').replace(/\s+/g, ' ').trim();
  const candidateFromTitle = titleBrand(title, knownBrands) || titlePrefix(title);
  const words = value.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  const isNoise = !value || words.length === 0 || words.every((word) => NOISE.has(word));
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
  const result = await client.query(`SELECT brand, title FROM products WHERE status = 'ACTIVE' AND final_price > 0 AND brand IS NOT NULL`);
  // Use a curated brand dictionary for title recovery. Raw supplier values are
  // deliberately not added here because values such as "Monitor" or "Dotykový"
  // are product descriptors, not manufacturers.
  const knownBrands = [...new Set(KNOWN_BRANDS)].sort((a, b) => b.length - a.length);
  const mappings = new Map();
  for (const row of result.rows) {
    const canonical = cleanBrand(row.brand, row.title, knownBrands);
    const raw = String(row.brand || '').trim();
    if (!mappings.has(raw)) mappings.set(raw, { canonical, titles: [] });
    mappings.get(raw).titles.push(row.title);
  }
  const canonicalNames = [...new Set([...mappings.values()].map((mapping) => mapping.canonical))].filter(Boolean);
  console.log(`[manufacturers] products=${result.rowCount} raw=${mappings.size} canonical=${canonicalNames.length}`);
  const changedMappings = [...mappings].filter(([raw, mapping]) => raw !== mapping.canonical);
  for (const [raw, mapping] of changedMappings.slice(0, 40)) console.log(`[manufacturers] ${raw || '(empty)'} -> ${mapping.canonical}`);
  if (changedMappings.length > 40) console.log(`[manufacturers] ... plus ${changedMappings.length - 40} additional name changes`);
  if (dryRun) {
    await client.end();
    process.exit(0);
  }

  // Keep the write transaction short. Logo providers are external and must
  // never hold a Neon transaction open while they respond.
  await client.query('BEGIN');
  const changed = [...mappings]
    .filter(([raw, mapping]) => raw !== mapping.canonical)
    .map(([raw, mapping]) => ({ raw, canonical: mapping.canonical }));
  if (changed.length > 0) {
    await client.query(`UPDATE products AS p
      SET brand = m.canonical, updated_at = NOW()
      FROM jsonb_to_recordset($1::jsonb) AS m(raw text, canonical text)
      WHERE p.brand = m.raw`, [JSON.stringify(changed)]);
  }
  await client.query(`DELETE FROM manufacturers WHERE name <> ALL($1::text[])`, [canonicalNames]);
  await client.query(`INSERT INTO manufacturers (id, name, slug, logo_status)
    SELECT id, name, slug, 'PENDING'
    FROM jsonb_to_recordset($1::jsonb) AS m(id text, name text, slug text)
    ON CONFLICT (name) DO UPDATE SET slug = EXCLUDED.slug, updated_at = NOW()`,
    [JSON.stringify(canonicalNames.map((name) => ({ id: manufacturerId(name), name, slug: manufacturerSlug(name) })))]);
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
