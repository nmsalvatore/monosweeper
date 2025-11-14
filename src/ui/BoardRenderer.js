export class BoardRenderer {
  constructor(container, board) {
    this.container = container;
    this.board = board;
    this.hitMineCell = null;
  }

  render(hitMineCell = null) {
    this.hitMineCell = hitMineCell;

    // Clear previous render
    this.container.innerHTML = '';

    const boardElement = document.createElement('div');
    boardElement.className = 'board';

    // Set CSS grid layout
    boardElement.style.gridTemplateRows = `repeat(${this.board.rows}, 1fr)`;
    boardElement.style.gridTemplateColumns = `repeat(${this.board.cols}, 1fr)`;

    // Create cell elements for each cell in the board
    for (let row = 0; row < this.board.rows; row++) {
      for (let col = 0; col < this.board.cols; col++) {
        const cell = this.board.getCell(row, col);
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellElement.setAttribute('data-row', row);
        cellElement.setAttribute('data-col', col);

        // Add state classes
        if (!cell.isRevealed) {
          cellElement.classList.add('cell-hidden');
        } else {
          cellElement.classList.add('cell-revealed');
        }

        if (cell.isFlagged) {
          cellElement.classList.add('cell-flagged');
        }

        // Mark the hit mine (the one that ended the game)
        if (this.hitMineCell &&
            this.hitMineCell.row === row &&
            this.hitMineCell.col === col &&
            cell.isMine && cell.isRevealed) {
          cellElement.classList.add('cell-hit-mine');
        }

        // Add cell content
        if (cell.isFlagged) {
          cellElement.textContent = '⚑';  // Unicode flag symbol (styleable)
        } else if (cell.isRevealed) {
          if (cell.isMine) {
            cellElement.textContent = '✖';  // Unicode X symbol (styleable)
          } else if (cell.adjacentMines > 0) {
            cellElement.textContent = cell.adjacentMines;
          }
        }

        boardElement.appendChild(cellElement);
      }
    }

    this.container.appendChild(boardElement);
  }
}
