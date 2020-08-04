const heading = document.querySelector('#heading')
const getPlayerNames = document.querySelector('#get-player')
const inputOne = document.querySelector('#player-1')
const inputTwo = document.querySelector('#player-2')
const startBtn = document.querySelector('#start')
const nowPlaying = document.querySelector('#now-playing')
const gameBoard = document.querySelector('#game-board')
const cells = document.querySelectorAll('.cells')

let playerOne = ''
let playerTwo = ''

const player = (name, selection ,turn) => {
  return {name, selection, turn}
}

const playerMethods = (() => {
  const switchTurns = (one,two) => {
    if(one.turn){
      one.turn = false
      two.turn = true
    }else if(two.turn){
      two.turn = false
      one.turn = true
    }
  }
  
  const checkTurn = (one ,two) => {
    if(one.turn){
      nowPlaying.textContent = `${one.name}'s turn`
    }
    if(two.turn){
      nowPlaying.textContent = `${two.name}'s turn`
    }
  }

  return {switchTurns, checkTurn}
})();

const Gameboard = {
  gameboard: [1,2,3,4,5,6,7,8,9],
  board: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '',9: ''},
  placeMove: function (cell, move) {
    this.board[cell] = move
  }
}


const emptyWarning = field => {
  field.value = 'Enter something here'
  setTimeout(() => {
    field.value = ''
  }, 1000)
}

const initialisePlayer = () => {
  heading.innerHTML = '<strong>Tic-Tac-Toe</strong>'
  getPlayerNames.style.display = 'none'
  gameBoard.style.display = 'grid'
  playerOne = player(inputOne.value, 'X', true)
  playerTwo = player(inputTwo.value, 'O', false)
  nowPlaying.innerHTML = `Player <strong>X</strong> is <strong>${playerOne.name}</strong> and Player O is <strong>${playerTwo.name}</strong>`
  setTimeout(() => {
    playerMethods.checkTurn(playerOne, playerTwo)
  }, 1000)
}



const startGame = event => {
  if(inputOne.value.trim() === ''){emptyWarning(inputOne);}
  else if(inputTwo.value.trim() === ''){emptyWarning(inputTwo)}
  else { 
    initialisePlayer()
  }
}
startBtn.addEventListener('click', startGame)


const cellHover = event => {
  const cellId = event.target.getAttribute('data-cell') 
  console.log(cellId)
}

Array.from(cells).forEach(cell => {
  cell.addEventListener('mouseover', cellHover)
})
