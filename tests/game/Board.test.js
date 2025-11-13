import { describe, it, expect } from 'vitest';
import { Board } from '../../src/game/Board.js';

describe('Board', () => {
  describe('initialization', () => {
    it('should create a board with specified rows and cols', () => {
      const board = new Board(9, 9);

      expect(board.rows).toBe(9);
      expect(board.cols).toBe(9);
    });
  });
});
