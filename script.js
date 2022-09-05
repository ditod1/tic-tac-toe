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