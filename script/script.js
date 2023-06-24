/* querySelector const */
const qs = (val) => {
    return document.querySelector(val)
}

/* declaração de variáveis */
let mute = 0;
let score = 0;
let cps = 0;

let costFrog = 10;
let costUmbrella = 150;

let boughtFrog = 0;
let boughtUmbrella = 0;

/* sons */
const clickSound = new Audio("./sound/click.wav");
const desmuteSound = new Audio("./sound/desmute.wav");
const buySound = new Audio("./sound/buy.wav");
const errorSound = new Audio("./sound/error.wav");
const effectSound = new Audio("./sound/use-effect.wav");
clickSound.volume = 0.2;
buySound.volume = 0.2;
errorSound.volume = 0.2;
effectSound.volume = 0.2;
desmuteSound.volume = 0.2;

/* esconder efeitos */
let efeitos = ["frog", "umbrella"];
for (let i = 0; i < efeitos.length; i++) {
    qs(`.efeito-${efeitos[i]}`).style.display = "none";
}

/* comprar efeitos */
// frog effect
qs("#buy-frog").addEventListener("click", function() {
    if (score >= costFrog) {
        buySound.play();
        score -= costFrog;
        cps += 1;
        boughtFrog += 1;
        costFrog = Math.ceil(costFrog * 1.25);
        qs("#score").innerHTML = score;
        qs("#cps").innerHTML = cps;
        qs("#frog-cost").innerHTML = costFrog;
        qs("title").innerHTML = score + " sonhos | yumeclick";

        // ativar efeito automaticamente na primeira compra
        if (boughtFrog === 1) {
            useEffect('frog');
            qs(".efeito-umbrella").style.display = "";
        }
    }
    else {
        errorSound.play();
    }
});

// umbrella effect
qs("#buy-umbrella").addEventListener("click", function() {
    if (score >= costUmbrella) {
        buySound.play();
        score -= costUmbrella;
        cps += 10;
        boughtUmbrella += 1;
        costUmbrella = Math.ceil(costUmbrella * 1.5);
        qs("#score").innerHTML = score;
        qs("#cps").innerHTML = cps;
        qs("#umbrella-cost").innerHTML = costUmbrella;
        qs("title").innerHTML = score + " sonhos | yumeclick";

        // ativar efeito automaticamente na primeira compra e exibir o próximo
        if (boughtUmbrella === 1) {
            useEffect('umbrella');
        }
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
        clickSound.volume = 0;
        buySound.volume = 0;
        errorSound.volume = 0;
        effectSound.volume = 0;
        desmuteSound.volume = 0;
    }
    else {
        qs(".audioconfig").src = "./img/audio-on.svg";
        mute = 0;
        desmuteSound.play();
        clickSound.volume = 0.2;
        buySound.volume = 0.2;
        errorSound.volume = 0.2;
        effectSound.volume = 0.2;
        desmuteSound.volume = 0.2;
    }
}

function updateScore(i) {
    score += i;
    clickSound.play();
    qs("#score").innerHTML = score;
    qs("title").innerHTML = score + " sonhos | yumeclick";

    if (score >= 5) {
        qs(".efeito-frog").style.display = "";
    }
}

function autoClicker() {
    score += cps;
}

function useEffect(effect) {
    if (effect === "frog") {
        if (boughtFrog >= 1) {
            if (qs("#frog-title").style.color == "rgb(255, 255, 255)") {
                enableEffect();
            }
            else {
                disableEffect();
            }
        }
    }
    else if (effect === "umbrella") {
        if (boughtUmbrella >= 1) {
            if (qs("#umbrella-title").style.color == "rgb(255, 255, 255)") {
                enableEffect();
            }
            else {
                disableEffect();
            }
        }
    }

    function enableEffect() {
        if (qs(`#${effect}-title`).style.color == "rgb(255, 255, 255)") {
            effectSound.play();
            let efeitoTitulo = document.querySelectorAll(".efeito-titulo");
            for (let i = 0; i < efeitoTitulo.length; i++) {
                efeitoTitulo[i].style.color = "rgb(255, 255, 255)";
            }
            qs(`#${effect}-title`).style.color = "rgb(173, 255, 47)";
            qs("#madotsuki").src = `./img/madotsuki-${effect}.webp`;
        }
    }

    function disableEffect() {
        let efeitoTitulo = document.querySelectorAll(".efeito-titulo");
        for (let i = 0; i < efeitoTitulo.length; i++) {
            efeitoTitulo[i].style.color = "rgb(255, 255, 255)";
        }
        qs("#madotsuki").src = "./img/madotsuki.webp";
    }
}

/* loops */
window.setInterval(function() {
    autoClicker();
    qs("#score").innerHTML = score;
    qs("title").innerHTML = score + " sonhos | yumeclick";
    qs("#cps").innerHTML = cps;
}, 1000); // atualiza o jogo a cada 1s