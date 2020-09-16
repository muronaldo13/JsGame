import { ALL_SHAPES, MAX_HEIGHT_CELL, MAX_WIDTH_CELL } from './constants.js';

const shapes = {
  currentShapeElements: [],
  currentShape: generateRandomShape(),
  nextShape: generateRandomShape(),
};

function generateRandomShape() {
  const randomNumber = Math.floor(Math.random() * 7);
  return JSON.parse(JSON.stringify(ALL_SHAPES[randomNumber]));
}

function newShape() {
  shapes.currentShape = JSON.parse(JSON.stringify(shapes.nextShape));
  shapes.nextShape = generateRandomShape();
  shapes.currentShapeElements = [];
}

export function drawCell(cell, gameBoard) {
  if (cell.x > 0) {
    const cellElement = document.createElement('div');
    cellElement.className = 'cell-element';
    cellElement.style.gridRowStart = cell.x;
    cellElement.style.gridColumnStart = cell.y;
    cellElement.style.background = cell.color;
    gameBoard.appendChild(cellElement);
    return cellElement;
  }
  return null;
}

export function drawCurrentShape(gameBoard) {
  if (shapes.currentShapeElements.length > 0) {
    for (const element of shapes.currentShapeElements) {
      gameBoard.removeChild(element);
    }
    shapes.currentShapeElements = [];
  }
  for (const val of shapes.currentShape.values) {
    const newElement = drawCell(val, gameBoard);
    if (newElement != null) {
      shapes.currentShapeElements.push(newElement);
    }
  }
}

function isNextTurnPositionCollide(nextTurnPosition, occupiedCellMap) {
  return occupiedCellMap
    .get(nextTurnPosition.x)
    .some(
      (cell) => cell.x === nextTurnPosition.x && cell.y === nextTurnPosition.y
    );
}

function isNextFallPositionCollide(nextFallPosition, occupiedCellMap) {
  return (
    nextFallPosition.x > 0 &&
    occupiedCellMap
      .get(nextFallPosition.x)
      .some(
        (cell) => cell.x === nextFallPosition.x && cell.y === nextFallPosition.y
      )
  );
}

function incrementFlipIndex() {
  shapes.currentShape.flipMovement.currentFlipIndex += 1;
  if (
    shapes.currentShape.flipMovement.currentFlipIndex ===
    shapes.currentShape.flipMovement.flipList.length
  ) {
    shapes.currentShape.flipMovement.currentFlipIndex = 0;
  }
}

export function updateFallingShape(occupiedCellMap, turn, isFlip) {
  function checkTurnableOrUpdateFallThenCheckShapeFinish() {
    let drawNewShape = false;
    let turnable = true;
    let flipAdjustY = 0;
    if (isFlip) {
      incrementFlipIndex();
    }
    const currentFlipIndex = shapes.currentShape.flipMovement.currentFlipIndex;
    for (const [index, val] of shapes.currentShape.values.entries()) {
      if (turn) {
        const nextTurnPosition = { x: val.x, y: val.y + turn };
        if (
          (turn > 0 && val.y === MAX_WIDTH_CELL) ||
          (turn < 0 && val.y === 1) ||
          isNextTurnPositionCollide(nextTurnPosition, newOccupiedCellMap)
        ) {
          turnable = false;
        }
      }
      if (isFlip) {
        const newValY =
          val.y +
          shapes.currentShape.flipMovement.flipList[currentFlipIndex][index].y;
        if (newValY < 1 && Math.abs(1 - newValY) > flipAdjustY) {
          flipAdjustY = Math.abs(1 - newValY);
        } else if (
          newValY > MAX_WIDTH_CELL &&
          MAX_WIDTH_CELL - newValY < flipAdjustY
        ) {
          flipAdjustY = MAX_WIDTH_CELL - newValY;
        }
      }
      if (!turn && !isFlip) {
        val.x += 1;
      }
      const nextFallPosition = { x: val.x + 1, y: val.y };
      if (
        !drawNewShape &&
        (val.x === MAX_HEIGHT_CELL ||
          isNextFallPositionCollide(nextFallPosition, newOccupiedCellMap))
      ) {
        drawNewShape = true;
      }
    }
    return {
      turnable: turnable,
      drawNewShape: drawNewShape,
      flipAdjustY: flipAdjustY,
    };
  }

  function releaseAndCreateNewShapeOrTurnOrFlip(
    turnable,
    drawNewShape,
    flipAdjustY
  ) {
    const currentFlipIndex = shapes.currentShape.flipMovement.currentFlipIndex;
    for (const [index, val] of shapes.currentShape.values.entries()) {
      if (drawNewShape) {
        newOccupiedCellMap.get(val.x).push(val);
      }
      if (turnable && turn) {
        val.y += turn;
      }
      if (isFlip) {
        val.x +=
          shapes.currentShape.flipMovement.flipList[currentFlipIndex][index].x;
        val.y +=
          shapes.currentShape.flipMovement.flipList[currentFlipIndex][index].y +
          flipAdjustY;
      }
    }
  }

  let newOccupiedCellMap = new Map(occupiedCellMap);
  const {
    turnable,
    drawNewShape,
    flipAdjustY,
  } = checkTurnableOrUpdateFallThenCheckShapeFinish();
  if (turnable || drawNewShape || isFlip) {
    releaseAndCreateNewShapeOrTurnOrFlip(turnable, drawNewShape, flipAdjustY);
  }
  if (drawNewShape) {
    newShape();
    return newOccupiedCellMap;
  }
  return null;
}

export function renderNextShape(nextBoard) {
  nextBoard.innerHTML = '';
  const nextShapeCopy = JSON.parse(JSON.stringify(shapes.nextShape.values));

  for (const val of nextShapeCopy) {
    val.x += 5;
    val.y -= 2;
    const newElement = drawCell(val, nextBoard);
  }
}
