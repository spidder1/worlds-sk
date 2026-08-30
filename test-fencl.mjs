async function testIvanFenclEndpoint() {
  const login = 'EthosAPI';
  const pass = 'Ed_2025';
  const endpoint = 'https://private-ws-sk.elinkx.biz/service.asmx';

  console.log('===========================================================');
  console.log(' Testovanie endpointu zadaného Ivanom Fenclom:');
  console.log(` Endpoint: ${endpoint}`);
  console.log(` Login: "${login}", Heslo: "${pass}"`);
  console.log('===========================================================\n');

  const testMethods = [
    {
      name: 'getProductCategoryList',
      xml: `<getProductCategoryList xmlns="http://www.elinkx.cz/"><login>${login}</login><password>${pass}</password></getProductCategoryList>`
    },
    {
      name: 'getProductSuperCategoryList',
      xml: `<getProductSuperCategoryList xmlns="http://www.elinkx.cz/"><login>${login}</login><password>${pass}</password></getProductSuperCategoryList>`
    },
    {
      name: 'getProductProducerList',
      xml: `<getProductProducerList xmlns="http://www.elinkx.cz/"><login>${login}</login><password>${pass}</password></getProductProducerList>`
    },
    {
      name: 'getProductCatalogueStockDownloadXML',
      xml: `<getProductCatalogueStockDownloadXML xmlns="http://www.elinkx.cz/"><login>${login}</login><password>${pass}</password></getProductCatalogueStockDownloadXML>`
    },
    {
      name: 'getProductCatalogueDownloadZIP',
      xml: `<getProductCatalogueDownloadZIP xmlns="http://www.elinkx.cz/"><login>${login}</login><password>${pass}</password></getProductCatalogueDownloadZIP>`
    }
  ];

  for (const m of testMethods) {
    const soap = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>${m.xml}</soap:Body>
</soap:Envelope>`;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': `http://www.elinkx.cz/${m.name}`
        },
        body: soap
      });

      const text = await res.text();
      const statusMatch = text.match(/<StatusCode>(.*?)<\/StatusCode>/);
      const errorMatch = text.match(/<ErrorText>(.*?)<\/ErrorText>/);
      const urlMatch = text.match(/<Url>(.*?)<\/Url>/);

      console.log(`👉 Metóda: ${m.name}`);
      console.log(`   HTTP Status: ${res.status}`);
      if (statusMatch) console.log(`   Status: ${statusMatch[1]}`);
      if (errorMatch) console.log(`   ErrorText: ${errorMatch[1]}`);
      if (urlMatch) console.log(`   Download URL: ${urlMatch[1]}`);
      if (!errorMatch && res.status === 200) {
        console.log(`   Odpoveď (náhľad XML): ${text.slice(0, 400)}...`);
      }
    } catch (err) {
      console.error(`   Chyba volania: ${err.message}`);
    }
  }
}

testIvanFenclEndpoint().catch(console.error);
