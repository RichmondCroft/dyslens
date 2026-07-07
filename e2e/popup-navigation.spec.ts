import { test, expect } from './fixtures';
import { HomePageTesters } from './testers/HomePageTesters';

test('navigates from the home menu into a settings page and back', async ({ popup }) => {
  const home = new HomePageTesters(popup);

  await home.goToTextSettingsPage();
  await expect(popup.getByTestId('textSettingsContainer')).toBeVisible();

  await home.goBack();
  await expect(popup.getByTestId('homePageContainer')).toBeVisible();
});
