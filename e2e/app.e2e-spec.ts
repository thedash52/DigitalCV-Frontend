import { DigitalcvPage } from './app.po';

describe('digitalcv App', () => {
  let page: DigitalcvPage;

  beforeEach(() => {
    page = new DigitalcvPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
