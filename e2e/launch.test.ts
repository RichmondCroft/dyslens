import { bootstrap } from "./bootstrap";

jest.setTimeout(10 * 60 * 1000);

function wait(duration: number) {
  return new Promise<void>((res) => setTimeout(() => { res() }, duration))
}

describe('initial test', () => {
  let extensionPage, appPage, browser;
  beforeAll(async () => {
    const context = await bootstrap({ appUrl: 'https://google.com' });
    extensionPage = context.extensionPage;
    appPage = context.appPage;
    browser = context.browser;
  });

  it('first one', async () => {
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

    const redColor = await extensionPage.$('[data-testid="#ff4d2b"');
    await redColor.click();

    await wait(2000);
    
    // appPage.bringToFront();
    const pages = await browser.pages();
    pages[0].bringToFront();
    // verify on the website
    await wait(2000);
  });

  afterAll(async () => {
    await browser.close();
  });
});
