module.exports = expectWithinRange = function(input, isWithinRange, debug) {

  // checks to ensure that input to test is a number
  if (typeof(input) !== 'number') {
    if (debug) {
      console.log('isWithinRange can only test numbers; invalid input', input);
    }
    return false;
  }

  // checks to ensure that isWithinRange is an array or two Numbers
  if (!Array.isArray(isWithinRange) || isWithinRange.length !== 2 || typeof(isWithinRange[0]) !== 'number' || typeof(isWithinRange[1]) !== 'number' || isWithinRange[0] > isWithinRange[1]) {
    if (debug) {
      console.log('invalid option', isWithinRange, 'passed to isWithinRange');
    }
    return false;
  }

  // checks if input is within the range
  if (input < isWithinRange[0] || input > isWithinRange[1]) {
    return false;
  }

  return true;

};
