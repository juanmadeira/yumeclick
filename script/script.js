/* querySelector const */
const qs = (val) => {
    return document.querySelector(val)
}

/* declaração de variáveis */
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
}, 1000);