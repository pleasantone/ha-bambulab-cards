import { customElement, property } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";
import styles from "./info-bar.styles";

@customElement("info-bar")
export class InfoBar extends LitElement {
  @property({ type: String }) public subtitle;
  @property({ type: String }) public humidity;
  @property({ type: String }) public temperature;

  static styles = styles;

  getHumidityColor() {
        switch (this.humidity) {
            case '1':
                return '#e0f7fa'; // very light blue
            case '2':
                return '#81d4fa'; // light blue
            case '3':
                return '#29b6f6'; // medium blue
            case '4':
                return '#0288d1'; // deeper blue
            case '5':
                return '#01579b'; // darkest blue
            default:
                return 'white'; // fallback if index is outside 1-5
        }
    }

  render() {
    return html`
      <div class="extra-info">
        <div class="subtitle">${this.subtitle}</div>
        <div class="info-slots">
          ${this.humidity
            ? html` <div class="info">
                <span><ha-icon icon="mdi:water" style="color: ${this.getHumidityColor()}" /></span>
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
