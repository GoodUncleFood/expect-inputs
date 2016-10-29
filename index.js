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

      var path = key.split('.').slice(1).join('.');

      var expectedPathResult = expectPath(input, path);
      if (expectedPathResult === 'not found') {
        result = false;
      } if (!checkInputs(expectedPathResult, hasNested[key], debug)) {
        result =  false;
      }

    }
  });

  return result;

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
    return 'not found';
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

  if (expects.isWithinRange !== undefined && !expectWithinRange(input, expects.isWithinRange, debug)) {
    if (debug) {
      console.log('isWithinRange check failed');
    }
    return false;
  }

  if (expects.isWithinNonInclusiveRange !== undefined && !expectWithinNonInclusiveRange(input, expects.isWithinNonInclusiveRange, debug)) {
    if (debug) {
      console.log('isWithinNonInclusiveRange check failed');
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

module.exports = expectInputs = function(input, expects, debug) {

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

var one = {
  two: {
    a: false
  },
};

console.log(expectInputs(one, {hasNested: {'one.two.a': {isType: 'boolean'}}}));
