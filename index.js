/*

  isType : 'object', 'array', 'function, 'string', 'number', 'boolean'
  hasLength : true, false, number
  minLength : number > 0
  maxLength : number > 0
  isExactly: Object, Array, Function, String, Number, Boolean
  isNull : true, false
  isUndefined : true, false
  isTruthy : true, false
  isFalsy: true, false
  hasAnyOf: [], checks if key is present if test item is an object
  hasNoneOf: [], checks if key is present if test item is an object
  hasNoneOf: [], checks if key is present if test item is an object
  hasNested: { path (string) : expects (obj) }
  cb: () => {} expects if cb returns true

*/

var expectType = function(input, isType, debug) {

  if (isType !== 'object' && isType !== 'array' && isType !== 'function' && isType !== 'string' && isType !== 'number' && isType !== 'boolean') {
    if (debug) {
      console.log('invalid type', isType, 'passed to isType');
    }
    return false;
  }

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

var expectLength = function(input, hasLength, minLength, maxLength, debug) {

  if (hasLength !== undefined) {
    if (typeof(hasLength) === 'number' && input.length !== hasLength) {
      return false;
    } else if (typeof(hasLength) === 'boolean' && input.length > 1 !== hasLength) {
      return false;
    }
  }

  if (minLength !== undefined && input.length < minLength) {
    return false;
  }

  if (maxLength !== undefined && input.length > maxLength) {
    return false;
  }

  return true;

};

var expectExactly = function(input, isExactly, debug) {

  if (input === isExactly) {
    return true;
  } else {
    return false;
  }

};

var expectNull = function(input, isNull, debug) {

  if (isNull && input !== null) {
    return false;
  }

  if (!isNull && input === null) {
    return false;
  }

  return true;

};

var expectUndefined = function(input, isUndefined, debug) {

  if (isUndefined && input !== undefined) {
    return false;
  }

  if (!isUndefined && input === undefined) {
    return false;
  }

  return true;

};

var expectTruthy = function(input, isTruthy, debug) {

  if (isTruthy && !input) {
    return false;
  }

  if (!isTruthy && input) {
    return false;
  }

  return true;

};

var expectFalsy = function(input, isFalsy, debug) {

  if (isFalsy && input) {
    return false;
  }

  if (!isFalsy && !input) {
    return false;
  }

  return true;

};

var expectAnyOf = function(input, hasAnyOf, debug) {

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

  } else {
    if (hasAnyOf.indexOf(input) < 0) {
      return false;
    }
  }

  return result;

};

var expectNoneOf = function(input, hasNoneOf, debug) {

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

  } else {
    if (hasNoneOf.indexOf(input) > -1) {
      return false;
    }
  }

  return result;

};

var expectAllOf = function(input, hasAllOf, debug) {

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

  } else {
    if (hasAllOf.indexOf(input) < 0) {
      return false;
    }
  }

  return result;

};

var checkNested = function(input, hasNested, debug) {

  var result = true;
  var keys = Object.keys(hasNested);

  keys.forEach(function(key) {
    if (result) {

      var path = filterPath(input, key, debug);

      var expectedPathResult = expectPath(input, path);
      if (expectedPathResult === false) {
        result = false;
      } if (!expectInputs(expectedPathResult, hasNested[key], debug)) {
        result =  false;
      }


    }
  });

  return result;

};

var filterPath = function(base, path, debug) {

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

var expectPath = function(base, path, debug) {

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

  if (expects.isType !== undefined && !expectType(input, expects.isType, debug)) {
    if (debug) {
      console.log('type check failed');
    }
    return false;
  }

  if ((expects.hasLength !== undefined || expects.minLength !== undefined || expects.maxLength !== undefined) && !expectLength(input, expects.hasLength, expects.minLength, expects.maxLength, debug)) {
    if (debug) {
      console.log('length check failed');
    }
    return false;
  }

  if (expects.isExactly !== undefined && !expectExactly(input, expects.isExactly, debug)) {
    if (debug) {
      console.log('isExactly check failed');
    }
    return false;
  }

  if (expects.isNull !== undefined && !expectNull(input, expects.isNull, debug)) {
    if (debug) {
      console.log('isNull check failed');
    }
    return false;
  }

  if (expects.isUndefined !== undefined && !expectUndefined(input, expects.isUndefined, debug)) {
    if (debug) {
      console.log('isUndefined check failed');
    }
    return false;
  }

  if (expects.isTruthy !== undefined && !expectTruthy(input, expects.isTruthy, debug)) {
    if (debug) {
      console.log('isTruthy check failed');
    }
    return false;
  }

  if (expects.isFalsy !== undefined && !expectFalsy(input, expects.isFalsy, debug)) {
    if (debug) {
      console.log('isFalsy check failed');
    }
    return false;
  }

  if (expects.hasAnyOf !== undefined && !expectAnyOf(input, expects.hasAnyOf, debug)) {
    if (debug) {
      console.log('hasAnyOf check failed');
    }
    return false;
  }

  if (expects.hasNoneOf !== undefined && !expectNoneOf(input, expects.hasNoneOf, debug)) {
    if (debug) {
      console.log('hasNoneOf check failed');
    }
    return false;
  }

  if (expects.hasAllOf !== undefined && !expectAllOf(input, expects.hasAllOf, debug)) {
    if (debug) {
      console.log('hasAllOf check failed');
    }
    return false;
  }

  if (expects.cb !== undefined && !expects.cb(input, debug)) {
    if (debug) {
      console.log('callback failed');
    }
    return false;
  }

  if (expects.hasNested !== undefined && !checkNested(input, expects.hasNested, debug)) {
    if (debug) {
      console.log('check of nested object failed');
    }
    return false;
  }

  return true;

};

var testItem = {
  thing: {
    nextThing: {
      nextNextThing: {
        a: [1, 2],
      },
      theOtherOne: {
        a: 'hello',
      }
    },
  },
};

console.log(expectInputs(testItem, {
    isType: 'object',
    hasNested: {
      'testItem.thing.nextThing.nextNextThing.a': {
        isType: 'array',
        hasLength: 2,
        hasAllOf: [2, 1],
        isExactly: testItem.thing.nextThing.nextNextThing.a,
      },
      'testItem.thing.nextThing.theOtherOne.a': {
        isType: 'string',
        hasAnyOf: ['hello'],
        hasNoneOf: ['bad'],
        hasAllOf: ['hello'],
        isExactly: 'hello',
      },
    },
  },
  true
));
