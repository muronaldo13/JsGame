import { WIDTH_PER_CELL, TOP, LEFT, BOTTOM, RIGHT } from './constants.js';

export default class Cell {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.edges = { TOP: true, LEFT: true, BOTTOM: true, RIGHT: true };
    this.visited = false;
  }

  show() {
    const { TOP, LEFT, BOTTOM, RIGHT } = this.edges;
    if (!top && !LEFT && !BOTTOM && !right) return;

    const x = this.x * WIDTH_PER_CELL;
    const y = this.y * WIDTH_PER_CELL;

    this.ctx.beginPath();

    if (TOP) {
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x + WIDTH_PER_CELL, y);
    }
    if (LEFT) {
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x, y + WIDTH_PER_CELL);
    }
    if (BOTTOM) {
      this.ctx.moveTo(x, y + WIDTH_PER_CELL);
      this.ctx.lineTo(x + WIDTH_PER_CELL, y + WIDTH_PER_CELL);
    }
    if (RIGHT) {
      this.ctx.moveTo(x + WIDTH_PER_CELL, y);
      this.ctx.lineTo(x + WIDTH_PER_CELL, y + WIDTH_PER_CELL);
    }

    this.ctx.strokeStyle = 'grey';
    this.ctx.stroke();
  }

  getAvailableNeighbors(ALL_CELLS) {
    const { x, y } = this;
    function findCell(x_to_find, y_to_find) {
      return ALL_CELLS.find(
        (cell) => cell.x === x_to_find && cell.y === y_to_find
      );
    }

    function getTopNeighbor() {
      return {
        cell: findCell(x, y - 1),
        position: TOP,
      };
    }

    function getLeftNeighbor() {
      return {
        cell: findCell(x - 1, y),
        position: LEFT,
      };
    }

    function getBottomNeighbor() {
      return {
        cell: findCell(x, y + 1),
        position: BOTTOM,
      };
    }

    function getRightNeighbor() {
      return {
        cell: findCell(x + 1, y),
        position: RIGHT,
      };
    }

    return [
      getTopNeighbor(),
      getLeftNeighbor(),
      getBottomNeighbor(),
      getRightNeighbor(),
    ].filter((neighbor) => neighbor.cell && !neighbor.cell.visited);
  }
}
