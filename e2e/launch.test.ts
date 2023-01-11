import { bootstrap } from "./bootstrap";
import { hexToRgb, wait } from "./utils";
import { HomePageTesters } from "./testers/HomePageTesters";
import { LineFocusPageTesters } from "./testers/LineFocusPageTesters";
import { OverlayPageTesters } from "./testers/OverlayPageTesters";
import { TEST_PAGE_SERVER_PORT } from "./constants";
import { TextSettingsTester } from "./testers/TextSettingsTesters";
import testPageServer from './testPageServer';
import ColorsLists from "../popup/constants/colorsList";

jest.setTimeout(10 * 60 * 1000);

beforeAll(() => {
  testPageServer.listen(TEST_PAGE_SERVER_PORT);
})

afterAll(() => {
  testPageServer.close()
})

describe('Verify Text Changes', () => {
  test('text changes are applied', async () => {
    const appUrl = `http://localhost:${TEST_PAGE_SERVER_PORT}/basic-page.html`;
    
    const context = await bootstrap({ appUrl });
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
      await textSettingsTester.selectColor(ColorsLists[0]);

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
        color: hexToRgb(ColorsLists[0]),
        fontFamily: 'ComicSans'
      });

      extensionPage.bringToFront();

      await textSettingsTester.disableSwitch();
      await homePageTesters.goBack();
      await homePageTesters.goToOverlayPage();
      await overlayPageTesters.enableSwitch();
      await overlayPageTesters.selectColor(ColorsLists[2]);

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
        backgroundColor: hexToRgb(ColorsLists[2])
      });

      await extensionPage.bringToFront();
      await wait(2000);

      await overlayPageTesters.disableSwitch();
      await homePageTesters.goBack();
      await homePageTesters.goToLineFocusPage();
      await lineFocusPageTesters.enableSwitch();
      await lineFocusPageTesters.selectColor(ColorsLists[3]);

      await appPage.bringToFront();
      await wait(2000);
    } finally {
      await browser.close();
    }
  });
});
