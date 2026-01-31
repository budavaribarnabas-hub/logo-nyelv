/**
 * ====== "RAM" VÁSZON A RAJZHOZ (5x5) ======
 */
// ====== FORDULÁSOK ======
function turnLeft () {
    direction += -1
    if (direction < 0) {
        direction = 3
    }
}
// ====== GOMB VEZÉRLÉS ======
// A = előre lép
input.onButtonPressed(Button.A, function () {
    forward()
})
// Rázás = jobbra fordul
input.onGesture(Gesture.Shake, function () {
    turnRight()
    render()
})
function turnRight () {
    direction += 1
    if (direction > 3) {
        direction = 0
    }
}
// A+B = balra fordul
input.onButtonPressed(Button.AB, function () {
    turnLeft()
    render()
})
// B = toll le / fel (rajzolás BE/KI)
input.onButtonPressed(Button.B, function () {
    penDown = !(penDown)
    music.playTone(penDown ? 784 : 262, 100)
})
// ====== ELŐRE LÉPÉS ======
function forward () {
    if (direction == 0 && turtleY > 0) {
        turtleY += -1
    } else if (direction == 1 && turtleX < 4) {
        turtleX += 1
    } else if (direction == 2 && turtleY < 4) {
        turtleY += 1
    } else if (direction == 3 && turtleX > 0) {
        turtleX += -1
    }
    if (penDown) {
        canvas[turtleY][turtleX] = 1
    }
    render()
}
// ====== SOROS PORTOS LOGO PARANCSOK ======
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    cmd = serial.readLine()
    if (cmd == "FD") {
        forward()
    } else if (cmd == "LT") {
        turnLeft()
        render()
    } else if (cmd == "RT") {
        turnRight()
        render()
    } else if (cmd == "PU") {
        penDown = false
    } else if (cmd == "PD") {
        penDown = true
    }
})
// ====== KÉPERNYŐ FRISSÍTÉS ======
function render () {
    basic.clearScreen()
    // Régi rajz kirajzolása halványan
    for (let y2 = 0; y2 <= 4; y2++) {
        for (let x2 = 0; x2 <= 4; x2++) {
            if (canvas[y2][x2] == 1) {
                led.plotBrightness(x2, y2, 40)
            }
        }
    }
    // Teknőc aktuális pozíciója erősen világít
    led.plotBrightness(turtleX, turtleY, 255)
}
let cmd = ""
let direction = 0
let canvas: number[][] = []
let turtleY = 0
let turtleX = 0
// 0=fel, 1=jobb, 2=le, 3=bal
let penDown = false
// ====== TEKNŐC ÁLLAPOT ======
turtleX = 2
turtleY = 2
for (let y = 0; y <= 4; y++) {
    canvas[y] = []
    for (let x = 0; x <= 4; x++) {
        canvas[y][x] = 0
    }
}
// ====== INDÍTÁS ======
// ====== INDÍTÁS ======
canvas[turtleY][turtleX] = 1
render()
basic.forever(function () {
	
})
