const getPlayerNames = document.querySelector('#get-player')
const inputOne = document.querySelector('#player-1')
const inputTwo = document.querySelector('#player-2')
const startBtn = document.querySelector('#start')
const nowPlaying = document.querySelector('#now-playing')
const gameBoard = document.querySelector('#game-board')
const cells = document.querySelectorAll('.cells')

let playerOne = ''
let playerTwo = ''

const player = (name, selection) => {
  return {name, selection}
}

const emptyWarning = field => {
  field.value = 'Enter something here'
  setTimeout(() => {
    field.value = ''
  }, 1000)
}

const startGame = event => {
  if(inputOne.value === ''){emptyWarning(inputOne);}
  else if(inputTwo.value === ''){emptyWarning(inputTwo)}
  else { 
    getPlayerNames.style.display = 'none'
    gameBoard.style.display = 'grid'
    playerOne = player(inputOne.value, 'X')
    playerTwo = player(inputTwo.value, 'O')
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
