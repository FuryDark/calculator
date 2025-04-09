const expressionDisplay = document.getElementById("expression-display");
const resultDisplay = document.getElementById("result-display");
const buttons = document.querySelectorAll(".btn");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");
const backspaceBtn = document.getElementById("backspace");

// Function buttons
const mPlusBtn = document.getElementById("m-plus");
const mMinusBtn = document.getElementById("m-minus");
const mrBtn = document.getElementById("mr");
const mcBtn = document.getElementById("mc");
const squareBtn = document.getElementById("square");
const sqrtBtn = document.getElementById("sqrt");

let expression = "";
let memory = 0;

// Add clicked button value to expression
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    expression += value;
    expressionDisplay.textContent += value;
  });
});

// Clear everything
clearBtn.addEventListener("click", () => {
  expression = "";
  expressionDisplay.textContent = "";
  resultDisplay.value = "";
});

// Backspace removes last character
backspaceBtn.addEventListener("click", () => {
  expression = expression.slice(0, -1);
  expressionDisplay.textContent = expressionDisplay.textContent.slice(0, -1);
});

// Evaluate expression
equalsBtn.addEventListener("click", () => {
  try {
    const result = eval(expression);

    // Handle division by zero
    if (!isFinite(result)) {
      resultDisplay.value = "Error";
      return;
    }

    resultDisplay.value = result;
    expression = result.toString();
  } catch {
    resultDisplay.value = "Error";
  }
});

// Keyboard input support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || "+-*/.()".includes(key)) {
    expression += key;
    expressionDisplay.textContent += key;
  } else if (key === "Enter") {
    try {
      const result = eval(expression);
      resultDisplay.value = result;
      expression = result.toString();
    } catch {
      resultDisplay.value = "Error";
    }
  } else if (key === "Backspace") {
    expression = expression.slice(0, -1);
    expressionDisplay.textContent = expressionDisplay.textContent.slice(0, -1);
  } else if (key.toLowerCase() === "c") {
    expression = "";
    expressionDisplay.textContent = "";
    resultDisplay.value = "";
  }
});

// === MEMORY FUNCTIONS ===
mPlusBtn.addEventListener("click", () => {
  const current = parseFloat(resultDisplay.value);
  if (!isNaN(current)) memory += current;
});

mMinusBtn.addEventListener("click", () => {
  const current = parseFloat(resultDisplay.value);
  if (!isNaN(current)) memory -= current;
});

mrBtn.addEventListener("click", () => {
  expression += memory.toString();
  expressionDisplay.textContent += memory.toString();
});

mcBtn.addEventListener("click", () => {
  memory = 0;
});

// === FUNCTIONAL OPERATORS ===

// x² → wraps last number or expression
squareBtn.addEventListener("click", () => {
  const match = expression.match(/([0-9.]+|\([^\)]+\))$/);
  if (match) {
    const last = match[1];
    const index = expression.lastIndexOf(last);
    expression = `${expression.slice(0, index)}(${last})**2`;
    expressionDisplay.textContent = `${expressionDisplay.textContent.slice(0, index)}(${last})²`;
  }
});

// √ → wraps last number or expression
sqrtBtn.addEventListener("click", () => {
  // Just add the function and start the bracket
  expression += "Math.sqrt(";
  expressionDisplay.textContent += "√(";
});
