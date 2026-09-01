async function testHttpGet() {
  const login = encodeURIComponent('EthosAPI');
  const pass = encodeURIComponent('Ed_2025');

  const methods = [
    `https://private-ws-sk.elinkx.biz/service.asmx/getNavigator?login=${login}&password=${pass}`,
    `https://private-ws-sk.elinkx.biz/service.asmx/getProductSuperCategoryList?login=${login}&password=${pass}`,
    `https://private-ws-sk.elinkx.biz/service.asmx/getProductCategoryList?login=${login}&password=${pass}`,
    `https://private-ws-sk.elinkx.biz/service.asmx/getProductProducerList?login=${login}&password=${pass}`,
    `https://private-ws-sk.elinkx.biz/service.asmx/getProductCatalogueStockDownloadXML?login=${login}&password=${pass}`,
    `https://private-ws-sk.elinkx.biz/service.asmx/getProductCatalogueDownloadZIP?login=${login}&password=${pass}`,
    `https://private-ws-sk.elinkx.biz/service.asmx/getProductCatalogueFullDownloadZIP?login=${login}&password=${pass}&onStock=false&Comodities=NB`
  ];

  console.log('===========================================================');
  console.log(' Testovanie eD system cez HTTP GET URL');
  console.log('===========================================================\n');

  for (const url of methods) {
    const methodName = url.split('/service.asmx/')[1].split('?')[0];
    console.log(`\n👉 Volám: ${methodName}...`);
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/xml, text/xml, */*'
        }
      });

      console.log(`   HTTP Kód: ${res.status} ${res.statusText}`);
      const text = await res.text();
      console.log(`   Odpoveď (prvých 500 znakov):\n   ${text.slice(0, 500)}...`);
    } catch (e) {
      console.log(`   Chyba: ${e.message}`);
    }
  }
}

testHttpGet().catch(console.error);
