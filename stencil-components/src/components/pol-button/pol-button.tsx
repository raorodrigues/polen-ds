import { Component, h, Prop, Element, Host } from '@stencil/core';
import { inheritAttributes } from '../../utils';

@Component({
  tag: 'pol-button',
  shadow: false,
})
export class PolButton {
  @Element() el!: HTMLButtonElement;

  @Prop() class: string;
  @Prop() type: 'button' | 'menu' | 'reset' | 'submit';

  @Prop() text: string;

  /**
   * Tamanho do botão.
   * Pode ser 'sm' | 'md' | 'lg'
   * Padrão: 'lg'
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'lg';

  /**
   * Variação de cores do botão.
   * Pode ser 'primary' | 'secondary' | 'outline-light' | 'outline-dark'
   * Padrão: 'primary'
   */
  @Prop() variation: 'primary' | 'secondary' | 'outline-light' | 'outline-dark' = 'primary';

  /**
   * Define se o botão ocupa 100 da largura do bloco
   */
  @Prop() block: boolean = false;
  @Prop() pill: boolean = false;

  /**
   * Define se o botão fica desabilitado
   */
  @Prop() disabled: boolean = false;

  /**
   * Define uma URL para o botão. No caso será impressa uma tag 'a'
   */
  @Prop() href: string;

  private externalAttrs = ['class', 'text', 'size', 'variation', 'block', 'onclick', 'disabled', 'pill'];

  private inheritedAttributes: { [k: string]: any } = {};
  private attrs = Array.prototype.slice.call(this.el.attributes);

  componentWillLoad() {
    const attrs = this.attrs.filter(attr => this.externalAttrs.indexOf(attr.nodeName) == -1).map(attr => attr.nodeName);
    this.inheritedAttributes = inheritAttributes(this.el, attrs);
  }

  render() {
    const { size, variation, block, disabled, href, inheritedAttributes, pill } = this;

    /**
     * Define se é tag 'button' ou 'a'
     */
    const TagType = href === undefined ? 'button' : ('a' as any);

    /**
     * Define se o botão tem display: block
     */
    const Block = (props, children) => {
      return block ? (
        <div class="d-grid gap-2" {...props}>
          {children}
        </div>
      ) : (
        children
      );
    };

    return (
      <Host>
        <Block>
          <TagType class={`btn btn-${variation} btn-${size}${this.class ? ` ${this.class}` : ''}${pill ? ' rounded-pill' : ''}`} {...inheritedAttributes} disabled={disabled}>
            {this.text}
          </TagType>
        </Block>
      </Host>
    );
  }
}
