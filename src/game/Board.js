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
    return this.grid[row][col];
  }
}
