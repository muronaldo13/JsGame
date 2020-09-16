import {
  updateFallingShape as updateFallingShapePosition,
  drawCell,
  drawCurrentShape,
  renderNextShape,
} from './falling_shape.js';

import {
  MAX_HEIGHT_CELL,
  MAX_WIDTH_CELL,
  GAME_SPEED,
  CHARGING_SPEED,
  TURN_LEFT,
  TURN_RIGHT,
} from './constants.js';

const GAME_BOARD = document.querySelector('.gameboard');
const NEXT_BOARD = document.querySelector('.nextboard');
GAME_BOARD.style['grid-template-rows'] = `repeat(${MAX_HEIGHT_CELL}, 1fr)`;
GAME_BOARD.style['grid-template-columns'] = `repeat(${MAX_WIDTH_CELL}, 1fr)`;

let CURRENT_GAME_SPEED = GAME_SPEED;

let occupiedCellMap = (() => {
  const localOccupiedCellMap = new Map();
  for (let i = 1; i <= MAX_HEIGHT_CELL; i++) {
    localOccupiedCellMap.set(i, []);
  }
  return localOccupiedCellMap;
})();

function gameLoop() {
  let gamePlay = setTimeout(() => {
    update();
    gameLoop();
  }, CURRENT_GAME_SPEED);
}

function update(turn, isFlip) {
  const updatedMap = updateFallingShapePosition(occupiedCellMap, turn, isFlip);
  if (updatedMap || checkRemoveLine()) {
    if (updatedMap) {
      occupiedCellMap = updatedMap;
    }
    redrawGameBoard();
  } else {
    drawCurrentShape(GAME_BOARD);
  }
  renderNextShape(NEXT_BOARD);
}

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      update(TURN_LEFT);
      break;
    case 'ArrowRight':
      update(TURN_RIGHT);
      break;
    case 'ArrowUp':
      update(null, true);
      break;
    case 'ArrowDown':
      CURRENT_GAME_SPEED = CHARGING_SPEED;
      break;
    default:
      return;
  }
});

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'ArrowDown':
      CURRENT_GAME_SPEED = GAME_SPEED;
      break;
    default:
      return;
  }
});

function redrawGameBoard() {
  GAME_BOARD.innerHTML = '';
  for (const [rowNo, cells] of occupiedCellMap) {
    for (const cell of cells) {
      drawCell(cell, GAME_BOARD);
    }
  }
  drawCurrentShape(GAME_BOARD);
}

function checkRemoveLine() {
  function updateCellElements(shiftLineCount, cells) {
    for (const cell of cells) {
      cell.x += shiftLineCount;
    }
  }

  let shiftLineCount = 0;
  for (let lineNo = MAX_HEIGHT_CELL; lineNo > 0; lineNo--) {
    let lineToCopyFrom = lineNo - shiftLineCount;
    if (lineToCopyFrom > 0) {
      occupiedCellMap.set(lineNo, occupiedCellMap.get(lineNo - shiftLineCount));
      updateCellElements(shiftLineCount, occupiedCellMap.get(lineNo));
    }
    while (occupiedCellMap.get(lineNo).length === 10) {
      shiftLineCount++;
      lineToCopyFrom = lineNo - shiftLineCount;
      if (lineToCopyFrom == 0) return shiftLineCount > 0;
      occupiedCellMap.set(lineNo, occupiedCellMap.get(lineToCopyFrom));
      updateCellElements(shiftLineCount, occupiedCellMap.get(lineNo));
    }
  }
  return shiftLineCount > 0;
}

gameLoop();
