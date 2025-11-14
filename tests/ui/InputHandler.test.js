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

  // Test 39: Should attach contextmenu event listener to container
  it('should attach contextmenu event listener to container', () => {
    const addEventListenerSpy = vi.spyOn(container, 'addEventListener');

    new InputHandler(container, mockGameController);

    expect(addEventListenerSpy).toHaveBeenCalledWith('contextmenu', expect.any(Function));
  });

  // Test 40: Should call gameController.handleCellRightClick with correct row/col on cell right-click
  it('should call gameController.handleCellRightClick with correct row/col on cell right-click', () => {
    new InputHandler(container, mockGameController);

    // Create a cell element
    const cellElement = document.createElement('div');
    cellElement.setAttribute('data-row', '1');
    cellElement.setAttribute('data-col', '4');
    container.appendChild(cellElement);

    // Simulate right-click (contextmenu event) on the cell
    const contextMenuEvent = new dom.window.MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true
    });
    cellElement.dispatchEvent(contextMenuEvent);

    expect(mockGameController.handleCellRightClick).toHaveBeenCalledWith(1, 4);
  });

  // Test 41: Should prevent default context menu behavior
  it('should prevent default context menu behavior', () => {
    new InputHandler(container, mockGameController);

    // Create a cell element
    const cellElement = document.createElement('div');
    cellElement.setAttribute('data-row', '0');
    cellElement.setAttribute('data-col', '0');
    container.appendChild(cellElement);

    // Simulate right-click (contextmenu event) on the cell
    const contextMenuEvent = new dom.window.MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true
    });
    const preventDefaultSpy = vi.spyOn(contextMenuEvent, 'preventDefault');

    cellElement.dispatchEvent(contextMenuEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  // Test 42: Should ignore clicks on non-cell elements (no data-row/data-col attributes)
  it('should ignore clicks on non-cell elements (no data-row/data-col attributes)', () => {
    new InputHandler(container, mockGameController);

    // Create a non-cell element without data attributes
    const nonCellElement = document.createElement('div');
    container.appendChild(nonCellElement);

    // Simulate click on the non-cell element
    nonCellElement.click();

    // Should not call handleCellClick
    expect(mockGameController.handleCellClick).not.toHaveBeenCalled();
  });

  // Test 43: Should ignore right-clicks on non-cell elements
  it('should ignore right-clicks on non-cell elements', () => {
    new InputHandler(container, mockGameController);

    // Create a non-cell element without data attributes
    const nonCellElement = document.createElement('div');
    container.appendChild(nonCellElement);

    // Simulate right-click on the non-cell element
    const contextMenuEvent = new dom.window.MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true
    });
    nonCellElement.dispatchEvent(contextMenuEvent);

    // Should not call handleCellRightClick
    expect(mockGameController.handleCellRightClick).not.toHaveBeenCalled();
  });

  // Test 44: Should ignore clicks on elements with invalid data-row (NaN injection)
  it('should ignore clicks on elements with invalid data-row (NaN injection)', () => {
    new InputHandler(container, mockGameController);

    // Create element with invalid data-row
    const invalidElement = document.createElement('div');
    invalidElement.setAttribute('data-row', 'invalid');
    invalidElement.setAttribute('data-col', '0');
    container.appendChild(invalidElement);

    // Simulate click
    invalidElement.click();

    // Should not call handleCellClick with NaN
    expect(mockGameController.handleCellClick).not.toHaveBeenCalled();
  });

  // Test 45: Should ignore clicks on elements with empty data attributes
  it('should ignore clicks on elements with empty data attributes', () => {
    new InputHandler(container, mockGameController);

    // Create element with empty data-row
    const emptyElement = document.createElement('div');
    emptyElement.setAttribute('data-row', '');
    emptyElement.setAttribute('data-col', '5');
    container.appendChild(emptyElement);

    // Simulate click
    emptyElement.click();

    // Should not call handleCellClick
    expect(mockGameController.handleCellClick).not.toHaveBeenCalled();
  });

  // Test 46: Should ignore clicks on elements with only partial attributes
  it('should ignore clicks on elements with only partial attributes', () => {
    new InputHandler(container, mockGameController);

    // Create element with only data-row (missing data-col)
    const partialElement = document.createElement('div');
    partialElement.setAttribute('data-row', '2');
    container.appendChild(partialElement);

    // Simulate click
    partialElement.click();

    // Should not call handleCellClick
    expect(mockGameController.handleCellClick).not.toHaveBeenCalled();
  });

  // Test 47: Should remove event listeners when destroy() is called
  it('should remove event listeners when destroy() is called', () => {
    const inputHandler = new InputHandler(container, mockGameController);

    // Create a cell element
    const cellElement = document.createElement('div');
    cellElement.setAttribute('data-row', '1');
    cellElement.setAttribute('data-col', '1');
    container.appendChild(cellElement);

    // Call destroy
    inputHandler.destroy();

    // Simulate click after destroy
    cellElement.click();

    // Should not call handleCellClick after destroy
    expect(mockGameController.handleCellClick).not.toHaveBeenCalled();
  });
});
