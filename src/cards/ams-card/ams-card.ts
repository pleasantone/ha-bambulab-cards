import { customElement } from "lit/decorators.js";
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
  _hass;

  public static async getConfigElement() {
    await import("./ams-card-editor");
    return document.createElement(AMS_CARD_EDITOR_NAME);

  }

  setConfig() {
    if (this._hass) {
      this.hass = this._hass;
    }
  }

  set hass(hass) {
    this._hass = hass;
  }

  render() {
    return html`
      <ha-card>
        <div class="card-content">Test</div>
      </ha-card>
    `;
  }
}
