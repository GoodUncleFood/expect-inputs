// loads helper modules from lib
var expectType = require('./lib/expectType');
var expectLength = require('./lib/expectLength');
var expectExactly = require('./lib/expectExactly');
var expectNull = require('./lib/expectNull');
var expectUndefined = require('./lib/expectUndefined');
var expectTruthy = require('./lib/expectTruthy');
var expectFalsy = require('./lib/expectFalsy');
var expectWithinRange = require('./lib/expectWithinRange');
var expectWithinNonInclusiveRange = require('./lib/expectWithinNonInclusiveRange');
var expectAnyOf = require('./lib/expectAnyOf');
var expectNoneOf = require('./lib/expectNoneOf');
var expectAllOf = require('./lib/expectAllOf');
var expectArrayOfType = require('./lib/expectArrayOfType');

// main helper function that iterates through the hasNested object
var checkNested = function(input, hasNested, debug) {

  // checks to ensure the input to check is an object
  if (typeof(input) !== 'object') {
    if (debug) {
      console.log('invalid option', input, 'passed to hasNested');
    }
    return false;
  }

  // checks to ensure the hasNested argument is an object
  if (typeof(hasNested) !== 'object') {
    if (debug) {
      console.log('invalid option', hasNested, 'passed to hasNested');
    }
    return false;
  }

  var result = true;

  // gets the keys/paths of each object to check, as specified by the caller in the hasNested object
  var keys = Object.keys(hasNested);

  // iterates through the keys to determine 1) if the object exists as a sub-object of the input object
  // and 2) applies the expects checks to the sub-object
  keys.forEach(function(key) {
    if (result) {

      // removes the base object from the path
      var path = key.split('.').slice(1).join('.');

      // invokes expectPath, which will return the sub-object to test, if it exits, or "not found" if it does not
      var expectedPathResult = expectPath(input, path);

      // returns false if the object does not exist, invokes checkInputs otherwise
      if (expectedPathResult === 'not found') {
        result = false;
      } if (!checkInputs(expectedPathResult, hasNested[key], debug)) {
        result =  false;
      }

    }
  });

  return result;

};

// takes a string that specifies a nested object and tests if that sub-object exists within the base object
var expectPath = function(base, path, debug) {

  var result = true;
  var current = base;

  // separates string that specifies a nested object into an array of each nested object in the path
  var components = path.split('.');

  // iterates through sub objects to determine if each exists
  components.forEach(function(component, index) {
    if (result) {

      if ((typeof(current) !== 'object') || (!current.hasOwnProperty(component))) {
        result = false;
      }

      current = current[component];
    }
  });

  if (result === false) {
    return 'not found';
  } else {
    return current;
  }

};

// main helper function that invokes specific expects tests specified by the caller
var checkInputs = function(input, expects, debug) {

  // invokes type check
  if (expects.isType !== undefined && !expectType(input, expects.isType, debug)) {
    if (debug) {
      console.log('type check failed');
    }
    return false;
  }

  // invokes length checks
  if ((expects.hasLength !== undefined || expects.minLength !== undefined || expects.maxLength !== undefined) && !expectLength(input, expects.hasLength, expects.minLength, expects.maxLength, debug)) {
    if (debug) {
      console.log('length check failed');
    }
    return false;
  }

  // checks if input is a specific value
  if (expects.isExactly !== undefined && !expectExactly(input, expects.isExactly, debug)) {
    if (debug) {
      console.log('isExactly check failed');
    }
    return false;
  }

  // checks if input is null
  if (expects.isNull !== undefined && !expectNull(input, expects.isNull, debug)) {
    if (debug) {
      console.log('isNull check failed');
    }
    return false;
  }

  // checks if input is undefined
  if (expects.isUndefined !== undefined && !expectUndefined(input, expects.isUndefined, debug)) {
    if (debug) {
      console.log('isUndefined check failed');
    }
    return false;
  }

  // checks if input is truthy
  if (expects.isTruthy !== undefined && !expectTruthy(input, expects.isTruthy, debug)) {
    if (debug) {
      console.log('isTruthy check failed');
    }
    return false;
  }

  // checks if input is falsy
  if (expects.isFalsy !== undefined && !expectFalsy(input, expects.isFalsy, debug)) {
    if (debug) {
      console.log('isFalsy check failed');
    }
    return false;
  }

  // checks if input is within an inclusive numeric range
  if (expects.isWithinRange !== undefined && !expectWithinRange(input, expects.isWithinRange, debug)) {
    if (debug) {
      console.log('isWithinRange check failed');
    }
    return false;
  }

  // checks if input is within a non-inclusive range
  if (expects.isWithinNonInclusiveRange !== undefined && !expectWithinNonInclusiveRange(input, expects.isWithinNonInclusiveRange, debug)) {
    if (debug) {
      console.log('isWithinNonInclusiveRange check failed');
    }
    return false;
  }

  // checks if input is, or contains, any of the values specified in an array
  if (expects.hasAnyOf !== undefined && !expectAnyOf(input, expects.hasAnyOf, debug)) {
    if (debug) {
      console.log('hasAnyOf check failed');
    }
    return false;
  }

  // checks if input is not, or does not contain, any of the values specified in an array
  if (expects.hasNoneOf !== undefined && !expectNoneOf(input, expects.hasNoneOf, debug)) {
    if (debug) {
      console.log('hasNoneOf check failed');
    }
    return false;
  }

  // checks if input contains all of the values specified in an array
  if (expects.hasAllOf !== undefined && !expectAllOf(input, expects.hasAllOf, debug)) {
    if (debug) {
      console.log('hasAllOf check failed');
    }
    return false;
  }

  // checks if input array contains only values of a specific type
  if (expects.isArrayOfType !== undefined && !expectArrayOfType(input, expects.isArrayOfType, debug)) {
    if (debug) {
      console.log('isArrayOfType check failed');
    }
    return false;
  }

  // applies a custom test as provided in a callback
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

  // invokes checkNested to test a nested object
  if (expects.hasNested !== undefined && !checkNested(input, expects.hasNested, debug)) {
    if (debug) {
      console.log('check of nested object failed');
    }
    return false;
  }

  return true;

};

// main entry point
module.exports = expectInputs = function(input, expects, debug) {

  var result = true;

  // checks if input is an array
  if (Array.isArray(input)) {

    // if the expects object is an array, applies test at each index of the expects object to the corresponding index within the input
    // otherwise, applies the expects tests to the input array as a whole
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

    // if a forEach object is passed to expects, applies the tests within forEach to each item in the input array
    if (result && expects.forEach) {
      input.forEach(function(item) {
        if (result) {
          if (!checkInputs(item, expects.forEach, debug)) {
            result = false;
          }
        }
      });
    }

    // if an atIndex object is passed to expects, applies the tests for a specified index to the corresponding element within the input array
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

  // if input is not an array, applies the tests specified in expects to the individual value
  } else {
    if (!checkInputs(input, expects, debug)) {
      result = false;
    }
  }

  return result;

};
