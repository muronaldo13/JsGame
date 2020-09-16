import {
  getInputDirection
} from './input.js';

const snake_body = [{
    x: 11,
    y: 11
  },
  {
    x: 12,
    y: 11
  },
  {
    x: 13,
    y: 11
  },
];

export const BOARD_SIZE = 50;

export function getHead() {
  return snake_body[0];
}

export function isLocationOccupiedBySnakeBody(location) {
  for (const snk_body of snake_body) {
    if (snk_body === location) {
      return true;
    }
  }
  return false;
}

export function checkSelfCollide() {
  var head = getHead();
  for (let i = 1; i < snake_body.length; i++) {
    if (head.x === snake_body[i].x && head.y === snake_body[i].y) {
      return true;
    }
  }
  return false;
}

export function addBody() {
  var snakeTail = snake_body[snake_body.length - 1];
  let inputDirection = getInputDirection();
  snake_body.push({
    x: snakeTail.x + inputDirection.x,
    y: snakeTail.y + inputDirection.y,
  });
}

export function updateSnake(gameBoard) {
  let inputDirection = getInputDirection();
  for (let i = snake_body.length - 2; i >= 0; i--) {
    snake_body[i + 1] = {
      ...snake_body[i]
    };
  }
  snake_body[0].x += inputDirection.x;
  snake_body[0].y += inputDirection.y;
  if (snake_body[0].x > BOARD_SIZE) {
    snake_body[0].x = 0;
  } else if (snake_body[0].x < 0) {
    snake_body[0].x = BOARD_SIZE;
  }
  if (snake_body[0].y > BOARD_SIZE) {
    snake_body[0].y = 0;
  } else if (snake_body[0].y < 0) {
    snake_body[0].y = BOARD_SIZE;
  }
}

export function drawSnake(gameBoard) {
  snake_body.forEach((snkBody) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridColumnStart = snkBody.x;
    snakeElement.style.gridRowStart = snkBody.y;
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
  });
}