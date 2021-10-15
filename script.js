const levelCount = document.getElementById("level-el")
const num1 = document.getElementById("num1-el")
const num2 = document.getElementById("num2-el")
const numgoal = document.getElementById("numgoal-el")
const message = document.getElementById("message")
const timerElement = document.getElementById("timer")
const errorElement = document.getElementById("error-el")
const themeSong = document.getElementById("myAudio")
const victorySong = new Audio('victory.mp3')

const timeLeft = document.getElementById("countdown")

themeSong.muted = false

const val1 = [1, 1, 6, 4, 5, 10, 8]
const val2 = [1, 2, 3, 8, 3, 5, 4]
const target = [2, 2, 2, 12, 15, 5, 2]

let level = 0
let currentCount = 0
let currentVal1 = val1[level]
let currentVal2 = val2[level]
let currentTarget = target[level]
let isGame1Won = false
let errorCount = 0

// Gameplay

function start() {
    document.getElementById("game").style.visibility = "visible"
    document.getElementById("start-btn").style.display = "none";
    display()
}

function display() {
    levelCount.innerText = level
    num1.innerText = currentVal1
    num2.innerText = currentVal2
    numgoal.innerText = currentTarget
}

function check() {
    if (currentCount == currentTarget) {
        message.innerText = "Bravo ! Niveau suivant"
        nextLevel()
    } else {
        message.innerText = "Faux, ça fait " + currentCount + " ! Recommence"
        errorCount++
        errorElement.textContent = errorCount
    }
    if (errorCount >= 2) {
        gameLost()
    }
}


function add() {
    currentCount = currentVal1 + currentVal2
    console.log("Résultat: " + currentCount)
    check()
}

function substract() {
    currentCount = currentVal1 - currentVal2
    check()
}

function multiply() {
    currentCount = currentVal1 * currentVal2
    check()
}

function divide() {
    currentCount = currentVal1 / currentVal2
    check()
}

function nextLevel() {
    if (level < target.length - 1) {
        level++
        currentVal1 = val1[level]
        currentVal2 = val2[level]
        currentTarget = target[level]
        display()
        timer()
    } else {
        gameWon()
    }
}

// Win/Lose conditions

function gameWon() {
    isGame1Won = true
    message.innerText = "ET C'EST UNE VICTOIRE TRIOMPHALE !!! 🤯"
    document.getElementById("action-panel").style.display = "none"
    document.getElementById("nextworld-btn").style.display = "inline"
    victorySong.play();
}

function gameLost() {
    message.innerText = "Et c'est une défaite cuisante 💩👎"
    document.getElementById("action-panel").style.display = "none"
    document.getElementById("retry-btn").style.display = "inline";
}

function retry() {
    location.reload()
}

// Timer

function timer() {

    var seconds = document.getElementById("countdown").textContent;
    var countdown = setInterval(function () {
        seconds--;
        document.getElementById("countdown").textContent = seconds;
        if (seconds <= 0) timerOver()
        //if (isGame1Won = true) break
        //clearInterval(countdown);
    }, 1000);
}

function timerOver() {
    if (isGame1Won == true) {
        return
    } else {
        gameLost()
    }
}

// Musique

function enableMusic() {
    themeSong.muted = false
}

function disableMusic() {
    themeSong.muted = true
}