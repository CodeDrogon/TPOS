import { TollPlusPage } from './app.po';

describe('toll-plus App', () => {
  let page: TollPlusPage;

  beforeEach(() => {
    page = new TollPlusPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
