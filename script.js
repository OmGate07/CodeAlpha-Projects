// These three variables remember the "state" of the calculator
let currentOperand = "0";   // what you're currently typing
let previousOperand = "";   // the number typed before you picked an operator
let operation = undefined;  // which operator (+, -, ×, ÷) was picked

// Grab the two display boxes from the HTML using their id
const currentOperandDisplay = document.getElementById("current-operand");
const previousOperandDisplay = document.getElementById("previous-operand");

// Runs when a number or "." button is clicked
function appendNumber(number) {
  // Don't allow more than one decimal point
  if (number === "." && currentOperand.includes(".")) return;

  // If the screen is just "0", replace it instead of appending
  if (currentOperand === "0" && number !== ".") {
    currentOperand = number;
  } else {
    currentOperand = currentOperand + number;
  }
  updateDisplay();
}

// Runs when +, -, ×, ÷ is clicked
function chooseOperator(op) {
  if (currentOperand === "") return;

  // If a previous operation is already waiting, calculate it first
  if (previousOperand !== "") {
    calculate();
  }

  operation = op;
  previousOperand = currentOperand;
  currentOperand = "";
  updateDisplay();
}

// Runs when "=" is clicked
function calculate() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  // Stop if we don't have both numbers yet
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "×":
      result = prev * current;
      break;
    case "÷":
      if (current === 0) {
        alert("You can't divide by zero!");
        clearAll();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  // Round to avoid ugly long decimals like 0.1 + 0.2 = 0.30000000000000004
  currentOperand = parseFloat(result.toFixed(8)).toString();
  operation = undefined;
  previousOperand = "";
  updateDisplay();
}

// Runs when "AC" (All Clear) is clicked
function clearAll() {
  currentOperand = "0";
  previousOperand = "";
  operation = undefined;
  updateDisplay();
}

// Runs when "DEL" is clicked - removes the last typed digit
function deleteLast() {
  currentOperand = currentOperand.toString().slice(0, -1);
  if (currentOperand === "") currentOperand = "0";
  updateDisplay();
}

// Updates what's shown on screen to match our variables
function updateDisplay() {
  currentOperandDisplay.textContent = currentOperand;
  if (operation != null) {
    previousOperandDisplay.textContent = `${previousOperand} ${operation}`;
  } else {
    previousOperandDisplay.textContent = "";
  }
}

// BONUS: Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") appendNumber(e.key);
  if (e.key === ".") appendNumber(".");
  if (e.key === "+") chooseOperator("+");
  if (e.key === "-") chooseOperator("-");
  if (e.key === "*") chooseOperator("×");
  if (e.key === "/") chooseOperator("÷");
  if (e.key === "Enter" || e.key === "=") calculate();
  if (e.key === "Backspace") deleteLast();
  if (e.key === "Escape") clearAll();
});
