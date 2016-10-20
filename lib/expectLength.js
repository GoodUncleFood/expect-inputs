module.exports = expectLength = function(input, hasLength, minLength, maxLength, debug) {

  if (hasLength !== undefined) {

    if (typeof(hasLength) !== 'boolean' && (typeof(hasLength) !== 'number' || (typeof(hasLength) === 'number' && hasLength < 0))) {
      if (debug) {
        console.log('invalid option', hasLength, 'passed to hasLength');
      }
      return false;
    }

    if (typeof(hasLength) === 'number' && input.length !== hasLength) {
      return false;
    } else if (typeof(hasLength) === 'boolean' && input.length > 1 !== hasLength) {
      return false;
    }

  }

  if (minLength !== undefined) {

    if (typeof(minLength) !== 'number' || (typeof(minLength) === 'number' && minLength < 0)) {
      if (debug) {
        console.log('invalid option', minLength, 'passed to minLength');
      }
      return false;
    }

    if (input.length < minLength) {
      return false;
    }

  }

  if (maxLength !== undefined) {

    if (typeof(maxLength) !== 'number' || (typeof(maxLength) === 'number' && maxLength < 0)) {
      if (debug) {
        console.log('invalid option', maxLength, 'passed to maxLength');
      }
      return false;
    }

    if (input.length > maxLength) {
      return false;
    }

  }

  return true;

};
