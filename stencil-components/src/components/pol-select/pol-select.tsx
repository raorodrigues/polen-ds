import { Component, Prop, Event, EventEmitter, Host, h, Element, State } from '@stencil/core';
import { inheritAttributes } from '../../utils';
@Component({
  tag: 'pol-select',
  shadow: false,
})
export class PolSelect {
  @Element() el!: HTMLSelectElement;
  @State() valid: boolean = true;

  @Prop() class: string;

  /**
   * Valor do input
   */
  @Prop({ mutable: true }) value: string;

  @Event() changed: EventEmitter<string>;

  /**
   * Define se o input fica desabilitado
   */
  @Prop() disabled: boolean = false;

  /**
   * Define se o input fica somente leitura
   */
  @Prop() readonly: boolean = false;

  /**
   * Devine se o input é obrigatório
   */
  @Prop() required: boolean = false;

  /**
   * Label do input - Obrigatório
   */
  @Prop() label: string;

  private externalAttrs = ['class', 'disabled', 'value', 'label', 'required', 'readonly'];

  private inheritedAttributes: { [k: string]: any } = {};
  private attrs = Array.prototype.slice.call(this.el.attributes);

  componentWillLoad() {
    const attrs = this.attrs.filter(attr => this.externalAttrs.indexOf(attr.nodeName) == -1).map(attr => attr.nodeName);
    this.inheritedAttributes = inheritAttributes(this.el, attrs);
  }

  handleChange = ev => {
    this.value = ev.target ? ev.target.value : null;
    this.changed.emit(this.value);
    if (ev.target.checkValidity()) {
      this.valid = true;
    } else {
      this.valid = false;
    }
  };

  render() {
    const { inheritedAttributes, required, disabled, handleChange, label } = this;
    return (
      <Host>
        <label class={`form-control pol-form-control${this.valid ? '' : ' invalid'}${this.disabled || this.readonly ? ' disabled' : ''}${this.class ? ` ${this.class}` : ''}`}>
          <span class="label">{label}</span>
          <select onInput={handleChange} disabled={disabled} {...inheritedAttributes} required={required}>
            <slot />
          </select>
        </label>
      </Host>
    );
  }
}
