import fs from 'node:fs';
import { PostgresProductRepository } from './packages/importer/dist/postgres-repository.js';
const PRODUCTS = JSON.parse(fs.readFileSync('downloads/final_active_notebooks.json', 'utf8'));

async function syncToSupabasePostgres() {
  console.log('===========================================================');
  console.log(' SYNCHRONIZÁCIA ŽIVÝCH NOTEBOOKOV DO SUPABASE POSTGRESQL');
  console.log('===========================================================\n');

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('Missing required environment variable: DATABASE_URL');
  const repo = new PostgresProductRepository(connectionString);

  console.log(`Ukladám ${PRODUCTS.length} živých notebookov do Supabase...`);
  let count = 0;
  for (const p of PRODUCTS) {
    await repo.upsertProduct(p);
    count++;
    if (count % 100 === 0) {
      console.log(`  Uložených ${count}/${PRODUCTS.length}...`);
    }
  }

  console.log(`✓ Všetkých ${count} notebookov úspešne uložených do Supabase PostgreSQL.`);

  const stats = await repo.getStats();
  console.log('\n===========================================================');
  console.log(' AKTUÁLNY STAV DATABÁZY SUPABASE:');
  console.log(` Celkovo produktov v DB: ${stats.totalMasterProducts}`);
  console.log(` Skladom: ${stats.activeCount}`);
  console.log(` Počet značiek: ${stats.brandCount}`);
  console.log(` Priemerné Quality Score: ${stats.averageQualityScore}/100`);
  console.log('===========================================================\n');

  await repo.close();
}

syncToSupabasePostgres().catch(console.error);
