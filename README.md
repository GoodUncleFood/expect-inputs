# Expect Inputs

```
isType : 'object', 'array', 'function, 'string', 'number', 'boolean'
hasLength : true, false, number
minLength : number > 0
maxLength : number > 0
isExactly: Object, Array, Function, String, Number, Boolean
isNull : true, false
isUndefined : true, false
isTruthy : true, false
isFalsy: true, false
isWithinRange: [ min Number, max Number ]
isWithinNonInclusiveRange: [ min Number, max Number ]
hasAnyOf: [], checks if key is present if test item is an object
hasNoneOf: [], checks if key is present if test item is an object
hasAllOf: [], checks if key is present if test item is an object
hasOnly: [], checks if key is present if test item is an object
isArrayOfType: 'object', 'array', 'function, 'string', 'number', 'boolean'
forEach: { path (string) : expects options (obj) }
atIndex: { path (string) : expects options (obj) }
hasNested: { path (string) : expects options (obj) }
customFunction: () => {} expects if function returns true
```
### Test Coverage Summary

```
Statements   : 97.89% ( 324/331 )
Branches     : 96.94% ( 380/392 )
Functions    : 100% ( 30/30 )
Lines        : 97.89% ( 324/331 )
```
