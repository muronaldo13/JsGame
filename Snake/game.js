import {
  updateSnake,
  drawSnake,
  addBody,
  getHead,
  checkSelfCollide,
  BOARD_SIZE,
  isLocationOccupiedBySnakeBody,
} from './snake.js';
import {
  getFoodLocation,
  drawFood,
  generateRandomFoodLocation,
} from './food.js';

const SNAKE_SPEED = 10;
const gameBoard = document.getElementById('gameboard');

gameBoard.style['grid-template-rows'] = `repeat(${BOARD_SIZE}, 1fr)`;
gameBoard.style['grid-template-columns'] = `repeat(${BOARD_SIZE}, 1fr)`;

var GAME_OVER = false;

function main() {
  var gameState = setInterval(() => {
    checkEatFood();
    draw();
    update();
    if (checkSelfCollide()) {
      clearInterval(gameState);
    }
  }, 500 / SNAKE_SPEED);
}

function checkEatFood() {
  var food = getFoodLocation();
  var head = getHead();
  if (food.x === head.x && food.y === head.y) {
    addBody();
    do {
      foodLocation = generateRandomFoodLocation();
    } while (isLocationOccupiedBySnakeBody(foodLocation));
  }
}

function update() {
  updateSnake(gameBoard);
}

function draw() {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

generateRandomFoodLocation();
main();
