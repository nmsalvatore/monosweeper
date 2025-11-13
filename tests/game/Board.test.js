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

  describe('calculateAdjacentMines', () => {
    it('should set correct adjacent mine counts', () => {
      const board = new Board(3, 3);
      // Manually place mines in known positions
      // Layout: M M .
      //         . . .
      //         . . .
      board.getCell(0, 0).setMine();
      board.getCell(0, 1).setMine();

      board.calculateAdjacentMines();

      // Cell at (0, 2) has 1 adjacent mine (0,1)
      expect(board.getCell(0, 2).adjacentMines).toBe(1);
      // Cell at (1, 0) has 2 adjacent mines (0,0 and 0,1)
      expect(board.getCell(1, 0).adjacentMines).toBe(2);
      // Cell at (1, 1) has 2 adjacent mines (0,0 and 0,1)
      expect(board.getCell(1, 1).adjacentMines).toBe(2);
      // Cell at (2, 2) has 0 adjacent mines
      expect(board.getCell(2, 2).adjacentMines).toBe(0);
    });
  });

  describe('revealCell', () => {
    it('should reveal a non-mine cell', () => {
      const board = new Board(3, 3);

      board.revealCell(1, 1);

      expect(board.getCell(1, 1).isRevealed).toBe(true);
    });

    it('should trigger flood-fill for empty cells with 0 adjacent mines', () => {
      const board = new Board(5, 5);
      // Place a mine in corner so center area has 0 adjacent mines
      board.getCell(0, 0).setMine();
      board.calculateAdjacentMines();

      // Reveal a cell far from the mine (should trigger flood-fill)
      board.revealCell(4, 4);

      // All cells with 0 adjacent mines connected to (4,4) should be revealed
      // Plus their neighbors with adjacentMines > 0
      expect(board.getCell(4, 4).isRevealed).toBe(true);
      expect(board.getCell(3, 3).isRevealed).toBe(true);
      expect(board.getCell(2, 2).isRevealed).toBe(true);
      // Cell (1,1) should also be revealed as part of flood-fill
      expect(board.getCell(1, 1).isRevealed).toBe(true);
    });
  });

  describe('isGameWon', () => {
    it('should return true when all non-mine cells are revealed', () => {
      const board = new Board(3, 3);
      board.getCell(0, 0).setMine();
      board.calculateAdjacentMines();

      // Reveal all non-mine cells
      for (let row = 0; row < board.rows; row++) {
        for (let col = 0; col < board.cols; col++) {
          const cell = board.getCell(row, col);
          if (!cell.isMine) {
            cell.reveal();
          }
        }
      }

      expect(board.isGameWon()).toBe(true);
    });
  });

  describe('isGameLost', () => {
    it('should return true when a mine is revealed', () => {
      const board = new Board(3, 3);
      board.getCell(1, 1).setMine();

      board.getCell(1, 1).reveal();

      expect(board.isGameLost()).toBe(true);
    });

    it('should return false when no mines are revealed', () => {
      const board = new Board(3, 3);
      board.getCell(1, 1).setMine();

      board.getCell(0, 0).reveal();

      expect(board.isGameLost()).toBe(false);
    });
  });
});
