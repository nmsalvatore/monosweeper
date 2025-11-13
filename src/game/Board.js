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
}
