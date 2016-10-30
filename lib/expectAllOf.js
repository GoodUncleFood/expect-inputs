module.exports = expectAllOf = function(input, hasAllOf, debug) {

  // checks to ensure that has allAllOf is an array
  if (!Array.isArray(hasAllOf)) {
    if (debug) {
      console.log('invalid option', hasAllOf, 'passed to hasAllOf');
    }
    return false;
  }

  var result = true;

  // if input to test is an array,
  // checks to ensure that the input array
  // contains all of the values specified in the hasAllOf array
  if (Array.isArray(input)) {

    hasAllOf.forEach(function(item) {
      if (result) {
        if (input.indexOf(item) < 0) {
          result = false;
        }
      }
    });

  // if input to test is an object,
  // checks to ensure that the input object
  // contains all of the keys specified in the hasAllOf array
  } else if (typeof(input) === 'object' && !Array.isArray(input)) {

    var keys = Object.keys(input);

    hasAllOf.forEach(function(item) {
      if (result) {
        if (keys.indexOf(item) < 0) {
          result = false;
        }
      }
    });

  // handles special case if input to test is not an array or object
  } else {

    hasAllOf.forEach(function(item) {
      if (item !== input) {
        result = false;
      }
    });

  }

  return result;

};
