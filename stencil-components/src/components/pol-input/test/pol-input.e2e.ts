import { newE2EPage } from '@stencil/core/testing';

describe('pol-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pol-input></pol-input>');

    const element = await page.find('pol-input');
    expect(element).toHaveClass('hydrated');
  });
});
