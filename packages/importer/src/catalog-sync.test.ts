import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { detectFullProductElementName, extractNavigatorAttributes, extractProductImageUrls } from './catalog-sync.js';

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

test('preserves singleton and nested eD navigator attributes', () => {
  assert.deepEqual(
    extractNavigatorAttributes({ ProductNavigatorDataList: { ProductNavigatorData: { AttributeCode: 12, ValueCode: 34 } } }),
    { attr_12: { code: '12', name: 'Atribút 12', value: '34', rawValue: '34' } },
  );
  assert.deepEqual(
    extractNavigatorAttributes({ ProductNavigatorDataList: [{ AttributeCode: '12', ValueCode: '35' }, { AttributeCode: '13', Value: 'blue' }] }),
    {
      attr_12: { code: '12', name: 'Atribút 12', value: '35', rawValue: '35' },
      attr_13: { code: '13', name: 'Atribút 13', value: 'blue', rawValue: 'blue' },
    },
  );
});

test('detects legacy Product and v1 ProductComplete full-feed records', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'worlds-catalog-test-'));
  try {
    const legacy = path.join(directory, 'legacy.xml');
    const v1 = path.join(directory, 'v1.xml');
    const empty = path.join(directory, 'empty.xml');
    fs.writeFileSync(legacy, '<ArrayOfProduct><Product><Code>A</Code></Product></ArrayOfProduct>');
    fs.writeFileSync(v1, '<ArrayOfProductComplete><ProductComplete><Code>A</Code></ProductComplete></ArrayOfProductComplete>');
    fs.writeFileSync(empty, '<ArrayOfProductComplete />');

    assert.equal(detectFullProductElementName(legacy), 'Product');
    assert.equal(detectFullProductElementName(v1), 'ProductComplete');
    assert.equal(detectFullProductElementName(empty), null);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
