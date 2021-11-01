document.addEventListener('DOMContentLoaded', () => {
  
  /* VARIABLES */

  // doc elements
  const calc = document.querySelector('.calculator')
  const inputField = calc.querySelector('.field--input')
  const resultField = calc.querySelector('.field--result')
  const inputButtons = calc.querySelectorAll('[data-type="input"]')
  const operationButtons = calc.querySelectorAll('[data-type="operation"]')
  const buttonClearAll = calc.querySelector('#clear-all')
  const buttonClearEntry = calc.querySelector('#clear-entry')
  const buttonEqual = calc.querySelector('#equal')
  
  // operator variables
  let a
  let b
  let operation
  let OperatorIsSecond = false


  /* FUNCTIONS */

  function isNumeric(x) {
    // returns if x is a numeric value or not
    return !isNaN(parseFloat(x)) && isFinite(x)
  }

  function clearEntry() {
    //clears last entry of inputfield
    
  }

  function clearAll() {
    // clears the input and result field of the calculator
    inputField.innerHTML = ''
    resultField.innerHTML = ''
  }

  function calculate(a, b, operation) {
    // a, b: operators
    //operation: required operation

    switch(operation) {
      case 'addition': return `${a + b}`
      case 'subtraction': return `${a - b}`
      case 'multiplication': return `${a * b}`
      case 'division':
        if (b == 0) {
          return 'Math Error: Cannot divide by 0'
        }
        return `${a / b}`;
      case 'modulo':
        if (b == 0) {
          return 'Math Error: Cannot divide by 0'
        }
        return `${a % b}`
    }
  }

  /* EVENT LISTENERS */
  
  inputButtons.forEach(inputButton => {
    inputButton.addEventListener('click', () => inputField.innerHTML += inputButton.innerHTML)
  })

  buttonClearAll.addEventListener('click', clearAll)

  operationButtons.forEach(operationButton => operationButton.addEventListener('click', () => {
    // if there was a result before, we choose that as an input
    if (resultField.innerHTML != '' && isNumeric(inputField.innerHTML)) {
      inputField.innerHTML = resultField.innerHTML
      resultField.innerHTML = ''
    } else {
      resultField.innerHTML = ''
    }

    a = parseFloat(`${inputField.innerHTML}`)
    operation = `${operationButton.id}`

    inputField.innerHTML += `${operationButton.innerHTML}`
  }))

  buttonEqual.addEventListener('click', () => {
    resultField.innerHTML = `${calculate(a, b, operation)}`
  })
})