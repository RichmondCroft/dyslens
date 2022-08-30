import path from "path";
import type { Browser, Page } from "puppeteer";
import { bootstrap } from "./bootstrap";
import { hexToRgb } from "./utils";

jest.setTimeout(10 * 60 * 1000);

function wait(duration: number) {
  return new Promise<void>((res) => setTimeout(() => { res() }, duration))
}

describe('the extension should work properly with basic page', () => {
  let extensionPage: Page, appPage: Page, browser: Browser;
  beforeAll(async () => {
    const url = path.join('file://', __dirname, `./test-pages/basic-page.html`);
    const context = await bootstrap({ appUrl: url });
    extensionPage = context.extensionPage;
    appPage = context.appPage;
    browser = context.browser;
  });

  it('check if text changes are applied', async () => {
    // 1. When a user opens the React application
    extensionPage.bringToFront();

    await wait(500);

    const textSettings = await extensionPage.$('[data-testid="text-settings"]');
    await textSettings.click();

    await wait(500);

    const enableSwitch = await extensionPage.$('[data-testid="text-settings-switch"]');
    await enableSwitch.click();

    // const dropDownForm = await extensionPage.$('[data-testid="text-settings-switch-form"]');
    // await dropDownForm.click();

    // const comicSansListItem = await extensionPage.$('[data-testid="ComicSans"]');
    // await comicSansListItem.click();

    const redColor = await extensionPage.$('[data-testid="#ff4d2b"]');
    await redColor.click();

    await wait(2000);

    // appPage.bringToFront();
    const pages = await browser.pages();
    pages[0].bringToFront();
    // verify on the website
    await wait(2000);

    const headerColor = await appPage.evaluate(() => {
      const header = document.querySelector('[data-testid="header"]');
      return window.getComputedStyle(header).color
    });

    expect(headerColor).toBe(hexToRgb('#ff4d2b'));

  });

  afterAll(async () => {
    await browser.close();
  });
});
