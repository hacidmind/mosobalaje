import { expect, test } from '@playwright/test';

test('inventory search, clear, and empty-result reset stay in sync', async ({ page }) => {
  await page.goto('/vehicles');
  const search = page.getByRole('searchbox', { name: 'Search vehicles' });
  await expect(search).toBeVisible();
  const count = page.getByRole('status');
  await expect(count).toContainText(/vehicles? found/);
  const initialCount = await count.innerText();
  await search.fill('no-such-vehicle-zzzz');
  await expect(count).toContainText('0 vehicles found');
  await page.getByRole('button', { name: 'Reset Filters' }).click();
  await expect(search).toHaveValue('');
  await expect(count).toHaveText(initialCount);
  await search.fill('no-such-vehicle-zzzz');
  await page.getByRole('button', { name: 'Clear search' }).click();
  await expect(search).toHaveValue('');
  await expect(count).toHaveText(initialCount);
  await page.getByRole('button', { name: 'Filters', exact: true }).click();
  await expect(page.getByRole('combobox', { name: 'Vehicle make' })).toBeVisible();
  await page.getByRole('combobox', { name: 'Sort vehicles' }).selectOption('price-asc');
  await expect(page.getByRole('combobox', { name: 'Sort vehicles' })).toHaveValue('price-asc');
});

test('homepage links work with reduced motion and no horizontal overflow', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Browse Vehicle Inventory' })).toHaveAttribute('href', '/vehicles');
  await expect(page.getByRole('link', { name: 'Request a Custom Import', exact: true })).toHaveAttribute('href', '/request-vehicle');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('homepage.png'), fullPage: true });
  if (testInfo.project.name === 'mobile') {
    const toggle = page.getByRole('button', { name: 'Open menu' });
    await toggle.click();
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
    await page.locator('#mobile-navigation').getByRole('link', { name: 'Inventory', exact: true }).click();
    await expect(page).toHaveURL(/\/vehicles$/);
    await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  }
  await page.screenshot({ path: testInfo.outputPath('page.png'), fullPage: true });
});

test('admin inventory shows loading and recovers from a failed request', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('mosobalaje_admin_auth_v1', 'true'));
  let shouldFail = true;
  await page.route('**/api/vehicles', async route => {
    if (shouldFail) {
      await new Promise(resolve => setTimeout(resolve, 500));
      await route.fulfill({ status: 503, contentType: 'application/json', body: '{}' });
    } else {
      await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
    }
  });
  await page.goto('/admin/vehicles');
  await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible();
  shouldFail = false;
  await page.getByRole('button', { name: 'Retry' }).click();
  await expect(page.getByRole('heading', { name: 'Vehicles', exact: true })).toBeVisible();
  await expect(page.getByText('0 in inventory')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retry' })).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('unavailable vehicle images have a readable fallback', async ({ page }) => {
  await page.route('**/*', route => route.request().resourceType() === 'image' ? route.abort() : route.continue());

  await page.goto('/');
  await expect(page.getByText('Image unavailable').first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Browse Vehicle Inventory' })).toBeVisible();
});

test('admin can format a vehicle description', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('mosobalaje_admin_auth_v1', 'true'));
  await page.route('**/api/vehicles', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([{
      _id: 'vehicle-1', slug: '2026-test-suv', make: 'Test', model: 'SUV', year: 2026,
      trim: 'Premium', bodyType: 'SUV', price: 25000000, currency: 'NGN', mileage: 10,
      mileageUnit: 'km', transmission: 'Automatic', fuelType: 'Petrol', engine: '2.0L',
      exteriorColor: 'Black', interiorColor: 'Tan', description: 'Original description',
      features: [], images: [], status: 'Available', importStatus: 'Customs Cleared',
      location: 'Lagos', featured: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    }]),
  }));

  await page.goto('/admin/vehicles');
  await page.getByRole('button', { name: 'Edit Test SUV' }).click();
  const editor = page.getByRole('textbox', { name: 'Vehicle description' });
  await expect(editor).toBeVisible();
  await editor.fill('Premium condition');
  await editor.selectText();
  await page.getByRole('button', { name: 'Bold' }).click();
  await expect(editor.locator('strong')).toHaveText('Premium condition');
  await page.getByRole('combobox', { name: 'Text style' }).selectOption('2');
  await expect(editor.locator('h2')).toContainText('Premium condition');
  await page.getByRole('button', { name: 'Bullet list' }).click();
  await expect(editor.locator('ul')).toBeVisible();
});

test('vehicle request form validates each step and supports keyboard navigation', async ({ page }) => {
  await page.goto('/request-vehicle');

  await page.getByLabel('Full name *').fill('Amina Bello');
  await page.getByLabel('Phone *').fill('+234 801 234 5678');
  await page.getByLabel('Email *').fill('not-an-email');
  await page.getByLabel('Email *').press('Enter');

  await expect(page.getByText('Enter a valid email address')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Your contact details' })).toBeVisible();

  await page.getByLabel('Email *').fill('amina@example.com');
  await page.getByLabel('Email *').press('Enter');
  await expect(page.getByRole('heading', { name: 'Vehicle specification' })).toBeVisible();

  await page.getByLabel('Preferred make *').fill('Toyota');
  await page.getByLabel('Preferred model *').fill('Land Cruiser');
  await page.getByLabel('Earliest year').fill('2025');
  await page.getByLabel('Latest year').fill('2020');
  await page.getByLabel('Latest year').press('Enter');

  await expect(page.getByText('Maximum year must be the same as or later than minimum year')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Vehicle specification' })).toBeVisible();

  await page.getByLabel('Latest year').fill('2026');
  await page.getByLabel('Latest year').press('Enter');
  await expect(page.getByRole('heading', { name: 'Budget and requirements' })).toBeVisible();
  await expect(page.getByText('Toyota Land Cruiser')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

