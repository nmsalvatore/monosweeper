import { describe, it, expect } from 'vitest';
import { GameController } from '../../src/controller/GameController.js';

describe('GameController', () => {
  describe('initialization', () => {
    it('should initialize a new game with specified dimensions and mine count', () => {
      const controller = new GameController();

      controller.startNewGame(5, 5, 5);

      const state = controller.getGameState();
      expect(state.board).toBeDefined();
      expect(state.board.rows).toBe(5);
      expect(state.board.cols).toBe(5);
      expect(state.status).toBe('playing');
    });
  });

  describe('handleCellClick', () => {
    it('should reveal a cell when clicked', () => {
      const controller = new GameController();
      controller.startNewGame(5, 5, 2);
      // Mark as not first click
      controller.isFirstClick = false;

      controller.handleCellClick(2, 2);

      const cell = controller.board.getCell(2, 2);
      expect(cell.isRevealed).toBe(true);
    });
  });
});
