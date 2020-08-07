const heading = document.querySelector('#heading')
const gameMode = document.querySelector('#game-mode')
const vsPlayer = document.querySelector('#vs-player')
const vsPc = document.querySelector('#vs-pc')
const getPlayerNames = document.querySelector('#get-player')
const inputOne = document.querySelector('#player-1')
const inputTwo = document.querySelector('#player-2')
const startBtn = document.querySelector('#start-pvp')
const compDiv = document.querySelector('#get-x')
const getPlayerO = document.querySelector('#plr-x')
const inputX = document.querySelector('#player-x')
const startComp = document.querySelector('#start-pvc')
const nowPlaying = document.querySelector('#now-playing')
const gameBoard = document.querySelector('#game-board')
const cells = document.querySelectorAll('.cells')
const buttons = document.querySelector('#buttons')
const reset = document.querySelector('#reset')
let playerOne = ''
let playerTwo = ''

const player = (name, selection ,turn) => {
  return {name, selection, turn}
}

const Gameboard = (() => {
  let board = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '',9: ''}

  const getBoard = () => board
  
  const getCell = (cell) => {
    return board[cell]
  }

  const checkBoardFull = () => {
    if(Object.values(board).indexOf('')===-1){
      return true
    }
    return false
  }

  const renderBoard =() => {
    Array.from(cells).forEach( cell => {
      cell.textContent = board[cell.getAttribute('data-cell')]
    })
  }
  const clearBoard = () => {
    board = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '',9: ''}
  }
  const placeMove =  (cell, move) => {
    board[cell] = move
  }
  
  const preventOverwrite = () => {
    nowPlaying.textContent = 'Try another cell'
    setTimeout(() => {
      playerMethods.logTurn()
    },500);
  }

  const count = (value, array) => {
    let count = 0;
    for(let i = 0; i < array.length; ++i){
      if(array[i] == value)
        count++;
    }
    return count
  }

  const declareWinner = (winner) => {
    const getPlayer = winner === 'X' ? playerOne.name : playerTwo.name
    
    nowPlaying.innerHTML = `<strong>${getPlayer}</strong> won this round`

    disableBoard()
  }

  const checkWin = () => {
    const winConditions = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]
    const b = board
    const con = winConditions.filter( i => {
      const arr = [b[i[0]], b[i[1]], b[i[2]]]
      return count(arr[0], arr) === 3 && arr.indexOf('') === -1
    })
    if (con.length == 1){
      declareWinner(b[con[0][0]])
    }
  }

  const disableBoard = () => {
    cells.forEach(cell => {
      cell.classList.add('game-over')
    })
  }

  const enableBoard = () => {
    cells.forEach(cell => {
      cell.classList.remove('game-over')
    })
  }

  const checkTie = () => {
    if(Object.values(board).indexOf('')===-1){
      disableBoard()
      nowPlaying.textContent = "It's a tie"
    }
  }

  return {clearBoard, getBoard, getCell, checkBoardFull, renderBoard, placeMove, preventOverwrite, checkWin, disableBoard, enableBoard, checkTie}
})();

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
  let mode = ''
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

const twoPlayerInput = () => {
  gameMode.style.display = 'none'
  getPlayerNames.style.display = 'flex'
}

const onePlayerInput = () => {
  gameMode.style.display = 'none'
  compDiv.style.display = 'flex'
}

const initialiseTwoPlayer = () => {
  heading.innerHTML = '<strong>Tic Tac Toe</strong>'
  getPlayerNames.style.display = 'none'
  gameBoard.style.display = 'grid'
  buttons.style.display = 'block'
  playerOne = player(inputOne.value, 'X', true)
  playerTwo = player(inputTwo.value, 'O', false)
  nowPlaying.innerHTML = `Player <strong>X</strong> is <strong>${playerOne.name}</strong> and Player <strong>O</strong> is <strong>${playerTwo.name}</strong>`
  playerMethods.mode = 'pvp'
  setTimeout(() => {
    playerMethods.logTurn()
  }, 1000)
}
const initialiseOnePlayer = () => {
  heading.innerHTML = '<strong>Tic Tac Toe</strong>'
  compDiv.style.display = 'none'
  gameBoard.style.display = 'grid'
  buttons.style.display = 'block'
  playerOne = player(inputX.value, 'X', true)
  playerTwo = player('Computer', 'O', false)
  nowPlaying.innerHTML = `Player <strong>X</strong> is <strong>${playerOne.name}</strong> and Player <strong>O</strong> is <strong>${playerTwo.name}</strong>`
  playerMethods.mode = 'pvc'
  setTimeout(() => {
    playerMethods.logTurn()
  }, 1000)
}
const startGame = () => {
  if(inputOne.value.trim()==='' ){nameMethods.emptyWarning(inputOne);}
  else if(inputOne.value.length > 12){nameMethods.lengthWarning(inputOne)}
  else if(inputTwo.value.trim()===''){nameMethods.emptyWarning(inputTwo)}
  else if(inputTwo.value.length > 12){nameMethods.lengthWarning(inputTwo)}
  else if(inputOne.value===inputTwo.value){nameMethods.sameNameWarning()}
  else { 
    initialiseTwoPlayer()
  }
}
const compGame = () => {
  if(inputX.value.trim()===''){nameMethods.emptyWarning(inputX);}
  else if(inputX.value.length > 12){nameMethods.lengthWarning(inputX)}
  else {
    initialiseOnePlayer()
  }
}

const twoPlayerGame = () => {
  const cellId = event.target.getAttribute('data-cell')
  const playerSelection = playerMethods.getCurrentPlayer().selection
  Gameboard.placeMove(cellId, playerSelection)
  Gameboard.renderBoard()
  playerMethods.switchTurns()
  playerMethods.logTurn()
  Gameboard.checkTie()
  Gameboard.checkWin()
}

const onePlayerGame = () => {
  const cellId = event.target.getAttribute('data-cell')
  const playerSelection = playerMethods.getCurrentPlayer().selection
  Gameboard.placeMove(cellId, playerSelection)
  playerMethods.switchTurns()
  const time = Math.random() * 1
  setTimeout(() => {
    computerPlays()
  },time*1000)
  Gameboard.renderBoard()
  Gameboard.checkTie()
  Gameboard.checkWin()
}

const computerPlays = () => {
  const playerSelection = playerMethods.getCurrentPlayer().selection
  let random = Math.floor(Math.random()* 8) + 1
  while(Gameboard.getCell(random) !== ''){
    random = Math.floor(Math.random()* 8) + 1
    if(Gameboard.checkBoardFull()){
      break;
    }
  }
  Gameboard.placeMove(random, playerSelection)
  Gameboard.renderBoard()
  Gameboard.checkTie()
  Gameboard.checkWin()
  playerMethods.switchTurns()
}

const onClick = () => {
  if (event.target.textContent !== ''){
    Gameboard.preventOverwrite()
  }else if(playerMethods.mode ==='pvp'){
    twoPlayerGame()
  }else if(playerMethods.mode ==='pvc'){
    onePlayerGame()
  }
}

const resetGame = () => {
  Gameboard.clearBoard()
  Gameboard.renderBoard()
  playerOne = player(playerOne.name, 'X', true)
  playerTwo = player(playerTwo.name, 'O', false)
  nowPlaying.textContent = 'Board Reset complete'
  playerMethods.logTurn()
  Gameboard.enableBoard()
}

vsPlayer.addEventListener('click', twoPlayerInput)
vsPc.addEventListener('click', onePlayerInput)

startBtn.addEventListener('click', startGame)
startComp.addEventListener('click', compGame)

cells.forEach(cell => {
  cell.addEventListener('click', onClick)
})

reset.addEventListener('click', resetGame)