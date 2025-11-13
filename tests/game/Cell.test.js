import { describe, it, expect } from 'vitest';
import { Cell } from '../../src/game/Cell.js';

describe('Cell', () => {
  describe('initialization', () => {
    it('should create a cell with row and column position', () => {
      const cell = new Cell(0, 0);

      expect(cell.row).toBe(0);
      expect(cell.col).toBe(0);
    });

    it('should initialize with default state', () => {
      const cell = new Cell(2, 3);

      expect(cell.isMine).toBe(false);
      expect(cell.isRevealed).toBe(false);
      expect(cell.isFlagged).toBe(false);
      expect(cell.adjacentMines).toBe(0);
    });
  });

  describe('reveal', () => {
    it('should reveal a hidden cell', () => {
      const cell = new Cell(0, 0);

      cell.reveal();

      expect(cell.isRevealed).toBe(true);
    });

    it('should not reveal a flagged cell', () => {
      const cell = new Cell(0, 0);
      cell.toggleFlag();

      cell.reveal();

      expect(cell.isRevealed).toBe(false);
    });
  });

  describe('toggleFlag', () => {
    it('should flag an unflagged cell', () => {
      const cell = new Cell(0, 0);

      cell.toggleFlag();

      expect(cell.isFlagged).toBe(true);
    });

    it('should unflag a flagged cell', () => {
      const cell = new Cell(0, 0);
      cell.toggleFlag();

      cell.toggleFlag();

      expect(cell.isFlagged).toBe(false);
    });

    it('should not flag a revealed cell', () => {
      const cell = new Cell(0, 0);
      cell.reveal();

      cell.toggleFlag();

      expect(cell.isFlagged).toBe(false);
    });
  });

  describe('setMine', () => {
    it('should mark cell as a mine', () => {
      const cell = new Cell(0, 0);

      cell.setMine();

      expect(cell.isMine).toBe(true);
    });
  });

  describe('setAdjacentMines', () => {
    it('should set the adjacent mine count', () => {
      const cell = new Cell(0, 0);

      cell.setAdjacentMines(3);

      expect(cell.adjacentMines).toBe(3);
    });
  });
});
