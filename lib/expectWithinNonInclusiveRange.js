module.exports = expectWithinNonInclusiveRange = function(input, isWithinNonInclusiveRange, debug) {

  if (typeof(input) !== 'number') {
    if (debug) {
      console.log('isWithinNonInclusiveRange can only test numbers; invalid input', input);
    }
    return false;
  }

  if (!Array.isArray(isWithinNonInclusiveRange) || isWithinNonInclusiveRange.length !== 2 || typeof(isWithinNonInclusiveRange[0]) !== 'number' || typeof(isWithinNonInclusiveRange[1]) !== 'number' || isWithinNonInclusiveRange[0] > isWithinNonInclusiveRange[1]) {
    if (debug) {
      console.log('invalid option', isWithinNonInclusiveRange, 'passed to isWithinNonInclusiveRange');
    }
    return false;
  }

  if (input > isWithinNonInclusiveRange[0] && input < isWithinNonInclusiveRange[1]) {
    return true;
  } else {
    return false;
  }

};
