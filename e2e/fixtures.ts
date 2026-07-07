import fs from 'fs';
import os from 'os';
import path from 'path';

import { test as base, chromium, type BrowserContext, type Page } from '@playwright/test';

import { TEST_PAGE_SERVER_PORT } from './testPageServer';

const EXTENSION_PATH = path.join(__dirname, '..', 'build', 'chrome-mv3-prod');

type Fixtures = {
  context: BrowserContext;
  extensionId: string;
  popupUrl: string;
  popup: Page;
  appPage: Page;
};

export const test = base.extend<Fixtures>({
  // eslint-disable-next-line no-empty-pattern
  context: async ({}, use) => {
    const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dyslens-pw-'));
    const context = await chromium.launchPersistentContext(userDataDir, {
      channel: 'chromium', // Playwright's bundled Chromium supports loading extensions headlessly
      headless: true,
      baseURL: `http://localhost:${TEST_PAGE_SERVER_PORT}`,
      args: [
        `--disable-extensions-except=${EXTENSION_PATH}`,
        `--load-extension=${EXTENSION_PATH}`,
      ],
    });
    await use(context);
    await context.close();
    fs.rmSync(userDataDir, { recursive: true, force: true });
  },

  extensionId: async ({ context }, use) => {
    let [worker] = context.serviceWorkers();
    if (!worker) worker = await context.waitForEvent('serviceworker');
    // chrome-extension://<id>/background.js -> <id>
    await use(new URL(worker.url()).host);
  },

  popupUrl: async ({ extensionId }, use) => {
    // Solves #152: read the real popup filename from the built manifest —
    // this can never go stale across builds, unlike a hardcoded constant.
    const manifest = JSON.parse(fs.readFileSync(path.join(EXTENSION_PATH, 'manifest.json'), 'utf-8'));
    const popupFile = manifest.action?.default_popup ?? 'popup.html';
    await use(`chrome-extension://${extensionId}/${popupFile}`);
  },

  popup: async ({ context, popupUrl }, use) => {
    const popup = await context.newPage();
    await popup.goto(popupUrl);
    await use(popup);
  },

  appPage: async ({ context }, use) => {
    const appPage = await context.newPage();
    await appPage.goto('/basic-page.html');
    await use(appPage);
  },
});

export const expect = test.expect;
