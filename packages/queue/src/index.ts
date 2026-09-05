import { Queue, Worker, type Job, type JobsOptions, type Processor } from 'bullmq';
import { Redis } from 'ioredis';

export const SYNC_QUEUE_NAME = 'worlds-sync';

export type SyncJobName = 'catalog-full' | 'stock-price' | 'image-loader' | 'manufacturer-cleanup' | 'search-drain';

export type SyncJobData = {
  requestedBy?: string;
  mode?: string;
  dryRun?: boolean;
};

function redisUrl(): string {
  const value = process.env.REDIS_URL?.trim();
  if (!value) throw new Error('REDIS_URL is required to use the BullMQ worker');
  return value;
}

export function createRedisConnection(): Redis {
  return new Redis(redisUrl(), { maxRetriesPerRequest: null, enableReadyCheck: false });
}

export function createSyncQueue(connection = createRedisConnection()): Queue<SyncJobData> {
  return new Queue<SyncJobData>(SYNC_QUEUE_NAME, { connection });
}

export async function enqueueSyncJob(name: SyncJobName, data: SyncJobData = {}, options: JobsOptions = {}) {
  const queue = createSyncQueue();
  try {
    return await queue.add(name, data, {
      removeOnComplete: { age: 86_400, count: 1000 },
      removeOnFail: { age: 604_800, count: 1000 },
      attempts: 3,
      backoff: { type: 'exponential', delay: 30_000 },
      ...options,
    });
  } finally {
    await queue.close();
  }
}

export function createSyncWorker(processor: Processor<SyncJobData>, connection = createRedisConnection()): Worker<SyncJobData> {
  return new Worker<SyncJobData>(SYNC_QUEUE_NAME, processor, {
    connection,
    concurrency: Math.max(1, Number(process.env.REDIS_WORKER_CONCURRENCY || 1)),
  });
}

export type SyncJobProcessor = (job: Job<SyncJobData>) => Promise<unknown>;
