async function testAuthVariations() {
  const login = process.env.ED_LOGIN;
  const pass = process.env.ED_PASSWORD;
  if (!login || !pass) throw new Error('Missing ED_LOGIN or ED_PASSWORD.');
  const basicAuth = 'Basic ' + Buffer.from(`${login}:${pass}`).toString('base64');

  const endpoints = [
    'https://private-ws-sk.elinkx.biz/service.asmx',
    'https://private-ws.elinkx.biz/service.asmx',
    'https://private-ws.elinkx.cz/service.asmx',
    'https://private-ws-sk.elinkx.cz/service.asmx',
    'https://ws.elinkx.cz/service.asmx',
    'https://ws-sk.elinkx.cz/service.asmx',
    'https://ws.elinkx.biz/service.asmx',
    'https://ws-sk.elinkx.biz/service.asmx'
  ];

  const soap = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <getProductCategoryList xmlns="http://www.elinkx.cz/">
      <login>${login}</login>
      <password>${pass}</password>
    </getProductCategoryList>
  </soap:Body>
</soap:Envelope>`;

  for (const ep of endpoints) {
    try {
      console.log(`\n1. Skúšam endpoint: ${ep} (SOAP Body auth)...`);
      const res = await fetch(ep, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': 'http://www.elinkx.cz/getProductCategoryList'
        },
        body: soap
      });
      const text = await res.text();
      const status = text.match(/<StatusCode>(.*?)<\/StatusCode>/);
      const err = text.match(/<ErrorText>(.*?)<\/ErrorText>/);
      console.log(`   HTTP Status: ${res.status}, StatusCode: ${status ? status[1] : 'N/A'}, Chyba: ${err ? err[1] : (res.status === 200 ? 'OK' : 'FAIL')}`);
      if (res.status === 200 && (!err || err[1] !== 'User autentization failed')) {
        console.log(`   >>> ÚSPECH! Text:\n${text.slice(0, 300)}`);
      }

      // Also try with HTTP Basic Auth header
      console.log(`2. Skúšam endpoint: ${ep} (+ HTTP Basic Auth header)...`);
      const res2 = await fetch(ep, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': 'http://www.elinkx.cz/getProductCategoryList',
          'Authorization': basicAuth
        },
        body: soap
      });
      const text2 = await res2.text();
      const status2 = text2.match(/<StatusCode>(.*?)<\/StatusCode>/);
      const err2 = text2.match(/<ErrorText>(.*?)<\/ErrorText>/);
      console.log(`   HTTP Status: ${res2.status}, StatusCode: ${status2 ? status2[1] : 'N/A'}, Chyba: ${err2 ? err2[1] : 'OK'}`);
    } catch (e) {
      console.log(`   Chyba spojenia pre ${ep}: ${e.message}`);
    }
  }
}

testAuthVariations().catch(console.error);
