async function check() {
  const res = await fetch('https://private-ws-sk.elinkx.biz/service.asmx?WSDL');
  const text = await res.text();
  console.log('--- WSDL INFO ---');
  const ns = text.match(/targetNamespace="([^"]+)"/);
  console.log('Target Namespace:', ns ? ns[1] : 'unknown');
  
  const soapActions = [...text.matchAll(/soapAction="([^"]+)"/g)].map(m => m[1]);
  console.log('Available SOAP Actions (first 15):', soapActions.slice(0, 15));
}
check().catch(console.error);
