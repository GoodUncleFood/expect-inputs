module.exports = expectArrayOfType = function(input, isArrayOfType, debug) {

  if (isArrayOfType !== 'object' && isArrayOfType !== 'array' && isArrayOfType !== 'function' && isArrayOfType !== 'string' && isArrayOfType !== 'number' && isArrayOfType !== 'boolean') {
    if (debug) {
      console.log('invalid option', isArrayOfType, 'passed to isArrayOfType');
    }
    return false;
  }

  var result = true;

  input.forEach(function(item) {
    if (result) {
      if (typeof(item) !== isArrayOfType) {
        result = false;
      }
    }
  });

  return result;

};
