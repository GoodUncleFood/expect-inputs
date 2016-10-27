var expectInputs = require('../index.js');
var expect = require('chai').expect;
var assert = require('chai').assert;

describe('expectInputs', function() {

  it('should be a function', function() {
    expect(expectInputs).to.be.a('function');
  });

  describe('should correctly typecheck', function() {

    it('strings', function() {
      var a = 'string';
      var b = 1;
      expect(expectInputs(a, {isType: 'string'})).to.equal(true);
      expect(expectInputs(b, {isType: 'string'})).to.equal(false);
    });

    it('numbers', function() {
      var a = 'string';
      var b = 1;
      expect(expectInputs(a, {isType: 'number'})).to.equal(false);
      expect(expectInputs(b, {isType: 'number'})).to.equal(true);
    });

    it('booleans', function() {
      var a = true;
      var b = false;
      var c = 1;
      expect(expectInputs(a, {isType: 'boolean'})).to.equal(true);
      expect(expectInputs(b, {isType: 'boolean'})).to.equal(true);
      expect(expectInputs(c, {isType: 'boolean'})).to.equal(false);
    });

    it('objects', function() {
      var a = {a : 1};
      var b = [1, 2];
      var c = 1;
      expect(expectInputs(a, {isType: 'object'})).to.equal(true);
      expect(expectInputs(b, {isType: 'object'})).to.equal(false);
      expect(expectInputs(c, {isType: 'object'})).to.equal(false);
    });

    it('arrays', function() {
      var a = {a : 1};
      var b = [1, 2];
      var c = 1;
      expect(expectInputs(a, {isType: 'array'})).to.equal(false);
      expect(expectInputs(b, {isType: 'array'})).to.equal(true);
      expect(expectInputs(c, {isType: 'array'})).to.equal(false);
    });

    it('functions', function() {
      var a = function() {console.log('hello');};
      var b = [1, 2];
      var c = 1;
      expect(expectInputs(a, {isType: 'function'})).to.equal(true);
      expect(expectInputs(b, {isType: 'function'})).to.equal(false);
      expect(expectInputs(c, {isType: 'function'})).to.equal(false);
    });

  });

  describe('should correctly check length in the following ways', function() {

    it('that an input has a length', function() {
      var a = [1, 2];
      var b = [];
      var c = 'hello';
      var d = '';
      expect(expectInputs(a, {hasLength: true})).to.equal(true);
      expect(expectInputs(b, {hasLength: true})).to.equal(false);
      expect(expectInputs(c, {hasLength: true})).to.equal(true);
      expect(expectInputs(d, {hasLength: true})).to.equal(false);
    });

    it('that an input has a specific length', function() {
      var a = [1, 2, 3];
      var b = 'hello';
      expect(expectInputs(a, {hasLength: 3})).to.equal(true);
      expect(expectInputs(a, {hasLength: 4})).to.equal(false);
      expect(expectInputs(b, {hasLength: 5})).to.equal(true);
      expect(expectInputs(b, {hasLength: 6})).to.equal(false);
    });

    it('than an input has a certain minimum length', function() {
      var a = [1, 2, 3];
      var b = 'hello';
      expect(expectInputs(a, {minLength: 3})).to.equal(true);
      expect(expectInputs(a, {minLength: 4})).to.equal(false);
      expect(expectInputs(b, {minLength: 5})).to.equal(true);
      expect(expectInputs(b, {minLength: 6})).to.equal(false);
    });

    it('than an input does not exceed a certain maximum length', function() {
      var a = [1, 2, 3];
      var b = 'hello';
      expect(expectInputs(a, {maxLength: 3})).to.equal(true);
      expect(expectInputs(a, {maxLength: 2})).to.equal(false);
      expect(expectInputs(b, {maxLength: 5})).to.equal(true);
      expect(expectInputs(b, {maxLength: 3})).to.equal(false);
    });

  });

  describe('correctly check that an input is exactly equal to a specified value', function() {

    it('numbers', function() {
      var a = 1;
      var b = 0;
      expect(expectInputs(a, {isExactly: 1})).to.equal(true);
      expect(expectInputs(a, {isExactly: true})).to.equal(false);
      expect(expectInputs(b, {isExactly: 0})).to.equal(true);
      expect(expectInputs(b, {isExactly: false})).to.equal(false);
    });

    it('strings', function() {
      var c = 'a';
      var d = '';
      expect(expectInputs(c, {isExactly: 'a'})).to.equal(true);
      expect(expectInputs(c, {isExactly: true})).to.equal(false);
      expect(expectInputs(d, {isExactly: ''})).to.equal(true);
      expect(expectInputs(d, {isExactly: false})).to.equal(false);
    });

    it('booleans', function() {
      var e = true;
      var f = false;
      expect(expectInputs(e, {isExactly: true})).to.equal(true);
      expect(expectInputs(e, {isExactly: 1})).to.equal(false);
      expect(expectInputs(f, {isExactly: false})).to.equal(true);
      expect(expectInputs(f, {isExactly: 0})).to.equal(false);
    });

    it('objects', function() {
      var g = {a: '1'};
      expect(expectInputs(g, {isExactly: g})).to.equal(true);
      expect(expectInputs(g, {isExactly: {a: '1'}})).to.equal(false);
    });

    it('arrays', function() {
      var h = [1, 2];
      expect(expectInputs(h, {isExactly: h})).to.equal(true);
      expect(expectInputs(h, {isExactly: [1, 2]})).to.equal(false);
    });

    it('functions', function() {
      var i = function() {console.log('hello');};
      expect(expectInputs(i, {isExactly: i})).to.equal(true);
      expect(expectInputs(i, {isExactly: function() {console.log('hello');}})).to.equal(false);
    });

  });

  describe('should check for null values', function() {

    it('should strictly check if a value is null', function() {
      var a = null;
      var b = false;
      var c = 0;
      var d = '';
      expect(expectInputs(a, {isNull: true})).to.equal(true);
      expect(expectInputs(a, {isNull: false})).to.equal(false);
      expect(expectInputs(b, {isNull: true})).to.equal(false);
      expect(expectInputs(b, {isNull: false})).to.equal(true);
      expect(expectInputs(c, {isNull: true})).to.equal(false);
      expect(expectInputs(c, {isNull: false})).to.equal(true);
      expect(expectInputs(d, {isNull: true})).to.equal(false);
      expect(expectInputs(d, {isNull: false})).to.equal(true);
    });

  });

  describe('should check for undefined values', function() {

    it('should strictly check if a value is undefined', function() {
      var a;
      var b = false;
      var c = 0;
      var d = '';
      expect(expectInputs(a, {isUndefined: true})).to.equal(true);
      expect(expectInputs(a, {isUndefined: false})).to.equal(false);
      expect(expectInputs(b, {isUndefined: true})).to.equal(false);
      expect(expectInputs(b, {isUndefined: false})).to.equal(true);
      expect(expectInputs(c, {isUndefined: true})).to.equal(false);
      expect(expectInputs(c, {isUndefined: false})).to.equal(true);
      expect(expectInputs(d, {isUndefined: true})).to.equal(false);
      expect(expectInputs(d, {isUndefined: false})).to.equal(true);
    });

  });

  describe('should check for falsy values', function() {

    it('should strictly check if a value is falsy', function() {
      var a;
      var b = false;
      var c = 0;
      var d = '';
      var e = null;
      var f = 'false';
      var g = 1;
      var h = true;
      expect(expectInputs(a, {isFalsy: true})).to.equal(true);
      expect(expectInputs(a, {isFalsy: false})).to.equal(false);
      expect(expectInputs(b, {isFalsy: true})).to.equal(true);
      expect(expectInputs(b, {isFalsy: false})).to.equal(false);
      expect(expectInputs(c, {isFalsy: true})).to.equal(true);
      expect(expectInputs(c, {isFalsy: false})).to.equal(false);
      expect(expectInputs(d, {isFalsy: true})).to.equal(true);
      expect(expectInputs(d, {isFalsy: false})).to.equal(false);
      expect(expectInputs(e, {isFalsy: true})).to.equal(true);
      expect(expectInputs(e, {isFalsy: false})).to.equal(false);
      expect(expectInputs(f, {isFalsy: true})).to.equal(false);
      expect(expectInputs(f, {isFalsy: false})).to.equal(true);
      expect(expectInputs(g, {isFalsy: true})).to.equal(false);
      expect(expectInputs(g, {isFalsy: false})).to.equal(true);
      expect(expectInputs(h, {isFalsy: true})).to.equal(false);
      expect(expectInputs(h, {isFalsy: false})).to.equal(true);
    });

  });

  describe('should check for truthy values', function() {

    it('should strictly check if a value is truthy', function() {
      var a;
      var b = false;
      var c = 0;
      var d = '';
      var e = null;
      var f = 'false';
      var g = 1;
      var h = true;
      expect(expectInputs(a, {isTruthy: true})).to.equal(false);
      expect(expectInputs(a, {isTruthy: false})).to.equal(true);
      expect(expectInputs(b, {isTruthy: true})).to.equal(false);
      expect(expectInputs(b, {isTruthy: false})).to.equal(true);
      expect(expectInputs(c, {isTruthy: true})).to.equal(false);
      expect(expectInputs(c, {isTruthy: false})).to.equal(true);
      expect(expectInputs(d, {isTruthy: true})).to.equal(false);
      expect(expectInputs(d, {isTruthy: false})).to.equal(true);
      expect(expectInputs(e, {isTruthy: true})).to.equal(false);
      expect(expectInputs(e, {isTruthy: false})).to.equal(true);
      expect(expectInputs(f, {isTruthy: true})).to.equal(true);
      expect(expectInputs(f, {isTruthy: false})).to.equal(false);
      expect(expectInputs(g, {isTruthy: true})).to.equal(true);
      expect(expectInputs(g, {isTruthy: false})).to.equal(false);
      expect(expectInputs(h, {isTruthy: true})).to.equal(true);
      expect(expectInputs(h, {isTruthy: false})).to.equal(false);
    });

  });

  describe('it should check if a number input is within a range', function() {

    it('should handle an inclusive range', function() {
      var a = 1;
      var b = 5;
      var c = 10;
      var d = 11;
      expect(expectInputs(a, {isWithinRange: [1, 10]})).to.equal(true);
      expect(expectInputs(b, {isWithinRange: [1, 10]})).to.equal(true);
      expect(expectInputs(c, {isWithinRange: [1, 10]})).to.equal(true);
      expect(expectInputs(d, {isWithinRange: [1, 10]})).to.equal(false);
    });

    it('should handle a non-inclusive range', function() {
      var a = 1;
      var b = 5;
      var c = 10;
      var d = 11;
      expect(expectInputs(a, {isWithinNonInclusiveRange: [1, 10]})).to.equal(false);
      expect(expectInputs(b, {isWithinNonInclusiveRange: [1, 10]})).to.equal(true);
      expect(expectInputs(c, {isWithinNonInclusiveRange: [1, 10]})).to.equal(false);
      expect(expectInputs(d, {isWithinNonInclusiveRange: [1, 10]})).to.equal(false);
    });

  });

});
