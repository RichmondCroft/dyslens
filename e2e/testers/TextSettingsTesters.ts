import type { Page } from '@playwright/test';

export class TextSettingsTester {
  constructor(private readonly popup: Page) {}

  async enableSwitch() {
    await this.popup.getByTestId('text-settings-switch').click();
  }

  async disableSwitch() {
    await this.popup.getByTestId('text-settings-switch').click();
  }

  async selectFont(fontName: string) {
    await this.popup.getByTestId('text-settings-switch-form').click();
    await this.popup.getByTestId(fontName).click();
  }

  async selectColor(color: string) {
    await this.popup.getByTestId(color).click();
  }
}
