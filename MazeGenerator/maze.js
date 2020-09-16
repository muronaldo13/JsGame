import Cell from './cell.js';
import {
  WIDTH,
  HEIGHT,
  WIDTH_PER_CELL,
  getOppositePosition,
} from './constants.js';

const cols = Math.floor(WIDTH / WIDTH_PER_CELL);
const rows = Math.floor(HEIGHT / WIDTH_PER_CELL);
const canvas = document.getElementById('maze');
const ctx = canvas.getContext('2d');

canvas.width = WIDTH;
canvas.height = HEIGHT;

const ALL_CELLS = preSetupCells();
generateMaze(ALL_CELLS);
draw(ALL_CELLS);

async function generateMaze(ALL_CELLS) {
  let visitedStack = [];
  let currentCell = ALL_CELLS[0];
  do {
    currentCell.visited = true;
    const neighbors = currentCell.getAvailableNeighbors(ALL_CELLS);
    if (neighbors.length) {
      visitedStack.push(currentCell);
      const nextNeighborInfo = neighbors.splice(
        Math.floor(Math.random() * neighbors.length),
        1
      )[0];
      const nextNeighborCell = nextNeighborInfo.cell;
      currentCell.edges[nextNeighborInfo.position] = false;
      nextNeighborCell.edges[
        getOppositePosition(nextNeighborInfo.position)
      ] = false;
      currentCell = nextNeighborCell;
    } else {
      currentCell = visitedStack.pop();
    }
  } while (visitedStack.length);
}

function preSetupCells() {
  const ALL_CELLS = [];
  for (let i = 0; i < rows; i++) {
    for (let k = 0; k < cols; k++) {
      ALL_CELLS.push(new Cell(k, i, ctx));
    }
  }
  return ALL_CELLS;
}

function setupBackgroundCanvas() {
  ctx.beginPath();
  ctx.rect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = 'black';
  ctx.fill();
}

function draw(ALL_CELLS) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setupBackgroundCanvas();
  for (const cell of ALL_CELLS) {
    cell.show();
  }
}
