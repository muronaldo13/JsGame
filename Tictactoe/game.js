import Tictactoe, { valueCells } from './tictactoegame.js';

const cells = document.querySelectorAll('.cell');
const whichTurn = document.querySelector('#which-turn');
const board = document.querySelector('#game');
const gameOverBox = document.querySelector('#game-over-box');
const status = document.querySelector('.status');
const resetButton = document.querySelector('.reset-btn');

let GAMEOVER = false;

function winningCondition(game) {
  const winningCondition = game.getWinningCondition();
  if (winningCondition != null) {
    highlightWinningCondition(winningCondition);
    status.innerText = game.getTurn().toUpperCase() + ' wins !!!';
    finishGame();
    return true;
  }
  return false;
}

function updateTurn(game) {
  game.switchTurn();
  updateTurnTracker(game.getTurn());
}

function drawCondition(game) {
  if (game.getTotalOccupiedCount() === valueCells.length) {
    handleDrawCondition(game);
  }
}

function handleDrawCondition(game) {
  status.innerText = 'Draw !!!!';
  finishGame();
}

function finishGame() {
  GAMEOVER = true;
  gameOverBox.style.display = 'block';
}

function resetBoard(game) {
  const totalValues = valueCells.length;
  board.innerHTML = '';
  for (const value of valueCells) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.setAttribute('name', value);
    cell.addEventListener('click', () => {
      if (!GAMEOVER && game.occupyCell(value)) {
        updateUiOccupiedCell(game, cell);
        if (winningCondition(game) || drawCondition(game)) {
          return;
        }
        updateTurn(game);
      }
    });
    board.appendChild(cell);
  }
}

function newGame() {
  GAMEOVER = false;
  gameOverBox.style.display = 'none';
  const game = new Tictactoe();
  updateTurnTracker(game.getTurn());
  resetBoard(game);
}

function highlightWinningCondition(winningCondition) {
  for (const value of winningCondition) {
    const foundCell = document.querySelector(`[name="${value}"]`);
    if (foundCell) foundCell.classList.add('winning');
  }
}

function updateTurnTracker(turn) {
  whichTurn.innerText = turn;
}

function updateUiOccupiedCell(game, cell) {
  const turn = game.getTurn();
  const occupiedElement = document.createElement('span');
  occupiedElement.classList.add(turn);
  occupiedElement.innerText = turn;
  cell.appendChild(occupiedElement);
}

resetButton.addEventListener('click', () => {
  newGame();
});
newGame();
