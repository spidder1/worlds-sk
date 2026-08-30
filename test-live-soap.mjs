async function inspectLiveResponses() {
  const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <getProductCatalogueFullDownloadZIPv1 xmlns="http://www.elinkx.cz/">
      <login>EthosAPI</login>
      <password>Ed_2025</password>
      <onStock>false</onStock>
      <Comodities>NB</Comodities>
      <ComoditiesTree></ComoditiesTree>
      <Producers></Producers>
      <Categories></Categories>
    </getProductCatalogueFullDownloadZIPv1>
  </soap:Body>
</soap:Envelope>`;

  console.log('Odosielam požiadavku getProductCatalogueFullDownloadZIPv1 so všetkými XML tagmi...');
  const res = await fetch('https://private-ws-sk.elinkx.biz/service.asmx', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': 'http://www.elinkx.cz/getProductCatalogueFullDownloadZIPv1'
    },
    body: soapEnvelope
  });

  const text = await res.text();
  console.log('HTTP Status:', res.status);
  console.log('Odpoveď eD systému (XML):');
  console.log(text);
}

inspectLiveResponses().catch(console.error);
