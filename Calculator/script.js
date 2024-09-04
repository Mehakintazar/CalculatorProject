
// script.js

const operationDisplay = document.querySelector('.operation');
const resultDisplay = document.querySelector('.result');
const subResultDisplay = document.querySelector('.sub-result');

let currentInput = '';
let firstOperand = '';
let currentOperator = null;
let shouldResetScreen = false;

function resetScreen() {
    currentInput = '';
    shouldResetScreen = false;
}

function clearAll() {
    resetScreen();
    firstOperand = '';
    currentOperator = null;
    resultDisplay.textContent = '0';
    subResultDisplay.textContent = '';
    operationDisplay.textContent = '';
}

function appendNumber(number) {
    if (shouldResetScreen) resetScreen();
    if (currentInput.length > 15) return;  // Limit the length of input
    currentInput += number;
    resultDisplay.textContent = currentInput;
}

function chooseOperator(operator) {
    if (currentOperator !== null) evaluate();
    firstOperand = currentInput;
    currentOperator = operator;
    shouldResetScreen = true;
    operationDisplay.textContent = `${firstOperand} ${operator}`;
}

function evaluate() {
    if (currentOperator === null || shouldResetScreen) return;
    let secondOperand = currentInput;
    const result = operate(currentOperator, firstOperand, secondOperand);
    resultDisplay.textContent = result;
    subResultDisplay.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`;
    firstOperand = result;
    currentOperator = null;
    operationDisplay.textContent = result;
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return b === 0 ? 'Error' : a / b;
        case 'tax+':
            return a + (a * 0.1);  // Example: adding 10% tax
        case 'tax-':
            return a - (a * 0.1);  // Example: subtracting 10% tax
        default:
            return null;
    }
}

document.querySelector('.calculator-keys').addEventListener('click', event => {
    const { target } = event;
    if (!target.matches('button')) return;

    switch (target.value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case 'tax+':
        case 'tax-':
            chooseOperator(target.value);
            break;
        case '=':
            evaluate();
            break;
        case 'AC':
            clearAll();
            break;
        case '.':
            if (currentInput.includes('.')) return;
            appendNumber('.');
            break;
        default:
            appendNumber(target.value);
            break;
    }
});
