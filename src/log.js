"use strict";

function log(message) {
	if (!process.env.PIGPIO_NO_LOGGING) {
		console.log(message);
	}
}

module.exports = log;