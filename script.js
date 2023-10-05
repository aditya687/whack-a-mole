// Constants
const board = document.getElementById('board');
const startButton = document.getElementById('start-button');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const maxLives = 3;

let score = 0;
let lives = maxLives;
let sequence = [];
let playerSequence = [];
let isClickable = false;

// Create the game board
function createBoard() {
    for (let i = 0; i < 16; i++) {
        const hole = document.createElement('div');
        hole.classList.add('mole-hole');
        hole.addEventListener('click', () => whack(i));
        board.appendChild(hole);
    }
}

// Start the game
function startGame() {
    sequence = [];
    playerSequence = [];
    score = 0;
    lives = maxLives;
    scoreElement.textContent = score;
    livesElement.textContent = lives;
    startButton.disabled = true;
    isClickable = false;
    playSequence();
}

// Generate a random sequence of moles
function generateSequence() {
    return Array.from({ length: 10 }, () => Math.floor(Math.random() * 16));
}

// Show the sequence of moles to the player
async function playSequence() {
    const sequence = generateSequence();
    for (const holeIndex of sequence) {
        await showMole(holeIndex);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        hideMole(holeIndex);
        await new Promise((resolve) => setTimeout(resolve, 500));
    }
    isClickable = true;
}

// Show a mole in a hole
function showMole(index) {
    const hole = board.children[index];
    const mole = document.createElement('div');
    mole.classList.add('mole');
    hole.appendChild(mole);
    sequence.push(index);
}

// Hide a mole in a hole
function hideMole(index) {
    const hole = board.children[index];
    const mole = hole.querySelector('.mole');
    if (mole) {
        mole.remove();
    }
}

// Handle player whacking a mole
function whack(index) {
    if (!isClickable) return;
    if (index === sequence[playerSequence.length]) {
        playerSequence.push(index);
        if (playerSequence.length === sequence.length) {
            score++;
            scoreElement.textContent = score;
            playerSequence = [];
            playSequence();
        }
    } else {
        loseLife();
    }
}

// Handle player losing a life
function loseLife() {
    lives--;
    livesElement.textContent = lives;
    if (lives === 0) {
        endGame();
    }
}

// End the game
function endGame() {
    startButton.disabled = false;
    isClickable = false;
    alert('Game Over! Your score: ' + score);
}

// Event listeners
startButton.addEventListener('click', startGame);

// Initialize the game
createBoard();
