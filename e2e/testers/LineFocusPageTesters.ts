import { wait } from '../utils';
import type { Context } from '../types';
import type { Page } from 'puppeteer';

export class LineFocusPageTesters {
  private extensionPage: Page;

  constructor(context: Context) {
    this.extensionPage = context.extensionPage;
  }

  async enableSwitch() {
    await wait(1000);
    const lineFocusEnableSwitch = await this.extensionPage.$('[data-testid="line-focus-switch"]');
    await lineFocusEnableSwitch.click();
    await wait(1000);
  }

  async disableSwitch() {
    await wait(1000);
    const lineFocusEnableSwitch = await this.extensionPage.$('[data-testid="line-focus-switch"]');
    await lineFocusEnableSwitch.click();
    await wait(1000);
  }

  async selectColor(color: string) {
    await wait(1000);

    const lineFocusRedColor = await this.extensionPage.$(`[data-testid="${color}"]`);
    await lineFocusRedColor.click();

    await wait(1000);
  }
}