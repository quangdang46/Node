const fs = require("fs");

const calc = (a, b, op) => {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        return "Cannot divide by zero";
      }
      return a / b;
    default:
      return "Invalid operator";
  }
};

const moveFile = (oldPath, newPath) => {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve("File moved");
    });
  });
};

module.exports = { calc, moveFile };
