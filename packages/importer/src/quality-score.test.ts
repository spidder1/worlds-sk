import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateQualityScore } from '@worlds/types';
import { QualityScorer } from './quality-scorer.js';

const richProduct = {
  ean: '4711387584675',
  brand: 'ASUS',
  mpn: '90NB1234-M00010',
  categorySlug: 'notebooky',
  categoryHierarchy: ['Počítače a notebooky', 'Notebooky'],
  images: [
    { id: '1', url: 'https://example.test/a.jpg', position: 0, isPrimary: true },
    { id: '2', url: 'https://example.test/b.jpg', position: 1, isPrimary: false },
  ],
  attributes: {
    ram_gb: { code: 'ram_gb', name: 'RAM', value: 16 },
    ssd_gb: { code: 'ssd_gb', name: 'SSD', value: 512 },
    cpu_family: { code: 'cpu_family', name: 'CPU', value: 'Core i7' },
    screen_size_inch: { code: 'screen_size_inch', name: 'Displej', value: 15.6 },
  },
  supplierDescription: 'x'.repeat(200),
  seoTitle: 'ASUS notebook | Worlds.sk',
  seoDescription: 'Popis produktu dostatočne dlhý na plné hodnotenie.',
  pricing: {
    supplierCost: 800,
    supplierFees: { garbageFee: 1, authorFee: 0.5 },
    totalCostWithFees: 801.5,
    vatRate: 20,
    marginPercentage: 12,
    basePrice: 897.68,
    finalPrice: 1077.22,
    currency: 'EUR',
  },
  stockCount: 4,
};

test('a fully populated product scores 100', () => {
  assert.equal(calculateQualityScore(richProduct).total, 100);
});

test('missing data lowers the score instead of reporting a fixed value', () => {
  const bare = calculateQualityScore({ brand: 'ASUS', title: 'Notebook' });
  assert.ok(bare.total < 20, `expected a low score, got ${bare.total}`);
  assert.equal(bare.breakdown.ean, 0);
  assert.equal(bare.breakdown.images, 0);
  assert.equal(bare.breakdown.attributes, 0);
});

test('the breakdown always sums to the reported total', () => {
  for (const candidate of [richProduct, { brand: 'ASUS' }, { ean: '4711387584675', mpn: 'ABC123' }]) {
    const score = calculateQualityScore(candidate);
    const sum = Object.values(score.breakdown).reduce((total, value) => total + value, 0);
    assert.equal(sum, score.total);
  }
});

test('a single image scores lower than a gallery', () => {
  const single = calculateQualityScore({
    ...richProduct,
    images: [{ id: '1', url: 'https://example.test/a.jpg', position: 0, isPrimary: true }],
  });
  assert.equal(single.breakdown.images, 7);
  assert.equal(single.total, 97);
});

test('the importer scorer delegates to the shared implementation', () => {
  assert.deepEqual(new QualityScorer().calculateScore(richProduct), calculateQualityScore(richProduct));
});
