module.exports = expectArrayOfType = function(input, isArrayOfType, debug) {

  // checks to ensure that caller is testin for an Object, Array, Function, String, Number, or Boolean
  if (isArrayOfType !== 'object' && isArrayOfType !== 'array' && isArrayOfType !== 'function' && isArrayOfType !== 'string' && isArrayOfType !== 'number' && isArrayOfType !== 'boolean') {
    if (debug) {
      console.log('invalid option', isArrayOfType, 'passed to isArrayOfType');
    }
    return false;
  }

  var result = true;

  // iterates through array to typecheck each element
  input.forEach(function(item) {
    if (result) {
      if (isArrayOfType === 'array') {
        if (!Array.isArray(item)) {
          result = false;
        }
      } else {
        if (typeof(item) !== isArrayOfType) {
          result = false;
        }
      }
    }
  });

  return result;

};
