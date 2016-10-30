module.exports = expectNoneOf = function(input, hasNoneOf, debug) {

  // checks to ensure that has hasNoneOf is an array
  if (!Array.isArray(hasNoneOf)) {
    if (debug) {
      console.log('invalid option', hasNoneOf, 'passed to hasNoneOf');
    }
    return false;
  }

  var result = true;

  // if input to test is an array,
  // checks to ensure that the input array
  // contains none of the values specified in the hasNoneOf array
  if (Array.isArray(input)) {
    input.forEach(function(item) {
      if (result) {
        if (hasNoneOf.indexOf(item) > -1) {
          result = false;
        }
      }
    });

  // if input to test is an object,
  // checks to ensure that the input object
  // contains none of the keys specified in the hasNoneOf array
  } else if (typeof(input) === 'object' && !Array.isArray(input)) {

    var keys = Object.keys(input);

    keys.forEach(function(key) {
      if (result) {
        if (hasNoneOf.indexOf(key) > -1) {
          result = false;
        }
      }
    });

  // handles special case if input to test is not an array or object
  } else if (hasNoneOf.indexOf(input) > -1) {
    return false;
  }

  return result;

};
