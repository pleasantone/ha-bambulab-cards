import { customElement, property } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";
import styles from "../card.styles";

@customElement("vector-ams-card")
export class VectorAmsCard extends LitElement {
  @property() public header;
  @property({ type: Object }) public entities;
  @property({ type: Object }) public states;

  static styles = styles;

  render() {
    return html`
      <ha-card header="${this.header}">
        <div class="nv-wrapper">
          <div class="nv-extra-info">
            <div class="nv-info">Temp</div>
            <div class="nv-info">Humidity 5 4 3 2 1</div>
          </div>
          <div class="nv-ams-container">
            ${this.entities?.spools.map(
              (spool) => html`
                <div class="nv-spool-holder">
                  <bl-spool
                    ?active=${this.states[spool.entity_id]?.attributes.active}
                    .color="${this.states[spool.entity_id]?.attributes.color}"
                    .remaining="${this.states[spool.entity_id]?.attributes.remain}"
                    .tag_uid="${this.states[spool.entity_id]?.attributes.tag_uid}"
                  ></bl-spool>
                  <div class="nv-spool-info">${this.states[spool.entity_id]?.attributes.type}</div>
                </div>
              `
            )}
          </div>
        </div>
      </ha-card>
    `;
  }
}
