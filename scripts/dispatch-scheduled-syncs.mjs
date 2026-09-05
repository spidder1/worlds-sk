import pg from 'pg';

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL?.trim();
const token = process.env.GITHUB_TOKEN?.trim();
const repository = process.env.GITHUB_REPOSITORY?.trim() || 'spidder1/worlds-sk';
if (!connectionString || !token) throw new Error('DATABASE_URL and GITHUB_TOKEN are required');

function matchesField(value, expression, min, max) {
  if (!expression || expression === '*') return true;
  return expression.split(',').some((part) => {
    const [base, stepText] = part.split('/');
    const step = stepText ? Number(stepText) : 1;
    if (!Number.isInteger(step) || step < 1) return false;
    if (base === '*') return (value - min) % step === 0;
    if (/^\d+$/.test(base)) return Number(base) === value;
    const [from, to] = base.split('-').map(Number);
    if (!Number.isInteger(from) || !Number.isInteger(to)) return false;
    return value >= from && value <= to && (value - from) % step === 0;
  });
}

function cronMatches(expression, date) {
  const fields = String(expression || '').trim().split(/\s+/);
  if (fields.length !== 5) return false;
  const [minute, hour, day, month, weekday] = fields;
  return matchesField(date.getUTCMinutes(), minute, 0, 59)
    && matchesField(date.getUTCHours(), hour, 0, 23)
    && matchesField(date.getUTCDate(), day, 1, 31)
    && matchesField(date.getUTCMonth() + 1, month, 1, 12)
    && matchesField(date.getUTCDay(), weekday, 0, 6);
}

const pool = new Pool({ connectionString, max: 2 });
const now = new Date();
try {
  const { rows } = await pool.query(`SELECT job_key, workflow_file, schedule_cron, last_dispatched_at
    FROM sync_job_settings WHERE enabled = true AND schedule_cron IS NOT NULL`);
  for (const job of rows) {
    const last = job.last_dispatched_at ? new Date(job.last_dispatched_at).getTime() : 0;
    if (!cronMatches(job.schedule_cron, now) || now.getTime() - last < 4 * 60 * 1000) continue;
    const inputs = job.job_key === 'stock-price' ? { mode: 'stock-price' } : job.job_key === 'catalog-full' ? { mode: 'full' } : job.job_key === 'manufacturer-cleanup' ? { dry_run: 'false' } : {};
    const response = await fetch(`https://api.github.com/repos/${repository}/actions/workflows/${encodeURIComponent(job.workflow_file)}/dispatches`, {
      method: 'POST', headers: { accept: 'application/vnd.github+json', authorization: `Bearer ${token}`, 'content-type': 'application/json', 'user-agent': 'worlds-scheduled-dispatcher' },
      body: JSON.stringify({ ref: 'main', inputs }),
    });
    if (!response.ok) throw new Error(`${job.job_key}: GitHub returned ${response.status}`);
    await pool.query('UPDATE sync_job_settings SET last_dispatched_at = NOW(), updated_at = NOW() WHERE job_key = $1', [job.job_key]);
    console.log(`[scheduler] dispatched ${job.job_key}`);
  }
} finally {
  await pool.end();
}
