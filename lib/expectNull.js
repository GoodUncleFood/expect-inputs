module.exports = expectNull = function(input, isNull, debug) {

  if (typeof(isNull) !== 'boolean') {
    if (debug) {
      console.log('invalid option', isNull, 'passed to isNull');
    }
    return false;
  }

  if (isNull && input !== null) {
    return false;
  }

  if (!isNull && input === null) {
    return false;
  }

  return true;

};
