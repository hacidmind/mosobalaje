import { defineConfig, devices } from '@playwright/test';
import { randomUUID } from 'node:crypto';

process.env.MONGODB_DB = process.env.E2E_ISOLATED_DB || `mosobalaje_e2e_${randomUUID().replaceAll('-', '')}`;
process.env.E2E_ISOLATED_DB = process.env.MONGODB_DB;

export default defineConfig({
  testDir: './tests',
  testMatch: 'persistence.spec.ts',
  globalSetup: './tests/isolated-setup.ts',
  workers: 1,
  timeout: 90_000,
  expect: { timeout: 15_000 },
  outputDir: 'test-results/isolated',
  use: { baseURL: 'http://localhost:3100', trace: 'off', screenshot: 'only-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel: 'msedge' } },
    { name: 'mobile', use: { ...devices['Desktop Chrome'], channel: 'msedge', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: 'npm run start -- --port 3100',
    url: 'http://localhost:3100/admin/sign-in',
    reuseExistingServer: false,
    env: { MONGODB_DB: process.env.MONGODB_DB },
    timeout: 120_000,
  },
});
