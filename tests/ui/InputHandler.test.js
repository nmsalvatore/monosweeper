import { describe, it, expect, beforeEach, vi } from 'vitest';
import { InputHandler } from '../../src/ui/InputHandler.js';
import { JSDOM } from 'jsdom';

describe('InputHandler', () => {
  let dom;
  let container;
  let mockGameController;

  beforeEach(() => {
    // Create a fresh DOM for each test
    dom = new JSDOM('<!DOCTYPE html><div id="container"></div>');
    global.document = dom.window.document;
    global.window = dom.window;

    container = document.getElementById('container');

    // Create a mock GameController
    mockGameController = {
      handleCellClick: vi.fn(),
      handleCellRightClick: vi.fn()
    };
  });

  // Test 36: Should accept container and gameController in constructor
  it('should accept container and gameController in constructor', () => {
    const inputHandler = new InputHandler(container, mockGameController);

    expect(inputHandler.container).toBe(container);
    expect(inputHandler.gameController).toBe(mockGameController);
  });

  // Test 37: Should attach click event listener to container
  it('should attach click event listener to container', () => {
    const addEventListenerSpy = vi.spyOn(container, 'addEventListener');

    new InputHandler(container, mockGameController);

    expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
  });

  // Test 38: Should call gameController.handleCellClick with correct row/col on cell click
  it('should call gameController.handleCellClick with correct row/col on cell click', () => {
    new InputHandler(container, mockGameController);

    // Create a cell element and simulate a click
    const cellElement = document.createElement('div');
    cellElement.setAttribute('data-row', '2');
    cellElement.setAttribute('data-col', '3');
    container.appendChild(cellElement);

    // Simulate click on the cell
    cellElement.click();

    expect(mockGameController.handleCellClick).toHaveBeenCalledWith(2, 3);
  });
});
