import puppeteer from 'puppeteer';

export async function bootstrap(options: {devtools ?: boolean, slowMo ?: number, appUrl: string}) {
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
  let appPage;
  if(pages.length === 0) {
    appPage = await browser.newPage();
  }
  else {
    appPage = pages[0]
  }

  await appPage.goto(appUrl, { waitUntil: 'load' });

  const targets = await browser.targets();
  const extensionTarget = targets.find(target => target.type() === 'service_worker');
  const partialExtensionUrl = extensionTarget.url() || '';
  const [, , extensionId] = partialExtensionUrl.split('/');

  const extensionPage = await browser.newPage();
  // const extensionUrl = `chrome-extension://${extensionId}/popup.html`;
  const extensionUrl = `chrome-extension://${extensionId}/popup.f4f22924.html`;
  await extensionPage.goto(extensionUrl, { waitUntil: 'load' });

  return {
    appPage,
    browser,
    extensionUrl,
    extensionPage,
  };
}
