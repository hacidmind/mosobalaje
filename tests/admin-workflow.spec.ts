import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('mosobalaje_admin_auth_v1', 'true'));
});

for (const section of ['inquiries', 'requests'] as const) {
  test(`${section} expose details, workflow actions, and a welcome email`, async ({ page }) => {
    await page.goto(`/admin/${section}`);
    const viewButtons = page.getByRole('button', { name: 'View', exact: true });
    test.skip(await viewButtons.count() === 0, `No ${section} exist in the configured development database.`);
    await viewButtons.first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Mark as working' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Mark as done' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Copy email' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Open in email app' })).toHaveAttribute('href', /^mailto:/);
  });
}
