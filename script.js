const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = ""; 
let previousInput = ""; 
let operator = ""; 

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        
        if (value === "AC") {
            currentInput = "";
            previousInput = "";
            operator = "";
            updateDisplay("0");
        } 
        // +/- 
        else if (value === "+/-") {
            if (currentInput) {
            
                currentInput = currentInput.startsWith("-")
                    ? currentInput.slice(1)
                    : `-${currentInput}`;
                updateDisplay(currentInput);
            }
        } 
        
        else if 
        (value === "%") {
            if (currentInput) {
                currentInput = (parseFloat(currentInput) / 100).toString();
                updateDisplay(currentInput);
            }
        } 
        
        else if (value === "=") {
            if (previousInput && currentInput && operator) {
                currentInput = calculate(previousInput, currentInput, operator);
                operator = "";
                previousInput = "";
                updateDisplay(currentInput);
            }
        } 
        
        else if (["+", "-", "*", "/"].includes(value)) {
            if (currentInput) {
                if (previousInput && operator) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    updateDisplay(currentInput);
                }
                previousInput = currentInput;
                currentInput = "";
                operator = value;
            }
        } 
        
        else {
            if (value === "." && currentInput.includes(".")) return; 
            if (value === "0" && currentInput === "0") return; 
            currentInput += value;
            updateDisplay(currentInput);
        }
    }
);
});

//update display
function updateDisplay(value) {
    display.textContent = value || "0";
}

// calcthe result
function calculate(num1, num2, operator) {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    switch (operator) {
        case "+":
            return (n1 + n2).toString();
        case "-":
            return (n1 - n2).toString();
        case "*":
            return (n1 * n2).toString();
        case "/":
            return n2 !== 0 ? (n1 / n2).toString() : "Error"; 
        default:
            return "0";
    }
}
