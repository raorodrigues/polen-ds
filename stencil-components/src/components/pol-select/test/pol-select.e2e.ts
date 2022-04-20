import { newE2EPage } from '@stencil/core/testing';

describe('pol-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pol-select></pol-select>');

    const element = await page.find('pol-select');
    expect(element).toHaveClass('hydrated');
  });
});
