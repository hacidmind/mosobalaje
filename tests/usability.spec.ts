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

