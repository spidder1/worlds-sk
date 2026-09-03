async function testEndpoints() {
  const login = process.env.ED_LOGIN;
  const password = process.env.ED_PASSWORD;
  if (!login || !password) throw new Error('Missing ED_LOGIN or ED_PASSWORD.');
  const endpoints = [
    'https://private-ws-sk.elinkx.biz/service.asmx',
    'https://private-ws.elinkx.biz/service.asmx',
    'https://ws.elinkx.biz/service.asmx',
    'https://ws-sk.elinkx.biz/service.asmx'
  ];

  const soap = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <getProductCatalogueDownloadZIP xmlns="http://www.elinkx.cz/">
      <login>${login}</login>
      <password>${password}</password>
    </getProductCatalogueDownloadZIP>
  </soap:Body>
</soap:Envelope>`;

  for (const ep of endpoints) {
    try {
      console.log(`\nTestujem endpoint: ${ep}...`);
      const res = await fetch(ep, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': 'http://www.elinkx.cz/getProductCatalogueDownloadZIP'
        },
        body: soap
      });
      console.log(`Status: ${res.status}`);
      const text = await res.text();
      const statusMatch = text.match(/<Status>[\s\S]*?<\/Status>/);
      console.log('Výsledok:', statusMatch ? statusMatch[0] : text.slice(0, 300));
    } catch (err) {
      console.error(`Chyba pre ${ep}:`, err.message);
    }
  }
}

testEndpoints().catch(console.error);
