/* variables */

const calculator = document.querySelector('.calculator')

const mainField = calculator.querySelector('.field--main')
const infoField = calculator.querySelector('.field--info')
const inputButtons = calculator.querySelectorAll('[data-type="input"]')
const operatorButtons = calculator.querySelectorAll('.button--op')
const equalButton = calculator.querySelector('.button--equal')
const clearAllButton = calculator.querySelector('.button--clear-all')
const clearEntryButton = calculator.querySelector('.button--clear-entry')

let myArguments = []      // array of arguments
let operator              // chosen operator


/* functions */

function isNumeric(x) {
  // true if 'x' is a numeric value, false if not

  return !isNaN(parseFloat(x)) && isFinite(x);
}

function isOperator(argument) {
  // true if 'argument' is an operation of the calculator, false if not

  let result = false
  Array.from(operatorButtons)
    .map(operatorButton => operatorButton.dataset.type)
    .forEach(operatorButton => {
      if (operatorButton == argument) {
        result = true
      }
    })

  return result
}

function addArgument(argument) {
  // adds 'argument' to myArguments array

  // don't add 'NaN'
  if (argument || argument == 0) {
    myArguments.push(argument)
  }
}

function handleInput() {
  // callback for input button event listener

  if (!isNumeric(mainField.innerHTML)) {
    mainField.innerHTML = ''
  }
  mainField.innerHTML = mainField.innerHTML + this.innerHTML
}

function handleOperator() {
  // callback for operator button event listener

  operator = this.dataset.type // set operator
  addArgument(parseFloat(`${mainField.innerHTML}`))

  // if last element of myArguments array is already an operator, don't add another one
  if (!isOperator(myArguments[myArguments.length - 1])) {
    addArgument(`${operator}`)
  }

  updateMainField()
}

function handleEqual() {
  // callback for equal button event listener

  addArgument(parseFloat(`${mainField.innerHTML}`))  // add last argument to array
  updateMainField()

  const result = myArguments.join(' ')
  mainField.innerHTML = eval(result)
  myArguments = []
}

function updateMainField() {
  // updates main field of calculator

  infoField.innerHTML = myArguments.join(' ')
  mainField.innerHTML = ''
}


/* event listeners */

inputButtons.forEach(inputButton => inputButton.addEventListener('click', handleInput))
operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', handleOperator))
equalButton.addEventListener('click', handleEqual)

clearAllButton.addEventListener('click', () => {
  myArguments = []
  infoField.innerHTML = ''
  mainField.innerHTML = ''
})

clearEntryButton.addEventListener('click', () => {
  let string = mainField.innerHTML
  mainField.innerHTML = string.substring(0, string.length - 1)
})


