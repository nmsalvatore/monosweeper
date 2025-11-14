import { Board } from '../game/Board.js';

export class GameController {
  constructor() {
    this.board = null;
    this.status = 'idle';
    this.isFirstClick = true;
    this.rows = 0;
    this.cols = 0;
    this.mineCount = 0;
    this.hitMineCell = null;  // Track which mine was clicked (game over)
  }

  startNewGame(rows, cols, mineCount) {
    this.rows = rows;
    this.cols = cols;
    this.mineCount = mineCount;
    this.board = new Board(rows, cols);
    this.board.placeMines(mineCount);
    this.board.calculateAdjacentMines();
    this.status = 'playing';
    this.isFirstClick = true;
    this.hitMineCell = null;
  }

  handleCellClick(row, col) {
    if (this.status !== 'playing') {
      return;
    }

    // First-click guarantee: if first click hits a mine, regenerate board
    if (this.isFirstClick) {
      const cell = this.board.getCell(row, col);
      if (cell.isMine) {
        // Regenerate board until clicked cell is not a mine
        while (this.board.getCell(row, col).isMine) {
          this.board = new Board(this.rows, this.cols);
          this.board.placeMines(this.mineCount);
          this.board.calculateAdjacentMines();
        }
      }
    }

    this.board.revealCell(row, col);
    this.isFirstClick = false;

    // Check win/lose conditions
    if (this.board.isGameLost()) {
      this.status = 'lost';
      // Track which mine was hit
      const cell = this.board.getCell(row, col);
      if (cell.isMine && cell.isRevealed) {
        this.hitMineCell = { row, col };
      }
    } else if (this.board.isGameWon()) {
      this.status = 'won';
    }
  }

  handleCellRightClick(row, col) {
    if (this.status !== 'playing') {
      return;
    }

    const cell = this.board.getCell(row, col);
    cell.toggleFlag();
  }

  getGameState() {
    return {
      board: this.board,
      status: this.status,
      hitMineCell: this.hitMineCell
    };
  }
}
