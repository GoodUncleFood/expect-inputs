module.exports = expectUndefined = function(input, isUndefined, debug) {

  // checks to ensure that the isUndefined key is either true or false
  if (typeof(isUndefined) !== 'boolean') {
    if (debug) {
      console.log('invalid option', isUndefined, 'passed to isUndefined');
    }
    return false;
  }

  // checks if input should be undefined
  if (isUndefined && input !== undefined) {
    return false;
  }

  // checks if input should not be undefined
  if (!isUndefined && input === undefined) {
    return false;
  }

  return true;

};
