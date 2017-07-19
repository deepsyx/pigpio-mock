"use strict";

// process.env.PIGPIO_NO_LOGGING = true;

const Gpio = require("pigpio-mock").Gpio;
const led = new Gpio(13, { mode: Gpio.OUTPUT });
let dutyCycle = 0;

setInterval(function() {
	led.pwmWrite(dutyCycle);

	dutyCycle += 50;
	if (dutyCycle > 255) {
		dutyCycle = 0;
	}
}, 500);
