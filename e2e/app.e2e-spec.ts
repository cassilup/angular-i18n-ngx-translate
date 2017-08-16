import { I18nExamplePage } from './app.po';

describe('i18n-example-dry-run App', () => {
  let page: I18nExamplePage;

  beforeEach(() => {
    page = new I18nExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
