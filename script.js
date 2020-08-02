const gameBoard = document.querySelector('#game-board')
const cells = document.querySelectorAll('.cells')

const cellHover = event => {
  const cellId = event.target.getAttribute('data-cell') 
  console.log(cellId)
}

Array.from(cells).forEach(cell => {
  cell.addEventListener('mouseover', cellHover)
})

