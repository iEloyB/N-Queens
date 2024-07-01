const board = document.querySelector(".board");
const boardSize = 8;

createTable();

function createTable() {
  const table = document.createElement("table");

  for (let i = 0; i < boardSize; i++) {
    const row = table.insertRow();
    for (let j = 0; j < boardSize; j++) {
      const cell = row.insertCell();
    }
  }

  board.appendChild(table);
}