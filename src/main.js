// Entry point for Minesweeper app
import { GameController } from './controller/GameController.js';
import { BoardRenderer } from './ui/BoardRenderer.js';
import { InputHandler } from './ui/InputHandler.js';

// Game configuration (Beginner mode)
const ROWS = 9;
const COLS = 9;
const MINES = 10;

// Global state
const container = document.getElementById('game-container');
let gameController;
let boardRenderer;
let inputHandler;

// Initialize/restart game
function startNewGame() {
  // Clean up previous game if exists
  if (inputHandler) {
    inputHandler.destroy();
  }

  // Create new game controller
  gameController = new GameController();
  gameController.startNewGame(ROWS, COLS, MINES);

  // Get initial game state
  const gameState = gameController.getGameState();

  // Create renderer
  boardRenderer = new BoardRenderer(container, gameState.board);
  boardRenderer.render();

  // Wrap GameController methods to trigger re-render after each action
  const originalHandleCellClick = gameController.handleCellClick.bind(gameController);
  const originalHandleCellRightClick = gameController.handleCellRightClick.bind(gameController);

  gameController.handleCellClick = (row, col) => {
    originalHandleCellClick(row, col);
    const gameState = gameController.getGameState();
    boardRenderer.render(gameState.hitMineCell);
    checkGameStatus();
  };

  gameController.handleCellRightClick = (row, col) => {
    originalHandleCellRightClick(row, col);
    const gameState = gameController.getGameState();
    boardRenderer.render(gameState.hitMineCell);
  };

  // Create input handler
  inputHandler = new InputHandler(container, gameController);

  console.log('New game started!');
}

// Check game status and display message
function checkGameStatus() {
  const state = gameController.getGameState();

  if (state.status === 'won') {
    setTimeout(() => alert('🎉 You won! Congratulations!'), 100);
  } else if (state.status === 'lost') {
    setTimeout(() => alert('💣 Game Over! You hit a mine.'), 100);
  }
}

// Set up New Game button
const newGameBtn = document.getElementById('new-game-btn');
newGameBtn.addEventListener('click', startNewGame);

// Start initial game
startNewGame();
