'use strict'

const log = require('./log')

const EventEmitter = require('events')

class Gpio extends EventEmitter {
  constructor(pin, options) {
    super()
    this.gpio = pin
    options = options || {}

    this.digitalValue = 0
    this.pwmValue = 0
    this.frequency = 31
    this._pwmRange = 0
    this.servoPulseWidth = Gpio.MED_SERVO_PULSE_WIDTH

    log(`[GPIO ${this.gpio} / constructor] Initializing...`)

    if (typeof options.mode === 'number') {
      this.mode = options.mode
      log(`[GPIO ${this.gpio} / constructor] Setting mode = ${options.mode}`)
    }

    if (typeof options.pullUpDown === 'number') {
      this.pullUpDown = options.pullUpDown
      log(`[GPIO ${this.gpio} / constructor] Setting pullUpDown = ${options.pullUpDown}`)
    }

    if (typeof options.edge === 'number') {
      this.edge = options.edge
      log(`[GPIO ${this.gpio} / constructor] Setting edge = ${options.edge}`)
    }

    if (typeof options.alert === 'boolean' && options.alert) {
      this.alert = options.alert
      log(`[GPIO ${this.gpio} / constructor] Setting alert = ${options.alert}`)
    }
  }

  mode(mode) {
    log(`[GPIO ${this.gpio} / mode] Setting mode = ${mode}`)
    this.mode = mode
    return this
  }

  getMode() {
    log(`[GPIO ${this.gpio} / getMode] Getting mode = ${this.mode}`)
    return this.mode
  }

  pullUpDown(pud) {
    log(`[GPIO ${this.gpio} / pullUpDown] Setting pullUpDown = ${pud}`)
    this.pullUpDown = pud
    return this
  }

  digitalRead() {
    log(`[GPIO ${this.gpio} / digitalRead] Getting digitalValue = ${this.digitalValue}`)
    return this.digitalValue
  }

  digitalWrite(level) {
    log(`[GPIO ${this.gpio} / digitalWrite] Setting value = ${level}`)
    this.digitalValue = level
    return this
  }

  trigger(pulseLen, level) {
    log('`[GPIO ${this.gpio} / trigger] Triggering, pulseLen: ${pulseLen}, level: ${level}')
    return this
  }

  pwmWrite(dutyCycle) {
    log(`[GPIO ${this.gpio} / pwmWrite-analogWrite] Setting dutyCycle = ${dutyCycle}`)
    this.pwmValue = dutyCycle
    return this
  }

  //analogWrite = pwmWrite;

  hardwarePwmWrite(frequency, dutyCycle) {
    log(
      `[GPIO ${this
        .gpio} / hardwarePwmWrite] Setting dutyCycle = ${dutyCycle}, frequency = ${frequency}`
    )
    this.pwmValue = dutyCycle
    this.frequency = frequency
    return this
  }

  getPwmDutyCycle() {
    log(`[GPIO ${this.gpio} / getPwmDutyCycle] Getting dutyCycle = ${this.pwmValue}`)
    return this.pwmValue
  }

  pwmRange(range) {
    log(`[GPIO ${this.gpio} / pwmRange] Setting pwmRange = ${range}`)
    this._pwmRange = range
    return this
  }

  getPwmRange() {
    log(`[GPIO ${this.gpio} / getPwmRange] Getting pwmRange = ${this._pwmRange}`)
    return this._pwmRange
  }

  getPwmRealRange() {
    log(`[GPIO ${this.gpio} / getRealPwmRange] Getting pwmRange = ${this._pwmRange}`)
    return this
  }

  pwmFrequency(frequency) {
    log(`[GPIO ${this.gpio} / pwmFrequency] Setting frequency = ${this.frequency}`)
    this.frequency = frequency
    return this
  }

  getPwmFrequency() {
    log(`[GPIO ${this.gpio} / getPwmFrequency] Getting frequency = ${this.frequency}`)
    return this.frequency
  }

  servoWrite(pulseWidth) {
    this.servoPulseWidth = Math.min(Math.max(parseInt(pulseWidth), Gpio.MIN_SERVO_PULSE_WIDTH), Gpio.MAX_SERVO_PULSE_WIDTH)
    log(`[GPIO ${this.gpio} / servoWrite] Setting pulseWidth = ${this.servoPulseWidth}`)
    return this
  }

  getServoPulseWidth() {
    log(`[GPIO ${this.gpio} / getServoPulseWidth] Getting pulseWidth = ${this.servoPulseWidth}`)
    return this.servoPulseWidth
  }
}

Gpio.INPUT = 0 // PI_INPUT
Gpio.OUTPUT = 1 //PI_OUTPUT;
Gpio.ALT0 = 4 // PI_ALT0;
Gpio.ALT1 = 5 // PI_ALT1;
Gpio.ALT2 = 6 // PI_ALT2;
Gpio.ALT3 = 7 // PI_ALT3;
Gpio.ALT4 = 3 // PI_ALT4;
Gpio.ALT5 = 2 // PI_ALT5;

/* pud */
Gpio.PUD_OFF = 0 // PI_PUD_OFF;
Gpio.PUD_DOWN = 1 // PI_PUD_DOWN;
Gpio.PUD_UP = 2 // PI_PUD_UP;

/* isr */
Gpio.RISING_EDGE = 0 // RISING_EDGE;
Gpio.FALLING_EDGE = 1 // FALLING_EDGE;
Gpio.EITHER_EDGE = 2 // EITHER_EDGE;

/* timeout */
Gpio.TIMEOUT = 2 // PI_TIMEOUT;

/* gpio numbers */
Gpio.MIN_GPIO = 0 // PI_MIN_GPIO;
Gpio.MAX_GPIO = 53 // PI_MAX_GPIO;
Gpio.MAX_USER_GPIO = 31 // PI_MAX_USER_GPIO;

/* gpio servo pulseWidth */
Gpio.MIN_SERVO_PULSE_WIDTH = 500 // most anti-clockwise position
Gpio.MED_SERVO_PULSE_WIDTH = 1500 // center position
Gpio.MAX_SERVO_PULSE_WIDTH = 2500 // most clockwise position

module.exports = Gpio
