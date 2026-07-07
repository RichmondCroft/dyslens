import type { Page } from '@playwright/test';

export class LineFocusPageTesters {
  constructor(private readonly popup: Page) {}

  async enableSwitch() {
    await this.popup.getByTestId('line-focus-switch').click();
  }

  async disableSwitch() {
    await this.popup.getByTestId('line-focus-switch').click();
  }

  async selectColor(color: string) {
    await this.popup.getByTestId(color).click();
  }

  // The Height slider has no distinguishing testid/aria-label in the popup
  // markup, so it's targeted by DOM order: 0 = Opacity, 1 = Height.
  async setHeight(targetHeight: number) {
    const slider = this.popup.getByRole('slider').nth(1);
    await slider.focus();
    const currentValue = Number(await slider.getAttribute('aria-valuenow'));
    const key = targetHeight > currentValue ? 'ArrowRight' : 'ArrowLeft';
    for (let i = 0; i < Math.abs(targetHeight - currentValue); i++) {
      await this.popup.keyboard.press(key);
    }
  }
}
