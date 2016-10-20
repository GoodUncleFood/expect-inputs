module.exports = expectTruthy = function(input, isTruthy, debug) {

  if (typeof(isTruthy) !== 'boolean') {
    if (debug) {
      console.log('invalid option', isTruthy, 'passed to isTruthy');
    }
    return false;
  }

  if (isTruthy && !input) {
    return false;
  }

  if (!isTruthy && input) {
    return false;
  }

  return true;

};
