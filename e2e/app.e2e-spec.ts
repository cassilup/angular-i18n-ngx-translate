import { I18nExampleDryRunPage } from './app.po';

describe('i18n-example-dry-run App', () => {
  let page: I18nExampleDryRunPage;

  beforeEach(() => {
    page = new I18nExampleDryRunPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
