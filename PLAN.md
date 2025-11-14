# Phase 4: UI Layer - Test Plan

## BoardRenderer Test Plan

### ✅ Completed (Tests 24-26):
- [x] Test 24: Should create a board container element
- [x] Test 25: Should render correct number of cell elements
- [x] Test 26: Should set data-row and data-col attributes on each cell

### ✅ Phase A: Cell State Classes (3 tests) - COMPLETE
- [x] Test 27: Should add 'cell-hidden' class to unrevealed cells
- [x] Test 28: Should add 'cell-revealed' class to revealed cells
- [x] Test 29: Should add 'cell-flagged' class to flagged cells

### ✅ Phase B: Cell Content Display (4 tests) - COMPLETE
- [x] Test 30: Should display adjacent mine count (1-8) on revealed cells with mines nearby
- [x] Test 31: Should display empty content on revealed cells with 0 adjacent mines
- [x] Test 32: Should display mine symbol (💣) on revealed mine cells
- [x] Test 33: Should display flag symbol (🚩) on flagged cells

### ✅ Phase C: Grid Layout (1 test) - COMPLETE
- [x] Test 34: Should set CSS grid-template properties based on board dimensions (rows/cols)

### ✅ Phase D: Re-rendering (1 test) - COMPLETE
- [x] Test 35: Should clear and re-render when render() called multiple times

---

**✅ BoardRenderer COMPLETE: 12 tests passing (24-35)**

## InputHandler Test Plan

### Phase A: Basic Setup & Click Handling (3 tests)
- [ ] Test 36: Should accept container and gameController in constructor
- [ ] Test 37: Should attach click event listener to container
- [ ] Test 38: Should call gameController.handleCellClick with correct row/col on cell click

### Phase B: Right-Click Handling (3 tests)
- [ ] Test 39: Should attach contextmenu event listener to container
- [ ] Test 40: Should call gameController.handleCellRightClick with correct row/col on cell right-click
- [ ] Test 41: Should prevent default context menu behavior

### Phase C: Edge Cases (2 tests)
- [ ] Test 42: Should ignore clicks on non-cell elements (no data-row/data-col attributes)
- [ ] Test 43: Should ignore right-clicks on non-cell elements

---

**Target: 8 tests for InputHandler (36-43)**

## CSS Styling (Future)
TBD - Visual styling and responsive design

## Integration (Future)
TBD - Wire everything together in main.js
