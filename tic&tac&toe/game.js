const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

let currentPlayer = 'X';
let gameActive = true;
let mode = 'pvp';
let scores = { X: 0, O: 0 };

const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);

function setMode(selectedMode) {
    mode = selectedMode;
    restartGame();
}

function handleClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (cell.textContent || !gameActive) return;

    cell.textContent = currentPlayer;

    if (checkWin()) {
        statusText.textContent = `${currentPlayer} Wins!`;
        scores[currentPlayer]++;
        updateScore();
        gameActive = false;
        return;
    }

    if (isDraw()) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s Turn`;

    if (mode === 'ai' && currentPlayer === 'O') {
        setTimeout(aiMove, 500);
    }
}

function aiMove() {
    const emptyCells = [...cells].filter(c => !c.textContent);
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.click();
}

function checkWin() {
    return wins.some(combo =>
        combo.every(i => cells[i].textContent === currentPlayer)
    );
}

function isDraw() {
    return [...cells].every(c => c.textContent);
}

function updateScore() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

function restartGame() {
    cells.forEach(c => c.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = "Player X's turn";
}
