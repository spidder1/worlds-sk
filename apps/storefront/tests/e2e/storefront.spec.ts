import { expect, test } from '@playwright/test';

test('storefront renders the catalogue shell and navigation', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Worlds/i);
  await expect(page.getByRole('button', { name: /všetky kategórie/i })).toBeVisible();
});

test('empty cart gives a usable checkout entry point', async ({ page }) => {
  await page.goto('/kosik');
  await expect(page.getByText(/košík je prázdny|objednávka/i).first()).toBeVisible();
});

test('VAT validation rejects malformed identifiers without external call', async ({ request }) => {
  const response = await request.post('/api/vat/validate', { data: { vatId: 'not-a-vat-id' } });
  expect(response.status()).toBe(400);
  expect(await response.json()).toMatchObject({ valid: false, status: 'INVALID_FORMAT' });
});

test('company lookup rejects malformed Slovak ICO', async ({ request }) => {
  const response = await request.post('/api/company/lookup', { data: { country: 'SK', ico: '123' } });
  expect(response.status()).toBe(400);
  expect(await response.json()).toMatchObject({ status: 'INVALID', country: 'SK' });
});
