(function () {
  'use strict';

  const get = (target) => {
    return document.querySelector(target);
  };

  const getAll = (target) => {
    return document.querySelectorAll(target);
  };

  class Calculator {
    constructor(element) {
      this.element = element;
      this.currentValue = '';
      this.prevValue = '';
      this.operation = null;
    }

    appendNumber(number) {
      if (number === '.' && this.currentValue.includes('.')) return;
      this.currentValue = this.currentValue.toString() + number.toString();
    }
    setOperation(operation) {
      this.resetOperation();
      this.operation = operation;
      this.prevValue = this.currentValue;
      this.currentValue = '';

      const elements = Array.from(getAll('.operation'));
      const element = elements.filter((element) =>
        element.innerText.includes(operation)
      )[0];

      element.classList.add('active');
    }
    updateDisplay() {
      if (this.currentValue) {
        this.element.value = this.currentValue;
        return;
      }
    }
    resetOperation() {
      this.operation = null;
      const elements = Array.from(getAll('.operation'));
      elements.forEach((element) => {
        element.classList.remove('active');
      });
    }
  }

  const numberButtons = getAll('.cell_button.number');
  const operationButtons = getAll('.cell_button.operation');
  const display = get('.display');

  const calculator = new Calculator(display);

  numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    });
  });

  operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
      calculator.setOperation(button.innerText);
      calculator.updateDisplay();
    });
  });
})();