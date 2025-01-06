import { customElement, property } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";
import styles from "./info-bar.styles";

@customElement("info-bar")
export class InfoBar extends LitElement {
  @property({ type: String }) public subtitle;
  @property({ type: String }) public humidity;
  @property({ type: String }) public temperature;

  static styles = styles;

  render() {
    return html`
      <div class="extra-info">
        <div class="subtitle">${this.subtitle}</div>
        <div class="info-slots">
          ${this.humidity
            ? html` <div class="info">
                <span><ha-icon icon="mdi:water" /></span>
                <span>${this.humidity}</span>
              </div>`
            : nothing}
          ${this.temperature
            ? html`
                <div class="info">
                  <span>
                    <ha-icon icon="mdi:thermometer" />
                  </span>
                  <span>${this.temperature}</span>
                </div>
              `
            : nothing}
        </div>
      </div>
    `;
  }
}
