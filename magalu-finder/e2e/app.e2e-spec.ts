import { MagaluFinderPage } from './app.po';

describe('magalu-finder App', function() {
  let page: MagaluFinderPage;

  beforeEach(() => {
    page = new MagaluFinderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
