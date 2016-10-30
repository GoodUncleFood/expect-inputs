module.exports = expectLength = function(input, hasLength, minLength, maxLength, debug) {

  // applies hasLength test
  if (hasLength !== undefined) {

    // applies true/false hasLength test
    if (typeof(hasLength) !== 'boolean' && (typeof(hasLength) !== 'number' || (typeof(hasLength) === 'number' && hasLength < 0))) {
      if (debug) {
        console.log('invalid option', hasLength, 'passed to hasLength');
      }
      return false;
    }

    // checks whether input is a specific numeric length
    if (typeof(hasLength) === 'number' && input.length !== hasLength) {
      return false;
    } else if (typeof(hasLength) === 'boolean' && input.length > 1 !== hasLength) {
      return false;
    }

  }

  // applies minLength test
  if (minLength !== undefined) {

    // checks to ensure that minLength is a number greater than zero
    if (typeof(minLength) !== 'number' || (typeof(minLength) === 'number' && minLength < 0)) {
      if (debug) {
        console.log('invalid option', minLength, 'passed to minLength');
      }
      return false;
    }

    // checks if input is at least the minimum length
    if (input.length < minLength) {
      return false;
    }

  }

  // applies maxLength test
  if (maxLength !== undefined) {

    // checks to ensure that maxLength is a number greater than zero
    if (typeof(maxLength) !== 'number' || (typeof(maxLength) === 'number' && maxLength < 0)) {
      if (debug) {
        console.log('invalid option', maxLength, 'passed to maxLength');
      }
      return false;
    }

    // checks if input is not greater than the max length
    if (input.length > maxLength) {
      return false;
    }

  }

  return true;

};
