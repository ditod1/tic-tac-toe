const Player = (sign) => {
  this.sign = sign

  const getSign = () => {
    return sign
  }

  return { getSign }
}

const GameBoard = (() => {
  let board = Array(5).fill('')
  const resetBoard = () => {
    board = Array(5).fill('')
  }

  const setCell = (index, sign) => {
    board[index] = sign
  }

  const getBoard = () => {
    return board
  }
  return { resetBoard, setCell, getBoard }
})()

const DisplayController = (() => {
  const message = document.getElementById('turn')
  const btn = document.getElementById('restart')
  const boardCells = document.querySelector('.game-board')
  const updateGameboard = (e) => {
    const cell = e.target;
    if (cell.textContent === '') {
      const sign = GameFlowController.playRound(cell.dataset.index)
      fillCell(cell, sign)
    }
  }
  const fillCell = (cell, sign) => {
    cell.textContent = sign;
  }

  const updateMessage = (sign) => {
    message.textContent = `Player ${sign}'s turn`
  }

  const displayWinnner = (winner) => {
    if (winner === 'draw') {
      message.textContent = 'Draw'
    }
    else {
      message.textContent = `${winner} wins`
    }
  }

  const resetBoard = () => {
    updateMessage('X')
    const children = [...boardCells.children];
    children.forEach(element => {
      element.textContent = ''
    })
    GameFlowController.endRound()
  }
  btn.addEventListener('click', resetBoard);
  boardCells.addEventListener('click', updateGameboard);
  return { displayWinnner, updateMessage }
})()

const GameFlowController = (() => {
  const playerX = Player("X");
  const playerO = Player("O");
  let roundCount = 1;
  let previousSign = playerO.getSign()
  const winningCombination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
  const playRound = (index) => {
    DisplayController.updateMessage(previousSign)
    const sign = getCurrentSign()
    GameBoard.setCell(index, sign)
    if (checkWin(sign)) {
      DisplayController.displayWinnner(sign)
    }
    else if (roundCount === 9) {
      DisplayController.displayWinnner('draw')
    }
    else {

      roundCount++;
    }
    return sign
  }

  const getCurrentSign = () => {
    if (previousSign === 'O') {
      previousSign = playerX.getSign()
      return playerX.getSign()
    }
    else {
      previousSign = playerO.getSign()
      return playerO.getSign()
    }
  }

  const checkWin = (sign) => {
    const board = GameBoard.getBoard()
    return winningCombination.some(combination => {
      return combination.every(index => {
        if (board[index] === sign) {
          return true
        }
        return false
      })
    })
  }

  const endRound = () => {
    roundCount = 1;
    previousSign = playerO.getSign()
    GameBoard.resetBoard()
  }
  return { playRound, endRound }
})()