/**
 * Generates the FizzBuzz result for a given number.
 * @param {number} i - The number for which to generate the FizzBuzz result.
 * @returns {string|number} - Returns 'Fizz', 'Buzz', 'FizzBuzz', or the number itself.
 */
const fizzBuzz = (n) => {
  if (typeof n !== "number") {
    console.log("=================================");
    console.log("param 'n' must be a number");
    console.log("=================================");
    return;
  }

  for (let i = 1; i <= n; i++) {
    let output = "";
    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";
    console.log(output || i);
  }
};

fizzBuzz(50);
