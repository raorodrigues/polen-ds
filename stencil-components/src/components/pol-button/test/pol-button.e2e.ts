import { newE2EPage } from '@stencil/core/testing';

describe('pol-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pol-button></pol-button>');

    const element = await page.find('pol-button');
    expect(element).toHaveClass('hydrated');
  });
});
