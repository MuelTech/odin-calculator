
const btn = document.querySelectorAll('button');
const resultPara = document.querySelector('.result-para');

let operatorCheck = ['+','-','*','/','='];
let leftOperand = '';
let rightOperand = '';
let operator = '';
let result = '';

btn.forEach(button => {
    button.addEventListener('click', (e) => {
        const inp = e.target.textContent;
        button.classList.add('pressed');
        performCalculation(inp);
        setTimeout(() => button.classList.remove('pressed'), 150);
    });
})

document.addEventListener('keydown', (e) => {
    const inputKey = e.key; 
    btn.forEach(button => {
        const buttonText = button.textContent; 
        if ((inputKey == 'Backspace' && buttonText == 'DELETE') || buttonText == inputKey) {
            button.classList.add('pressed');
            performCalculation(buttonText);
            setTimeout(() => button.classList.remove('pressed'), 150);
        } 
    })
});

function operate (leftOperand, rightOperand, operator) {
            switch(operator) {
                case '+':
                    return add(leftOperand, rightOperand)
                case '-':
                    return subtract(leftOperand, rightOperand);
                case '*':
                    return multiply(leftOperand, rightOperand);
                case '/':
                    return divide(leftOperand, rightOperand);
                default:
            }
}

function add(leftOperand, rightOperand) {
    return  +leftOperand + +rightOperand;
}


function subtract(leftOperand, rightOperand) {
    return leftOperand - rightOperand;

}

function multiply(leftOperand, rightOperand) {
    return leftOperand * rightOperand;
}

function divide(leftOperand, rightOperand) {
    if (leftOperand === '0' && rightOperand === '0') {
        resultPara.style.fontSize = '15px';
        return resultPara.textContent = 'Result is undefined';
    }
    return leftOperand / rightOperand;
}

function clearDisplay() {
    leftOperand = '';
    rightOperand = '';
    operator = '';
    result = '';
    showResult(result);
}

function showResult(inp) {
    return resultPara.textContent = inp;
}

function formatNumber(result) {
    if (Math.abs(result) >= 1e9) {
        return result.toExponential(3);
    }
    return +Number(result).toFixed(3);
}

function performCalculation(inp) {
    if (inp == 'CLEAR') {
        clearDisplay();
        resultPara.textContent = '0';
        return;
    }
    if (inp == 'DELETE') {
        if (!result && !leftOperand && !rightOperand) return resultPara.textContent = '0';
    }
    if (operator == '=' && result && !operatorCheck.includes(inp) && inp != 'DELETE') {
        console.log('got you!');
        clearDisplay();
    }
    if (!operatorCheck.includes(operator)) {
        if (!rightOperand && inp == '=' ) return;
        if (operatorCheck.includes(inp)) {
            operator = inp;
        } 
        if (operatorCheck.includes(inp) && !leftOperand) {
            leftOperand = '0'; 
            showResult(leftOperand);
        } 
        if (operatorCheck.includes(inp)) return operator = inp;
        if (inp == '.'  && !leftOperand) {
            leftOperand = '0';
            showResult(leftOperand);
            console.log(leftOperand);
        } 
        if (inp == '.') {
            if (!leftOperand.includes(inp)) {
                leftOperand += inp;
                showResult(leftOperand);
            } 
            return;
        }
        if (inp == 'DELETE') {
            if (!rightOperand && leftOperand && !result) {
                leftOperand = leftOperand.slice(0, -1);
                showResult(leftOperand);
                if (leftOperand.length == 0) {
                    console.log('working bro!');
                    resultPara.textContent = '0' 
                    leftOperand = '';
                } 
                console.log(leftOperand);
                return;
            }
            return;
        }
        leftOperand += inp
        showResult(leftOperand);
        console.log(leftOperand);
    } else {
        if (operatorCheck.includes(inp)) {
            if (leftOperand  && rightOperand  && operator) {
            result = operate(leftOperand, rightOperand, operator)
            leftOperand = formatNumber(result);
            rightOperand = '';
            operator = inp;
            showResult(leftOperand);
            console.log(leftOperand);
            return;
            }
        }
        if (leftOperand && !operatorCheck.includes(inp)) {
            if (inp == '.') {
                if (!rightOperand.includes(inp)) {
                    rightOperand += inp;
                    showResult(rightOperand);
                } 
                return;
            }
            if (inp == 'DELETE') {
                console.log('test');
                if (leftOperand && rightOperand && !result) {
                    rightOperand = rightOperand.slice(0, -1);
                    showResult(rightOperand);
                    if (rightOperand.length == 0) {
                        console.log('working bro!');
                        resultPara.textContent = '0' 
                        rightOperand = '';
                    } 
                    console.log(rightOperand);
                    return;
                }
                return;
            }
        rightOperand += inp;
        showResult(rightOperand);
        console.log(rightOperand);
        } else {
            if (!rightOperand && inp == '=') return;
            operator = inp;
        console.log(operator);
        }
    }
}
