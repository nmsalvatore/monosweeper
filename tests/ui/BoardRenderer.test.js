import { describe, it, expect, beforeEach } from 'vitest';
import { BoardRenderer } from '../../src/ui/BoardRenderer.js';
import { Board } from '../../src/game/Board.js';

describe('BoardRenderer', () => {
  let container;
  let board;
  let renderer;

  beforeEach(() => {
    // Create a fresh container for each test
    container = document.createElement('div');
    board = new Board(3, 3);
    renderer = new BoardRenderer(container, board);
  });

  describe('initialization', () => {
    it('should create a board container element', () => {
      renderer.render();

      const boardElement = container.querySelector('.board');
      expect(boardElement).toBeTruthy();
    });

    it('should render correct number of cell elements', () => {
      renderer.render();

      const cells = container.querySelectorAll('.cell');
      expect(cells.length).toBe(9); // 3x3 board = 9 cells
    });

    it('should set data-row and data-col attributes on each cell', () => {
      renderer.render();

      const firstCell = container.querySelector('.cell');
      expect(firstCell.getAttribute('data-row')).toBe('0');
      expect(firstCell.getAttribute('data-col')).toBe('0');

      const lastCell = container.querySelectorAll('.cell')[8];
      expect(lastCell.getAttribute('data-row')).toBe('2');
      expect(lastCell.getAttribute('data-col')).toBe('2');
    });
  });

  describe('cell state classes', () => {
    it('should add cell-hidden class to unrevealed cells', () => {
      renderer.render();

      const cells = container.querySelectorAll('.cell');
      cells.forEach(cell => {
        expect(cell.classList.contains('cell-hidden')).toBe(true);
      });
    });
  });
});
