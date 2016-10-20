module.exports = expectExactly = function(input, isExactly, debug) {

  if (typeof(isExactly) !== 'object' && typeof(isExactly) !== 'function' && typeof(isExactly) !== 'string' && typeof(isExactly) !== 'number' && typeof(isExactly) !== 'boolean') {
    if (debug) {
      console.log('invalid option', isExactly, 'passed to isExactly');
    }
    return false;
  }

  if (input === isExactly) {
    return true;
  } else {
    return false;
  }

};
