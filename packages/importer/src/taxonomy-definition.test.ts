import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyProductIndependently } from './taxonomy-definition.js';

test('uses eD CommodityName when the title is not descriptive enough', () => {
  const result = classifyProductIndependently({
    title: 'ACME X100',
    commodityName: 'Monitory a displeje',
  });
  assert.equal(result.slug, 'monitory-a-displeje');
});
