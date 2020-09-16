var foodLocation = {
  x: 0,
  y: 0
};

function generateRandomNumber() {
  return Math.floor(Math.random() * 31);
}

export function generateRandomFoodLocation() {
  foodLocation = {
    x: generateRandomNumber(),
    y: generateRandomNumber()
  };
  return foodLocation;
}

export function drawFood(gameBoard) {
  var foodElement = document.createElement('div');
  foodElement.style.gridRowStart = foodLocation.y;
  foodElement.style.gridColumnStart = foodLocation.x;
  foodElement.classList.add('food');
  gameBoard.appendChild(foodElement);
}

export function getFoodLocation() {
  return foodLocation;
}