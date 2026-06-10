/**
 * ECO-DRONE SYSTEM INTERACTIVE ARCADE LAB (WASD ENGINES)
 * DESENVOLVIDO PARA COMPETIÇÃO AGRINHO 2026 - ENSINO MÉDIO
 */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Captura de Elementos do Painel Visual
const hudScore = document.getElementById("hud-score");
const hudStatus = document.getElementById("hud-status");
const gameOverScreen = document.getElementById("game-over");
const gameMessage = document.getElementById("game-message");
const btnRestart = document.getElementById("btn-restart");

// Estado Geométrico e Vetorial do Drone (Jogador)
const drone = {
    x: 120,
    y: 225,
    radius: 14,
    speed: 5.5,
    vx: 0,
    vy: 0,
    color: "#00ffaa"
};

// Registro de Input das Teclas Direcionais W, A, S, D
const controls = {
    w: false,
    a: false,
    s: false,
    d: false
};

// Banco de Dados Dinâmicos da Sessão
let score = 0;
let isGameOver = false;
let bioSeeds = [];
let carbonClouds = [];
let gameEngineId = null;

// Escutadores de Eventos Físicos de Teclado
window.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key in controls) controls[key] = true;
});

window.addEventListener("keyup", (e) => {
    const key = e.key.toLowerCase();
    if (key in controls) controls[key] = false;
});

// Inicializador e Resetador do Módulo Arcade
function startSimulation() {
    score = 0;
    isGameOver = false;
    drone.x = 120;
    drone.y = canvas.height / 2;
    drone.vx = 0;
    drone.vy = 0;
    bioSeeds = [];
    carbonClouds = [];

    hudScore.innerText = "000";
    hudStatus.innerText = "ONLINE";
    hudStatus.className = "status-green";
    gameOverScreen.classList.add("game-layer-hidden");

    // Popula Elementos Iniciais Requeridos
    for (let i = 0; i < 4; i++) spawnSeed();
    for (let j = 0; j < 3; j++) spawnCarbon();

    if (gameEngineId) cancelAnimationFrame(gameEngineId);
    runLoop();
}

// Cria Coordenadas Aleatórias Seguras para as Bio-Sementes (Verdes)
function spawnSeed() {
    bioSeeds.push({
        x: Math.random() * (canvas.width - 220) + 160,
        y: Math.random() * (canvas.height - 60) + 30,
        radius: 7,
        color: "#00ff66"
    });
}

// Gera Nuvens de Poluição Móveis (Vermelhas) no Eixo Direito
function spawnCarbon() {
    carbonClouds.push({
        x: Math.random() * (canvas.width - 250) + 250,
        y: Math.random() * (canvas.height - 60) + 30,
        radius: Math.random() * 10 + 12,
        vx: (Math.random() * 1.8 + 1.2) * -1, // Deslocamento constante esquerda
        color: "#ff3333"
    });
}

// Atualização de Vetores Físicos e Limitações Geográficas
function processPhysics() {
    drone.vx = 0;
    drone.vy = 0;

    // Mapeamento Direcional Ativo
    if (controls.w) drone.vy = -drone.speed;
    if (controls.s) drone.vy = drone.speed;
    if (controls.a) drone.vx = -drone.speed;
    if (controls.d) drone.vx = drone.speed;

    // Atualiza Posição
    drone.x += drone.vx;
    drone.y += drone.vy;

    // Retém o Elemento nos Limites do Canvas (Tratamento de Borda)
    if (drone.x - drone.radius < 0) drone.x = drone.radius;
    if (drone.x + drone.radius > canvas.width) drone.x = canvas.width - drone.radius;
    if (drone.y - drone.radius < 0) drone.y = drone.radius;
    if (drone.y + drone.radius > canvas.height) drone.y = canvas.height - drone.radius;

    // Desloca e Recicla Nuvens de Carbono em Loop Contínuo
    carbonClouds.forEach(cloud => {
        cloud.x += cloud.vx;
        if (cloud.x + cloud.radius < 0) {
            cloud.x = canvas.width + cloud.radius;
            cloud.y = Math.random() * (canvas.height - 60) + 30;
        }
    });

    evaluateCollisions();
}

// Validação Matemática Trigonométrica de Proximidade (Colisões)
function evaluateCollisions() {
    // 1. Coleta Eficiente de Bio-Sementes (Pontuação)
    for (let i = bioSeeds.length - 1; i >= 0; i--) {
        let distance = Math.hypot(drone.x - bioSeeds[i].x, drone.y - bioSeeds[i].y);
        if (distance < drone.radius + bioSeeds[i].radius) {
            bioSeeds.splice(i, 1);
            score += 10;
            hudScore.innerText = score.toString().padStart(3, '0');
            spawnSeed();
        }
    }

    // 2. Interceptação de Nuvens Tóxicas (Interrupção)
    for (let j = 0; j < carbonClouds.length; j++) {
        let distance = Math.hypot(drone.x - carbonClouds[j].x, drone.y - carbonClouds[j].y);
        if (distance < drone.radius + carbonClouds[j].radius) {
            triggerGameOver();
            break;
        }
    }
}

// Encerramento da Operação Gráfica
function triggerGameOver() {
    isGameOver = true;
    hudStatus.innerText = "OFFLINE";
    hudStatus.className = "status-red";
    gameMessage.innerText = `O Drone foi sobrecarregado pelas emissões de CO₂. Energia limpa acumulada: ${score} XP.`;
    gameOverScreen.classList.remove("game-layer-hidden");
}

// Renderizador Óptico e Vetorial 2D
function renderGraphics() {
    // Limpeza parcial com opacidade para efeito fantasma/rastro de luz técnico
    ctx.fillStyle = "rgba(4, 7, 5, 0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Linhas de Radar/Grid de Engenharia Espacial
    ctx.strokeStyle = "rgba(0, 255, 170, 0.03)";
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Desenho das Sementes Energéticas
    bioSeeds.forEach(seed => {
        ctx.beginPath();
        ctx.arc(seed.x, seed.y, seed.radius, 0, Math.PI * 2);
        ctx.fillStyle = seed.color;
        ctx.shadowColor = seed.color;
        ctx.shadowBlur = 12;
        ctx.fill();
    });
    ctx.shadowBlur = 0; // Desativa borrão para economia de memória nos outros loops

    // Desenho das Partículas de Poluição
    carbonClouds.forEach(cloud => {
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        ctx.fillStyle = cloud.color;
        ctx.shadowColor = cloud.color;
        ctx.shadowBlur = 6;
        ctx.fill();
    });
    ctx.shadowBlur = 0;

    // Desenho do Drone Jogador com Indicadores Geométricos
    ctx.beginPath();
    ctx.arc(drone.x, drone.y, drone.radius, 0, Math.PI * 2);
    ctx.fillStyle = drone.color;
    ctx.shadowColor = drone.color;
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Desenho das Hélices Metálicas em Cruz
    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(drone.x - 20, drone.y); ctx.lineTo(drone.x + 20, drone.y);
    ctx.moveTo(drone.x, drone.y - 20); ctx.lineTo(drone.x, drone.y + 20);
    ctx.stroke();
}

// Loop Principal do Processador (60 FPS Nativos)
function runLoop() {
    if (!isGameOver) {
        processPhysics();
        renderGraphics();
        gameEngineId = requestAnimationFrame(runLoop);
    }
}

// Ouvintes de Controle Operacional
btnRestart.addEventListener("click", startSimulation);

// Inicialização imediata pós renderização do DOM
window.onload = startSimulation;
