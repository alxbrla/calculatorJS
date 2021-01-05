class Calculator {

    constructor(_currentOperandTextElement, _previousOperandTextElement) {
        this.previousOperandTextElement = _previousOperandTextElement;
        this.currentOperandTextElement = _currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    chooseOperation(_operation) {
        if (this.currentOperand === '' || this.currentOperand === '.') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = _operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let result;
        let firstNumber = parseFloat(this.previousOperand);
        let secondNumber = parseFloat(this.currentOperand);
        if (isNaN(firstNumber) || isNaN(secondNumber)) return;
        switch (this.operation) {
            case '+':
                result = firstNumber + secondNumber;
                break;
            case '-':
                result = firstNumber - secondNumber;
                break;
            case '*':
                result = firstNumber * secondNumber;
                break;
            case '÷':
                result = firstNumber / secondNumber;
                break;
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    appendNumber(_number) {
        if (_number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + _number.toString();
    }

    convertNumber(_number) {
        const floatNumber = parseFloat(_number);
        if (isNaN(floatNumber)) return '';
        return floatNumber.toLocaleString('en');
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.convertNumber(this.currentOperand.toString());
        if (this.operation == null)
            this.previousOperandTextElement.innerText = this.convertNumber(this.previousOperand.toString());
        else
            this.previousOperandTextElement.innerText = `${this.convertNumber(this.previousOperand)} ${this.operation}`;
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const clearButton = document.querySelector('[clear]');
const deleteButton = document.querySelector('[delete]');
const equalButton = document.querySelector('[equal]');
const previousOperandTextElement = document.querySelector('[previousOperand]');
const currentOperandTextElement = document.querySelector('[currentOperand]');
const calculator = new Calculator(currentOperandTextElement, previousOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});