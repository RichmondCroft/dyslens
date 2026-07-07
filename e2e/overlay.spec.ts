import { test, expect } from './fixtures';
import { HomePageTesters } from './testers/HomePageTesters';
import { OverlayPageTesters } from './testers/OverlayPageTesters';
import ColorsLists from '../popup/constants/colorsList';
import { hexToRgb } from '../utils/hexToRgb';

test('enabling the overlay applies the selected color to the page', async ({ popup, appPage }) => {
  const home = new HomePageTesters(popup);
  const overlay = new OverlayPageTesters(popup);

  await home.goToOverlayPage();
  await overlay.enableSwitch();
  await overlay.selectColor(ColorsLists[2]);

  const floatingOverlay = appPage.getByTestId('floating-overlay');
  await expect(floatingOverlay).toBeVisible();
  await expect(floatingOverlay).toHaveCSS('background-color', hexToRgb(ColorsLists[2]));
});
