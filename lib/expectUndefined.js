module.exports = expectUndefined = function(input, isUndefined, debug) {

  if (typeof(isUndefined) !== 'boolean') {
    if (debug) {
      console.log('invalid option', isUndefined, 'passed to isUndefined');
    }
    return false;
  }

  if (isUndefined && input !== undefined) {
    return false;
  }

  if (!isUndefined && input === undefined) {
    return false;
  }

  return true;

};
