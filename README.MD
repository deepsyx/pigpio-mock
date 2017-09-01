# Pigpio-mock

*Article: https://viktorkirilov.me/post/mocking-raspberry-gpios/*

A mock library used for raspberry pi development on your local machine. It copies all method from https://github.com/fivdi/pigpio and logs information to the console, instead of controlling the Raspberry's GPIO pins.

[![Build Status](https://travis-ci.org/deepsyx/pigpio-mock.svg?branch=master)](https://travis-ci.org/deepsyx/pigpio-mock) [![Coverage Status](https://coveralls.io/repos/github/deepsyx/pigpio-mock/badge.svg?branch=master)](https://coveralls.io/github/deepsyx/pigpio-mock?branch=master)

# Example
You can also check `examples` folder.

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
    
should output:

    [GPIO 13 / constructor] Initializing...
    [GPIO 13 / constructor] Setting mode = 1
    [GPIO 13 / pwmWrite-analogWrite] Setting dutyCycle = 0
    [GPIO 13 / pwmWrite-analogWrite] Setting dutyCycle = 50
    [GPIO 13 / pwmWrite-analogWrite] Setting dutyCycle = 100
    [GPIO 13 / pwmWrite-analogWrite] Setting dutyCycle = 150
    [GPIO 13 / pwmWrite-analogWrite] Setting dutyCycle = 200
    [GPIO 13 / pwmWrite-analogWrite] Setting dutyCycle = 250

# Installation
It is as simple as:

    yarn add pigpio-mock
    
and you can use it in your code as:

    const pigpio = process.env.NODE_ENV !== "production" ? 
        require("pigpio-mock") : 
        require("pigpio");
    
# Implemented classes:
- [x] Gpio
- [ ] GpioBank
- [ ] Notifier

# Contribution
All kind of contribution will be greatly appreciated. 

#### Pull requests
* We're using https://github.com/enhancv/prettier for automatic code formating
* Please provide tests. We're aiming for 100% code coverage

#### Running tests

    yarn test
