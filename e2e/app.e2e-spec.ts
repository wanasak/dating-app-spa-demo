import { DatingApp.SPAPage } from './app.po';

describe('dating-app.spa App', () => {
  let page: DatingApp.SPAPage;

  beforeEach(() => {
    page = new DatingApp.SPAPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
