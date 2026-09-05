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

test('ProductNormalizer cleans SKU, EAN and Title according to PHP rules', () => {
  const norm = new ProductNormalizer();
  assert.equal(norm.normalizeSku(`'MAN701662'`), 'MAN701662');
  assert.equal(norm.normalizeSku(`"MAN\\701662"`), 'MAN-701662');
  assert.equal(norm.normalizeEan('`8806094582123`'), '8806094582123');
  assert.equal(norm.normalizeTitle('ASUS \\ Laptop \\ ROG'), 'ASUS - Laptop - ROG');
});

test('ProductNormalizer parses eD stock ranges according to PHP rules', () => {
  const norm = new ProductNormalizer();
  assert.equal(norm.parseStockCount('100+'), 1000);
  assert.equal(norm.parseStockCount('50-99'), 99);
  assert.equal(norm.parseStockCount('10-49'), 49);
  assert.equal(norm.parseStockCount('15'), 15);
  assert.equal(norm.parseStockCount(25), 25);
  assert.equal(norm.parseStockCount(undefined), 0);
});

test('ProductNormalizer transforms image URLs and extracts dimensions matching PHP rules', () => {
  const norm = new ProductNormalizer();
  const images = norm.normalizeImages([
    { URL: 'http://img.elinkx.biz/foto_3.jpg' },
    { URL: 'http://img.elinkx.biz/foto_8.jpg' },
  ], 'Test Product');

  assert.equal(images[0].url, 'https://img.elinkx.biz/foto.jpg');
  assert.equal(images[1].url, 'https://img.elinkx.biz/foto.jpg');

  const dims = norm.parseDimensions([
    { typ: 'JEDN', count: 1, length: 30, width: 20, height: 10, weight: 150 },
  ]);
  assert.equal(dims?.weightKg, 1.5); // 150 / 100 = 1.5 kg
});

test('ProductNormalizer imports both singleton and nested multi-image eD shapes', () => {
  const norm = new ProductNormalizer();
  const singleton = norm.normalizeImages({ URL: 'https://cdn.example.test/one_3.jpg' }, 'Single');
  const nested = norm.normalizeImages({
    ProductImage: [
      { URL: 'https://cdn.example.test/one_3.jpg' },
      { URL: 'https://cdn.example.test/two_8.jpg' },
    ],
  }, 'Multi');

  assert.equal(singleton.length, 1);
  assert.equal(singleton[0]?.url, 'https://cdn.example.test/one.jpg');
  assert.equal(nested.length, 2);
  assert.equal(nested[1]?.position, 1);
  assert.equal(nested[1]?.isPrimary, false);
});

test('ProductNormalizer calculates correct prices including fees and VAT according to PHP rules', () => {
  const norm = new ProductNormalizer();
  const pricing = norm.computePricing({
    ProId: '1',
    Code: 'TEST-1',
    Name: 'Test',
    PartNumber: 'PN1',
    YourPrice: 100,
    YourPriceWithFees: 105, // includes 5€ fees (Garbage 3 + Author 2)
    GarbageFee: 3,
    AuthorFee: 2,
    ValuePack: 0,
    ValuePackQty: 0,
    Vat: 20,
    OnStock: true,
  }, 20); // 20% margin

  assert.equal(pricing.supplierCost, 100);
  assert.equal(pricing.totalCostWithFees, 105);
  // Base price: supplierCost * (1 + 0.20) + ecotax = 100 * 1.20 + 5 = 125
  assert.equal(pricing.basePrice, 125);
  // Final price with 20% VAT: 125 * 1.20 = 150
  assert.equal(pricing.finalPrice, 150);
});

test('ProductNormalizer builds combined long description with warranty matching PHP rules', () => {
  const norm = new ProductNormalizer();
  const desc = norm.buildLongDescription({
    ProId: '1',
    Code: 'TEST-1',
    Name: 'Test Notebook',
    PartNumber: 'PN1',
    YourPrice: 100,
    YourPriceWithFees: 105,
    GarbageFee: 0,
    AuthorFee: 0,
    ValuePack: 0,
    ValuePackQty: 0,
    Vat: 20,
    OnStock: true,
    Description: 'Hlavný popis notebooku.',
    DescriptionShort: 'Krátky popis.',
    Warranty: '24 mesiacov',
  });

  assert.equal(desc, 'Hlavný popis notebooku.<br>Krátky popis.<br><br>Záruka: 24 mesiacov');
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
