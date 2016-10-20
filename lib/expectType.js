module.exports = expectType = function(input, isType, debug) {

  if (isType !== 'object' && isType !== 'array' && isType !== 'function' && isType !== 'string' && isType !== 'number' && isType !== 'boolean') {
    if (debug) {
      console.log('invalid option', isType, 'passed to isType');
    }
    return false;
  }

  if (isType === 'object' && (typeof(input) !== 'object' || Array.isArray(input))) {
    return false;
  }

  if (isType === 'array' && !Array.isArray(input)) {
    return false;
  }

  if (isType === 'function' && typeof(input) !== 'function') {
    return false;
  }

  if (isType === 'string' && typeof(input) !== 'string') {
    return false;
  }

  if (isType === 'number' && typeof(input) !== 'number') {
    return false;
  }

  if (isType === 'boolean' && typeof(input) !== 'boolean') {
    return false;
  }

  return true;

};
