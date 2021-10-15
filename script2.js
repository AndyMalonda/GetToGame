const levelCount = document.getElementById("level-el")
const num1 = document.getElementById("num1-el")
const answer1 = document.getElementById("choice1-btn")
const answer2 = document.getElementById("choice2-btn")
const answer3 = document.getElementById("choice3-btn")
const answer4 = document.getElementById("choice4-btn")
const numgoal = document.getElementById("numgoal-el")
const message = document.getElementById("message")
const timerElement = document.getElementById("timer")
const errorElement = document.getElementById("error-el")
const themeSong = document.getElementById("myAudio")
const victorySong = new Audio('victory.mp3')

const timeLeft = document.getElementById("countdown")

themeSong.muted = false

const val1 = [1, 3, 9, 44, 25, 12, 17]
const choice1 = [1, 8, 8, 26, 23, 49, 22]
const choice2 = [2, 6, 11, 24, 22, 47, 23]
const choice3 = [3, 7, 7, 27, 21, 45, 24]
const choice4 = [4, 5, 9, 28, 19, 39, 27]
const target = [2, 9, 17, 72, 47, 61, 44]

let level = 0
let currentCount = 0
let currentVal1 = val1[level]
let choice1Val = choice1[level]
let choice2Val = choice2[level]
let choice3Val = choice3[level]
let choice4Val = choice4[level]
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
    answer1.innerText = choice1Val
    answer2.innerText = choice2Val
    answer3.innerText = choice3Val
    answer4.innerText = choice4Val
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


function add1() {
    currentCount = currentVal1 + choice1Val
    console.log("Résultat: " + currentCount)
    check()
}

function add2() {
    currentCount = currentVal1 + choice2Val
    console.log("Résultat: " + currentCount)
    check()
}

function add3() {
    currentCount = currentVal1 + choice3Val
    console.log("Résultat: " + currentCount)
    check()
}

function add4() {
    currentCount = currentVal1 + choice4Val
    console.log("Résultat: " + currentCount)
    check()
}

function nextLevel() {
    if (level < target.length - 1) {
        level++
        currentVal1 = val1[level]
        choice1Val = choice1[level]
        choice2Val = choice2[level]
        choice3Val = choice3[level]
        choice4Val = choice4[level]
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