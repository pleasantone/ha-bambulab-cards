import { customElement, state } from "lit/decorators.js";
import { registerCustomCard } from "../../utils/custom-cards";
import { AMS_CARD_EDITOR_NAME, AMS_CARD_NAME } from "./const";
import { html, LitElement, nothing } from "lit";

registerCustomCard({
  type: AMS_CARD_NAME,
  name: "Bambu Lab AMS Card",
  description: "Card for AMS entity",
});

@customElement(AMS_CARD_NAME)
export class AMS_CARD extends LitElement {
  // private property
  @state() private _hass?;
  @state() private _header;
  @state() private _entity;

  static get properties() {
    return {
      _header: { state: true },
      _entity: { state: true },
    };
  }

  setConfig(config) {
    this._header = config.header === "" ? nothing : config.header;
    this._entity = config.entity;
    if (this._hass) {
      this.hass = this._hass;
    }
  }

  set hass(hass) {
    this._hass = hass;
  }

  render() {
    console.log(this._hass);
    console.log("header", this._header);
    console.log("entity", this._entity);
    return html`
      <ha-card header="${this._header}">
        <div class="card-content">AMS Card Test 2</div>
      </ha-card>
    `;
  }

  public static async getConfigElement() {
    await import("./ams-card-editor");
    return document.createElement(AMS_CARD_EDITOR_NAME);
  }

  static getStubConfig() {
    return {
      entity: "sun.sun",
      header: "AMS Header",
    };
  }
}
