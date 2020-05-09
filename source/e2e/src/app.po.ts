import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root app-nav mat-sidenav-container mat-sidenav-content mat-toolbar')).getText();
  }
}
