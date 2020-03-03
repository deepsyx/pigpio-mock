const assert = require("assert");

process.env.PIGPIO_NO_LOGGING = true;

const Gpio = require("../src/Gpio");

describe("Gpio", function() {
  it("should have all required constants", function() {
    const requiredConstants = [
      "INPUT",
      "OUTPUT",
      "ALT0",
      "ALT1",
      "ALT2",
      "ALT3",
      "ALT4",
      "ALT5",
      "PUD_OFF",
      "PUD_DOWN",
      "PUD_UP",
      "RISING_EDGE",
      "FALLING_EDGE",
      "EITHER_EDGE",
      "TIMEOUT",
      "MIN_GPIO",
      "MAX_GPIO",
      "MAX_USER_GPIO"
    ];

    requiredConstants.forEach(constant => {
      assert.equal(
        constant in Gpio,
        true,
        `Missing constant "${constant}" in Gpio class.`
      );
    });
  });

  it("should be able to set and get mode", function() {
    const pin = new Gpio(13);
    pin.mode(Gpio.OUTPUT);
    assert.equal(pin.getMode(), Gpio.OUTPUT);

    const secondPin = new Gpio(12, { mode: Gpio.OUTPUT });
    assert.equal(pin.getMode(), Gpio.OUTPUT);
  });

  it("should be able to digitalWrite and digitalRead", function() {
    const pin = new Gpio(13);

    pin.digitalWrite(0);
    assert.equal(pin.digitalRead(), 0);

    pin.digitalWrite(1);
    assert.equal(pin.digitalRead(), 1);
  });

  it("should be able to pwmWrite and pwmRead", function() {
    const pin = new Gpio(13);
    pin.pwmWrite(244);
    assert.equal(pin.getPwmDutyCycle(), 244);
  });

  it("should be able to set pwm frequency", function() {
    const pin = new Gpio(13);
    pin.pwmFrequency(1024);
    assert(pin.getPwmFrequency(), 1024);
  });

  it("should be able to servoWrite and getServoPulseWidth", function() {
    const pin = new Gpio(13);
    pin.servoWrite(1200);
    assert.equal(pin.getServoPulseWidth(), 1200);
    pin.servoWrite(0);
    assert.equal(pin.getServoPulseWidth(), 500);
    pin.servoWrite(3000);
    assert.equal(pin.getServoPulseWidth(), 2500);
  });

  it("should be able to call on", function() {
    const pin = new Gpio(13);
    pin.on("event", () => {});
  });

  it("should be able to call on", function() {
    const pin = new Gpio(13);
    pin.removeAllListeners();
  });
});
