import puppeteer from 'puppeteer';
import { EXTENSION_ID, POPUP_FILE } from './constants';
import type { Context } from './types';

export async function bootstrap(options: { devtools?: boolean, slowMo?: number, appUrl: string }): Promise<Context> {
  const { devtools = false, slowMo = 0, appUrl } = options;
  const browser = await puppeteer.launch({
    headless: false,
    devtools,
    args: [
      '--disable-extensions-except=./build/chrome-mv3-dev',
      '--load-extension=./build/chrome-mv3-dev',
    ],
    slowMo,
  });

  const pages = await browser.pages();
  const appPage = pages.length === 0 ? await browser.newPage() : pages[0];
  await appPage.goto(appUrl, { waitUntil: 'load' });

  const extensionPage = await browser.newPage();
  const extensionUrl = `chrome-extension://${EXTENSION_ID}/${POPUP_FILE}.html`;
  await extensionPage.goto(extensionUrl, { waitUntil: 'load' });

  return {
    appPage,
    browser,
    extensionUrl,
    extensionPage,
  };
}
