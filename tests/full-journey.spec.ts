import { expect, test } from '@playwright/test';
import { loginAs } from './auth-helper';

for (const path of ['/', '/about', '/contact', '/import-process', '/request-vehicle', '/vehicles']) {
  test(`public page ${path} renders without runtime errors or overflow`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}

test('all staff pages reject anonymous access', async ({ page }) => {
  for (const section of ['', '/vehicles', '/leads', '/inquiries', '/requests', '/settings']) {
    await page.goto(`/admin${section}`);
    await expect(page).toHaveURL(/\/admin\/sign-in$/);
  }
});

test('staff pages load and signing out revokes API access', async ({ page }) => {
  await loginAs(page);
  for (const section of ['vehicles', 'leads', 'inquiries', 'requests', 'settings']) {
    const response = await page.goto(`/admin/${section}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  expect((await page.request.get('/api/vehicles')).status()).toBe(200);
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await expect(page).toHaveURL(/\/admin\/sign-in$/);
  expect((await page.request.get('/api/vehicles')).status()).toBe(401);
});

test('inventory opens real vehicle details and fullscreen gallery', async ({ page }) => {
  await page.goto('/vehicles');
  const vehicle = page.locator('a[href^="/vehicles/"]').first();
  await expect(vehicle).toBeVisible();
  await vehicle.click();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Inquire About This Vehicle' })).toBeVisible();
  await page.getByRole('button', { name: 'View Fullscreen' }).click();
  await expect(page.getByRole('button', { name: 'Close fullscreen' })).toBeVisible();
  await page.getByRole('button', { name: 'Close fullscreen' }).click();
  await expect(page.getByRole('button', { name: 'Close fullscreen' })).toHaveCount(0);
});

test('contact form rejects an empty submission', async ({ page }) => {
  await page.goto('/contact');
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.getByText('Please fill in all required fields.')).toBeVisible();
});

test('unknown vehicle and unknown page render not-found feedback', async ({ page }) => {
  for (const path of ['/vehicles/e2e-nonexistent-vehicle-zzzz', '/e2e-nonexistent-page-zzzz']) {
    await page.goto(path);
    await expect(page.getByRole('heading', { name: 'Take a different route' })).toBeVisible();
  }
});
