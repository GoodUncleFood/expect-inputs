module.exports = expectFalsy = function(input, isFalsy, debug) {

  // checks to ensure that the isFalsy key is either true or false
  if (typeof(isFalsy) !== 'boolean') {
    if (debug) {
      console.log('invalid option', isFalsy, 'passed to isFalsy');
    }
    return false;
  }

  // checks if input is falsy
  if (isFalsy && input) {
    return false;
  }

  // checks if input is not falsy
  if (!isFalsy && !input) {
    return false;
  }

  return true;

};
