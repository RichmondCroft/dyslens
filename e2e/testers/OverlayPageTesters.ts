import type { Page } from '@playwright/test';

export class OverlayPageTesters {
  constructor(private readonly popup: Page) {}

  async enableSwitch() {
    await this.popup.getByTestId('overlay-tint-switch').click();
  }

  async disableSwitch() {
    await this.popup.getByTestId('overlay-tint-switch').click();
  }

  async selectColor(color: string) {
    await this.popup.getByTestId(color).click();
  }
}
