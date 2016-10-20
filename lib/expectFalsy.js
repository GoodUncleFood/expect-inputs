module.exports = expectFalsy = function(input, isFalsy, debug) {

  if (typeof(isFalsy) !== 'boolean') {
    if (debug) {
      console.log('invalid option', isFalsy, 'passed to isFalsy');
    }
    return false;
  }

  if (isFalsy && input) {
    return false;
  }

  if (!isFalsy && !input) {
    return false;
  }

  return true;

};
