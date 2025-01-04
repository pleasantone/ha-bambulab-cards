import { customElement, property } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";
import styles from "./spool.styles";

@customElement("bl-spool")
export class Spool extends LitElement {
  @property({ type: Boolean }) public active: boolean = false;
  @property({ type: String }) public color;
  @property({ type: String }) public tag_uid;
  @property({ type: Number }) public remaining;
  @property({ type: Number }) private maxSpoolHeight: number = 0;
  @property({ type: Number }) private minSpoolHeight: number = 0;
  @property({ type: Number }) private remainHeight: number = 0;
  @property({ type: Number }) private resizeObserver: null;

  static styles = styles;

  connectedCallback() {
    super.connectedCallback();
    // Start observing the parent element for size changes

    this.resizeObserver = new ResizeObserver(() => {
      this.calculateHeights();
      this.updateLayers();
    });
    const parent = this.parentElement || this.getRootNode().host;
    if (parent) {
      this.resizeObserver.observe(parent);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Stop observing when the component is removed
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  firstUpdated() {
    this.updateLayers();
  }

  render() {
    return html`
      <div class="nv-spool-container">
        <div class="nv-spool"></div>
        <div class="string-roll-container">
          <div
            class="nv-string-roll"
            id="nv-string-roll"
            style="background: ${this.color}; height: ${this.remainHeight.toFixed(2)}%"
          >
            ${this.active ? html`<div class="nv-reflection"></div>` : nothing}
          </div>
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

  calculateHeights() {
    function isAllZeros(str) {
      return /^0+$/.test(str);
    }

    if(isAllZeros(this.tag_uid)) {
      this.remainHeight = 95;
    } else {
      // Get the container's height
      const container = this.renderRoot.querySelector(".string-roll-container");
      const containerHeight = container.offsetHeight || 0;

      // Calculate max spool height (95% of container height)
      this.maxSpoolHeight = containerHeight * 0.95;

      // Calculate min spool height (12% of max spool height)
      this.minSpoolHeight = this.maxSpoolHeight * 0.12;

      // Calculate remain height based on the remain percentage
      const remainPercentage = Math.min(Math.max(this.remaining, 0), 100); // Clamp remain to [0, 100]
      this.remainHeight =
          this.minSpoolHeight +
          (this.maxSpoolHeight - this.minSpoolHeight) * (remainPercentage / 100);

      // Ensure remainHeight is within bounds
      this.remainHeight = Math.min(this.remainHeight, this.maxSpoolHeight);
      this.requestUpdate();
    }
  }
}
