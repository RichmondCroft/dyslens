import path from "path";
import type { Browser, Page } from "puppeteer";
import { bootstrap } from "./bootstrap";
import { hexToRgb } from "./utils";

jest.setTimeout(10 * 60 * 1000);

function wait(duration: number) {
  return new Promise<void>((res) => setTimeout(() => { res() }, duration))
}

describe('Verify Text Changes', () => {
  let extensionPage: Page, appPage: Page, browser: Browser;
  beforeAll(async () => {
    const url = path.join('file://', __dirname, `./test-pages/basic-page.html`);
    const context = await bootstrap({ appUrl: url });
    extensionPage = context.extensionPage;
    appPage = context.appPage;
    browser = context.browser;
  });

  test('text changes are applied', async () => {
    // 1. When a user opens the React application
    extensionPage.bringToFront();

    await wait(500);

    const textSettings = await extensionPage.$('[data-testid="text-settings"]');
    await textSettings.click();

    await wait(500);

    const enableSwitch = await extensionPage.$('[data-testid="text-settings-switch"]');
    await enableSwitch.click();

    const dropDownForm = await extensionPage.$('[data-testid="text-settings-switch-form"]');
    await dropDownForm.click();

    await wait(500);

    const comicSansListItem = await extensionPage.$('[data-testid="ComicSans"]');
    await comicSansListItem.click();

    await wait(2000);

    const redColor = await extensionPage.$('[data-testid="#ff4d2b"]');
    await redColor.click();

    await wait(2000);

    // appPage.bringToFront();
    const pages = await browser.pages();
    pages[0].bringToFront();
    // verify on the website
    await wait(2000);

    const headerProps = await appPage.evaluate(() => {
      const header = document.querySelector('[data-testid="header"]');
      const computedStyles = window.getComputedStyle(header);
      return {
        color: computedStyles.color,
        fontFamily: computedStyles.fontFamily,
      }
    });


    expect(headerProps).toEqual({
      color: hexToRgb('#ff4d2b'),
      fontFamily: 'ComicSans'
    });

    extensionPage.bringToFront();

    await wait(500);
    enableSwitch.click();

    await wait(500);
    const backButton = await extensionPage.$('[data-testid="nav-back-button"]');
    await backButton.click();

    await wait(500);

    const overlaySettings = await extensionPage.$('[data-testid="overlay-tint"]');
    await overlaySettings.click();
    await wait(500);

    const overlayEnableSwitch = await extensionPage.$('[data-testid="overlay-tint-switch"]');
    await overlayEnableSwitch.click();
    await wait(500);

    const overlayRedColor = await extensionPage.$('[data-testid="#ff4d2b"]');
    await overlayRedColor.click();

    pages[0].bringToFront();

    await wait(2000);

    const overlayComputedStyles = await appPage.evaluate(() => {
      const pageOverlay = document.querySelector('[data-testid="floating-overlay"]');
      const computedStyles = window.getComputedStyle(pageOverlay);
      return {
        backgroundColor: computedStyles.backgroundColor
      }
    });


    expect(overlayComputedStyles).toEqual({
      backgroundColor: hexToRgb('#ff4d2b')
    });

    extensionPage.bringToFront();

    await wait(2000);
    overlayEnableSwitch.click();

    await wait(500);
    const overlayBackButton = await extensionPage.$('[data-testid="nav-back-button"]');
    await overlayBackButton.click();
    await wait(500);

    await wait(500);
    const lineFocusSettings = await extensionPage.$('[data-testid="line-focus"]');
    await lineFocusSettings.click();
    await wait(500);

    const lineFocusEnableSwitch = await extensionPage.$('[data-testid="line-focus-switch"]');
    await lineFocusEnableSwitch.click();
    await wait(500);

    const lineFocusRedColor = await extensionPage.$('[data-testid="#ff4d2b"]');
    await lineFocusRedColor.click();

    pages[0].bringToFront();

    await wait(2000);
  });

  afterAll(async () => {
    await browser.close();
  });
});
