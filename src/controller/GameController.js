import { Board } from '../game/Board.js';

export class GameController {
  constructor() {
    this.board = null;
    this.status = 'idle';
    this.isFirstClick = true;
  }

  startNewGame(rows, cols, mineCount) {
    this.board = new Board(rows, cols);
    this.board.placeMines(mineCount);
    this.board.calculateAdjacentMines();
    this.status = 'playing';
    this.isFirstClick = true;
  }

  handleCellClick(row, col) {
    if (this.status !== 'playing') {
      return;
    }

    this.board.revealCell(row, col);
    this.isFirstClick = false;

    // Check win/lose conditions
    if (this.board.isGameLost()) {
      this.status = 'lost';
    } else if (this.board.isGameWon()) {
      this.status = 'won';
    }
  }

  getGameState() {
    return {
      board: this.board,
      status: this.status
    };
  }
}
