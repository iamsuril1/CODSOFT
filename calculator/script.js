const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];

let output = "";

// Define function to calculate based on button clicked.
const calculate = (btnValue) => {
  if (btnValue === "=" && output !== "") {
    // If output has '%', replace with '/100' before evaluating.
    output = eval(output.replace("%", "/100"));
  } else if (btnValue === "AC") {
    output = "";
  } else if (btnValue === "DEL") {
    // If DEL button is clicked, remove the last character from the output.
    output = output.toString().slice(0, -1);
  } else {
    // If output is empty and button is specialChars then return
    if (output === "" && specialChars.includes(btnValue)) return;
    output += btnValue;
  }
  display.value = output;
};

// Add event listener to buttons, call calculate() on click.
buttons.forEach((button) => {
  // Button click listener calls calculate() with dataset value as argument.
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

// Add keyboard event listener on the document.
document.addEventListener("keydown", (e) => {
  // Check if the pressed key is "Enter" or "Backspace"
  if (e.key === "Enter") {
    calculate("=");
  } else if (e.key === "Backspace") {
    calculate("DEL");
  } else {
    // Map other key codes to corresponding button values
    const keyMap = {
      "0": "0",
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5",
      "6": "6",
      "7": "7",
      "8": "8",
      "9": "9",
      "*": "*",
      "/": "/",
      "-": "-",
      "+": "+",
    };
    
    const keyValue = keyMap[e.key] || e.key;

    // Check if the pressed key corresponds to a button value
    if (specialChars.includes(keyValue)) {
      calculate(keyValue);
    } else if (!isNaN(keyValue)) {
      // If the key is a number, add it to the output
      calculate(keyValue);
    }
  }
});
