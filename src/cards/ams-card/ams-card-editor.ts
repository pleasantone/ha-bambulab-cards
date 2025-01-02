import { AMS_CARD_EDITOR_NAME, AMS_MODELS } from "./const";
import { INTEGRATION_DOMAIN, MANUFACTURER } from "../../const";
import { customElement, state } from "lit/decorators.js";
import { LitElement, html, nothing } from "lit";

// https://www.home-assistant.io/docs/blueprint/selectors/#select-selector
const SCHEMA = {
  selector: {
    select: {
      options: [
        { label: "AMS 1", value: "ams-1" },
        { label: "AMS 2", value: "ams-2" },
        { label: "AMS 3", value: "ams-3" },
      ],
      mode: "dropdown",
    },
  },
};

const filterCombinations = AMS_MODELS.map((model) => ({
  manufacturer: MANUFACTURER,
  model: model,
}));

const NEW_SCHEMA = [
  { name: "header", label: "Card Header", selector: { text: {} } },
  {
    name: "ams",
    label: "AMS",
    selector: { device: { filter: filterCombinations } },
  },
  {
    name: "style",
    label: "Card Style",
    selector: {
      select: {
        options: [
          { label: "Vector", value: "vector" },
          { label: "Graphic", value: "graphic" },
        ],
      },
    },
  },
];

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

  _handleValueChanged(ev) {
    const messageEvent = new CustomEvent("config-changed", {
      detail: { config: ev.detail.value },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(messageEvent);
  }

  render() {
    console.log(this._config);
    return html`
      <div>
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${NEW_SCHEMA}
          .computeLabel=${(schema) => schema.label}
          @value-changed=${this._handleValueChanged}
        ></ha-form>
      </div>
    `;
  }
}
