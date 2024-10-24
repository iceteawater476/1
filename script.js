
let gameCanvas = document.getElementById('gameCanvas');
let ctx = gameCanvas.getContext('2d');
let basket = { x: 175, y: 550, width: 50, height: 10, speed: 5 };
let orbs = [];
let score = 0;
let gameInterval;
let isGameRunning = false;

function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
}
// Ensure the canvas and other elements are loaded
window.onload = function() {
    document.getElementById('startGameButton').addEventListener('click', startGame);
};

function startGame() {
    if (isGameRunning) return;
    isGameRunning = true;
    score = 0;
    orbs = [];
    document.getElementById('scoreDisplay').innerText = 'Score: 0';
    gameInterval = setInterval(updateGame, 20);
    setTimeout(endGame, 30000); // Game lasts 30 seconds
}

function updateGame() {
    clearCanvas();
    moveBasket();
    drawBasket();
    generateOrbs();
    moveOrbs();
    drawOrbs();
    checkCollision();
}

function clearCanvas() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function drawBasket() {
    ctx.fillStyle = '#00ff99';
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function moveBasket() {
    document.onkeydown = function (e) {
        if (e.key === 'ArrowLeft' && basket.x > 0) {
            basket.x -= basket.speed;
        } else if (e.key === 'ArrowRight' && basket.x < gameCanvas.width - basket.width) {
            basket.x += basket.speed;
        }
    };
}

function generateOrbs() {
    if (Math.random() < 0.05) {
        let orb = {
            x: Math.random() * (gameCanvas.width - 20),
            y: 0,
            radius: 10,
            speed: 2 + Math.random() * 3
        };
        orbs.push(orb);
    }
}

function moveOrbs() {
    for (let i = 0; i < orbs.length; i++) {
        orbs[i].y += orbs[i].speed;
        if (orbs[i].y > gameCanvas.height) {
            orbs.splice(i, 1);
            i--;
        }
    }
}

function drawOrbs() {
    ctx.fillStyle = '#ff00ff';
    for (let orb of orbs) {
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}

function checkCollision() {
    for (let i = 0; i < orbs.length; i++) {
        if (
            orbs[i].x > basket.x &&
            orbs[i].x < basket.x + basket.width &&
            orbs[i].y + orbs[i].radius > basket.y
        ) {
            orbs.splice(i, 1);
            score++;
            document.getElementById('scoreDisplay').innerText = 'Score: ' + score;
            i--;
        }
    }
}

function endGame() {
    clearInterval(gameInterval);
    isGameRunning = false;
    alert('Game over! Your score is: ' + score);
}
