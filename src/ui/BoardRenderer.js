export class BoardRenderer {
  constructor(container, board) {
    this.container = container;
    this.board = board;
  }

  render() {
    const boardElement = document.createElement('div');
    boardElement.className = 'board';

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

        boardElement.appendChild(cellElement);
      }
    }

    this.container.appendChild(boardElement);
  }
}
