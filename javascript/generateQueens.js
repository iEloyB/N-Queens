let formulari = new URLSearchParams(window.location.search);
let boardSize = formulari.get("board-size");
let positionSelected = document.querySelector("p.position");
const board = document.querySelector('table');
let queenNumber = 0;
let currentQueenX = 0;
let currentQueenY = 0;
let queenX = [];
let queenY = [];

queenNumber = 0;
currentQueenX = 0;
currentQueenY = 0;
queenX = [];
queenY = [];
error = false;


try {
  createTable();
  do {
    generateQueens();
    showQueens();
    queenNumber++;
  } while (queenNumber < boardSize);
} catch (error) {
  location.reload();
}



function createTable() {
  for (let i = 0; i < boardSize; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement('td');
      row.appendChild(cell);
    }
    board.appendChild(row);
  }
}

function generateQueens() {
  currentQueenX = Math.floor(Math.random() * boardSize);
  currentQueenY = Math.floor(Math.random() * boardSize);
  if (queenX.includes(currentQueenX) || queenY.includes(currentQueenY)) {
    generateQueens();
  } else {
    queenX.push(currentQueenX);
    queenY.push(currentQueenY);
  }
  checkDiagonals();
}

function checkDiagonals() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (i !== j) {
        let diag1X = queenX[i] - queenY[i];
        let diag2X = queenX[j] - queenY[j];

        //Checking diagonals of type 1
        if (diag1X === diag2X) {
          queenX.pop();
          queenY.pop();
          generateQueens();
          return checkDiagonals();
        }

        //Checking diagonals of type 2
        let diag1Y = queenX[i] + queenY[i];
        let diag2Y = queenX[j] + queenY[j];
        if (diag1Y === diag2Y) {
          queenX.pop();
          queenY.pop();
          generateQueens();
        }
      }
    }
  }
}

function showQueens() {
  for (var k = 0; k < boardSize; k++) {
    for (var i = 0; i < boardSize; i++) {
      for (var j = 0; j < boardSize; j++) {
        if (i == queenY[k] && j == queenX[k]) {
          board.rows[j].cells[i].className = "queen";
          console.log(queenX[k] + "" + queenY[k])
        }
      }
    }
  }
}

//When clicking a 'TD', show the current position
board.addEventListener('click', function (event) {
  if (event.target.tagName !== 'TD') return;
  const x = event.target.cellIndex;
  const y = event.target.parentNode.rowIndex;
  positionSelected.textContent = "Selected position: " + y + "" + x;
});

var wait = (ms) => {
  const start = Date.now();
  let now = start;
  while (now - start < ms) {
    now = Date.now();
  }
}