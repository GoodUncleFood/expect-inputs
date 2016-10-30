module.exports = expectAnyOf = function(input, hasAnyOf, debug) {

  // checks to ensure that has allAllOf is an array
  if (!Array.isArray(hasAnyOf)) {
    if (debug) {
      console.log('invalid option', hasAnyOf, 'passed to hasAnyOf');
    }
    return false;
  }

  var result = true;

  // if input to test is an array,
  // checks to ensure that the input array
  // contains any of the values specified in the hasAllOf array
  if (Array.isArray(input)) {

    var arrayItemFound = false;

    input.forEach(function(item) {
      if (!arrayItemFound) {
        if (hasAnyOf.indexOf(item) > -1) {
          arrayItemFound = true;
        }
      }
    });

    result = arrayItemFound;

  // if input to test is an object,
  // checks to ensure that the input object
  // contains any of the keys specified in the hasAllOf array
  } else if (typeof(input) === 'object' && !Array.isArray(input)) {

    var keys = Object.keys(input);
    var objectItemFound = false;

    keys.forEach(function(key) {
      if (!objectItemFound) {
        if (hasAnyOf.indexOf(key) > -1) {
          objectItemFound = true;
        }
      }
    });

    result = objectItemFound;

  // handles special case if input to test is not an array or object
  } else if (hasAnyOf.indexOf(input) < 0) {
    return false;
  }

  return result;

};
