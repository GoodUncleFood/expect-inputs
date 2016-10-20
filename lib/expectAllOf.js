module.exports = expectAllOf = function(input, hasAllOf, debug) {

  if (!Array.isArray(hasAllOf)) {
    if (debug) {
      console.log('invalid option', hasAllOf, 'passed to hasAllOf');
    }
    return false;
  }

  var result = true;

  if (Array.isArray(input)) {
    hasAllOf.forEach(function(item) {
      if (result) {
        if (input.indexOf(item) < 0) {
          result = false;
        }
      }
    });
  } else if (typeof(input) === 'object' && !Array.isArray(input)) {

    var keys = Object.keys(input);

    hasAllOf.forEach(function(item) {
      if (result) {
        if (keys.indexOf(item) < 0) {
          result = false;
        }
      }
    });

  } else if (hasAllOf.indexOf(input) < 0) {
    return false;
  }

  return result;

};
