async function testHttp() {
  const login = process.env.ED_LOGIN;
  const password = process.env.ED_PASSWORD;
  if (!login || !password) throw new Error('Missing ED_LOGIN or ED_PASSWORD.');
  const soap = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <getProductCatalogueStockDownloadXML xmlns="http://www.elinkx.cz/">
      <login>${login}</login>
      <password>${password}</password>
    </getProductCatalogueStockDownloadXML>
  </soap:Body>
</soap:Envelope>`;

  const urls = [
    'http://private-ws-sk.elinkx.biz/service.asmx',
    'https://private-ws-sk.elinkx.biz/service.asmx',
    'http://private-ws.elinkx.biz/service.asmx',
    'https://private-ws.elinkx.biz/service.asmx'
  ];

  for (const u of urls) {
    try {
      console.log(`Skúšam: ${u}`);
      const res = await fetch(u, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': 'http://www.elinkx.cz/getProductCatalogueStockDownloadXML'
        },
        body: soap
      });
      const text = await res.text();
      console.log(`Status: ${res.status}`);
      const err = text.match(/<ErrorText>(.*?)<\/ErrorText>/);
      console.log(`Chyba: ${err ? err[1] : 'OK'}`);
    } catch (e) {
      console.log(`Chyba pripojenia: ${e.message}`);
    }
  }
}

testHttp().catch(console.error);
