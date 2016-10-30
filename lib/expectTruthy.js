module.exports = expectTruthy = function(input, isTruthy, debug) {

  // checks to ensure that the isTruthy key is either true or false
  if (typeof(isTruthy) !== 'boolean') {
    if (debug) {
      console.log('invalid option', isTruthy, 'passed to isTruthy');
    }
    return false;
  }

  // checks if input is truthy
  if (isTruthy && !input) {
    return false;
  }

  // checks if input is not truthy
  if (!isTruthy && input) {
    return false;
  }

  return true;

};
