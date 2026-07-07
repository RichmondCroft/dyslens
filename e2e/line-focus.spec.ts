import { test, expect } from './fixtures';
import { HomePageTesters } from './testers/HomePageTesters';
import { LineFocusPageTesters } from './testers/LineFocusPageTesters';
import ColorsLists from '../popup/constants/colorsList';
import { hexToRgb } from '../utils/hexToRgb';

test('enabling line focus applies the selected color and height to the page', async ({ popup, appPage }) => {
  const home = new HomePageTesters(popup);
  const lineFocus = new LineFocusPageTesters(popup);

  await home.goToLineFocusPage();
  await lineFocus.enableSwitch();
  await lineFocus.selectColor(ColorsLists[3]);
  await lineFocus.setHeight(110);

  // The line-focus overlay has no data-testid in contents/LineFocus.tsx, so
  // it's targeted by its class name.
  const lineFocusOverlay = appPage.locator('.line-focus');
  await expect(lineFocusOverlay).toBeVisible();
  await expect(lineFocusOverlay).toHaveCSS('background-color', hexToRgb(ColorsLists[3]));
  await expect(lineFocusOverlay).toHaveCSS('height', '110px');
});
