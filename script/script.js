/* querySelector const */
const qs = (val) => {
    return document.querySelector(val)
}

let score = 0;
let click = 0;

function updateScore(click) {
    score += click;
    qs("#score").innerHTML = score;
    qs("title").innerHTML = score + " sonhos | yumeclick"
}

function storageScore() {
    const sonhos = localStorage.getItem("score") || 0;
    const efeitos = JSON.parse(localStorage.getItem("efeitos")) || [];

    const storage = {
        "sonhos": sonhos,
        "efeitos": efeitos
    }

    return storage;
}