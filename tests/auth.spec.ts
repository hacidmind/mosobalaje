import { expect, test } from '@playwright/test';
import { hasBootstrapCredentials, loginAs } from './auth-helper';

test('unauthenticated staff routes redirect and the inventory API rejects access', async ({ page, request }) => {
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/admin\/sign-in$/);
  await expect(page.getByRole('heading', { name: 'Admin sign in' })).toBeVisible();
  const response = await request.get('/api/vehicles');
  expect(response.status()).toBe(401);
});

test('invalid credentials return a generic error', async ({ page }) => {
  await page.goto('/admin/sign-in');
  await page.getByLabel('Email address').fill('unknown@example.com');
  await page.getByLabel('Password').fill('incorrect-password-value');
  await page.getByLabel('Authenticator code').fill('000000');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.locator('form').getByRole('alert')).toHaveText('Invalid email, password, or verification code.');
});

test('admin signs in with password and TOTP', async ({ page }) => {
  test.skip(!hasBootstrapCredentials('Admin'), 'Local or E2E admin credentials are required.');
  await loginAs(page, 'Admin');
  await expect(page.getByLabel('Signed-in account')).toContainText('Admin');
});

test('CEO uses the private entry and receives the CEO role', async ({ page }) => {
  test.skip(!hasBootstrapCredentials('CEO'), 'Local or E2E CEO credentials are required.');
  await loginAs(page, 'CEO');
  await expect(page.getByLabel('Signed-in account')).toContainText('CEO');
});
