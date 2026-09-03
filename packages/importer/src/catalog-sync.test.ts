import assert from 'node:assert/strict';
import test from 'node:test';
import { extractProductImageUrls } from './catalog-sync.js';

test('extracts nested eD ProductImage URLs and normalizes thumbnail suffixes', () => {
  assert.deepEqual(
    extractProductImageUrls({
      ImageList: {
        ProductImage: [
          { URL: 'http://img.elinkx.biz/product_3.jpg' },
          { URL: 'https://img.elinkx.biz/product-detail_8.png' },
        ],
      },
    }),
    [
      'https://img.elinkx.biz/product.jpg',
      'https://img.elinkx.biz/product-detail.png',
    ],
  );
});

test('supports a single nested image and legacy flat image field', () => {
  assert.deepEqual(
    extractProductImageUrls({ ImageList: { ProductImage: { URL: 'https://cdn.example.test/one.jpg' } } }),
    ['https://cdn.example.test/one.jpg'],
  );
  assert.deepEqual(
    extractProductImageUrls({ ImageUrl: 'https://cdn.example.test/legacy.jpg' }),
    ['https://cdn.example.test/legacy.jpg'],
  );
});
