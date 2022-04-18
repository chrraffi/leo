input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    while (true) {
        left_Sensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
        right_Sensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
        sensor_difference = Math.abs(left_Sensor - right_Sensor)
        if (sensor_difference > 10) {
            if (left_Sensor > right_Sensor) {
                Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
                Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 1)
            } else {
                Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
                Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 1)
            }
        } else {
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 3)
        }
    }
})
input.onSound(DetectedSound.Loud, function () {
    if (fahre_ich == 0) {
        Kitronik_Move_Motor.soundSiren(Kitronik_Move_Motor.OnOffSelection.Off)
        fahre_ich = 1
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 40)
        basic.showNumber(fahre_ich)
        moveMotorZIP.showRainbow(1, 360)
    } else {
        fahre_ich = 0
        moveMotorZIP.clear()
        Kitronik_Move_Motor.stop()
        Kitronik_Move_Motor.soundSiren(Kitronik_Move_Motor.OnOffSelection.On)
        basic.showNumber(fahre_ich)
    }
})
input.onButtonPressed(Button.A, function () {
    Kitronik_Move_Motor.stop()
})
input.onButtonPressed(Button.B, function () {
    Claw_Angel += 10
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, Claw_Angel)
})
let sensor_difference = 0
let right_Sensor = 0
let left_Sensor = 0
let Claw_Angel = 0
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
let fahre_ich = 0
for (let index = 0; index < 3; index++) {
    Kitronik_Move_Motor.beepHorn()
    basic.pause(500)
}
fahre_ich = 0
basic.showNumber(fahre_ich)
input.setSoundThreshold(SoundThreshold.Loud, 140)
Kitronik_Move_Motor.setUltrasonicUnits(Kitronik_Move_Motor.Units.Centimeters)
moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
Claw_Angel = 40
Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, Claw_Angel)
basic.forever(function () {
    if (Kitronik_Move_Motor.measure() < 20) {
        if (Kitronik_Move_Motor.measure() > 0) {
            fahre_ich = 0
            moveMotorZIP.clear()
            Kitronik_Move_Motor.stop()
            basic.showNumber(Kitronik_Move_Motor.measure())
        }
    }
})
