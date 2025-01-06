# 🐼 Bambu Lab Cards

[![hacs][hacs-badge]][hacs-url]
[![release][release-badge]][release-url]
![downloads][downloads-badge]
![build][build-badge]
[![translations][translations-badge]][weblate-url]

The Bambu Lab Cards, are a set of pre-made collection of cards for Home Assistant.  Designed to work with the Bambu Lan Home Assistant Integration

They are currently a work in progress

## Installation

To Do

## Usage

All the cards can be configured using Dashboard UI editor.

1. In Dashboard UI, click 3 dots in top right corner.
2. Click _Edit Dashboard_.
3. Click Plus button to add a new card.
4. Find one of the _Custom: Bambu_ card in the list.

### Cards

- [AMS Card](doc/cards/amd-card.md)

### Development

1. Clone this repo
2. Setup a local instance of Home Assistant, I prefer to use Docker for this
3. Install the [Bambu Lab Integration](https://github.com/greghesp/ha-bambulab)
4. Setup a docker-compose.yml file with the correct volume binds. My file as an example:
```yml 
version: "3.3"
services:
  hass:
    image: homeassistant/home-assistant:beta
    container_name: homeassistant
    restart: unless-stopped # To reboot the container when the host comes back up from restarts.
    ports:
      - 8123:8123
    volumes:
      - type: bind
        source: ../custom/ha-bambulab-cards/dist
        target: /config/www/community/ha-bambulab-cards
      - ./hass_dev:/config
```
