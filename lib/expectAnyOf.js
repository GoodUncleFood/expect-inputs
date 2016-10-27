module.exports = expectAnyOf = function(input, hasAnyOf, debug) {

  if (!Array.isArray(hasAnyOf)) {
    if (debug) {
      console.log('invalid option', hasAnyOf, 'passed to hasAnyOf');
    }
    return false;
  }

  var result = true;

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

  } else if (hasAnyOf.indexOf(input) < 0) {
    return false;
  }

  return result;

};
