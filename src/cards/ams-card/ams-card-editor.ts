import { AMS_CARD_EDITOR_NAME } from "./const";
import { customElement, state } from "lit/decorators.js";
import { LitElement, html } from "lit";

const SCHEMA = {
  selector: {
    select: {
      options: [
        { label: "Option 1", value: "Option 1" },
        { label: "Option 2", value: "Option 2" },
        { label: "Option 3", value: "Option 3" },
      ]
    },
  },
};

@customElement(AMS_CARD_EDITOR_NAME)
export class AmsCardEditor extends LitElement {
  @state() private _config?;
  @state() private hass: any;

  static get properties() {
    return {
      hass: {},
      _config: { state: true },
    };
  }

  public setConfig(config): void {
    this._config = config;
  }

  _handleValueChanged(v) {
    console.log(v);
  }

  render() {
    return html`
      <div>
        <ha-selector
          .hass=${this.hass}
          .selector=${SCHEMA.selector}
          @value-changed=${this._handleValueChanged}
          .helper="Helper Text"
        ></ha-selector>
      </div>
    `;
  }
}
