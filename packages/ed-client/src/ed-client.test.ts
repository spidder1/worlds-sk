import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import test from 'node:test';
import { EDSystemClient } from './ed-client.js';

async function withSoapServer(handler: (body: string, action: string) => string, run: (url: string) => Promise<void>) {
  const server = createServer(async (request, response) => {
    const chunks: Buffer[] = [];
    for await (const chunk of request) chunks.push(Buffer.from(chunk));
    const body = Buffer.concat(chunks).toString('utf8');
    response.writeHead(200, { 'content-type': 'text/xml; charset=utf-8' });
    response.end(handler(body, String(request.headers.soapaction || '')));
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  assert.ok(address && typeof address === 'object');
  try {
    await run(`http://127.0.0.1:${address.port}/service.asmx`);
  } finally {
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

test('createNewOrder serializes the WSDL B2B order head and parses response', async () => {
  await withSoapServer((body, action) => {
    assert.match(action, /createNewOrder$/);
    assert.match(body, /<ProductCode>SKU-1<\/ProductCode>/);
    assert.match(body, /<Qty>2<\/Qty>/);
    assert.match(body, /<test>true<\/test>/);
    assert.match(body, /<password>secret<\/password>/);
    return `<?xml version="1.0"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><createNewOrderResponse><createNewOrderResult><OrderSymbol>ED-42</OrderSymbol><Status><StatusCode>DONE</StatusCode></Status></createNewOrderResult></createNewOrderResponse></soap:Body></soap:Envelope>`;
  }, async (url) => {
    const result = await new EDSystemClient({ endpointUrl: url, login: 'login', password: 'secret' }).createNewOrder({
      NewOrderItems: [{ ProductCode: 'SKU-1', Qty: 2 }],
      TransportCode: 7,
      ShippingAddress: { name: 'Buyer', street: 'Street 1', city: 'Bratislava', zipCode: '81101', countryCode: 'SK' },
    });
    assert.equal(result.OrderSymbol, 'ED-42');
    assert.equal(result.Status.StatusCode, 'DONE');
  });
});

test('createNewOrderXML rejects envelope and entity payloads before sending', async () => {
  const client = new EDSystemClient({ endpointUrl: 'http://127.0.0.1:1/service.asmx', login: 'login', password: 'secret' });
  await assert.rejects(() => client.createNewOrderXML('<soap:Envelope />'), /inner order XML payload/);
  await assert.rejects(() => client.createNewOrderXML('<!DOCTYPE order [<!ENTITY x "x">]><order>&x;</order>'), /inner order XML payload/);
});

test('changeDocument serializes deferred invoicing changes', async () => {
  await withSoapServer((body, action) => {
    assert.match(action, /changeDocument$/);
    assert.match(body, /<Id>42<\/Id>/);
    assert.match(body, /<DocumentType>ORDER_HEAD<\/DocumentType>/);
    assert.match(body, /<ChangeType>DEFERRED_INVOICING<\/ChangeType>/);
    return `<?xml version="1.0"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><changeDocumentResponse><changeDocumentResult><Status><StatusCode>DONE</StatusCode></Status></changeDocumentResult></changeDocumentResponse></soap:Body></soap:Envelope>`;
  }, async (url) => {
    const result = await new EDSystemClient({ endpointUrl: url, login: 'login', password: 'secret' }).changeDocument({
      id: 42,
      documentType: 'ORDER_HEAD',
      changeType: 'DEFERRED_INVOICING',
    });
    assert.equal(result.Status.StatusCode, 'DONE');
  });
});

test('createNewOrderCustomer serializes the live WSDL orderHead and invoice fields', async () => {
  await withSoapServer((body, action) => {
    assert.match(action, /createNewOrderCustomer$/);
    assert.match(body, /<orderHead>/);
    assert.doesNotMatch(body, /<ord>/);
    assert.match(body, /<InvoiceAddress>/);
    assert.match(body, new RegExp('<customerOrgNo>123</customerOrgNo>'));
    assert.match(body, new RegExp('<customerOrgVat>SK123</customerOrgVat>'));
    assert.match(body, new RegExp('<customerCurrency>EUR</customerCurrency>'));
    assert.match(body, new RegExp('<deferredInvoicing>true</deferredInvoicing>'));
    return `<?xml version="1.0"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><createNewOrderCustomerResponse><createNewOrderCustomerResult><OrderSymbol>B2C-42</OrderSymbol><Status><StatusCode>DONE</StatusCode></Status></createNewOrderCustomerResult></createNewOrderCustomerResponse></soap:Body></soap:Envelope>`;
  }, async (url) => {
    const result = await new EDSystemClient({ endpointUrl: url, login: 'login', password: 'secret' }).createNewOrderCustomer({
      NewOrderCustomerItems: [{ ProductCode: 'SKU-1', Qty: 1, Price: 10, PriceVat: 12, VatRate: 1.2 }],
      ShippingAddress: { name: 'Buyer', street: 'Street 1', city: 'Bratislava', zipCode: '81101', countryCode: 'SK' },
      InvoiceAddress: { name: 'Company', street: 'Invoice 2', city: 'Bratislava', zipCode: '81102', countryCode: 'SK' },
      OrderSymbolCustomer: 'W-42', customerName: 'Company', customerOrgNo: '123', customerOrgVat: 'SK123',
      custumerInvoiceCode: 'INV-42', email: 'buyer@example.test', telephone: '+421900000000', price: 10, priceVat: 12,
      TransportCode: 7, deferredInvoicing: true, customerCurrency: 'EUR',
    });
    assert.equal(result.OrderSymbol, 'B2C-42');
  });
});
