import fs from 'node:fs';
import path from 'node:path';
import AdmZip from 'adm-zip';
import { XMLParser } from 'fast-xml-parser';

async function downloadAndInspectNotebooks() {
  console.log('===========================================================');
  console.log(' SŤAHUJEM SKUTOČNÝ ŽIVÝ KATALÓG NOTEBOOKOV Z eD SYSTEM');
  console.log('===========================================================\n');

  // 1. Získanie čerstvej URL
  const login = encodeURIComponent('EthosAPI');
  const pass = encodeURIComponent('Ed_2025');
  const reqUrl = `https://private-ws-sk.elinkx.biz/service.asmx/getProductCatalogueFullDownloadZIP?login=${login}&password=${pass}&onStock=false&Comodities=NB`;

  console.log('1. Žiadam eD systém o čerstvý balík notebookov (NB)...');
  const res = await fetch(reqUrl);
  const text = await res.text();

  const urlMatch = text.match(/<url>(.*?)<\/url>/i) || text.match(/<Url>(.*?)<\/Url>/i);
  const fileNameMatch = text.match(/<fileName>(.*?)<\/fileName>/i) || text.match(/<FileName>(.*?)<\/FileName>/i);

  if (!urlMatch || !urlMatch[1]) {
    console.error('Chyba pri získavaní URL z XML:', text);
    return;
  }

  const downloadUrl = urlMatch[1];
  const fileName = fileNameMatch ? fileNameMatch[1] : 'notebooks_live.zip';
  console.log(`✓ Súbor vygenerovaný eD systémom: ${fileName}`);
  console.log(`  Download URL: ${downloadUrl}\n`);

  // 2. Stiahnutie súboru
  const downloadsDir = path.resolve(process.cwd(), 'downloads');
  if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });
  const targetZip = path.join(downloadsDir, fileName);

  console.log(`2. Sťahujem ${downloadUrl} do ${targetZip}...`);
  const fileRes = await fetch(downloadUrl);
  const arrayBuffer = await fileRes.arrayBuffer();
  fs.writeFileSync(targetZip, Buffer.from(arrayBuffer));
  console.log(`✓ Súbor úspešne stiahnutý (${(arrayBuffer.byteLength / 1024 / 1024).toFixed(2)} MB)\n`);

  // 3. Rozbalenie ZIP a analýza XML
  console.log('3. Rozbaľujem ZIP archív...');
  const zip = new AdmZip(targetZip);
  const entries = zip.getEntries();
  console.log(`  Súbory v archíve: ${entries.map(e => e.entryName).join(', ')}`);

  const xmlEntry = entries.find(e => e.entryName.endsWith('.xml'));
  if (!xmlEntry) {
    console.error('V ZIP archíve sa nenašiel XML súbor!');
    return;
  }

  const xmlContent = xmlEntry.getData().toString('utf8');
  console.log(`✓ XML rozbalené (${(xmlContent.length / 1024 / 1024).toFixed(2)} MB textu). Parsujem produkty...\n`);

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    parseTagValue: true,
    trimValues: true,
  });

  const parsed = parser.parse(xmlContent);
  const items =
    parsed?.ArrayOfProductComplete?.ProductComplete ||
    parsed?.ArrayOfProduct?.Product ||
    parsed?.ProductList?.Product ||
    parsed?.ProductCatalogue?.Product ||
    [];

  const products = Array.isArray(items) ? items : [items];
  console.log('===========================================================');
  console.log(` 🎉 ÚSPECH! CELKOVÝ POČET ŽIVÝCH NOTEBOOKOV V eD SKLADE: ${products.length}`);
  console.log('===========================================================\n');

  console.log('Ukážka prvých 10 skutočných notebookov z eD distribúcie:');
  products.slice(0, 10).forEach((p, idx) => {
    console.log(`[${idx + 1}] Kód: ${p.Code || p.ProId} | ${p.ProducerName || p.ProducerCode} | PartNumber: ${p.PartNumber || p.PartNumber2}`);
    console.log(`    Názov: ${p.Name || p.ProductName}`);
    console.log(`    Cena bez DPH: ${p.YourPriceWithFees || p.Price} € | Skladom: ${p.OnStock || p.OnStockCount} ks`);
    console.log('-----------------------------------------------------------');
  });

  // Uloženie ukážky do súboru
  fs.writeFileSync('downloads/sample_notebooks.json', JSON.stringify(products.slice(0, 20), null, 2), 'utf8');
}

downloadAndInspectNotebooks().catch(console.error);
