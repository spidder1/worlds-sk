async function inspectWsdlMethods() {
  const res = await fetch('https://private-ws-sk.elinkx.biz/service.asmx?WSDL');
  const wsdl = await res.text();
  
  // Find elements related to getProductCatalogue
  const matches = [...wsdl.matchAll(/<s:element name="(getProductCatalogue[^"]*)">([\s\S]*?)<\/s:element>/g)];
  for (const m of matches) {
    console.log(`\nMethod: ${m[1]}`);
    const params = [...m[2].matchAll(/<s:element[^>]*name="([^"]+)"[^>]*type="([^"]+)"/g)].map(p => `${p[1]} (${p[2]})`);
    console.log('Params:', params);
  }
}

inspectWsdlMethods().catch(console.error);
