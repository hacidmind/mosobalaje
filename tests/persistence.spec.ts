import { expect, test } from '@playwright/test';
import { MongoClient } from 'mongodb';
import { loginAs } from './auth-helper';

test.beforeEach(() => {
  test.skip(!process.env.E2E_ISOLATED_DB, 'Run with playwright.isolated.config.ts.');
});

test('inventory create, public detail, edit, and delete persist', async ({ page }, info) => {
  const model = `Journey-${info.project.name}`;
  await loginAs(page);
  await page.goto('/admin/vehicles');
  await page.getByRole('button', { name: 'Add Vehicle', exact: true }).click();
  await page.locator('input[name="make"]').fill('E2E');
  await page.locator('input[name="model"]').fill(model);
  await page.locator('input[name="price"]').fill('25000000');
  await page.getByRole('textbox', { name: 'Vehicle description' }).fill('End to end test vehicle.');
  await page.locator('form').getByRole('button', { name: 'Add Vehicle', exact: true }).click();
  const edit = page.getByRole('button', { name: `Edit E2E ${model}`, exact: true });
  await expect(edit).toBeVisible();
  await page.reload();
  await expect(edit).toBeVisible();
  const vehicles = await (await page.request.get('/api/vehicles')).json();
  const vehicle = vehicles.find((item: { model: string }) => item.model === model);
  expect(vehicle).toBeTruthy();
  await page.goto(`/vehicles/${vehicle.slug}`);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(model);
  await page.goto('/admin/vehicles');
  await edit.click();
  await page.locator('input[name="price"]').fill('27000000');
  await page.getByRole('button', { name: 'Update', exact: true }).click();
  await expect(page.getByText('Updated', { exact: true })).toBeVisible();
  await page.reload();
  const updated = await (await page.request.get('/api/vehicles')).json();
  expect(updated.find((item: { model: string }) => item.model === model).price).toBe(27000000);
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: `Delete E2E ${model}`, exact: true }).click();
  await expect(edit).toHaveCount(0);
  await page.reload();
  await expect(edit).toHaveCount(0);
});

for (const kind of ['contact', 'request'] as const) {
  test(`${kind} submission creates a lead and staff workflow persists`, async ({ page }, info) => {
    const name = `E2E ${kind} ${info.project.name}`;
    const email = `${kind}-${info.project.name}@example.com`;
    await page.goto(kind === 'contact' ? '/contact' : '/request-vehicle');
    await page.locator('input[name="name"]').fill(name);
    await page.locator('input[name="phone"]').fill('+2348000000000');
    await page.locator('input[name="email"]').fill(email);
    if (kind === 'contact') {
      await page.locator('input[name="subject"]').fill(name);
      await page.locator('textarea[name="message"]').fill('Automated end to end test inquiry.');
      await page.getByRole('button', { name: 'Send Message' }).click();
      await expect(page.getByText('Message Sent!', { exact: true })).toBeVisible();
    } else {
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.getByLabel('Preferred make *').fill('Toyota');
      await page.getByLabel('Preferred model *').fill('Land Cruiser');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.getByRole('button', { name: 'Submit request', exact: true }).click();
      await expect(page.getByText('Request received', { exact: true })).toBeVisible();
    }
    await loginAs(page);
    const section = kind === 'contact' ? 'inquiries' : 'requests';
    await page.goto(`/admin/${section}`);
    const row = page.getByRole('row').filter({ hasText: name });
    await row.getByRole('button', { name: 'View', exact: true }).click();
    await page.getByRole('button', { name: 'Mark as working' }).click();
    await expect(page.getByRole('button', { name: 'Mark as working' })).toBeDisabled();
    await page.getByRole('button', { name: 'Mark as done' }).click();
    await expect(page.getByRole('button', { name: 'Mark as done' })).toBeDisabled();
    await page.reload();
    await expect(row).toContainText(kind === 'contact' ? 'Resolved' : 'Closed');
    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    try {
      const db = client.db(process.env.E2E_ISOLATED_DB);
      expect(await db.collection('leads').countDocuments({ email })).toBe(1);
      expect(await db.collection(kind === 'contact' ? 'inquiries' : 'vehicleRequests').countDocuments({ email })).toBe(1);
    } finally { await client.close(); }
  });
}
