import fs from 'node:fs';
import path from 'node:path';
import AdmZip from 'adm-zip';

async function inspectProductFields() {
  console.log('Hľadám polia s obrázkami v eD XML katalógu...');
  const zipPath = path.resolve('downloads', 'productCatalogue_main.zip');
  const zip = new AdmZip(zipPath);
  const xmlEntry = zip.getEntries().find(e => e.entryName.endsWith('.xml'));

  const xmlContent = xmlEntry.getData().toString('utf8');
  
  // Nájdeme prvých 5 produktov
  const blocks = xmlContent.match(/<Product>[\s\S]*?<\/Product>/g)?.slice(0, 10) || [];
  
  for (let i = 0; i < blocks.length; i++) {
    console.log(`\n--- PRODUKT ${i + 1} ---`);
    console.log(blocks[i]);
  }
}

inspectProductFields().catch(console.error);
