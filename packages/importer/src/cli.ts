#!/usr/bin/env node
import { MockEDSystemClient } from '@worlds/ed-client';
import { ImporterService } from './importer-service.js';

async function main() {
  console.log('====================================================');
  console.log(' Worlds.sk Ingestion & AI Catalog Engine (v1.0.0)');
  console.log('====================================================\n');

  const importer = new ImporterService();
  const mockClient = new MockEDSystemClient();

  console.log('1. Načítavam kategórie a vzorové produkty z eD system...');
  const sampleProducts = await mockClient.getSampleProducts();
  console.log(`   Nájdených ${sampleProducts.length} vzorových produktov na import.\n`);

  console.log('2. Spúšťam Ingestion Pipeline (Normalizácia, AI kategorizácia, Skórovanie kvality)...');
  const summary = await importer.importBatch(sampleProducts);

  console.log('\n--- SÚHRN IMPORTOVÉHO RUNU ---');
  console.log(`ID Runu:            ${summary.id}`);
  console.log(`Spracovaných:       ${summary.totalFetched}`);
  console.log(`Vytvorených:        ${summary.createdCount}`);
  console.log(`Aktualizovaných:    ${summary.updatedCount}`);
  console.log(`Karanténa:          ${summary.quarantinedCount}`);
  console.log(`Vyžaduje kontrolu:  ${summary.needsReviewCount}`);
  console.log(`Trvanie:            ${summary.durationMs} ms`);

  console.log('\n3. Kontrola štatistík kvality katalógu:');
  const stats = await importer.getRepository().getStats();
  console.table(stats);

  console.log('\n4. Ukážka spracovaných produktov v Product Master:');
  const all = await importer.getRepository().getAllProducts();
  for (const p of all) {
    console.log(`\n• [${p.sku}] ${p.title}`);
    console.log(`  Značka:      ${p.brand} (pôvodne: ${p.rawBrand})`);
    console.log(`  Kategória:   ${p.categoryHierarchy.join(' > ')} [${p.categorySlug}]`);
    console.log(`  Cena (s DPH):${p.pricing.finalPrice} € (nákup bez popl.: ${p.pricing.supplierCost} €)`);
    console.log(`  Sklad:       ${p.stockCount} ks (${p.stockText})`);
    console.log(`  Quality:     ${p.qualityScore.total}/100`);
    console.log(`  AI Status:   ${p.reviewStatus} (Confidence: ${Math.round((p.aiEnrichment?.confidence || 0) * 100)}%)`);
    console.log(`  SEO Slug:    /${p.categorySlug}/${p.slug}`);
  }

  console.log('\n✓ Ingestion pipeline úspešne otestovaná!');
}

main().catch((err) => {
  console.error('Chyba počas behu importera:', err);
  process.exit(1);
});
