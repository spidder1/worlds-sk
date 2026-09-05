const jobName = process.argv[2];
const allowed = new Set(['catalog-full', 'stock-price', 'image-loader', 'manufacturer-cleanup', 'transport-dictionary', 'search-drain']);
if (!allowed.has(jobName)) throw new Error(`Usage: node scripts/enqueue-sync-job.mjs <${[...allowed].join('|')}>`);
const { enqueueSyncJob } = await import('../packages/queue/dist/index.js');
const job = await enqueueSyncJob(jobName, { requestedBy: process.env.QUEUE_REQUESTED_BY || 'cli' });
console.log(JSON.stringify({ id: job.id, name: job.name, queue: 'worlds-sync' }));
