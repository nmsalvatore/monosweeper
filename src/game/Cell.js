export class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.isMine = false;
    this.isRevealed = false;
    this.isFlagged = false;
    this.adjacentMines = 0;
  }

  reveal() {
    if (!this.isFlagged) {
      this.isRevealed = true;
    }
  }

  toggleFlag() {
    if (!this.isRevealed) {
      this.isFlagged = !this.isFlagged;
    }
  }

  setMine() {
    this.isMine = true;
  }

  setAdjacentMines(count) {
    this.adjacentMines = count;
  }
}
