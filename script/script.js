let score = 0;

function addToScore(amount) {
    score = score + amount;
    document.getElementById("score").innerHTML = score;
}