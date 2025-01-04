import { customElement, property } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";
import styles from "./spool.styles";

@customElement("bl-spool")
export class Spool extends LitElement {
  @property({ type: Boolean }) public active: boolean = false;
  @property() public color;
  @property() public remaining;

  static styles = styles;

  firstUpdated() {
    this.updateLayers();
  }

  render() {
    return html`
      <div class="nv-spool-container">
        <div class="nv-spool"></div>
        <div
          class="nv-string-roll"
          id="nv-string-roll"
          style="background: ${this.color}; height: ${this.remaining}%"
        >
          ${this.active ? html`<div class="nv-reflection"></div>` : nothing}
        </div>
        <div class="nv-spool"></div>
      </div>
    `;
  }

  updateLayers() {
    // Query the #string-roll element inside this component’s shadow DOM
    const stringRoll = this.renderRoot.getElementById("nv-string-roll");
    if (!stringRoll) return;

    const stringWidth = 2; // matches .string-layer width in CSS
    const rollWidth = stringRoll.offsetWidth; // container width

    // Calculate how many lines fit
    const numLayers = Math.floor(rollWidth / (stringWidth * 2)); // 2 = line width + gap

    // Clear previous layers
    const previousLayers = this.renderRoot.querySelectorAll(".nv-string-layer");
    previousLayers.forEach((layer) => layer.remove());

    // Add new layers
    for (let i = 0; i < numLayers; i++) {
      const layer = document.createElement("div");
      layer.classList.add("nv-string-layer");

      // Calculate left position = (index + 1) * (width*2) - width
      const leftPosition = (i + 1) * (stringWidth * 2) - stringWidth;
      layer.style.left = `${leftPosition}px`;

      stringRoll.appendChild(layer);
    }
  }
}
