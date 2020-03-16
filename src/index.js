"use strict";

const log = require("./log");

module.exports = {
  Gpio: require("./Gpio"),
  initialize() {
    log(`[GPIO / package] Initializing...`);
  },
  terminate() {
    log(`[GPIO / package] Terminating...`);
  }
};
