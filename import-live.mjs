import { EDSystemClient } from './packages/ed-client/dist/index.js';
import { ImporterService } from './packages/importer/dist/index.js';

async function runLiveImport() {
  console.log('===========================================================');
  console.log(' Worlds.sk - ŽIVÉ SŤAHOVANIE NOTEBOOKOV Z eD SYSTEM');
  console.log('===========================================================\n');

  const login = process.env.ED_LOGIN;
  const password = process.env.ED_PASSWORD;
  if (!login || !password) throw new Error('Missing ED_LOGIN or ED_PASSWORD.');
  const endpoint = 'https://private-ws-sk.elinkx.biz/service.asmx';

  console.log(`1. Prihlasujem sa do eD system API (${endpoint})...`);
  console.log(`   Login: ${login}\n`);

  const client = new EDSystemClient({ login, password, endpointUrl: endpoint });
  const importer = new ImporterService();

  console.log('2. Sťahujem zoznam kategórií z eD navigátora...');
  try {
    const categories = await client.getProductCategoryList();
    console.log(`   ✓ Nájdených ${categories.length} kategórií.\n`);
  } catch (err) {
    console.log('   (Kategórie preskočené)');
  }

  console.log('3. Žiadam eD systém o vygenerovanie katalógu notebookov (Komodita: NB)...');
  const result = await client.getProductCatalogueFullDownloadZIPv1({
    onStock: false,
    commodities: 'NB'
  });

  console.log('\n--- VÝSLEDOK Z eD SYSTÉMU ---');
  console.log('Stav:', result.IsReady ? 'Pripravené na stiahnutie' : 'Generuje sa');
  if (result.Url) {
    console.log('URL súboru na stiahnutie:', result.Url);
    console.log('Názov súboru:', result.FileName);
  } else {
    console.log('Odpoveď API:', result);
  }

  console.log('\n✓ Živé prepojenie s eD system API bolo úspešne overené!');
}

runLiveImport().catch(console.error);
