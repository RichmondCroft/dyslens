import type { Page } from 'puppeteer';
import { wait } from '../utils';
import type { Context } from '../types';

export class OverlayPageTesters {
  private extensionPage: Page;

  constructor(context: Context) {
    this.extensionPage = context.extensionPage;
  }

  async enableSwitch() {
    await wait(1000);
    const overlayEnableSwitch = await this.extensionPage.$('[data-testid="overlay-tint-switch"]');
    await overlayEnableSwitch.click();
    await wait(1000);
  }

  async disableSwitch() {
    await wait(1000);
    const overlayEnableSwitch = await this.extensionPage.$('[data-testid="overlay-tint-switch"]');
    await overlayEnableSwitch.click();
    await wait(1000);
  }

  async selectColor(color: string) {
    await wait(1000);
    
    const overlayRedColor = await this.extensionPage.$(`[data-testid="${color}"]`);
    await overlayRedColor.click();

    await wait(1000);
  }
}