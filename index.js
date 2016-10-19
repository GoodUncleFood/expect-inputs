/*

  isType : 'object', 'array', 'function, ''string', 'number', 'boolean'
  hasLength : true, false
  minLength : number > 0
  maxLength : number > 0
  isNull : true, false
  isUndefined : true, false
  isTruthy : true, false
  isFalsy: true, false
  allowed: []
  disallowed: [], expects if key is present if input is an object
  hasNested: { path (string) : expects (obj) }
  cb: () => {} expects if cb returns true

*/

var expectType = function(input, isType) {

  if (isType === 'object' && (typeof(input) !== 'object' || Array.isArray(input))) {
    return false;
  }

  if (isType === 'array' && !Array.isArray(input)) {
    return false;
  }

  if (isType === 'function' && typeof(input) !== 'function') {
    return false;
  }

  if (isType === 'string' && typeof(input) !== 'string') {
    return false;
  }

  if (isType === 'number' && typeof(input) !== 'number') {
    return false;
  }

  if (isType === 'boolean' && typeof(input) !== 'boolean') {
    return false;
  }

  return true;

};

var expectLength = function(input, hasLength, minLength, maxLength) {

  if (hasLength !== undefined && input.length > 1 !== hasLength) {
    return false;
  }

  if (minLength !== undefined && input.length < minLength) {
    return false;
  }

  if (maxLength !== undefined && input.length > maxLength) {
    return false;
  }

  return true;

};

var expectNull = function(input, isNull) {

  if (isNull && input !== null) {
    return false;
  }

  if (!isNull && input === null) {
    return false;
  }

  return true;

};

var expectUndefined = function(input, isUndefined) {

  if (isUndefined && input !== undefined) {
    return false;
  }

  if (!isUndefined && input === undefined) {
    return false;
  }

  return true;

};

var expectTruthy = function(input, isTruthy) {

  if (isTruthy && !input) {
    return false;
  }

  if (!isTruthy && input) {
    return false;
  }

  return true;

};

var expectFalsy = function(input, isFalsy) {

  if (isFalsy && input) {
    return false;
  }

  if (!isFalsy && !input) {
    return false;
  }

  return true;

};

var expectAllowed = function(input, allowed) {

  var result = true;

  if (Array.isArray(input)) {
    input.forEach(function(item) {
      if (result) {
        if (allowed.indexOf(item) < 0) {
          result = false;
        }
      }
    });
  } else if (typeof(input) === 'object' && !Array.isArray(input)) {

    var keys = Object.keys(input);

    keys.forEach(function(key) {
      if (result) {
        if (allowed.indexOf(key) < 0) {
          result = false;
        }
      }
    });

  } else {
    if (allowed.indexOf(input) < 0) {
      return false;
    }
  }

  return result;

};

var expectDisallowed = function(input, disallowed) {

  var result = true;

  if (Array.isArray(input)) {
    input.forEach(function(item) {
      if (result) {
        if (disallowed.indexOf(item) > -1) {
          result = false;
        }
      }
    });
  } else if (typeof(input) === 'object' && !Array.isArray(input)) {

    var keys = Object.keys(input);

    keys.forEach(function(key) {
      if (result) {
        if (disallowed.indexOf(key) > -1) {
          result = false;
        }
      }
    });

  } else {
    if (disallowed.indexOf(input) > -1) {
      return false;
    }
  }

  return result;

};

var checkNested = function(input, hasNested) {

  var result = true;
  var keys = Object.keys(hasNested);

  keys.forEach(function(key) {
    if (result) {

      var path = filterPath(input, key);

      var expectedPathResult = expectPath(input, path);
      if (expectedPathResult === false) {
        result = false;
      } if (!expectInputs(expectedPathResult, hasNested[key])) {
        result =  false;
      }


    }
  });

  return result;

};

var filterPath = function(base, path) {

  var filteredPath;
  var components = path.split('.');
  var componentsString = components[0];

  components.forEach(function(component, index) {
    if (filteredPath === undefined) {
      if (eval(componentsString) === base) {
        var componentsForFilteredString = components.slice(index + 1);
        filteredPath = componentsForFilteredString.join('.');
      } else if (components[index + 1] !== undefined) {
        componentsString = componentsString + '.' + components[index + 1];
      }
    }
  });

  return filteredPath;

};

var expectPath = function(base, path) {

  var result = true;
  var current = base;
  var components = path.split('.');

  components.forEach(function(component, index) {
    if (result) {

      if ((typeof(current) !== 'object') || (!current.hasOwnProperty(component))) {
        result = false;
      }

      current = current[component];
    }
  });

  if (result === false) {
    return result;
  } else {
    return current;
  }

};

var expectInputs = function(input, expects, debug) {

  if (expects.isType !== undefined && !expectType(input, expects.isType)) {
    return false;
  }

  if ((expects.hasLength !== undefined || expects.minLength !== undefined || expects.maxLength !== undefined) && !expectLength(input, expects.hasLength, expects.minLength, expects.maxLength)) {
    return false;
  }

  if (expects.isNull !== undefined && !expectNull(input, expects.isNull)) {
    return false;
  }

  if (expects.isUndefined !== undefined && !expectUndefined(input, expects.isUndefined)) {
    return false;
  }

  if (expects.isTruthy !== undefined && !expectTruthy(input, expects.isTruthy)) {
    return false;
  }

  if (expects.isFalsy !== undefined && !expectFalsy(input, expects.isFalsy)) {
    return false;
  }

  if (expects.allowed !== undefined && !expectAllowed(input, expects.allowed)) {
    return false;
  }

  if (expects.disallowed !== undefined && !expectDisallowed(input, expects.disallowed)) {
    return false;
  }

  if (expects.cb !== undefined && !expects.cb(input)) {
    return false;
  }

  if (expects.hasNested !== undefined && !checkNested(input, expects.hasNested)) {
    return false;
  }

  return true;

};

var testItem = {
  thing: {
    nextThing: {
      a: true,
    },
  },
};

console.log(expectInputs(testItem, {
    isType: 'object',
    hasNested: {
      'testItem.thing.nextThing.a': {
        isType: 'string',
      },
    },
  }
));
