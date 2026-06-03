let currentGame = 1;
let score = 0;

let playerX;
let items = [];

let currentQuestion = 0;
let quizFeedback = "";
const questions = [
    { t: "Uso excessivo de defensivos perto de rios causa?", a: "Poluição hídrica", b: "Mais adubo", right: "A" },
    { t: "O que ajuda a reter água no solo?", a: "Desmatamento", b: "Plantio Direto", right: "B" },
    { t: "Principal meta do Agro Sustentável?", a: "Produzir sem destruir", b: "Apenas lucro rápido", right: "A" }
];

let trees = [];

function setup() {
    let canvas = createCanvas(600, 350);
    canvas.parent('canvas-container');
    resetGameData();
}

function draw() {
    background(34); 
    
    if (currentGame === 1) {
        runGame1();
    } else if (currentGame === 2) {
        runGame2();
    } else if (currentGame === 3) {
        runGame3();
    }
    
    fill(255);
    noStroke();
    textSize(16);
    textAlign(LEFT, TOP);
    text("Pontuação: " + score, 20, 20);
}

function switchGame(gameId) {
    currentGame = gameId;
    let cards = document.querySelectorAll('.game-card');
    cards.forEach((card, idx) => {
        if(idx === gameId - 1) card.classList.add('active');
        else card.classList.remove('active');
    });
    resetGameData();
}

function resetGameData() {
    score = 0;
    let inst = document.getElementById('game-instructions');
    
    if (currentGame === 1) {
        inst.innerHTML = "<strong>Minigame 1 - Coleta Sustentável:</strong> Use as <b>Setas do Teclado</b> ou o <b>Mouse</b> para mover a colheitadeira. Pegue Folhas Verdes (+10pts) e desvie de Gotas de Desperdício (-10pts).";
        playerX = 300;
        items = [];
        for(let i=0; i<4; i++) {
            items.push({ x: random(50, 550), y: random(-200, 0), type: random(['good', 'bad']), speed: random(2, 4) });
        }
    } else if (currentGame === 2) {
        inst.innerHTML = "<strong>Minigame 2 - Quiz do Equilíbrio:</strong> Responda às perguntas ambientais clicando nas teclas <b>A</b> ou <b>B</b> no seu teclado.";
        currentQuestion = 0;
        quizFeedback = "Pressione A ou B para responder!";
    } else if (currentGame === 3) {
        inst.innerHTML = "<strong>Minigame 3 - Clique do Reflorestamento:</strong> Clique com o <b>Mouse</b> dentro da área cinza para plantar árvores e criar uma Barreira Ecológica Reguladora (+10pts por árvore).";
        trees = [];
    }
}

function runGame1() {
    fill(76, 175, 80, 50);
    rect(0, 300, 600, 50);
    
    if (keyIsDown(LEFT_ARROW)) playerX -= 6;
    if (keyIsDown(RIGHT_ARROW)) playerX += 6;
    if (mouseX > 0 && mouseX < 600) playerX = mouseX;
    playerX = constrain(playerX, 30, 570);
    
    fill(46, 125, 50);
    rect(playerX - 25, 280, 50, 20, 5);
    fill(255, 183, 77);
    rect(playerX - 15, 270, 30, 10);

    for (let item of items) {
        item.y += item.speed;
        
        if (item.type === 'good') {
            fill(129, 199, 132); 
            ellipse(item.x, item.y, 18, 25);
        } else {
            fill(64, 196, 255); 
            ellipse(item.x, item.y, 15, 15);
        }
        
        if (item.y >= 270 && item.y <= 300 && abs(item.x - playerX) < 30) {
            if (item.type === 'good') score += 10;
            else score = max(0, score - 10);
            item.y = random(-100, -10);
            item.x = random(50, 550);
        }
        
        if (item.y > 350) {
            item.y = random(-100, -10);
            item.x = random(50, 550);
        }
    }
}

function runGame2() {
    textAlign(CENTER, CENTER);
    if (currentQuestion < questions.length) {
        let q = questions[currentQuestion];
        fill(255);
        textSize(20);
        text(q.t, 300, 100);
        
        textSize(16);
        fill(144, 238, 144);
        text("[ Tecla A ] " + q.a, 300, 160);
        fill(255, 182, 193);
        text("[ Tecla B ] " + q.b, 300, 200);
        
        fill(255, 183, 77);
        text(quizFeedback, 300, 270);
    } else {
        fill(129, 199, 132);
        textSize(24);
        text("Parabéns! Você concluiu o Quiz.", 300, 150);
        textSize(16);
        fill(255);
        text("Você provou entender tudo sobre o Equilíbrio no Agro!", 300, 200);
    }
}

function keyPressed() {
    if (currentGame === 2 && currentQuestion < questions.length) {
        let q = questions[currentQuestion];
        if (key === 'a' || key === 'A') {
            if (q.right === 'A') { score += 30; quizFeedback = "Correto! +30 Pontos."; }
            else { quizFeedback = "Incorreto! Tente a próxima."; }
            currentQuestion++;
        } else if (key === 'b' || key === 'B') {
            if (q.right === 'B') { score += 30; quizFeedback = "Correto! +30 Pontos."; }
            else { quizFeedback = "Incorreto! Tente a próxima."; }
            currentQuestion++;
        }
    }
}

function runGame3() {
    fill(41, 121, 255);
    rect(0, 140, 600, 70);
    fill(255, 255, 255, 180);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("ÁREA DE PRESERVAÇÃO HIDROGRÁFICA (RIO)", 300, 175);

    for(let tree of trees) {
        fill(121, 85, 72); 
        rect(tree.x - 4, tree.y, 8, 15);
        fill(46, 125, 50); 
        ellipse(tree.x, tree.y - 8, 20, 20);
    }

    fill(200);
    textSize(12);
    text("Clique nas margens escuras para plantar reflorestamento e proteger o rio.", 300, 320);
}

function mousePressed() {
    if (currentGame === 3) {
        if (mouseY > 0 && mouseY < 350 && mouseX > 0 && mouseX < 600) {
            if (mouseY < 140 || mouseY > 210) {
                trees.push({ x: mouseX, y: mouseY });
                score += 10;
            }
        }
    }
}
