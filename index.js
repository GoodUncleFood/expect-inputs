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

var checkNested = function(input, expectsNested) {

  var keys = Object.keys(expectsNested);

  var result = true;

  keys.forEach(function(key) {
    if (result) {

      if (!expectPath(input, key)) {
        result = false;
        return;
      }

      if (true) {
        return;
      }

    }
  });

  return result;

};

var expectPath = function(base, path) {

  var current = base;
  var components = path.split('.');
  var result = true;

  components.forEach(function(component) {
    if (result) {
      if ((typeof(current) !== 'object') || (!current.hasOwnProperty(components[i]))) {
        result = false;
      }
      current = current[components[i]];
    }
  });

  return result;

};

var expectInputs = function(input, expects, expectsNested) {

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

  if (expectsNested !== undefined && !checkNested(input, expectsNested)) {
    return false;
  }

  return true;

};

console.log(expectInputs([1, 2, 3], {cb: function(input) { return input.length > 2; }, }));
