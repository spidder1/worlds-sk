import { XMLParser } from 'fast-xml-parser';

export interface SoapCallOptions {
  endpoint: string;
  action: string;
  bodyXml: string;
  timeoutMs?: number;
}

export function escapeXml(unsafe: string | number | boolean | undefined | null): string {
  if (unsafe === undefined || unsafe === null) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function executeSoapCall<T = any>(options: SoapCallOptions): Promise<T> {
  const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    ${options.bodyXml}
  </soap:Body>
</soap:Envelope>`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 60000);

  try {
    const response = await fetch(options.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        SOAPAction: options.action,
      },
      body: soapEnvelope,
      signal: controller.signal,
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`SOAP Request failed (${response.status} ${response.statusText}): ${responseText}`);
    }

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '#text',
      parseTagValue: true,
      trimValues: true,
    });

    const parsed = parser.parse(responseText);
    const body = parsed?.['soap:Envelope']?.['soap:Body'] || parsed?.['Envelope']?.['Body'];

    if (!body) {
      throw new Error(`Malformed SOAP Response envelope: ${responseText.substring(0, 500)}`);
    }

    return body as T;
  } finally {
    clearTimeout(timeout);
  }
}
