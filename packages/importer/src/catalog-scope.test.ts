import assert from 'node:assert/strict';
import test from 'node:test';
import { assessCatalogScope } from './catalog-scope.js';

test('includes representative IT products', () => {
  for (const title of [
    'Lenovo ThinkPad notebook 14',
    'Samsung NVMe SSD 2 TB',
    'HP LaserJet multifunkcna tlaciaren',
    'Ubiquiti Wi-Fi access point PoE',
    'USB-C dokovacia stanica s HDMI',
  ]) {
    assert.equal(assessCatalogScope({ title }).included, true, title);
  }
});

test('excludes white goods and garden products even when they contain smart features', () => {
  for (const title of [
    'Smart Wi-Fi chladnicka s displejom',
    'Roboticka kosacka s Wi-Fi aplikaciou',
    'USB nabijatelny zahradny postrekovac',
    'Vstavana rura s dotykovym LCD',
  ]) {
    const decision = assessCatalogScope({ title });
    assert.equal(decision.included, false, title);
    assert.equal(decision.reason, 'NON_IT_KEYWORD', title);
  }
});

test('fails closed for products without an IT signal', () => {
  assert.deepEqual(assessCatalogScope({ title: 'Univerzalny produkt model X100' }), {
    included: false,
    reason: 'NO_IT_SIGNAL',
  });
});
