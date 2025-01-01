import { AMS_CARD_EDITOR_NAME } from "./const";
import { customElement, state } from "lit/decorators.js";
import { LitElement, html } from "lit";

@customElement(AMS_CARD_EDITOR_NAME)
export class AmsCardEditor extends LitElement {
  @state() private _config?

  static get properties() {
    return {
      hass: {},
      _config: { state: true },
    };
  }

  public setConfig(config): void {
    this._config = config;
  }

  render() {
    return html` <div>Editor</div> `;
  }
}
