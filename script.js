
const btn = document.querySelectorAll('button');
const resultPara = document.querySelector('.result-para');

let operatorCheck = ['+','-','*','/','='];
let num1 = '';
let num2 = '';
let operator = '';
let result = '';

btn.forEach((button) => {
    button.addEventListener('click', (e) => {
        const inp = e.target.textContent;

        if (inp == 'CLEAR') {
            clearDisplay();
            resultPara.textContent = '0';
            return;
        }

        if (inp == 'DELETE') {
            if (!result && !num1 && !num2) return resultPara.textContent = '0';
        }

        if (operator == '=' && result && !operatorCheck.includes(inp) && inp != 'DELETE') {
            console.log('got you!');
            clearDisplay();
        }

        if (!operatorCheck.includes(operator)) {

            if (!num2 && inp == '=' ) return;
            
            if (operatorCheck.includes(inp)) {

                operator = inp;
            } 

            if (operatorCheck.includes(inp) && !num1) {
                num1 = '0'; 
                showResult(num1);
            } if (operatorCheck.includes(inp)) return operator = inp;

            if (inp == '.'  && !num1) {
                num1 = '0';
                showResult(num1);
                console.log(num1);
            } 
            if (inp == '.') {
                if (!num1.includes(inp)) {
                    num1 += inp;
                    showResult(num1);
                } 
                return;
            }
            

            if (inp == 'DELETE') {
                if (!num2 && num1 && !result) {
                    num1 = num1.slice(0, -1);
                    showResult(num1);
                    if (num1.length == 0) {
                        console.log('working bro!');
                        resultPara.textContent = '0' 
                        num1 = '';
                    } 
                    console.log(num1);
                    return;
                }
                return;
            }

            num1 += inp
            showResult(num1);
            console.log(num1);
            

        } else {
            if (operatorCheck.includes(inp)) {
                if (num1  && num2  && operator) {
                result = operate(num1, num2, operator)
                num1 = formatNumber(result);
                num2 = '';
                operator = inp;
                showResult(num1);
                console.log(num1);
                return;
                }
            }

            if (num1 && !operatorCheck.includes(inp)) {

                if (inp == '.') {
                    if (!num2.includes(inp)) {
                        num2 += inp;
                        showResult(num2);
                    } 
                    return;
                }

                if (inp == 'DELETE') {
                    console.log('test');
                    if (num1 && num2 && !result) {
                        num2 = num2.slice(0, -1);
                        showResult(num2);
                        if (num2.length == 0) {
                            console.log('working bro!');
                            resultPara.textContent = '0' 
                            num2 = '';
                        } 
                        console.log(num2);
                        return;
                    }
                    return;
                }

            num2 += inp;
            showResult(num2);
            console.log(num2);
            } else {

                if (!num2 && inp == '=') return;


                operator = inp;
            console.log(operator);
            }
        }
    });
})

function operate (num1, num2, operator) {
            switch(operator) {
                case '+':
                    return add(num1, num2)
                case '-':
                    return subtract(num1, num2);
                case '*':
                    return multiply(num1, num2);
                case '/':
                    return divide(num1, num2);
                default:
            }
}

function add(num1, num2) {
    return  +num1 + +num2;
}


function subtract(num1, num2) {
    return num1 - num2;

}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num1 === '0' && num2 === '0') {
        resultPara.style.fontSize = '15px';
        return resultPara.textContent = 'Result is undefined';
    }
    return num1 / num2;
}

function clearDisplay() {
    num1 = '';
    num2 = '';
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
