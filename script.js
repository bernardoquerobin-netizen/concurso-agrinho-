// ======================
// SCROLL ANIMATION
// ======================

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{
    threshold:0.15
});

document.querySelectorAll(".card,.tech-box,.stat").forEach(el=>{
    observer.observe(el);
});


// ======================
// COUNTERS
// ======================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const counter = entry.target;
            const target = +counter.dataset.target;

            let current = 0;

            const update = ()=>{

                const increment = target / 100;

                if(current < target){

                    current += increment;

                    counter.innerText = Math.floor(current);

                    requestAnimationFrame(update);

                }else{

                    counter.innerText = target;
                }

            };

            update();
            counterObserver.unobserve(counter);
        }

    });

});

counters.forEach(counter=>{
    counterObserver.observe(counter);
});


// ======================
// BOTÃO EXPLORAR
// ======================

const exploreBtn = document.querySelector(".btn-primary");

if(exploreBtn){

    exploreBtn.addEventListener("click",()=>{

        document.querySelector("#sobre")
        .scrollIntoView({
            behavior:"smooth"
        });

    });

}


// ======================
// MENU MOBILE
// ======================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if(menuBtn){

    menuBtn.addEventListener("click",()=>{

        if(navLinks.style.display === "flex"){

            navLinks.style.display = "none";

        }else{

            navLinks.style.display = "flex";
            navLinks.style.flexDirection = "column";
            navLinks.style.position = "absolute";
            navLinks.style.top = "80px";
            navLinks.style.right = "20px";
            navLinks.style.background = "#000";
            navLinks.style.padding = "20px";
            navLinks.style.borderRadius = "15px";

        }

    });

}


// ======================
// PARTICULAS FUTURISTAS
// ======================

for(let i=0;i<50;i++){

    const particle = document.createElement("div");

    particle.style.position = "fixed";
    particle.style.width = "3px";
    particle.style.height = "3px";
    particle.style.background = "#00ff88";

    particle.style.left =
        Math.random()*100 + "%";

    particle.style.top =
        Math.random()*100 + "%";

    particle.style.borderRadius="50%";

    particle.style.opacity="0.5";

    particle.style.pointerEvents="none";

    particle.style.zIndex="-1";

    document.body.appendChild(particle);

    animateParticle(particle);

}

function animateParticle(el){

    let y = Math.random()*window.innerHeight;

    setInterval(()=>{

        y -= 1;

        if(y < -20){
            y = window.innerHeight;
        }

        el.style.transform =
            `translateY(${y}px)`;

    },30);

}


// ======================================================
// FLAPPY AGRO
// ======================================================

const canvas =
document.getElementById("gameCanvas");

const ctx =
canvas.getContext("2d");

const startBtn =
document.getElementById("startGame");

const restartBtn =
document.getElementById("restartBtn");

const scoreDisplay =
document.getElementById("score");

const gameContainer =
document.getElementById("gameContainer");

const gameOverBox =
document.getElementById("gameOver");

let bird;
let pipes;
let score;
let running;

const gravity = 0.45;
const jumpForce = -8;

function resetGame(){

    bird = {

        x:100,
        y:300,
        width:40,
        height:40,
        velocity:0

    };

    pipes = [];

    score = 0;

    running = true;

    scoreDisplay.innerText = score;

    gameOverBox.style.display = "none";

}

function startGame(){

    gameContainer.style.display = "flex";

    resetGame();

    createPipe();

    requestAnimationFrame(gameLoop);

}

startBtn.addEventListener("click",startGame);

restartBtn.addEventListener("click",()=>{

    resetGame();

    createPipe();

    requestAnimationFrame(gameLoop);

});


// ======================
// CONTROLES
// ======================

document.addEventListener("keydown",(e)=>{

    if(e.code === "Space"){

        bird.velocity = jumpForce;

    }

});

canvas.addEventListener("click",()=>{

    bird.velocity = jumpForce;

});


// ======================
// CRIAR CANOS
// ======================

function createPipe(){

    if(!running) return;

    const gap = 170;

    const topHeight =
        Math.random()*250 + 50;

    pipes.push({

        x:canvas.width,
        width:70,

        topHeight,

        bottomY:
            topHeight + gap,

        scored:false

    });

    setTimeout(createPipe,1800);

}


// ======================
// GAME OVER
// ======================

function endGame(){

    running = false;

    gameOverBox.style.display = "block";

}


// ======================
// COLISÃO
// ======================

function checkCollision(pipe){

    if(

        bird.x + bird.width > pipe.x &&
        bird.x < pipe.x + pipe.width &&

        (

            bird.y < pipe.topHeight ||

            bird.y + bird.height >
            pipe.bottomY

        )

    ){

        endGame();

    }

}


// ======================
// DESENHAR DRONE
// ======================

function drawBird(){

    ctx.fillStyle = "#00ff88";

    ctx.beginPath();

    ctx.arc(

        bird.x + 20,
        bird.y + 20,
        20,
        0,
        Math.PI*2

    );

    ctx.fill();

    ctx.strokeStyle="#ffffff";
    ctx.stroke();

}


// ======================
// LOOP
// ======================

function gameLoop(){

    if(!running) return;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // fundo

    const grad =
    ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height
    );

    grad.addColorStop(0,"#00111f");
    grad.addColorStop(1,"#002f45");

    ctx.fillStyle = grad;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // bird

    bird.velocity += gravity;
    bird.y += bird.velocity;

    drawBird();

    // chão

    if(
        bird.y + bird.height >
        canvas.height
    ){

        endGame();

    }

    if(
        bird.y < 0
    ){

        bird.y = 0;

    }

    // pipes

    pipes.forEach((pipe,index)=>{

        pipe.x -= 3;

        ctx.fillStyle="#00ff88";

        ctx.fillRect(
            pipe.x,
            0,
            pipe.width,
            pipe.topHeight
        );

        ctx.fillRect(
            pipe.x,
            pipe.bottomY,
            pipe.width,
            canvas.height
        );

        checkCollision(pipe);

        if(

            !pipe.scored &&

            pipe.x + pipe.width <
            bird.x

        ){

            pipe.scored = true;

            score++;

            scoreDisplay.innerText =
            score;

        }

        if(pipe.x < -100){

            pipes.splice(index,1);

        }

    });

    requestAnimationFrame(
        gameLoop
    );

}
