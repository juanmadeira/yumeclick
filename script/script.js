/* querySelector const */
const qs = (val) => {
    return document.querySelector(val)
}

/* declaração de variáveis */
let score = 0;
let cps = 0;

/* eventos */
qs("#buy-frog").addEventListener("click", function() {
    if (score >= 5) {
        score -= 5;
        cps += 1;
        qs("#score").innerHTML = score;
        qs("title").innerHTML = score + " sonhos | yumeclick";
    }
    else {
        
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