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

const Gameboard = {
  gameboard: [1,2,3,4,5,6,7,8,9],
  board: { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '',9: ''},
  placeMove: function (cell, move) {
    this.board[cell] = move
  },
  renderBoard: function (){
    Array.from(cells).forEach( cell => {
      cell.textContent = this.board[cell.getAttribute('data-cell')]
    })
  }
}

const nameMethods = (() => {
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

  return {emptyWarning, lengthWarning, sameNameWarning}
})();

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

const boardMethods = (() => {
  const preventOverwrite = () => {
      nowPlaying.textContent = 'Try another cell'
      setTimeout(() => {
        playerMethods.logTurn()
      },500);
  }

  return { preventOverwrite }
})();

const initialisePlayer = () => {
  heading.innerHTML = '<strong>Tic-Tac-Toe</strong>'
  getPlayerNames.style.display = 'none'
  gameBoard.style.display = 'grid'
  buttons.style.display = 'block'
  playerOne = player(inputOne.value, 'X', true)
  playerTwo = player(inputTwo.value, 'O', false)
  nowPlaying.innerHTML = `Player <strong>X</strong> is <strong>${playerOne.name}</strong> and Player <strong>O</strong> is <strong>${playerTwo.name}</strong>`
  setTimeout(() => {
    playerMethods.logTurn()
  }, 2000)
}

const startGame = event => {
  if(inputOne.value.trim()==='' ){nameMethods.emptyWarning(inputOne);}
  else if(inputOne.value.length > 12){nameMethods.lengthWarning(inputOne)}
  else if(inputTwo.value.trim()===''){nameMethods.emptyWarning(inputTwo)}
  else if(inputTwo.value.length > 12){nameMethods.lengthWarning(inputTwo)}
  else if(inputOne.value===inputTwo.value){nameMethods.sameNameWarning()}
  else { 
    initialisePlayer()
  }
}
startBtn.addEventListener('click', startGame)

const onClick = () => {
  if (event.target.textContent !== ''){
    boardMethods.preventOverwrite()
  }else {
    const cellId = event.target.getAttribute('data-cell')
    const playerSelection = playerMethods.getCurrentPlayer().selection
    Gameboard.placeMove(cellId, playerSelection)
    Gameboard.renderBoard()
    playerMethods.switchTurns()
    playerMethods.logTurn()
  }
}

Array.from(cells).forEach(cell => {
  cell.addEventListener('click', onClick)
})