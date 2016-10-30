module.exports = expectExactly = function(input, isExactly, debug) {

  // checks to ensure that caller is testin for an Object, Array, Function, String, Number, or Boolean
  if (typeof(isExactly) !== 'object' && typeof(isExactly) !== 'function' && typeof(isExactly) !== 'string' && typeof(isExactly) !== 'number' && typeof(isExactly) !== 'boolean') {
    if (debug) {
      console.log('invalid option', isExactly, 'passed to isExactly');
    }
    return false;
  }

  // applies strict equality test
  if (input === isExactly) {
    return true;
  } else {
    return false;
  }

};
