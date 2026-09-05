#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const endpointValue = process.env.ED_ENDPOINT_URL?.trim();
if (!endpointValue) throw new Error('ED_ENDPOINT_URL is required');

const endpoint = new URL(endpointValue);
if (endpoint.protocol !== 'https:') throw new Error('ED_ENDPOINT_URL must use HTTPS');
if (!endpoint.hostname) throw new Error('ED_ENDPOINT_URL must contain a hostname');

const wsdlUrl = new URL(endpoint.toString());
// Some classic ASMX endpoints distinguish the bare `?WSDL` form from the
// serialized `?WSDL=` form, so preserve the conventional spelling explicitly.
if (!/[?&]WSDL(?:=|&|$)/i.test(wsdlUrl.search)) {
  wsdlUrl.search = `${wsdlUrl.search ? `${wsdlUrl.search}&` : '?'}WSDL`;
}
if (wsdlUrl.hostname !== endpoint.hostname) throw new Error('WSDL host must match ED_ENDPOINT_URL host');

const response = await fetch(wsdlUrl, { signal: AbortSignal.timeout(30_000), headers: { accept: 'text/xml, application/xml;q=0.9, */*;q=0.1' } });
if (!response.ok) throw new Error(`WSDL request failed with HTTP ${response.status}`);
const body = await response.text();
if (body.length < 256 || !/<(?:[\w-]+:)?definitions\b/i.test(body)) {
  throw new Error('WSDL response does not contain a valid definitions document');
}
if (/(ED_PASSWORD|ED_LOGIN|password\s*[:=]|authorization\s*[:=])/i.test(body)) {
  throw new Error('WSDL response appears to contain credentials; refusing to archive it');
}

const sha256 = crypto.createHash('sha256').update(body, 'utf8').digest('hex');
const here = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(here, '..', 'downloads', 'contracts');
const outputPath = path.join(outputDir, 'ed-service.wsdl');
const metadataPath = path.join(outputDir, 'ed-service.wsdl.json');
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, body, 'utf8');
fs.writeFileSync(metadataPath, `${JSON.stringify({ endpointHost: endpoint.hostname, wsdlUrl: wsdlUrl.toString(), sha256, bytes: Buffer.byteLength(body), capturedAt: new Date().toISOString() }, null, 2)}\n`, 'utf8');
console.log(`[ed-contract] saved ${path.relative(process.cwd(), outputPath)} sha256=${sha256} bytes=${Buffer.byteLength(body)}`);
