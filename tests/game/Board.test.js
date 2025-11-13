import { describe, it, expect } from 'vitest';
import { Board } from '../../src/game/Board.js';
import { Cell } from '../../src/game/Cell.js';

describe('Board', () => {
  describe('initialization', () => {
    it('should create a board with specified rows and cols', () => {
      const board = new Board(9, 9);

      expect(board.rows).toBe(9);
      expect(board.cols).toBe(9);
    });

    it('should initialize a grid of cells', () => {
      const board = new Board(3, 3);

      expect(board.grid).toBeDefined();
      expect(board.grid.length).toBe(3);
      expect(board.grid[0].length).toBe(3);
    });

    it('should populate grid with Cell instances', () => {
      const board = new Board(3, 3);

      expect(board.grid[0][0]).toBeInstanceOf(Cell);
      expect(board.grid[0][0].row).toBe(0);
      expect(board.grid[0][0].col).toBe(0);
      expect(board.grid[2][2]).toBeInstanceOf(Cell);
      expect(board.grid[2][2].row).toBe(2);
      expect(board.grid[2][2].col).toBe(2);
    });
  });

  describe('getCell', () => {
    it('should return cell at given position', () => {
      const board = new Board(3, 3);

      const cell = board.getCell(1, 2);

      expect(cell).toBeInstanceOf(Cell);
      expect(cell.row).toBe(1);
      expect(cell.col).toBe(2);
    });

    it('should return null for out-of-bounds position', () => {
      const board = new Board(3, 3);

      expect(board.getCell(-1, 0)).toBeNull();
      expect(board.getCell(0, -1)).toBeNull();
      expect(board.getCell(3, 0)).toBeNull();
      expect(board.getCell(0, 3)).toBeNull();
    });
  });

  describe('getNeighbors', () => {
    it('should return 8 neighbors for center cell', () => {
      const board = new Board(3, 3);

      const neighbors = board.getNeighbors(1, 1);

      expect(neighbors.length).toBe(8);
    });

    it('should return 3 neighbors for corner cell', () => {
      const board = new Board(3, 3);

      const neighbors = board.getNeighbors(0, 0);

      expect(neighbors.length).toBe(3);
    });
  });

  describe('placeMines', () => {
    it('should place correct number of mines', () => {
      const board = new Board(5, 5);

      board.placeMines(5);

      let mineCount = 0;
      for (let row = 0; row < board.rows; row++) {
        for (let col = 0; col < board.cols; col++) {
          if (board.getCell(row, col).isMine) {
            mineCount++;
          }
        }
      }

      expect(mineCount).toBe(5);
    });
  });
});
