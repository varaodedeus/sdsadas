const board = document.querySelector("#board");
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const restart = document.getElementById("restart");

let boardState = Array(9).fill(null);

const human = "X";
const ai = "O";

cells.forEach(cell => cell.addEventListener("click", humanMove));
restart.addEventListener("click", init);

function init() {
    boardState.fill(null);
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.background = "rgba(255,255,255,0.2)";
    });
    message.textContent = "";
}

function humanMove(e) {
    const index = e.target.dataset.index;
    if (!boardState[index]) {
        makeMove(index, human);
        if (!checkWinner(boardState)) {
            const best = bestMove();
            makeMove(best, ai);
        }
    }
}

function makeMove(index, player) {
    boardState[index] = player;
    cells[index].textContent = player;
    const winner = checkWinner(boardState);
    if (winner) {
        if (winner === "tie") message.textContent = "Empate!";
        else {
            message.textContent = winner + " ganhou!";
            highlightWinner(winner);
        }
    }
}

function checkWinner(bd) {
    const combos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for (const [a,b,c] of combos) {
        if (bd[a] && bd[a] === bd[b] && bd[a] === bd[c]) return bd[a];
    }
    return bd.includes(null) ? null : "tie";
}

// destaque animado
function highlightWinner(player) {
    const combos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for (const [a,b,c] of combos) {
        if (boardState[a] === player && boardState[b] === player && boardState[c] === player) {
            [a,b,c].forEach(i => {
                cells[i].style.background = "rgba(255,255,255,0.7)";
                cells[i].style.transform = "scale(1.2)";
            });
        }
    }
}

// Minimax Algorithm
function bestMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
        if (!boardState[i]) {
            boardState[i] = ai;
            let score = minimax(boardState, 0, false);
            boardState[i] = null;
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function minimax(bd, depth, isMaximizing) {
    const winner = checkWinner(bd);
    if (winner === ai) return 10 - depth;
    if (winner === human) return depth - 10;
    if (winner === "tie") return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (!bd[i]) {
                bd[i] = ai;
                let score = minimax(bd, depth+1, false);
                bd[i] = null;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (!bd[i]) {
                bd[i] = human;
                let score = minimax(bd, depth+1, true);
                bd[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

init();
