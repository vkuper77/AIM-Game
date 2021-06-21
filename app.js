const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEL = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0
let score = 0

const colors = [
  '#5F939A',
  '#F5A962',
  '#3C8DAD',
  '#F54748',
  '#FFBBCC',
  '#99154E',
  '#00EAD3',
  '#FFF5B7',
  '#FF449F',
  '#005F99',
  '#E93B81',
  '#FFF5FD',
  '#F54748',
  '#867AE9',
  '#C449C2',
  '#FFF5AB',
  '#FFCEAD',
]

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}

function setTime(value) {
  timeEL.innerHTML = `00:${value}`
}

function finishGame() {
  timeEL.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Счет: <span class='primary'>${score}</span> </h1>`
}

function createRandomCircle() {
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 30)
  const { width, height } = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  const color = getRandomNumber(0, colors.length)
  circle.classList.add('circle')
  console.log(color)
  circle.style.background = colors[color]
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}
