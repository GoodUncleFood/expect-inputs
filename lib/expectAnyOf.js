module.exports = expectAnyOf = function(input, hasAnyOf, debug) {

  if (!Array.isArray(hasAnyOf)) {
    if (debug) {
      console.log('invalid option', hasAnyOf, 'passed to hasAnyOf');
    }
    return false;
  }

  var result = true;

  if (Array.isArray(input)) {
    input.forEach(function(item) {
      if (result) {
        if (hasAnyOf.indexOf(item) < 0) {
          result = false;
        }
      }
    });
  } else if (typeof(input) === 'object' && !Array.isArray(input)) {

    var keys = Object.keys(input);

    keys.forEach(function(key) {
      if (result) {
        if (hasAnyOf.indexOf(key) < 0) {
          result = false;
        }
      }
    });

  } else if (hasAnyOf.indexOf(input) < 0) {
    return false;
  }

  return result;

};
