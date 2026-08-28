import fs from 'node:fs';
import path from 'node:path';
import stream from 'node:stream';
import { promisify } from 'node:util';
import zlib from 'node:zlib';

const pipeline = promisify(stream.pipeline);

export interface DownloadFileOptions {
  url: string;
  targetPath: string;
  timeoutMs?: number;
  onProgress?: (bytesDownloaded: number) => void;
}

export async function downloadFile(options: DownloadFileOptions): Promise<string> {
  const { url, targetPath, timeoutMs = 300000, onProgress } = options;

  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok || !response.body) {
      throw new Error(`Failed to download file from ${url}: ${response.status} ${response.statusText}`);
    }

    const fileStream = fs.createWriteStream(targetPath);
    let downloaded = 0;

    // Readable stream handling
    // @ts-ignore
    const nodeReadable = stream.Readable.fromWeb(response.body);

    nodeReadable.on('data', (chunk: Buffer) => {
      downloaded += chunk.length;
      onProgress?.(downloaded);
    });

    await pipeline(nodeReadable, fileStream);
    return targetPath;
  } finally {
    clearTimeout(timeout);
  }
}
