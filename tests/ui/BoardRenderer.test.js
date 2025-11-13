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

    it('should add cell-revealed class to revealed cells', () => {
      // Reveal a cell
      board.getCell(1, 1).reveal();
      renderer.render();

      const revealedCell = container.querySelector('[data-row="1"][data-col="1"]');
      expect(revealedCell.classList.contains('cell-revealed')).toBe(true);
      expect(revealedCell.classList.contains('cell-hidden')).toBe(false);
    });

    it('should add cell-flagged class to flagged cells', () => {
      // Flag a cell
      board.getCell(0, 0).toggleFlag();
      renderer.render();

      const flaggedCell = container.querySelector('[data-row="0"][data-col="0"]');
      expect(flaggedCell.classList.contains('cell-flagged')).toBe(true);
    });
  });

  describe('cell content display', () => {
    it('should display adjacent mine count on revealed cells with mines nearby', () => {
      // Set up a cell with adjacent mines
      const cell = board.getCell(1, 1);
      cell.setAdjacentMines(3);
      cell.reveal();
      renderer.render();

      const cellElement = container.querySelector('[data-row="1"][data-col="1"]');
      expect(cellElement.textContent).toBe('3');
    });

    it('should display empty content on revealed cells with 0 adjacent mines', () => {
      // Set up a cell with 0 adjacent mines
      const cell = board.getCell(2, 2);
      cell.setAdjacentMines(0);
      cell.reveal();
      renderer.render();

      const cellElement = container.querySelector('[data-row="2"][data-col="2"]');
      expect(cellElement.textContent).toBe('');
    });

    it('should display mine symbol on revealed mine cells', () => {
      // Set up a mine cell and reveal it
      const cell = board.getCell(0, 0);
      cell.setMine();
      cell.reveal();
      renderer.render();

      const mineCell = container.querySelector('[data-row="0"][data-col="0"]');
      expect(mineCell.textContent).toBe('💣');
    });

    it('should display flag symbol on flagged cells', () => {
      // Flag a cell
      const cell = board.getCell(1, 0);
      cell.toggleFlag();
      renderer.render();

      const flaggedCell = container.querySelector('[data-row="1"][data-col="0"]');
      expect(flaggedCell.textContent).toBe('🚩');
    });
  });

  describe('grid layout', () => {
    it('should set CSS grid-template properties based on board dimensions', () => {
      renderer.render();

      const boardElement = container.querySelector('.board');
      expect(boardElement.style.gridTemplateRows).toBe('repeat(3, 1fr)');
      expect(boardElement.style.gridTemplateColumns).toBe('repeat(3, 1fr)');
    });
  });

  describe('re-rendering', () => {
    it('should clear and re-render when render() called multiple times', () => {
      // Initial render
      renderer.render();
      expect(container.querySelectorAll('.board').length).toBe(1);
      expect(container.querySelectorAll('.cell').length).toBe(9);

      // Change game state
      board.getCell(0, 0).reveal();

      // Re-render
      renderer.render();

      // Should still have only one board and 9 cells
      expect(container.querySelectorAll('.board').length).toBe(1);
      expect(container.querySelectorAll('.cell').length).toBe(9);

      // The revealed cell should have the correct class
      const revealedCell = container.querySelector('[data-row="0"][data-col="0"]');
      expect(revealedCell.classList.contains('cell-revealed')).toBe(true);
    });
  });
});
