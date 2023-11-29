let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

const board = document.getElementById('board');
const resultDisplay = document.getElementById('result');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');
const scoreDrawDisplay = document.getElementById('scoreDraw');

function initGame() {
    renderBoard();
}

function startGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    resultDisplay.textContent = '';
    resultDisplay.style.color = 'green';
    currentPlayer = 'X';
    renderBoard();
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    resultDisplay.textContent = '';
    resultDisplay.style.color = 'green';
    renderBoard();
}

function newGame() {
    scoreX = 0;
    scoreO = 0;
    scoreDraw = 0;
    scoreXDisplay.textContent = scoreX;
    scoreODisplay.textContent = scoreO;
    scoreDrawDisplay.textContent = scoreDraw;
    resetGame();
}

function addClickEvent() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('click', cellClick));
}

function cellClick(e) {
    const cellIndex = parseInt(e.target.dataset.index);

    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        renderBoard();
        checkWinner();
        togglePlayer();
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            resultDisplay.textContent = `${currentPlayer} venceu!`;
            // Define a cor da mensagem de acordo com o vencedor
            resultDisplay.style.color = (currentPlayer === 'X') ? 'red' : 'blue';
            updateScore();
            return;
        }
    }

    if (!gameBoard.includes('') && gameActive) {
        gameActive = false;
        resultDisplay.textContent = 'Empate!';
        resultDisplay.style.color = 'black';
        updateScore();
    }
}

function togglePlayer() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
}

function renderBoard() {
    board.innerHTML = '';
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.dataset.index = index;

        // Adiciona uma classe específica para estilizar "X" e "O"
        if (cell === 'X') {
            cellElement.classList.add('x');
        } else if (cell === 'O') {
            cellElement.classList.add('o');
        }

        board.appendChild(cellElement);
    });

    if (gameActive) {
        addClickEvent();
    }
}

function updateScore() {
    if (resultDisplay.textContent.includes('X')) {
        scoreX++;
    } else if (resultDisplay.textContent.includes('O')) {
        scoreO++;
    } else if (resultDisplay.textContent.includes('Empate')) {
        scoreDraw++;
    }

    scoreXDisplay.textContent = scoreX;
    scoreODisplay.textContent = scoreO;
    scoreDrawDisplay.textContent = scoreDraw;
}


initGame();

startGame();

