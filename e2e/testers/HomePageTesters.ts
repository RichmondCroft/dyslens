import type { Page } from '@playwright/test';

export class HomePageTesters {
  constructor(private readonly popup: Page) {}

  async goToTextSettingsPage() {
    await this.popup.getByTestId('text-settings').click();
  }

  async goToOverlayPage() {
    await this.popup.getByTestId('overlay-tint').click();
  }

  async goToLineFocusPage() {
    await this.popup.getByTestId('line-focus').click();
  }

  async goToTextToSpeechPage() {
    await this.popup.getByTestId('text-to-speech-settings').click();
  }

  async goBack() {
    await this.popup.getByTestId('nav-back-button').click();
  }
}
