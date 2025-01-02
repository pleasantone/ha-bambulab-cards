import { customElement, state } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";

import { registerCustomCard } from "../../utils/custom-cards";
import {getContrastingTextColor} from "../../utils/helpers"
import AMSImage from "../../images/ams.png";
import Humidity1 from "../../images/hum_level1_light.svg";
import Humidity2 from "../../images/hum_level2_light.svg";
import Humidity3 from "../../images/hum_level3_light.svg";
import Humidity4 from "../../images/hum_level4_light.svg";
import Humidity5 from "../../images/hum_level5_light.svg";
import { AMS_CARD_EDITOR_NAME, AMS_CARD_NAME } from "./const";
import styles from "./card.styles";

registerCustomCard({
  type: AMS_CARD_NAME,
  name: "Bambu Lab AMS Card",
  description: "Card for AMS entity",
});

interface Sensor {
  entity_id: string;
  device_id: string;
  labels: any[];
  translation_key: string;
  platform: string;
  name: string;
}

interface Result {
  humidity: Sensor | null;
  temperature: Sensor | null;
  spools: Sensor[];
}

@customElement(AMS_CARD_NAME)
export class AMS_CARD extends LitElement {
  // private property
  @state() private _hass?;
  @state() private _header;
  @state() private _entity;
  @state() private _deviceId: any;
  @state() private _entities: any;
  @state() private _states;
  @state() private _style;

  static styles = styles;

  static get properties() {
    return {
      _header: { state: true },
      _entities: { state: true },
      _deviceId: { state: true },
      _states: { state: true },
      _style: { state: true },
    };
  }

  setConfig(config) {
    this._header = config.header === "" ? nothing : config.header;
    this._entities = config._entities;
    this._deviceId = config.ams;
    this._style = config.style;

    if (!config.ams) {
      throw new Error("You need to select an AMS");
    }

    if (this._hass) {
      this.hass = this._hass;
    }
  }

  set hass(hass) {
    this._hass = hass;
    this._states = hass.states;

    const result: Result = {
      humidity: null,
      temperature: null,
      spools: [],
    };

    // Loop through all hass entities, and find those that belong to the selected device
    for (let key in this._hass.entities) {
      const value = this._hass.entities[key];
      console.log("Entity Value: ", value)
      // Check if it's the humidity sensor
      if (
        value.device_id === this._deviceId &&
        value.translation_key === "humidity_index"
      ) {
        result.humidity = value;
      }

      // Check if it's the temperature sensor
      if (
        value.device_id === this._deviceId &&
        value.translation_key === "ams_temp"
      ) {
        result.temperature = value;
      }

      // Check if it's a spool (tray) sensor
      if (
        value.device_id === this._deviceId &&
        value.translation_key.includes("tray")
      ) {
        result.spools.push(value);
      }
    }

    this._entities = result;
  }

  render() {
    // Return image for humidity state
    const humidity = (state) => {
      if (state === "1") return Humidity1;
      if (state === "2") return Humidity2;
      if (state === "3") return Humidity3;
      if (state === "4") return Humidity4;
      return Humidity5;
    };


    if(this._style == "graphic") {
      return html`
      <ha-card header="${this._header}">
        <div class="ams-container graphic">
          <img src=${AMSImage} style="display:block;" id="image" />
          ${this._entities.spools.map(
          (spool, index) => html`
              <span
                class="spool-badge slot-${index + 1}"
                style="border: ${this._states[spool.entity_id]?.attributes
              .active
              ? `1px solid ${this._states[spool.entity_id]?.attributes.color}`
              : `1px solid rgba(0, 0, 0, 0)`}"
              >
                <ha-icon
                  icon=${this._states[spool.entity_id]?.state !== "Empty"
              ? "mdi:printer-3d-nozzle"
              : "mdi:tray"}
                  style="color: ${this._states[spool.entity_id]?.attributes
              .color};"
                >
                </ha-icon>
              </span>
            `
      )}
          ${this._entities.spools.map(
          (spool, index) => html`
              <span
                class="spool-type slot-${index + 1}"
                style="border: ${this._states[spool.entity_id]?.attributes
              .active
              ? `1px solid ${this._states[spool.entity_id]?.attributes.color}`
              : `1px solid rgba(0, 0, 0, 0)`};"
                >${this._states[spool.entity_id]?.attributes.type}</span
              >
            `
      )}
          <img
            src=${humidity(this._states[this._entities.humidity.entity_id])}
            class="humidity"
          />
          <span class="ams-temperature"
            >${this._states[this._entities.temperature.entity_id]?.state}
            ${this._states[this._entities.temperature.entity_id]?.attributes
          .unit_of_measurement}</span
          >
        </div>
      </ha-card>
    `;
    } else {
      return html`
        <ha-card header="${this._header}">
          <div class="ams-container vector">
            <div class="spools">
              ${this._entities.spools.map(
                  (spool, index) => html`
                    <div class="spool" style="${this._states[spool.entity_id]?.attributes
                      .active ? `outline: 2px solid ${this._states[spool.entity_id]?.attributes
                        .color}; outline-offset: 2px;` : ``}">
                      <div class="overlay"  style="background-color: ${this._states[spool.entity_id]?.attributes
                          .color}; height: ${this._states[spool.entity_id]?.attributes.remain}%; color: ${getContrastingTextColor(this._states[spool.entity_id]?.attributes.color)}">
                        ${this._states[spool.entity_id]?.attributes.type}
                        </div>
                    </div>
                    `
              )}
            </div>
          </div>
        </ha-card>
      `
    }
  }

  public static async getConfigElement() {
    await import("./ams-card-editor");
    return document.createElement(AMS_CARD_EDITOR_NAME);
  }

  static getStubConfig() {
    return {
      entity: "",
      header: "AMS Header",
      style: "graphic"
    };
  }
}
