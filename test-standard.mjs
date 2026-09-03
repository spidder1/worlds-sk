async function testStandardDownloads() {
  const login = process.env.ED_LOGIN;
  const password = process.env.ED_PASSWORD;
  if (!login || !password) throw new Error('Missing ED_LOGIN or ED_PASSWORD.');
  // Test getProductCatalogueDownloadZIP
  const soap1 = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <getProductCatalogueDownloadZIP xmlns="http://www.elinkx.cz/">
      <login>${login}</login>
      <password>${password}</password>
    </getProductCatalogueDownloadZIP>
  </soap:Body>
</soap:Envelope>`;

  console.log('1. Volám getProductCatalogueDownloadZIP...');
  const res1 = await fetch('https://private-ws-sk.elinkx.biz/service.asmx', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'http://www.elinkx.cz/getProductCatalogueDownloadZIP'
    },
    body: soap1
  });
  console.log('Status ZIP:', res1.status);
  const text1 = await res1.text();
  console.log(text1.slice(0, 800));

  // Test getProductCatalogueStockDownloadXML
  const soap2 = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <getProductCatalogueStockDownloadXML xmlns="http://www.elinkx.cz/">
      <login>${login}</login>
      <password>${password}</password>
    </getProductCatalogueStockDownloadXML>
  </soap:Body>
</soap:Envelope>`;

  console.log('\n2. Volám getProductCatalogueStockDownloadXML...');
  const res2 = await fetch('https://private-ws-sk.elinkx.biz/service.asmx', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'http://www.elinkx.cz/getProductCatalogueStockDownloadXML'
    },
    body: soap2
  });
  console.log('Status Stock XML:', res2.status);
  const text2 = await res2.text();
  console.log(text2.slice(0, 800));
}

testStandardDownloads().catch(console.error);
