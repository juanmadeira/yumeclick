/* querySelector const */
const qs = (val) => {
    return document.querySelector(val)
}

/* declaração de variáveis */
let mute = 0;
let score = 0;
let cps = 0;

/* sons */
const buySound = new Audio("./sound/buy-sound.wav");
const errorSound = new Audio("./sound/error-sound.wav");
buySound.volume = 0.2;
errorSound.volume = 0.2;

/* eventos */
qs("#buy-frog").addEventListener("click", function() {
    if (score >= 5) {
        score -= 5;
        cps += 1;
        buySound.play();
        qs("#score").innerHTML = score;
        qs("title").innerHTML = score + " sonhos | yumeclick";
    }
    else {
        errorSound.play();
    }
});

/* funções */
function muteSounds() {
    if (mute == 0) {
        qs(".audioconfig").src = "./img/audio-off.svg";
        mute = 1;
        buySound.volume = 0;
        errorSound.volume = 0;
    }
    else {
        qs(".audioconfig").src = "./img/audio-on.svg";
        mute = 0;
        buySound.volume = 0.2;
        errorSound.volume = 0.2;
    }
}

function updateScore(i) {
    score += i;
    qs("#score").innerHTML = score;
    qs("title").innerHTML = score + " sonhos | yumeclick";
}

function autoClicker() {
    score += cps;
}

/* loop */
window.setInterval(function() {
    autoClicker();
    qs("#score").innerHTML = score;
    qs("title").innerHTML = score + " sonhos | yumeclick";
}, 1000); // atualiza o jogo a cada 1s