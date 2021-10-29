document.addEventListener('DOMContentLoaded', () => {

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }
  
  function calculate() {
  }

  const inputField = document.querySelector('.inputfield')
  const inputButtons = document.querySelectorAll('[data-type="input"]')
  
  inputButtons.forEach(inputButton => {
    inputButton.addEventListener('click', () => inputField.innerHTML += inputButton.innerHTML)
  })


})