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

test('price range controls load from and update the search URL', async ({ page }) => {
  await page.goto('/vyhladavanie?minPrice=100&maxPrice=200');
  await expect(page.getByLabel('Minimálna cena')).toHaveValue('100');
  await expect(page.getByLabel('Maximálna cena')).toHaveValue('200');
  await page.getByLabel('Minimálna cena').fill('150,50');
  await page.getByRole('button', { name: 'Použiť cenu' }).click();
  await expect(page).toHaveURL(/minPrice=150\.50/);
  await expect(page).toHaveURL(/maxPrice=200\.00/);
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
