radio.onReceivedNumber(function (receivedNumber) {
    Fernbedienung = receivedNumber
    I2C_LCD1602.clear()
    I2C_LCD1602.ShowString("Alarm-Anlage", 0, 0)
    basic.pause(2000)
    I2C_LCD1602.clear()
    if (receivedNumber == 0) {
        I2C_LCD1602.ShowString("Aus", 5, 0)
    } else if (receivedNumber == 1) {
        I2C_LCD1602.ShowString("Ein", 5, 0)
    }
    basic.pause(2000)
})
function AlarmAusgelöst () {
    strip.showColor(neopixel.colors(NeoPixelColors.Red))
    strip2.showColor(neopixel.colors(NeoPixelColors.Red))
    I2C_LCD1602.clear()
    I2C_LCD1602.ShowString("Alarm-ausgeloest", 0, 0)
    while (pins.digitalReadPin(DigitalPin.P16) == 1 && Fernbedienung == 1) {
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        basic.pause(500)
    }
}
let strip2: neopixel.Strip = null
let strip: neopixel.Strip = null
let Fernbedienung = 0
basic.showLeds(`
    . . # . .
    . # . # .
    # # # # #
    # . # . #
    # . # # #
    `)
radio.setGroup(1)
I2C_LCD1602.LcdInit(39)
Fernbedienung = 0
strip = neopixel.create(DigitalPin.P13, 24, NeoPixelMode.RGB)
strip2 = neopixel.create(DigitalPin.P14, 4, NeoPixelMode.RGB)
strip.showColor(neopixel.colors(NeoPixelColors.White))
strip2.showColor(neopixel.colors(NeoPixelColors.White))
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P16) == 1 && Fernbedienung == 1) {
        AlarmAusgelöst()
        strip.showColor(neopixel.colors(NeoPixelColors.Green))
        strip2.showColor(neopixel.colors(NeoPixelColors.Green))
    } else {
        I2C_LCD1602.clear()
    }
})
