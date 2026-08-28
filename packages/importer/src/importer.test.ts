import test from 'node:test';
import assert from 'node:assert/strict';
import { ProductNormalizer } from './normalizer.js';
import { TaxonomyEngine } from './taxonomy-engine.js';
import { QualityScorer } from './quality-scorer.js';
import { ImporterService } from './importer-service.js';
import { MockEDSystemClient } from '@worlds/ed-client';

test('ProductNormalizer normalizes brand names correctly', () => {
  const norm = new ProductNormalizer();
  assert.equal(norm.normalizeBrand('Hewlett Packard'), 'HP');
  assert.equal(norm.normalizeBrand('hp inc.'), 'HP');
  assert.equal(norm.normalizeBrand('ASUSTeK'), 'ASUS');
  assert.equal(norm.normalizeBrand('Kingston Technology'), 'Kingston');
  assert.equal(norm.normalizeBrand('Apple Inc.'), 'Apple');
});

test('ProductNormalizer normalizes memory & storage units', () => {
  const norm = new ProductNormalizer();
  assert.equal(norm.normalizeCapacity('512GB'), '512 GB');
  assert.equal(norm.normalizeCapacity('16 gb'), '16 GB');
  assert.equal(norm.normalizeCapacity('2TB'), '2 TB');
  assert.equal(norm.normalizeCapacity('128.0GB'), '128 GB');
});

test('ProductNormalizer calculates correct prices including fees and VAT', () => {
  const norm = new ProductNormalizer();
  const pricing = norm.computePricing({
    ProId: '1',
    Code: 'TEST-1',
    Name: 'Test',
    PartNumber: 'PN1',
    YourPrice: 100,
    YourPriceWithFees: 105, // includes 5€ fees
    GarbageFee: 3,
    AuthorFee: 2,
    ValuePack: 0,
    ValuePackQty: 0,
    Vat: 20,
    OnStock: true,
  });

  assert.equal(pricing.supplierCost, 100);
  assert.equal(pricing.totalCostWithFees, 105);
  // Base price with 15% margin: 105 * 1.15 = 120.75
  assert.equal(pricing.basePrice, 120.75);
  // Final price with 20% VAT: 120.75 * 1.20 = 144.90
  assert.equal(pricing.finalPrice, 144.9);
});

test('TaxonomyEngine correctly assigns products to managed taxonomy', () => {
  const tax = new TaxonomyEngine();
  const res = tax.matchCategory({
    categoryCode: '101',
    productName: 'ASUS ROG Strix G16 Gaming Laptop RTX 4070',
  });

  assert.equal(res.category?.slug, 'herne-notebooky');
  assert.equal(res.confidence >= 0.9, true);
  assert.deepEqual(res.hierarchy, ['Počítače a notebooky', 'Notebooky', 'Herné notebooky']);
});

test('QualityScorer computes accurate score breakdown', () => {
  const scorer = new QualityScorer();
  const score = scorer.calculateScore({
    ean: '8806094582123',
    brand: 'Samsung',
    mpn: 'LS28BG700EPXEN',
    categorySlug: 'monitory',
    categoryHierarchy: ['Monitory', 'Herné monitory'],
    images: [{ id: '1', url: 'http://example.com/1.jpg', position: 0, isPrimary: true }, { id: '2', url: 'http://example.com/2.jpg', position: 1, isPrimary: false }],
    attributes: { a: { code: '1', name: 'A', value: '1' }, b: { code: '2', name: 'B', value: '2' }, c: { code: '3', name: 'C', value: '3' }, d: { code: '4', name: 'D', value: '4' } },
    supplierDescription: 'Super dlhy popis produktu ktory ma viac ako 150 znakov a detailne popisuje vsetky funkcie a specifikacie tohto skveleho monitora s vysokou obnovovacou frekvenciou a vernymi farbami.',
    seoTitle: 'Samsung Monitor 28 | Worlds.sk',
    seoDescription: 'Kupte si novy herny monitor Samsung 28 palcov za vybornu cenu.',
    pricing: { finalPrice: 499, totalCostWithFees: 380 } as any,
    stockCount: 10,
  });

  assert.equal(score.total, 100);
});

test('ImporterService executes full batch ingestion workflow with delta detection', async () => {
  const importer = new ImporterService();
  const mockClient = new MockEDSystemClient();
  const sample = await mockClient.getSampleProducts();

  const firstRun = await importer.importBatch(sample);
  assert.equal(firstRun.createdCount, 5);
  assert.equal(firstRun.quarantinedCount, 0);

  // Second run with same data should be UNCHANGED (delta hash match)
  const secondRun = await importer.importBatch(sample);
  assert.equal(secondRun.createdCount, 0);
  assert.equal(secondRun.unchangedCount, 5);
});
