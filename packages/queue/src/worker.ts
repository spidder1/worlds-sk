import { spawn } from 'node:child_process';
import { createSyncWorker, type SyncJobProcessor } from './index.js';

const commands: Record<string, string[]> = {
  'catalog-full': ['--filter', '@worlds/importer', 'run', 'sync:catalog'],
  'stock-price': ['--filter', '@worlds/importer', 'run', 'sync:stock-price'],
  'image-loader': ['--filter', '@worlds/importer', 'run', 'sync:images'],
  'manufacturer-cleanup': ['manufacturers:clean'],
  'transport-dictionary': ['transport:sync'],
  'supplier-orders': ['orders:submit'],
  'search-drain': ['search:drain'],
};

function runCommand(args: string[], data: Record<string, unknown>): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm', args, {
      env: { ...process.env, ...(data.dryRun ? { DRY_RUN: 'true' } : {}) },
      stdio: 'inherit',
    });
    child.once('error', reject);
    child.once('exit', (code) => code === 0 ? resolve() : reject(new Error(`sync command exited with code ${code ?? 'unknown'}`)));
  });
}

const processor: SyncJobProcessor = async (job) => {
  const args = commands[job.name];
  if (!args) throw new Error(`Unsupported sync job: ${job.name}`);
  console.log(`[queue] starting ${job.name} (${job.id})`);
  await runCommand(args, job.data);
  console.log(`[queue] completed ${job.name} (${job.id})`);
};

const worker = createSyncWorker(processor);
worker.on('failed', (job, error) => console.error(`[queue] failed ${job?.name || 'unknown'}:`, error));
worker.on('error', (error) => console.error('[queue] worker error:', error));
console.log(`[queue] listening on ${process.env.REDIS_URL ? new URL(process.env.REDIS_URL).host : 'Redis'}`);

const stop = async () => { await worker.close(); process.exit(0); };
process.once('SIGTERM', stop);
process.once('SIGINT', stop);
