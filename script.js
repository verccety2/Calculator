const btn = document.querySelectorAll('button.digits');
const display = document.querySelector('.display');
const equal = document.querySelector('button.equal');
const operators = document.querySelectorAll('.operators');
const clear = document.querySelector('.clear');
const decimal = document.querySelector('button.decimal');

let displayValue = 0;
let num1 = 0;
let num2 = 0;
let currOperator = null;
let operatorToggle = 0;


const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b == 0 ? "undefined" : Math.floor(a / b * 100) / 100;
const calculate = () => {
    if (!currOperator) return;
    display.textContent = operate(currOperator, num1, num2);
    displayValue = parseInt(display.textContent);
    currOperator = null;
    num1 = parseInt(display.textContent);
    num2 = 0;
}

const isEqual = () => {
    if (!num1) return
    num2 = displayValue;
    calculate();
    displayValue = 0;
}

const checkOperator = () => {
    if (operatorToggle) {
        display.textContent = '0'
        operatorToggle = 0;
    }
}

const applyOperator = () => {
    if (!operatorToggle) operatorToggle = 1
    else {
        return
    }
    (!num1) ? num1 = displayValue : num2 = displayValue;
    if (num1 && num2) calculate();
}

const operate = (operator, a, b) => {
    switch (operator) {
        case 'add':
            return add(a, b);
        case 'substract':
            return substract(a, b);
        case 'multiply':
            return multiply(a, b);
        case 'divide':
            return divide(a, b);
    }
};

btn.forEach((button) => {
    button.addEventListener('click', (e) => {
         if (display.textContent.length > 16) {
             return;
         }
        checkOperator();
        if (display.textContent === "0" || displayValue === 0) {
            display.textContent = e.target.textContent
        } else {
            display.textContent += e.target.textContent
        }
        displayValue = parseFloat(display.textContent);
    })
});

operators.forEach((button) => {
    button.addEventListener('click', (e) => {
        applyOperator();
        currOperator = e.target.id;
    })
});

equal.addEventListener('click', isEqual);

clear.addEventListener('click', (e) => {
    displayValue = 0;
    num1 = 0;
    num2 = 0;
    display.textContent = '0'
    currOperator = null;
    operatorToggle = 0;

})

decimal.addEventListener('click', (e) => {
    if (display.textContent.includes(".")) {
        return
    }
    display.textContent += '.'
    displayValue = (displayValue / 100).toFixed(2);

})

document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 8:
            (!display.textContent || display.textContent.length == 1) ? display.textContent = "0": display.textContent = display.textContent.slice(0, -1);
            break;

        case 106:
            applyOperator();
            currOperator = 'multiply';
            break;

        case 107:
            applyOperator();
            currOperator = 'add';
            break;

        case 109:
            applyOperator();
            currOperator = 'substract';
            break;

        case 111:
            applyOperator();
            currOperator = 'divide';
            break;

        case 13:
            isEqual();
            break;

        default:
            break;
    }

    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105)) {
        return
    }
    checkOperator();
    if (display.textContent.length > 16) {
        return;
    }
    if (display.textContent === "0") {
        display.textContent = e.key
    } else {
        display.textContent += e.key
    }
    displayValue = parseFloat(display.textContent);
})
