import { newSpecPage } from '@stencil/core/testing';
import { PolInput } from '../pol-input';

describe('pol-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PolInput],
      html: `<pol-input></pol-input>`,
    });
    expect(page.root).toEqualHtml(`
      <pol-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pol-input>
    `);
  });
});
