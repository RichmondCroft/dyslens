import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  globalSetup: require.resolve('./e2e/globalSetup'),
  globalTeardown: require.resolve('./e2e/globalTeardown'),
  // Note: `use.baseURL` is intentionally not set here — the `context` fixture
  // in e2e/fixtures.ts calls chromium.launchPersistentContext() directly
  // (required for extension loading), which bypasses this config's `use`
  // block entirely. baseURL is instead passed directly to that call.
});
