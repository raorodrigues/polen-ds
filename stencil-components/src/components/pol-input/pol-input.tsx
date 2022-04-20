import { Component, Prop, Event, EventEmitter, Host, h, Element, State } from '@stencil/core';
import { inheritAttributes } from '../../utils';
@Component({
  tag: 'pol-input',
  shadow: false,
})
export class PolInput {
  @Element() el!: HTMLInputElement;
  @State() focusOut: boolean = false;
  @State() valid: boolean = true;

  @Prop() class: string;
  @Prop() name: string;

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

  /**
   * Placeholder do input
   */

  @Prop() placeholder: string;

  private externalAttrs = ['class', 'disabled', 'value', 'label', 'required', 'readonly', 'placeholder'];

  private inheritedAttributes: { [k: string]: any } = {};
  private attrs = Array.prototype.slice.call(this.el.attributes);

  componentWillLoad() {
    const attrs = this.attrs.filter(attr => this.externalAttrs.indexOf(attr.nodeName) == -1).map(attr => attr.nodeName);
    this.inheritedAttributes = inheritAttributes(this.el, attrs);
    this.handleCheckFocus();
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

  handleCheckFocus = () => {
    if (!this.value) {
      this.focusOut = true;
    }
  };

  render() {
    const { inheritedAttributes, required, disabled, handleChange, label, placeholder } = this;
    return (
      <Host>
        <label
          class={`form-control pol-form-control${this.focusOut ? ' focus-out' : ''}${this.valid ? '' : ' invalid'}${this.disabled || this.readonly ? ' disabled' : ''}${
            this.class ? ` ${this.class}` : ''
          }`}
        >
          <span class="label">{label}</span>
          <input
            onInput={handleChange}
            disabled={disabled}
            onFocusin={() => (this.focusOut = false)}
            onFocusout={() => this.handleCheckFocus()}
            {...inheritedAttributes}
            placeholder={placeholder}
            value={this.value}
            required={required}
          />
        </label>
      </Host>
    );
  }
}
