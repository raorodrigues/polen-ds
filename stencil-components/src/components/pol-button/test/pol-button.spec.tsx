import { newSpecPage } from '@stencil/core/testing';
import { PolButton } from '../pol-button';

describe('pol-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PolButton],
      html: `<pol-button></pol-button>`,
    });
    expect(page.root).toEqualHtml(`
      <pol-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pol-button>
    `);
  });
});
