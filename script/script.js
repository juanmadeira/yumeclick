/* querySelector const */
const qs = (val) => {
    return document.querySelector(val)
}

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

/* declaração de variáveis */
let mute = 0;
let score = 0;
let cps = 0;
let toBuy = 0;

let efeitos = ["frog", "umbrella"];
let cost = [10, 150];
let bought = [0, 0];

// esconder efeitos
for (let i = 0; i < efeitos.length; i++) {
    qs(`.efeito-${efeitos[i]}`).style.display = "none";
}

/* funções */
// comprar efeitos
function buyEffect(effect) {
    switch (effect) {
        case 'frog':
            toBuy = 0;
            break;
        case 'umbrella':
            toBuy = 1;
            break;
        default:
            break;
    }
    if (score >= cost[toBuy]) {
        buySound.play();
        score -= cost[toBuy];
        cps += 1;
        bought[toBuy] += 1;
        cost[toBuy] = Math.ceil(cost[toBuy] * 1.25);
        qs(`#${efeitos[toBuy]}-cost`).innerHTML = cost[toBuy];
        qs("#cps").innerHTML = cps;
        qs("#score").innerHTML = score;
        qs("title").innerHTML = score + " sonhos | yumeclick";
        if (bought[toBuy] === 1) {
            useEffect(`${efeitos[toBuy]}`);
            if (qs(`.efeito-${efeitos[toBuy + 1]}`)) {
                qs(`.efeito-${efeitos[toBuy + 1]}`).style.display = "";
            }
        }
    }
    else {
        errorSound.play();
    }
}

// desligar sons
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

// atualizar pontuação
function updateScore(i) {
    score += i;
    clickSound.play();
    qs("#score").innerHTML = score;
    qs("title").innerHTML = score + " sonhos | yumeclick";

    if (score >= cost[0]) {
        qs(".efeito-frog").style.display = "";
    }
}

// atualizar cliques por segundo
function autoClicker() {
    score += cps;
}

// usar efeitos
function useEffect(effect) {
    if (effect === "frog") {
        if (bought[0] >= 1) {
            if (qs("#frog-title").style.color == "rgb(255, 255, 255)") {
                enableEffect();
            }
            else {
                disableEffect();
            }
        }
    }
    else if (effect === "umbrella") {
        if (bought[1] >= 1) {
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

/* loop */
window.setInterval(function() {
    autoClicker();
    qs("#score").innerHTML = score;
    qs("title").innerHTML = score + " sonhos | yumeclick";
    qs("#cps").innerHTML = cps;
}, 1000); // atualiza o jogo a cada 1s
