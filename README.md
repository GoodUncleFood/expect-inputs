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
hasNoneOf: [], checks if key is present if test item is an object
isArrayOfType: 'object', 'array', 'function, 'string', 'number', 'boolean'
hasNested: { path (string) : expects options (obj) }
forEach: { path (string) : expects options (obj) }
atIndex: { path (string) : expects options (obj) }
customFunction: () => {} expects if function returns true
```
