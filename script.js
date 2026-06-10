// Base de dados das perguntas do Quiz do Agrinho
const quizData = [
    {
        question: "Qual das práticas abaixo melhor representa o equilíbrio entre produção e meio ambiente?",
        options: [
            "Uso massivo e indiscriminado de defensivos químicos.",
            "Rotação de culturas combinada com plantio direto na palha.",
            "Desmatamento de áreas ciliares para ampliar o espaço de plantio.",
            "Queimada controlada anual para limpeza total do solo."
        ],
        correct: 1
    },
    {
        question: "Como a tecnologia e a robótica podem auxiliar na sustentabilidade do campo?",
        options: [
            "Substituindo completamente as florestas por estufas de ferro.",
            "Aumentando o gasto de água nas irrigações diárias automáticas.",
            "Aplicando insumos apenas onde os sensores detectam necessidade real.",
            "Apenas acelerando a velocidade dos tratores sem poupar recursos."
        ],
        correct: 2
    },
    {
        question: "O que caracteriza a preservação das bacias e recursos hídricos na fazenda?",
        options: [
            "Proteger as matas ciliares e evitar contaminação de nascentes.",
            "Canalizar todos os rios para dentro de reservatórios fechados.",
            "Utilizar água subterrânea sem controle de vazão ou monitoramento.",
            "Despejar efluentes diretamente nos riachos locais para escoamento rápido."
        ],
        correct: 0
    }
];

// Mapeamento dos elementos da interface
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const questionNumberEl = document.getElementById("question-number");
const scoreDisplayEl = document.getElementById("score-display");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const finalMessageEl = document.getElementById("final-message");
const restartBtn = document.getElementById("restart-btn");

// Função inicializador do minigame
function loadQuiz() {
    answered = false;
    nextBtn.classList.add("hidden");
    optionsContainerEl.innerHTML = "";

    // Atualiza cabeçalho do jogo
    questionNumberEl.innerText = `Pergunta ${currentQuestionIndex + 1} de ${quizData.length}`;
    scoreDisplayEl.innerText = `Pontos: ${score}`;

    // Insere o texto da questão atual
    const currentQuiz = quizData[currentQuestionIndex];
    questionTextEl.innerText = currentQuiz.question;

    // Renderiza botões de alternativas
    currentQuiz.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(button, index));
        optionsContainerEl.appendChild(button);
    });
}

// Lógica de validação do clique nas alternativas
function selectOption(selectedButton, index) {
    if (answered) return; // Impede multiplos cliques na mesma pergunta
    
    answered = true;
    const currentQuiz = quizData[currentQuestionIndex];

    if (index === currentQuiz.correct) {
        selectedButton.classList.add("correct");
        score += 10; // Adiciona pontuação por acerto
        scoreDisplayEl.innerText = `Pontos: ${score}`;
    } else {
        selectedButton.classList.add("wrong");
        // Destaca a resposta que era a correta para fins educativos
        optionsContainerEl.children[currentQuiz.correct].classList.add("correct");
    }

    nextBtn.classList.remove("hidden");
}

// Avança para a próxima etapa ou finaliza
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuiz();
    } else {
        showResults();
    }
});

// Exibe a tela final com pontuação calculada
function showResults() {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
    
    const maxScore = quizData.length * 10;
    if(score === maxScore) {
        finalMessageEl.innerText = `Excelente! Você conquistou a pontuação máxima de ${score} pontos. Você é um embaixador do agro sustentável!`;
    } else {
        finalMessageEl.innerText = `Muito bem! Você fez um total de ${score} de ${maxScore} pontos disponíveis. Vamos continuar estudando a sustentabilidade no campo!`;
    }
}

// Reinicia o estado do jogo do início
restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultBox.classList.add("hidden");
    quizBox.classList.remove("hidden");
    loadQuiz();
});

// Executa a primeira carga assim que a página renderizar
window.onload = loadQuiz;
