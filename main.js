const number = document.getElementById("number")
const input = document.getElementById('last-issued-number')
const numberLimit = document.getElementById('number-limit')

const nextButton = document.getElementById("next")
const issueNumberButton = document.getElementById("issue-number")
const resetButton = document.getElementById("reset")

let current = parseInt(number.innerHTML)
let lastIssued = parseInt(input.value)
let limit = parseInt(numberLimit.value)

const next = () => {
  current = parseInt(number.innerHTML)
  number.innerHTML = ++current
  calloutNumber(current)
  actionEffects()
}

const issueNumber = () => {
  lastIssued = parseInt(input.value)
  input.value = ++lastIssued
  actionEffects()
}

const reset = () => {
  number.innerHTML = 0
  input.value = 0
  numberLimit.value = 0
  actionEffects()
}

const actionEffects = () => {
  saveToLocalHost()
  disableButton()
}

const saveToLocalHost = () => {
  const data = {current, lastIssued, limit}
  localStorage.setItem('data', JSON.stringify(data))
}

const calloutNumber = (number) => {
  const text = `calling number ${number}`
  const speech = new SpeechSynthesisUtterance(text);
  // window.speechSynthesis.speak(speech)
}

const disableButton = () => {
  current = parseInt(number.innerHTML)
  lastIssued = parseInt(input.value)
  limit = parseInt(numberLimit.value)
  if(current == lastIssued || current == limit) {
    nextButton.disabled = true
  } else {
    nextButton.disabled = false
  }

  if(lastIssued >= limit) {
    issueNumberButton.disabled = true
  } else {
    issueNumberButton.disabled = false
  }
}

nextButton.addEventListener('click', next)
issueNumberButton.addEventListener('click', issueNumber)
resetButton.addEventListener('click', reset)
numberLimit.addEventListener('change', actionEffects)
