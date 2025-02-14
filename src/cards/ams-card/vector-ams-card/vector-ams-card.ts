import { customElement, property } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";
import styles from "./vector-ams-card.styles";
import "../components/info-bar/info-bar";

@customElement("vector-ams-card")
export class VectorAmsCard extends LitElement {
  @property() public subtitle;
  @property() public showInfoBar;
  @property({ type: Object }) public entities;
  @property({ type: Object }) public states;
  @property() public showType;
  @property() public customHumidity;
  @property() public customTemperature;

  static styles = styles;

  temperature() {
    if (this.customTemperature) {
      return {
        type: "custom",
        value: this.states[this.customTemperature]?.state,
        unit_of_measurement:
          this.states[this.entities.temperature.entity_id]?.attributes.unit_of_measurement,
      };
    }
    if (this?.entities?.temperature) {
      return {
        type: "default",
        value: this.states[this.entities.temperature.entity_id]?.state,
        unit_of_measurement:
          this.states[this.entities.temperature.entity_id]?.attributes.unit_of_measurement,
      };
    }
    return nothing;
  }

  humidity() {
    if (this.customHumidity) {
      return {
        type: "custom",
        value: this.states[this.customHumidity]?.state,
      };
    }
    if (this?.entities?.humidity) {
      return {
        type: "default",
        value: this.states[this.entities.humidity.entity_id]?.state,
      };
    }
    return nothing;
  }

  isActive(attributes) {
    if (attributes?.active || attributes?.in_use) return true;
    return false;
  }

  remainingModifier(remain) {
    {
      if (this.entities.type == "AMS Lite") return 100;
      return remain;
    }
  }

  render() {
    return html`
      <ha-card class="card">
        <div class="v-wrapper">
          ${this.showInfoBar
            ? html` <info-bar
                subtitle="${this.subtitle}"
                .humidity="${this.humidity()}"
                .temperature="${this.temperature()}"
              ></info-bar>`
            : nothing}
          <div class="v-ams-container">
            ${this.entities?.spools.map(
              (spool: { entity_id: string | number }) => html`
                <div
                  class="v-spool-holder"
                  style="border-color: ${this.isActive(this.states[spool.entity_id]?.attributes)
                    ? this.states[spool.entity_id]?.attributes.color
                    : "#808080"}"
                >
                  ${this.states[spool.entity_id]?.attributes.type !== "Empty"
                    ? html` <bl-spool
                        ?active=${this.isActive(this.states[spool.entity_id]?.attributes)}
                        .color="${this.states[spool.entity_id]?.attributes.color}"
                        .remaining="${this.remainingModifier(
                          this.states[spool.entity_id]?.attributes.remain
                        )}"
                        .tag_uid="${this.states[spool.entity_id]?.attributes.tag_uid}"
                      ></bl-spool>`
                    : nothing}
                </div>
              `
            )}
          </div>
          ${this.showType
            ? html` <div class="v-spool-info-container">
                ${this.entities?.spools.map(
                  (spool: { entity_id: string | number }) => html`
                    <div class="v-spool-info-wrapper">
                      <div class="v-spool-info">
                        ${this.states[spool.entity_id]?.attributes.name}
                      </div>
                    </div>
                  `
                )}
              </div>`
            : nothing}
        </div>
      </ha-card>
    `;
  }
}
