import { test, expect } from './fixtures';
import { HomePageTesters } from './testers/HomePageTesters';
import { TextSettingsTester } from './testers/TextSettingsTesters';
import ColorsLists from '../popup/constants/colorsList';
import { hexToRgb } from '../utils/hexToRgb';

test('enabling text settings applies the selected font and color to the page', async ({ popup, appPage }) => {
  const home = new HomePageTesters(popup);
  const textSettings = new TextSettingsTester(popup);

  await home.goToTextSettingsPage();
  await textSettings.enableSwitch();
  await textSettings.selectFont('ComicSans');
  await textSettings.selectColor(ColorsLists[0]);

  const header = appPage.getByTestId('header');
  await expect(header).toHaveCSS('font-family', 'ComicSans');
  await expect(header).toHaveCSS('color', hexToRgb(ColorsLists[0]));
});
