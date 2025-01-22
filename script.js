const gameBoard = document.getElementById("gameBoard");
const message = document.getElementById("message");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X";
let board = Array(9).fill(null);

function createBoard() {
    gameBoard.innerHTML = "";
    board.forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.dataset.index = index;
        cellDiv.addEventListener("click", handleCellClick);
        gameBoard.appendChild(cellDiv);
    });
}

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (board[index]) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add("taken");

    if (checkWin()) {
        message.textContent = `Player ${currentPlayer} Wins !!!!!`;
        endGame();
    } else if (board.every((cell) => cell)) {
        message.textContent = "It's a Draw, Play again?";
        endGame();
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `Player ${currentPlayer}\'s Turn`;
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // Rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // Columns
        [0, 4, 8],
        [2, 4, 6], // Diagonals
    ];

    return winPatterns.some((pattern) => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function endGame() {
    document
        .querySelectorAll(".cell")
        .forEach((cell) => cell.removeEventListener("click", handleCellClick));
}

restartButton.addEventListener("click", () => {
    board = Array(9).fill(null);
    currentPlayer = "X";
    message.textContent = `Player ${currentPlayer}\'s Turn`;
    createBoard();
});

createBoard();
message.textContent = `Player ${currentPlayer}\'s Turn`;
