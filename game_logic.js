let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

// gets from css style file
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"

let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

// when box is clicked
function boxClicked(e) {
    const id = e.target.id

    // if empty box, place player
    if (!spaces[id]) {
        spaces[id] = currentPlayer
        // change actual text in box
        e.target.innerText = currentPlayer

        let winning_blocks = playerHasWon();
        if (winning_blocks !== false) {
            playerText.innerText = `${currentPlayer} has won!`
            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
            return
        }

        // switch player between X and O
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
}

// array of winning combinations
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition
        // check that they are each the same letter
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]
        }
    }
    // else no one has won
    return false
}

// restart button event listener
restartBtn.addEventListener('click', restart)

// restart function
function restart() {
    spaces.fill(null)

    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = '' // Reset background color
    })

    playerText.innerText = 'Tic Tac Toe'

    currentPlayer = X_TEXT
}

startGame()

