let board;
let context; 

const blockSize = 25;
const rows = 20;
const cols = 20;

let score = 0;

let snakeX = blockSize * 5, snakeY = blockSize * 5
let speedX = 0, speedY = 0;

let snakeBody = [];
let foodX;
let foodY;

let gameOver = false;

window.onload = function() {
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d');

    createFood();
    document.addEventListener('keyup', changeDirection);
    setInterval(update, 1000/15);
}

function hasEatenFood(){
    return (snakeX == foodX && snakeY == foodY) ? true : false;
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle='#363537';
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle='#FF1D15';
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (hasEatenFood()) {
        snakeBody.push([foodX, foodY]);
        score++;
        createFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle='#59FF06';
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;

    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true;
        alert(`Game Over, buddy! You got: ${score} apples!`);
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert(`Game Over, buddy! You got: ${score} apples!`);
        }
    }
}

function changeDirection(e) {
    if (e.code == 'ArrowUp' && speedY != 1) {
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == 'ArrowDown' && speedY!= -1) {
        speedX = 0;
        speedY = 1;
    }
    else if (e.code == 'ArrowLeft' && speedX != 1) {
        speedX = -1;
        speedY= 0;
    }
    else if (e.code == 'ArrowRight' && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }
}

function createFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}