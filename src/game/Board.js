import { Cell } from './Cell.js';

export class Board {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = this._initializeGrid();
  }

  _initializeGrid() {
    const grid = [];
    for (let row = 0; row < this.rows; row++) {
      grid[row] = [];
      for (let col = 0; col < this.cols; col++) {
        grid[row][col] = new Cell(row, col);
      }
    }
    return grid;
  }

  getCell(row, col) {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
      return null;
    }
    return this.grid[row][col];
  }

  getNeighbors(row, col) {
    const neighbors = [];
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    for (const [dRow, dCol] of directions) {
      const cell = this.getCell(row + dRow, col + dCol);
      if (cell !== null) {
        neighbors.push(cell);
      }
    }

    return neighbors;
  }

  placeMines(count) {
    let placed = 0;
    while (placed < count) {
      const row = Math.floor(Math.random() * this.rows);
      const col = Math.floor(Math.random() * this.cols);
      const cell = this.getCell(row, col);

      if (!cell.isMine) {
        cell.setMine();
        placed++;
      }
    }
  }

  calculateAdjacentMines() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const cell = this.getCell(row, col);
        const neighbors = this.getNeighbors(row, col);
        const mineCount = neighbors.filter(neighbor => neighbor.isMine).length;
        cell.setAdjacentMines(mineCount);
      }
    }
  }

  revealCell(row, col) {
    const cell = this.getCell(row, col);

    // Don't reveal if out of bounds, already revealed, or flagged
    if (!cell || cell.isRevealed || cell.isFlagged) {
      return;
    }

    cell.reveal();

    // If a mine was revealed, reveal all other mines
    if (cell.isMine) {
      this.revealAllMines();
      return;
    }

    // If cell has 0 adjacent mines AND is not a mine, flood-fill to neighbors
    if (!cell.isMine && cell.adjacentMines === 0) {
      const neighbors = this.getNeighbors(row, col);
      for (const neighbor of neighbors) {
        this.revealCell(neighbor.row, neighbor.col);
      }
    }
  }

  revealAllMines() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const cell = this.getCell(row, col);
        if (cell.isMine) {
          cell.reveal();
        }
      }
    }
  }

  isGameWon() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const cell = this.getCell(row, col);
        // If there's a non-mine cell that isn't revealed, game not won
        if (!cell.isMine && !cell.isRevealed) {
          return false;
        }
      }
    }
    return true;
  }

  isGameLost() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const cell = this.getCell(row, col);
        // If a mine is revealed, game is lost
        if (cell.isMine && cell.isRevealed) {
          return true;
        }
      }
    }
    return false;
  }
}
