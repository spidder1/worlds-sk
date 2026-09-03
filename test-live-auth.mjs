async function testAllMethods() {
  const login = process.env.ED_LOGIN;
  const pass = process.env.ED_PASSWORD;
  if (!login || !pass) throw new Error('Missing ED_LOGIN or ED_PASSWORD.');
  const endpoint = 'https://private-ws-sk.elinkx.biz/service.asmx';

  console.log('===========================================================');
  console.log(` Testovanie eD system API so zadanými údajmi:`);
  console.log(' Credentials: loaded from environment');
  console.log(` Endpoint: ${endpoint}`);
  console.log('===========================================================\n');

  const methods = [
    {
      name: 'getProductCategoryList',
      xml: `<getProductCategoryList xmlns="http://www.elinkx.cz/"><login>${login}</login><password>${pass}</password></getProductCategoryList>`
    },
    {
      name: 'getProductProducerList',
      xml: `<getProductProducerList xmlns="http://www.elinkx.cz/"><login>${login}</login><password>${pass}</password></getProductProducerList>`
    },
    {
      name: 'getProductCommodityList',
      xml: `<getProductCommodityList xmlns="http://www.elinkx.cz/"><login>${login}</login><password>${pass}</password></getProductCommodityList>`
    },
    {
      name: 'getProductCatalogueStockDownloadXML',
      xml: `<getProductCatalogueStockDownloadXML xmlns="http://www.elinkx.cz/"><login>${login}</login><password>${pass}</password></getProductCatalogueStockDownloadXML>`
    },
    {
      name: 'getProductCatalogueDownloadZIP',
      xml: `<getProductCatalogueDownloadZIP xmlns="http://www.elinkx.cz/"><login>${login}</login><password>${pass}</password></getProductCatalogueDownloadZIP>`
    },
    {
      name: 'getTransportationListCustomer',
      xml: `<getTransportationListCustomer xmlns="http://www.elinkx.cz/"><login>${login}</login><password>${pass}</password></getTransportationListCustomer>`
    }
  ];

  for (const m of methods) {
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
      const isReadyMatch = text.match(/<isReady>(.*?)<\/isReady>/);
      const urlMatch = text.match(/<Url>(.*?)<\/Url>/);

      console.log(`Metóda: ${m.name}`);
      console.log(`  HTTP Kód: ${res.status}`);
      if (statusMatch) console.log(`  Status: ${statusMatch[1]}`);
      if (errorMatch) console.log(`  Chyba: ${errorMatch[1]}`);
      if (isReadyMatch) console.log(`  isReady: ${isReadyMatch[1]}`);
      if (urlMatch) console.log(`  Download URL: ${urlMatch[1]}`);
      if (!statusMatch && !errorMatch && res.status === 200) {
        console.log(`  Odpoveď (skrátená): ${text.slice(0, 300)}...`);
      }
      console.log('-----------------------------------------------------------');
    } catch (err) {
      console.error(`Chyba pri volaní ${m.name}:`, err.message);
    }
  }
}

testAllMethods().catch(console.error);
