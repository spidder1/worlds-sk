async function testLoginVariations() {
  const login = process.env.ED_LOGIN;
  const pass = process.env.ED_PASSWORD;
  if (!login || !pass) throw new Error('Missing ED_LOGIN or ED_PASSWORD.');
  const variations = [{ login, pass }];

  for (const v of variations) {
    const soap = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <getProductCatalogueStockDownloadXML xmlns="http://www.elinkx.cz/">
      <login>${v.login}</login>
      <password>${v.pass}</password>
    </getProductCatalogueStockDownloadXML>
  </soap:Body>
</soap:Envelope>`;

    const res = await fetch('https://private-ws-sk.elinkx.biz/service.asmx', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://www.elinkx.cz/getProductCatalogueStockDownloadXML'
      },
      body: soap
    });
    const text = await res.text();
    const status = text.match(/<StatusCode>(.*?)<\/StatusCode>/);
    const err = text.match(/<ErrorText>(.*?)<\/ErrorText>/);
    console.log(`Login: "${v.login}", Pass: "${v.pass}" -> Status: ${status ? status[1] : 'N/A'}, Msg: ${err ? err[1] : 'OK'}`);
  }
}

testLoginVariations().catch(console.error);
