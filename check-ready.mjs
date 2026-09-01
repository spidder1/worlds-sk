import fs from 'node:fs';
import path from 'node:path';
import AdmZip from 'adm-zip';
import { XMLParser } from 'fast-xml-parser';

async function waitAndDownload() {
  const login = encodeURIComponent('EthosAPI');
  const pass = encodeURIComponent('Ed_2025');

  console.log('1. Kontrolujem pripravené katalógy v eD systéme...');

  // Skúsime najprv getProductCatalogueDownloadZIP (hlavný katalóg)
  const mainCatalogUrl = `https://private-ws-sk.elinkx.biz/service.asmx/getProductCatalogueDownloadZIP?login=${login}&password=${pass}`;
  const res1 = await fetch(mainCatalogUrl);
  const text1 = await res1.text();
  console.log('Odpoveď getProductCatalogueDownloadZIP:\n', text1);

  // Skúsime getProductCatalogueStockDownloadXML (skladové zásoby)
  const stockUrl = `https://private-ws-sk.elinkx.biz/service.asmx/getProductCatalogueStockDownloadXML?login=${login}&password=${pass}`;
  const res2 = await fetch(stockUrl);
  const text2 = await res2.text();
  console.log('\nOdpoveď getProductCatalogueStockDownloadXML:\n', text2);

  // Skúsime získať kategórie (okamžité dáta)
  const navUrl = `https://private-ws-sk.elinkx.biz/service.asmx/getNavigator?login=${login}&password=${pass}`;
  const res3 = await fetch(navUrl);
  const text3 = await res3.text();
  console.log(`\nOdpoveď getNavigator (Dĺžka: ${text3.length} znakov)`);
  fs.writeFileSync('downloads/navigator.xml', text3, 'utf8');
}

waitAndDownload().catch(console.error);
