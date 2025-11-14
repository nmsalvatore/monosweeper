# Minesweeper Web App

## Project Overview
A modern, mobile-responsive Minesweeper game built with vanilla JavaScript, HTML, and CSS using Test-Driven Development (TDD).

## Technical Decisions

### Stack
- **Vanilla JavaScript** with ES modules
- **Vitest** for testing (fast, native ES module support)
- **Vite** for development server and bundling
- **jsdom** for DOM testing if needed

### Architecture: MVC Pattern

**1. Game Logic Layer** (`src/game/`)
- Pure JavaScript, framework-agnostic
- Fully unit tested
- No DOM dependencies
- Components:
  - `Cell.js` - Cell state model (hidden/revealed/flagged, isMine, adjacentMines)
  - `Board.js` - Game state, board grid, game rules
  - `MineGenerator.js` - Mine placement algorithms

**2. View Layer** (`src/ui/`)
- DOM manipulation and rendering
- Event handling
- Components:
  - `BoardRenderer.js` - Renders game state to DOM
  - `InputHandler.js` - Mouse and touch event handling

**3. Controller Layer** (`src/controller/`)
- `GameController.js` - Orchestrates game logic and UI updates

## Game Features

### Core Gameplay (Phase 1)
- Click to reveal cells
- Right-click to flag (desktop)
- Long-press to flag (mobile, ~500ms)
- First-click guarantee (never hit mine on first click)
- Flood-fill algorithm (auto-reveal connected empty cells)
- Chord clicking (click satisfied numbers to reveal adjacent cells)
- Win/lose detection

### Initial Settings
- **Beginner mode**: 9×9 grid, 10 mines
- Mobile-responsive design
- Modern UI aesthetic

## TDD Development Plan

### Phase 1: Core Data Structures
1. Cell class with state management
2. Board initialization

### Phase 2: Mine Placement
3. Random mine placement algorithm
4. First-click guarantee implementation
5. Adjacent mine count calculation

### Phase 3: Game Actions
6. Reveal cell logic
7. Flood-fill algorithm for empty cells
8. Flag/unflag functionality
9. Chord clicking implementation

### Phase 4: Game State
10. Win condition detection
11. Loss condition detection

### Phase 5: UI Layer
12. Board rendering
13. Mouse event handling (left/right/middle click)
14. Touch event handling (tap/long-press)
15. CSS styling and responsive design

## Mobile UX Decisions
- **Flagging**: Long-press (~500ms) with visual feedback
- **Chord clicking**: Tap on satisfied numbers
- **Prevent**: Context menus on long-press
- **Responsive**: Touch-friendly cell sizes, scales for desktop

## Development Workflow
**IMPORTANT: One test at a time!**
- **Red**: Write ONE failing test (logged to `tdd-log.json`)
- **Green**: Write minimal code to pass that test (logged to `tdd-log.json`)
- **Commit**: Automated commit after every passing test (test-driven commits)
- **Check-in**: Confirm with user when:
  - A logical feature/class is complete
  - OR after 5-10 tests if it's a longer sequence
  - OR before moving to a new phase/module
- **Refactor**: Improve code while keeping tests green (when needed)

This strict TDD cycle ensures proper test coverage and prevents over-implementation.

### Git Workflow
- **Conventional Commits**: All commits use conventional commit format (test:, feat:, refactor:, etc.)
- **Feature Branches**: Each new class/feature gets its own branch (e.g., `feature/board-class`)
- **Test-Driven Commits**: ommit after every passing test
- **Main Branch**: Prompt user before merging feature branches to main
- **Commit Format**: `test(Module): description` or `feat(Module): description`

### TDD Progress Tracking
All RED-GREEN cycles are logged to `tdd-log.json` with:
- Test ID and module name
- Test description
- Timestamps for RED and GREEN phases
- Implementation notes
- Current test status

### Planning & Progress Workflow
- **PLAN.md**: Detailed test-by-test plan for complex features
- **Update PLAN.md**: After each phase completes, mark tests as complete
- **Feature Phases**: Break large features into phases (A, B, C, D)
- **Commit After Completion**: Update PLAN.md and commit when phase completes
- **Benefits**: Clear roadmap, track progress, easy to resume work

## Current Status

### Completed ✅
- [x] **Project initialization** - Vite, Vitest, folder structure, git workflow
- [x] **Phase 1: Core Data Structures**
  - Cell class (5 tests) - position, state, reveal, flag, setMine, setAdjacentMines
  - Board class (14 tests) - grid initialization, getCell, getNeighbors, placeMines, calculateAdjacentMines, revealCell with flood-fill, win/lose detection
- [x] **Phase 3: Game Controller**
  - GameController class (4 tests) - orchestrates game flow
  - First-click guarantee (board regeneration)
  - Game state management (idle → playing → won/lost)
  - handleCellClick and handleCellRightClick
  - Clean API for UI layer via getGameState
- [x] **Phase 4: BoardRenderer (UI Layer)**
  - BoardRenderer class (12 tests) - complete with TDD
  - **Phase A**: Cell state classes (hidden, revealed, flagged)
  - **Phase B**: Cell content display (numbers, mines 💣, flags 🚩)
  - **Phase C**: CSS grid layout (responsive)
  - **Phase D**: Re-rendering support for state updates
- [x] **Phase 5: InputHandler (UI Layer)**
  - InputHandler class (12 tests) - complete with TDD
  - **Phase A**: Basic setup & click handling
  - **Phase B**: Right-click handling with preventDefault
  - **Phase C**: Edge cases for non-cell elements
  - **Phase D**: Security & robustness (NaN validation, destroy method)

**Total: 51 tests passing | 47 TDD cycles logged**

**All core game logic + UI event handling complete and production-ready!** 🎉

### Next Steps 🚀
**Professional Strategy**: Core business logic and event handling complete. Now wire everything together:

1. **Create Playable Prototype** (Quick iteration to validate UX)
   - [x] Build InputHandler - simple event delegation (clicks → GameController)
   - [ ] Wire main.js - connect BoardRenderer + InputHandler + GameController
   - [ ] Add board/cell CSS - styling for playable game
   - [ ] Manual testing - play the game, find issues

2. **Iterate & Polish**
   - [ ] Fix UX issues discovered during play
   - [ ] Improve visual design
   - [ ] Mobile touch support (long-press for flags)
   - [ ] Add missing features as needed

3. **Optional Enhancements**
   - [ ] Timer
   - [ ] Mine counter
   - [ ] Difficulty levels (beginner/intermediate/expert)
   - [ ] High scores

### Development Philosophy
- ✅ **Use TDD for complex business logic** (Cell, Board, GameController)
- ✅ **Use TDD for complex UI rendering** (BoardRenderer with state management)
- 🎯 **Build thin integration layers quickly** (InputHandler, main.js)
- 🎯 **Validate with manual testing** - get to playable ASAP
- 🎯 **Add tests when bugs are found** - let real usage drive test additions

## Running the Project

### Current Status: Ready for Integration
Right now the game is **fully functional at the logic level** with production-ready event handling. All 51 tests pass! Just need to wire everything together in main.js and add CSS.

```bash
# Install dependencies
npm install

# Run all tests
npm test -- --run

# Run tests in watch mode (auto re-run on changes)
npm test

# Run specific test file
npm test tests/ui/BoardRenderer.test.js

# View test coverage
npm test -- --coverage
```

### Future: Playable Game
Once InputHandler, HTML, CSS, and main.js are built:

```bash
# Run dev server to play in browser
npm run dev

# Build for production
npm run build
```

## Notes
- ES modules used throughout
- Chord clicking is an original Minesweeper feature (both mouse buttons/middle-click)
- First click guarantee may require board regeneration
