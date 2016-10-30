module.exports = expectWithinNonInclusiveRange = function(input, isWithinNonInclusiveRange, debug) {

  // checks to ensure that input to test is a number
  if (typeof(input) !== 'number') {
    if (debug) {
      console.log('isWithinNonInclusiveRange can only test numbers; invalid input', input);
    }
    return false;
  }

  // checks to ensure that isWithinNonInclusiveRange is an array or two Numbers
  if (!Array.isArray(isWithinNonInclusiveRange) || isWithinNonInclusiveRange.length !== 2 || typeof(isWithinNonInclusiveRange[0]) !== 'number' || typeof(isWithinNonInclusiveRange[1]) !== 'number' || isWithinNonInclusiveRange[0] > isWithinNonInclusiveRange[1]) {
    if (debug) {
      console.log('invalid option', isWithinNonInclusiveRange, 'passed to isWithinNonInclusiveRange');
    }
    return false;
  }

  // checks if input is within the non-inclusive range
  if (input > isWithinNonInclusiveRange[0] && input < isWithinNonInclusiveRange[1]) {
    return true;
  } else {
    return false;
  }

};
