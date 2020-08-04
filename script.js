const heading = document.querySelector('#heading')
const getPlayerNames = document.querySelector('#get-player')
const inputOne = document.querySelector('#player-1')
const inputTwo = document.querySelector('#player-2')
const startBtn = document.querySelector('#start')
const nowPlaying = document.querySelector('#now-playing')
const gameBoard = document.querySelector('#game-board')
const cells = document.querySelectorAll('.cells')
const buttons = document.querySelector('#buttons')
let playerOne = ''
let playerTwo = ''

const player = (name, selection ,turn) => {
  return {name, selection, turn}
}

const playerMethods = (() => {
  const switchTurns = () => {
    if(playerOne.turn){
      playerOne.turn = false
      playerTwo.turn = true
    }else if(playerTwo.turn){
      playerTwo.turn = false
      playerOne.turn = true
    }
  }
  const getCurrentPlayer = () => {
    return playerOne.turn ? playerOne : playerTwo
  }  
  const logTurn = () => {
      nowPlaying.textContent = `${getCurrentPlayer().name}'s turn`
  }

  return {switchTurns, getCurrentPlayer, logTurn}
})();

const Gameboard = {
  gameboard: [1,2,3,4,5,6,7,8,9],
  board: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '',9: ''},
  placeMove: function (cell, move) {
    this.board[cell] = move
  }
}

const emptyWarning = field => {
  field.value = 'Enter your playername'
  setTimeout(() => {
    field.value = ''
  }, 1000)
}

const lengthWarning = field => {
  field.value = 'Use a smaller name'
  setTimeout(() => {
    field.value = ''
  }, 1000)
}

const sameNameWarning = () => {
  const temp = inputOne.value
  inputTwo.value = 'Use a different name'
  setTimeout(() => {
    inputTwo.value = temp
  }, 1000)
}

const initialisePlayer = () => {
  heading.innerHTML = '<strong>Tic-Tac-Toe</strong>'
  getPlayerNames.style.display = 'none'
  gameBoard.style.display = 'grid'
  buttons.style.display = 'block'
  playerOne = player(inputOne.value, 'X', true)
  playerTwo = player(inputTwo.value, 'O', false)
  nowPlaying.innerHTML = `Player <strong>X</strong> is <strong>${playerOne.name}</strong> and Player O is <strong>${playerTwo.name}</strong>`
  setTimeout(() => {
    playerMethods.logTurn()
  }, 1000)
}

const startGame = event => {
  if(inputOne.value.trim()==='' ){emptyWarning(inputOne);}
  else if(inputOne.value.length > 12){lengthWarning(inputOne)}
  else if(inputTwo.value.trim()===''){emptyWarning(inputTwo)}
  else if(inputTwo.value.length > 12){lengthWarning(inputTwo)}
  else if(inputOne.value===inputTwo.value){sameNameWarning()}
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

const onClick = () => {
  event.target.textContent = playerMethods.getCurrentPlayer().selection
  console.log(playerMethods.getCurrentPlayer().selection)
  playerMethods.switchTurns()
  playerMethods.logTurn()
}

Array.from(cells).forEach(cell => {
  cell.addEventListener('click', onClick)
})