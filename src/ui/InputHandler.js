export class InputHandler {
  constructor(container, gameController) {
    this.container = container;
    this.gameController = gameController;

    // Bind event handlers to preserve 'this' context
    this.boundHandleClick = this.handleClick.bind(this);
    this.boundHandleContextMenu = this.handleContextMenu.bind(this);

    // Attach event listeners
    this.container.addEventListener('click', this.boundHandleClick);
    this.container.addEventListener('contextmenu', this.boundHandleContextMenu);
  }

  /**
   * Extracts and validates cell coordinates from a target element's data attributes.
   * @param {HTMLElement} target - The clicked element
   * @returns {{row: number, col: number} | null} Validated coordinates or null if invalid
   */
  _getCellCoordinates(target) {
    const row = target.getAttribute('data-row');
    const col = target.getAttribute('data-col');

    // Check if both attributes exist
    if (row === null || col === null) {
      return null;
    }

    // Parse string values to integers
    const rowNum = parseInt(row, 10);
    const colNum = parseInt(col, 10);

    // Validate parsed integers (reject NaN from invalid/empty strings)
    if (isNaN(rowNum) || isNaN(colNum)) {
      return null;
    }

    return { row: rowNum, col: colNum };
  }

  handleClick(event) {
    const coords = this._getCellCoordinates(event.target);
    if (coords) {
      this.gameController.handleCellClick(coords.row, coords.col);
    }
  }

  handleContextMenu(event) {
    const coords = this._getCellCoordinates(event.target);
    if (coords) {
      event.preventDefault();
      this.gameController.handleCellRightClick(coords.row, coords.col);
    }
  }

  destroy() {
    this.container.removeEventListener('click', this.boundHandleClick);
    this.container.removeEventListener('contextmenu', this.boundHandleContextMenu);
  }
}
