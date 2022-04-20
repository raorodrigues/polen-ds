import { newSpecPage } from '@stencil/core/testing';
import { PolSelect } from '../pol-select';

describe('pol-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PolSelect],
      html: `<pol-select></pol-select>`,
    });
    expect(page.root).toEqualHtml(`
      <pol-select>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pol-select>
    `);
  });
});
