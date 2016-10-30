# Expect Inputs

A JavaScript library that provides lightweight, flexible checking of function argument2.

Expect Inputs is developed and maintained by [Good Uncle](http://gooduncle.com).

## Basic Usage

### Install

```
npm install expect-inputs
```
### Require module

```
var expectInputs = require('expect-inputs');
```

### Basic Syntax

```
expectInputs(inputs, expects, debug); // returns true or false
```
`inputs` accepts a String, Number, Boolean, Array, Object, or Function

`expects` accepts an object with any of the options as specified below

`debug` is an optional argument that will provide basic error logging if true

### Test Inputs

```
var expectInputs = require('expect-inputs');
var timesTwo = function(input) {
  if (expectInputs(input, {isUndefined: false, isType: 'number'})) {
    return input * 2;
  } else {
    console.log('invalid input');
    return;
  }
};
```

## Sample Usage

### Testing a single input

```
var a = 'hello';
expectInputs(a, {isType: 'string', hasLength: 5}); // true
```

### Testing elements in an array

```
var inputs = [1, 'string,', true];
var expects = [
  {
    isUndefined: false,
    isType: 'number',
  },
  {
    isType: 'string',
    minLength: 3,
  },
  {
    isNull: false,
    isType: 'boolean',
  },
];
expectInputs(inputs, expects); // true
```

### Testing an array and each of its elements using the forEach option

```
var inputs = ['Bob', 'Carol', 'Ted', 'Alice'];
var expects = {
  isType: 'array',
  hasLength: true,
  forEach: {
    isType: 'string',
    hasLength: true,
  },
};
expectInputs(inputs, expects); // true
```

### Testing an array and individual elements using the atIndex option

```
var inputs = ['hello', 1];
var expects = {
  isType: 'array',
  hasLength: true,
  atIndex: {
    '0': {
      isType: 'string',
    },
    '1': {
      isType: 'number',
    },
  },
};
expectInputs(inputs, expects); // true
```

### Testing a nested object

```
var input = {
  subOne: {
    a: 1,
  },
};
var expects = {
  isType: 'object',
  hasNested: {
    'input.subOne.a': {
      isUndefined: false,
      isType: 'number',
    },
  },
};
expectInputs(input, expects): // true
```

### Testing an input using the customFunction option

```
var inputs = [1, 2, 3];
var customTest = function(input) {
  if (Array.isArray(input) && input[0] > input[2]) {
    return true;
  } else {
    return false;
  }
};
expectInputs(inputs, {customFunction: customTest}); // false
```

## Options

```
isType : String ('object', 'array', 'function, 'string', 'number', 'boolean')
hasLength : Boolean or Number
minLength : Number > 0
maxLength : Number > 0
isExactly : Object, Array, Function, String, Number, Boolean
isNull : Boolean
isUndefined : Boolean
isTruthy : Boolean
isFalsy : Boolean
isWithinRange : [ min Number, max Number ]
isWithinNonInclusiveRange : [ min Number, max Number ]
hasAnyOf : [], if test item is an Object, test if it contains key
hasNoneOf : [], if test item is an Object, test if it contains key
hasAllOf : [], if test item is an Object, test if it contains key
isArrayOfType : String ('object', 'array', 'function, 'string', 'number', 'boolean')
forEach : { path String : expects options Object }
atIndex : { path String : expects options Object }
hasNested : { path String : expects options Object }
customFunction : Function
```

## Test Coverage Summary

```
Statements   :   97.89% ( 324/331 )
Branches     :   96.94% ( 380/392 )
Functions    :   100% ( 30/30 )
Lines        :   97.89% ( 324/331 )
```
