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
  isArrayOfType: 'object', 'array', 'function, 'string', 'number', 'boolean'
  hasNested: { path (string) : expects options (obj) }
  forEach: { path (string) : expects options (obj) }
  atIndex: { path (string) : expects options (obj) }
  customFunction: () => {} expects if function returns true

*/

var expectType = function(input, isType, debug) {

  if (isType !== 'object' && isType !== 'array' && isType !== 'function' && isType !== 'string' && isType !== 'number' && isType !== 'boolean') {
    if (debug) {
      console.log('invalid option', isType, 'passed to isType');
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

    if (typeof(hasLength) !== 'boolean' && (typeof(hasLength) !== 'number' || (typeof(hasLength) === 'number' && hasLength < 0))) {
      if (debug) {
        console.log('invalid option', hasLength, 'passed to hasLength');
      }
      return false;
    }

    if (typeof(hasLength) === 'number' && input.length !== hasLength) {
      return false;
    } else if (typeof(hasLength) === 'boolean' && input.length > 1 !== hasLength) {
      return false;
    }

  }

  if (minLength !== undefined) {

    if (typeof(minLength) !== 'number' || (typeof(minLength) === 'number' && minLength < 0)) {
      if (debug) {
        console.log('invalid option', minLength, 'passed to minLength');
      }
      return false;
    }

    if (input.length < minLength) {
      return false;
    }

  }

  if (maxLength !== undefined) {

    if (typeof(maxLength) !== 'number' || (typeof(maxLength) === 'number' && maxLength < 0)) {
      if (debug) {
        console.log('invalid option', maxLength, 'passed to maxLength');
      }
      return false;
    }

    if (input.length > maxLength) {
      return false;
    }

  }

  return true;

};

var expectExactly = function(input, isExactly, debug) {

  if (typeof(isExactly) !== 'object' && typeof(isExactly) !== 'function' && typeof(isExactly) !== 'string' && typeof(isExactly) !== 'number' && typeof(isExactly) !== 'boolean') {
    if (debug) {
      console.log('invalid option', isExactly, 'passed to isExactly');
    }
    return false;
  }

  if (input === isExactly) {
    return true;
  } else {
    return false;
  }

};

var expectNull = function(input, isNull, debug) {

  if (typeof(isNull) !== 'boolean') {
    if (debug) {
      console.log('invalid option', isNull, 'passed to isNull');
    }
    return false;
  }

  if (isNull && input !== null) {
    return false;
  }

  if (!isNull && input === null) {
    return false;
  }

  return true;

};

var expectUndefined = function(input, isUndefined, debug) {

  if (typeof(isUndefined) !== 'boolean') {
    if (debug) {
      console.log('invalid option', isUndefined, 'passed to isUndefined');
    }
    return false;
  }

  if (isUndefined && input !== undefined) {
    return false;
  }

  if (!isUndefined && input === undefined) {
    return false;
  }

  return true;

};

var expectTruthy = function(input, isTruthy, debug) {

  if (typeof(isTruthy) !== 'boolean') {
    if (debug) {
      console.log('invalid option', isTruthy, 'passed to isTruthy');
    }
    return false;
  }

  if (isTruthy && !input) {
    return false;
  }

  if (!isTruthy && input) {
    return false;
  }

  return true;

};

var expectFalsy = function(input, isFalsy, debug) {

  if (typeof(isFalsy) !== 'boolean') {
    if (debug) {
      console.log('invalid option', isFalsy, 'passed to isFalsy');
    }
    return false;
  }

  if (isFalsy && input) {
    return false;
  }

  if (!isFalsy && !input) {
    return false;
  }

  return true;

};

var expectAnyOf = function(input, hasAnyOf, debug) {

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

var expectNoneOf = function(input, hasNoneOf, debug) {

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

var expectAllOf = function(input, hasAllOf, debug) {

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

var expectArrayOfType = function(input, isArrayOfType, debug) {

  if (isArrayOfType !== 'object' && isArrayOfType !== 'array' && isArrayOfType !== 'function' && isArrayOfType !== 'string' && isArrayOfType !== 'number' && isArrayOfType !== 'boolean') {
    if (debug) {
      console.log('invalid option', isArrayOfType, 'passed to isArrayOfType');
    }
    return false;
  }

  var result = true;

  input.forEach(function(item) {
    if (result) {
      if (typeof(item) !== isArrayOfType) {
        result = false;
      }
    }
  });

  return result;

};

var checkNested = function(input, hasNested, debug) {

  if (typeof(input) !== 'object') {
    if (debug) {
      console.log('invalid option', input, 'passed to hasNested');
    }
    return false;
  }

  if (typeof(hasNested) !== 'object') {
    if (debug) {
      console.log('invalid option', hasNested, 'passed to hasNested');
    }
    return false;
  }

  var result = true;
  var keys = Object.keys(hasNested);

  keys.forEach(function(key) {
    if (result) {

      var path = filterPath(input, key, debug);

      var expectedPathResult = expectPath(input, path);
      if (expectedPathResult === false) {
        result = false;
      } if (!checkInputs(expectedPathResult, hasNested[key], debug)) {
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

var checkInputs = function(input, expects, debug) {

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
  if (expects.isArrayOfType !== undefined && !expectArrayOfType(input, expects.isArrayOfType, debug)) {
    if (debug) {
      console.log('isArrayOfType check failed');
    }
    return false;
  }

  if (expects.customFunction !== undefined) {

    if (typeof(expects.customFunction) !== 'function') {
      if (debug) {
        console.log('custom function failed');
        console.log('invalid option', expects.customFunction, 'passed to customFunction');
      }
      return false;
    }

    if (!expects.customFunction(input)) {
      if (debug) {
        console.log('custom function failed');
      }
      return false;
    }

  }

  if (expects.hasNested !== undefined && !checkNested(input, expects.hasNested, debug)) {
    if (debug) {
      console.log('check of nested object failed');
    }
    return false;
  }

  return true;

};

var expectInputs = function(input, expects, debug) {

  var result = true;

  if (Array.isArray(input)) {

    if (Array.isArray(expects)) {
      input.forEach(function(item, index) {
        if (result) {
          if (!expectInputs(item, expects[index], debug)) {
            result = false;
          }
        }
      });
    } else if (!checkInputs(input, expects, debug)) {
      result = false;
    }

    if (result && expects.forEach) {
      input.forEach(function(item) {
        if (result) {
          if (!checkInputs(item, expects.forEach, debug)) {
            result = false;
          }
        }
      });
    }

    if (result && expects.atIndex) {

      var keys = Object.keys(expects.atIndex);

      keys.forEach(function(key) {
        if (result) {
          if (!checkInputs(input[key], expects.atIndex[key], debug)) {
            result = false;
          }
        }
      });

    }

  } else {
    if (!checkInputs(input, expects, debug)) {
      result = false;
    }
  }

  return result;

};

// console.log(expectInputs(
//   [
//     '1',
//     '2',
//     3,
//     false,
//   ],
//   {
//     forEach: {
//       isNull: false,
//     },
//     atIndex: {
//       0: {isType: 'string'},
//       1: {isType: 'string'},
//       2: {isType: 'number'},
//       3: {isType: 'boolean'},
//     }
//   },
//   true
// ));

// console.log(expectInputs(
//   [
//     1,
//     2,
//     3,
//   ],
//   [
//     {isType: 'number'},
//     {isType: 'number'},
//     {isType: 'number'},
//   ],
//   true
// ));


// var testItem = {
//   thing: {
//     nextThing: {
//       nextNextThing: {
//         a: [false, false],
//       },
//       theOtherOne: {
//         a: 'hello',
//       }
//     },
//   },
// };
//
// console.log(expectInputs(testItem,
//   {
//     isType: 'object',
//     hasNested: {
//       'testItem.thing.nextThing.nextNextThing.a': {
//         isType: 'array',
//         hasLength: 2,
//         hasAllOf: [false],
//         maxLength: 10,
//         isArrayOfType: 'boolean',
//         isNull: false,
//         customFunction: (i) => i.length > 1,
//         isExactly: testItem.thing.nextThing.nextNextThing.a,
//       },
//       'testItem.thing.nextThing.theOtherOne.a': {
//         isType: 'string',
//         hasAnyOf: ['hello'],
//         hasNoneOf: ['bad'],
//         hasAllOf: ['hello'],
//         isExactly: 'hello',
//       },
//     },
//   },
//   true
// ));
