document.addEventListener('DOMContentLoaded', () => {// Variables to store calculator data
let firstNumber = '';
let operator = '';
let secondNumber = '';
let displayNum = document.querySelector("#DisplayInput");
const numberButtons = document.querySelectorAll('.intNumbers');
const operationButtons = document.querySelectorAll(".operandButtons")

const plusButton = document. querySelector("#Plus")
const minusButton = document. querySelector("#Minus")
const multiplyButton = document. querySelector("#Multiply")
const divisionButton = document. querySelector("#Division")

const clearButton = document.querySelector("#AC");
const equalButton = document.querySelector("#Equals");
const plusMinusButton = document.querySelector("#PlusMinus");
const percentageButton = document.querySelector("#Percentage")
const decimalButton = document.querySelector("#Decimal")

plusButton.addEventListener("click", () => handleAddition());
minusButton.addEventListener("click", () => handleSubtraction());
multiplyButton.addEventListener("click", () => handleMultiplication());
divisionButton.addEventListener("click", () => handleDivision());
equalButton.addEventListener("click", () => calculateResult());

// Add an event listener for the decimal button
decimalButton.addEventListener("click", function() {
    // Check if a decimal point is already present in the number
    if (!firstNumber.includes('.')) {
        // If not present, append the decimal point
        firstNumber += '.';
    }
    displayNum.textContent = firstNumber;
});

percentageButton.addEventListener("click", function() {
    if (firstNumber !== '') {
        const number = parseFloat(firstNumber.replace(/,/g, ''));
        const percentage = number / 100;
        firstNumber = percentage.toLocaleString();
        displayNum.textContent = firstNumber;
        setFontSize(percentage); // Call setFontSize to update the font size
    }
});

// Modify setFontSize function to handle 10 digits
function setFontSize(number) {
    let fontSize;
    switch (number.toString().length) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            fontSize = 75;
            break;
        case 6:
            fontSize = 70;
            break;
        case 7:
            fontSize = 60;
            break;
        case 8:
            fontSize = 55;
            break;
        case 9:
            fontSize = 50;
            break;
        case 10: // Increase maximum digits to 10
            fontSize = 45;
            break;
        default:
            fontSize = 45; // Default to 45px for numbers longer than 10 digits
    }

    displayNum.style.fontSize = fontSize + 'px';
}

function calculateResult() {
    if (firstNumber !== '' && operator !== '' && secondNumber !== '') {
        const num1 = parseFloat(firstNumber.replace(/,/g, ''));
        const num2 = parseFloat(secondNumber.replace(/,/g, ''));
        let result;

        switch (operator) {
            case '+':
                result = num2 + num1;
                break;
            case '-':
                result = num2 - num1;
                break;
            case '*':
                result = num2 * num1;
                break;
            case '/':
                if (num1 === 0) {
                    result = 'Error'; // Division by zero error
                } else {
                    result = num2 / num1;
                }
                break;
            default:
                result = 'Error'; // Invalid operator
        }

        // Display the result and reset the variables
        firstNumber = result.toLocaleString();
        operator = '';
        secondNumber = '';

        setFontSize(result); // Call setFontSize to update the font size

        displayNum.textContent = firstNumber;
    }
}

// Add an event listener for the equals button
equalButton.addEventListener("click", () => {
    calculateResult();
});

// Define functions for operand buttons
function handleAddition() {
    if (firstNumber !== '') {
        operator = '+';
        secondNumber = firstNumber;
        firstNumber = '';
    }
}

function handleSubtraction() {
    if (firstNumber !== '') {
        operator = '-';
        secondNumber = firstNumber;
        firstNumber = '';
    }
}

function handleMultiplication() {
    if (firstNumber !== '') {
        operator = '*';
        secondNumber = firstNumber;
        firstNumber = '';
    }
}

function handleDivision() {
    if (firstNumber !== '') {
        operator = '/';
        secondNumber = firstNumber;
        firstNumber = '';
    }
}


plusMinusButton.addEventListener("click", function() {
    if (firstNumber !== '') {
        firstNumber = (parseFloat(firstNumber.replace(/,/g, '')) * -1).toLocaleString();
        displayNum.textContent = firstNumber;
    }
});


clearButton.addEventListener("click",function(){
    firstNumber = '';
    operator = '';
    secondNumber = '';
    displayNum.textContent = '0';
    displayNum.style.fontSize = "75px";
});

numberButtons.forEach((number) => number.addEventListener("click", function(e){
    handleNumber(e.target.textContent)
    displayNum.textContent = firstNumber;
}))

function handleNumber(num) {
    if (firstNumber.includes('.') && num === '.') {
        // If there's already a decimal point, do nothing
        return;
    }

    if (firstNumber === '0' && num !== '.' && !firstNumber.includes('.')) {
        // If the current number is '0' and the user inputs a digit (0-9) or a decimal point,
        // replace '0' with the input
        firstNumber = num;
    } else {
        // Append the clicked number or decimal point
        firstNumber += num;
    }

    // Limit to a maximum of 10 digits (including the decimal point)
    if (firstNumber.replace('.', '').length <= 9) {
        setFontSize(parseFloat(firstNumber.replace(/,/g, '')));
    }

    displayNum.textContent = firstNumber;
}


});