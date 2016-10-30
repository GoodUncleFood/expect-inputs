module.exports = expectNull = function(input, isNull, debug) {

  // checks to ensure that the isNull key is either true or false
  if (typeof(isNull) !== 'boolean') {
    if (debug) {
      console.log('invalid option', isNull, 'passed to isNull');
    }
    return false;
  }

  // checks if value should be null
  if (isNull && input !== null) {
    return false;
  }

  // checks if value should not be null
  if (!isNull && input === null) {
    return false;
  }

  return true;

};
