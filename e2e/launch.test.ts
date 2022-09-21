import path from "path";
import { bootstrap } from "./bootstrap";
import { HomePageTesters } from "./testers/HomePageTesters";
import { LineFocusPageTesters } from "./testers/LineFocusPageTesters";
import { OverlayPageTesters } from "./testers/OverlayPageTesters";
import { TextSettingsTester } from "./testers/TextSettingsTesters";
import { hexToRgb, wait } from "./utils";

jest.setTimeout(10 * 60 * 1000);

describe('Verify Text Changes', () => {
  test('text changes are applied', async () => {
    const url = path.join('file://', __dirname, `./test-pages/basic-page.html`);
    const context = await bootstrap({ appUrl: url });
    const { appPage, browser, extensionPage } = context;

    try {
      const textSettingsTester = new TextSettingsTester(context);
      const homePageTesters = new HomePageTesters(context);
      const overlayPageTesters = new OverlayPageTesters(context);
      const lineFocusPageTesters = new LineFocusPageTesters(context);

      extensionPage.bringToFront();
      await homePageTesters.goToTextSettingsPage();
      await textSettingsTester.enableSwitch();
      await textSettingsTester.selectFont('ComicSans');
      await textSettingsTester.selectColor('#ff4d2b');

      appPage.bringToFront();
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

      await textSettingsTester.disableSwitch();
      await homePageTesters.goBack();
      await homePageTesters.goToOverlayPage();
      await overlayPageTesters.enableSwitch();
      await overlayPageTesters.selectColor('#ff4d2b');

      await appPage.bringToFront();
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

      await extensionPage.bringToFront();
      await wait(2000);

      await overlayPageTesters.disableSwitch();
      await homePageTesters.goBack();
      await homePageTesters.goToLineFocusPage();
      await lineFocusPageTesters.enableSwitch();
      await lineFocusPageTesters.selectColor('#ff4d2b');

      await appPage.bringToFront();
      await wait(2000);
    } finally {
      await browser.close();
    }
  });
});
