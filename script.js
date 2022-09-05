const Player = (sign) => {
  this.sign = sign

  const getSign = () => {
    return sign
  }

  return { getSign }
}