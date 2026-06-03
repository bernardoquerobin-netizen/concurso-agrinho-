<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agrinho Alura 2026 - Ensino Médio</title>
    <!-- Importação do P5.js para renderização dos Minigames interativos -->
    <script src="https://cloudflare.com"></script>
    <style>
        :root {
            --primary-color: #2e7d32;
            --secondary-color: #81c784;
            --accent-color: #ffb74d;
            --dark-color: #1b5e20;
            --light-color: #f1f8e9;
            --text-color: #333;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: var(--light-color);
            color: var(--text-color);
            line-height: 1.6;
        }

        header {
            background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://unsplash.com') no-repeat center center/cover;
            color: white;
            text-align: center;
            padding: 4rem 1rem;
            border-bottom: 5px solid var(--primary-color);
        }

        header h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        header p {
            font-size: 1.2rem;
            color: var(--secondary-color);
            font-weight: bold;
        }

        .container {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 1rem;
        }

        .intro-box {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            margin-bottom: 2rem;
            border-left: 6px solid var(--primary-color);
        }

        .intro-box h2 {
            color: var(--dark-color);
            margin-bottom: 1rem;
        }

        /* Área de Seleção dos Minigames */
        .game-selector {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .game-card {
            background: white;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            padding: 1.5rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .game-card:hover, .game-card.active {
            border-color: var(--primary-color);
            background-color: #e8f5e9;
            transform: translateY(-3px);
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .game-card h3 {
            color: var(--dark-color);
            margin-bottom: 0.5rem;
        }

        /* Container do Canvas do Jogo */
        #canvas-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #222;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            min-height: 450px;
            position: relative;
        }

        #game-instructions {
            color: #fff;
            background: rgba(0,0,0,0.5);
            padding: 0.8rem;
            border-radius: 6px;
            margin-bottom: 1rem;
            text-align: center;
            max-width: 600px;
            font-size: 0.95rem;
            border: 1px solid var(--secondary-color);
        }

        /* Footer */
        footer {
            background-color: var(--dark-color);
            color: white;
            text-align: center;
            padding: 1.5rem;
            margin-top: 4rem;
            font-size: 0.9rem;
        }

        footer a {
            color: var(--secondary-color);
            text-decoration: none;
        }
    </style>
</head>
<body>

    <header>
        <h1>Concurso Agrinho Alura 2026</h1>
        <p>Tema: Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente</p>
    </header>

    <div class="container">
        <section class="intro-box">
            <h2>Tecnologia e Sustentabilidade no Ensino Médio</h2>
            <p>Bem-vindo ao portal interativo desenvolvido para a categoria de Programação e Robótica do Agrinho 2026. Abaixo, explore conceitos fundamentais de preservação, economia de recursos e produtividade consciente através de 3 minigames programados em lógica Javascript.</p>
        </section>

        <!-- Seletor de Jogos -->
        <div class="game-selector">
            <div class="game-card active" onclick="switchGame(1)">
                <h3>🎮 1. Coleta Sustentável</h3>
                <p>Pegue os insumos corretos e desvie do desperdício de água.</p>
            </div>
            <div class="game-card" onclick="switchGame(2)">
                <h3>🧠 2. Quiz do Equilíbrio</h3>
                <p>Teste suas decisões rápidas sobre manejo e meio ambiente.</p>
            </div>
            <div class="game-card" onclick="switchGame(3)">
                <h3>🌾 3. Clique do Reflorestamento</h3>
                <p>Restaure a mata ciliar para proteger a bacia hidrográfica.</p>
            </div>
        </div>

        <!-- Tela do Jogo Ativo -->
        <div id="canvas-container">
            <div id="game-instructions">Carregando instruções...</div>
            <!-- O P5.js vai injetar o canvas dinamicamente aqui dentro -->
        </div>
    </div>

    <footer>
        <p>&copy; 2026 Projeto Desenvolvido para o Concurso Agrinho - Itinerário de Pensamento Computacional Alura.</p>
    </footer>

    <!-- LÓGICA DOS JOGOS (P5.JS EMBARCADO) -->
    <script>
        let currentGame = 1;
        let score = 0;
        
        // Variáveis do Jogo 1
        let playerX;
        let items = [];
        
        // Variáveis do Jogo 2
        let currentQuestion = 0;
        let quizFeedback = "";
        const questions = [
            { t: "Uso excessivo de defensivos perto de rios causa?", a: "Poluição hídrica", b: "Mais adubo", right: "A" },
            { t: "O que ajuda a reter água no solo?", a: "Desmatamento", b: "Plantio Direto", right: "B" },
            { t: "Principal meta do Agro Sustentável?", a: "Produzir sem destruir", b: "Apenas lucro rápido", right: "A" }
        ];

        // Variáveis do Jogo 3
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
            
            // Placar Geral
            fill(255);
            noStroke();
            textSize(16);
            textAlign(LEFT, TOP);
            text("Pontuação: " + score, 20, 20);
        }

        // --- SISTEMA DE CHAVEAMENTO DE JOGOS ---
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
                inst.innerHTML = "<strong>Minigame 1 - Coleta Sustentável:</strong> Use as <b>Setas do Teclado (Esquerda/Direita)</b> ou o <b>Mouse</b> para mover a colheitadeira. Pegue Folhas Verdes (+10pts) e desvie de Gotas de Desperdício (-10pts).";
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
                inst.innerHTML = "<strong>Minigame 3 - Clique do Reflorestamento:</strong> Clique com o <b>Botão Esquerdo do Mouse</b> dentro da área cinza para plantar árvores e criar uma Barreira Ecológica Reguladora (+10pts por árvore).";
                trees = [];
            }
        }

        // --- GAME 1: COLETA SUSTENTÁVEL ---
        function runGame1() {
            // Desenha solo/fundo
            fill(76, 175, 80, 50);
            rect(0, 300, 600, 50);
            
            // Movimentação do Jogador (Teclado ou Mouse de forma híbrida)
            if (keyIsDown(LEFT_ARROW)) playerX -= 6;
            if (keyIsDown(RIGHT_ARROW)) playerX += 6;
            if (mouseX > 0 && mouseX < 600) playerX = mouseX; // Suporte para mouse
            playerX = constrain(playerX, 30, 570);
            
            // Desenha Jogador (Colheitadeira Tecnológica)
            fill(46, 125, 50);
            rect(playerX - 25, 280, 50, 20, 5);
            fill(255, 183, 77);
            rect(playerX - 15, 270, 30, 10);

            // Gerencia Insumos Caindo
            for (let item of items) {
                item.y += item.speed;
                
                if (item.type === 'good') {
                    fill(129, 199, 132); // Verde - Sustentável
