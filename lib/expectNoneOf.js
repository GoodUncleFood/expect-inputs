module.exports = expectNoneOf = function(input, hasNoneOf, debug) {

  if (!Array.isArray(hasNoneOf)) {
    if (debug) {
      console.log('invalid option', hasNoneOf, 'passed to hasNoneOf');
    }
    return false;
  }

  var result = true;

  if (Array.isArray(input)) {
    input.forEach(function(item) {
      if (result) {
        if (hasNoneOf.indexOf(item) > -1) {
          result = false;
        }
      }
    });
  } else if (typeof(input) === 'object' && !Array.isArray(input)) {

    var keys = Object.keys(input);

    keys.forEach(function(key) {
      if (result) {
        if (hasNoneOf.indexOf(key) > -1) {
          result = false;
        }
      }
    });

  } else if (hasNoneOf.indexOf(input) > -1) {
    return false;
  }

  return result;

};
