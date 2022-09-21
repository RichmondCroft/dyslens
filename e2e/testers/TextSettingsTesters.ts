import type { Page } from 'puppeteer';
import { wait } from '../utils';
import type { Context } from '../types';

export class TextSettingsTester {
  private extensionPage: Page;

  constructor(context: Context) {
    this.extensionPage = context.extensionPage;
  }

  async enableSwitch() {
    await wait(100);
    const enableSwitch = await this.extensionPage.$('[data-testid="text-settings-switch"]');
    await enableSwitch.click();
    await wait(100);
  }

  async disableSwitch() {
    await wait(100);
    const enableSwitch = await this.extensionPage.$('[data-testid="text-settings-switch"]');
    await enableSwitch.click();
    await wait(100);
  }

  async selectFont(fontName: string) {
    await wait(1000);

    const dropDownForm = await this.extensionPage.$('[data-testid="text-settings-switch-form"]');
    await dropDownForm.click();

    await wait(500);

    const comicSansListItem = await this.extensionPage.$(`[data-testid="${fontName}"]`);
    await comicSansListItem.click();

    await wait(1000);
  }

  async selectColor(color: string) {
    await wait(1000);
    const redColor = await this.extensionPage.$(`[data-testid="${color}"]`);
    await redColor.click();

    await wait(1000);
  }
}