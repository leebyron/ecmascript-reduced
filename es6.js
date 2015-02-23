"use strict";

// The following is all currently specced behavior in ES2015 (ES6).
// It is all either directly referred to in the proposal, or is contextually
// relevant to the proposal in order to produce meaningful examples.

// 7.1.3
global.ToNumber = function ToNumber(argument) {
  return +argument;
};

// 7.1.4
global.ToInteger = function ToInteger(argument) {
  // 1. Let number be ToNumber(argument).
  var number = ToNumber(argument);
  // 2. ReturnIfAbrupt(number).
  // 3. If number is NaN, return +0.
  if (isNaN(number)) {
    return 0;
  }
  // 4. If number is +0, -0, +Infinity, or -Infinity, return number.
  if (number === 0 || number === -0 || number === Infinity || number === -Infinity) {
    return number;
  }
  // 5. Return the number value that is the same sign as number and whose
  //    magnitude is floor(abs(number)).
  var magnitude = Math.floor(Math.abs(number));
  return number < 0 ? -magnitude : magnitude;
};

// 7.1.12
global.ToString = function ToString(argument) {
  return argument.toString();
};

// 7.1.13
global.ToObject = function ToObject(argument) {
  return Object(argument);
};

// 7.1.15
global.ToLength = function ToLength(argument) {
  // ReturnIfAbrupt(argument).
  // Let len be ToInteger(argument).
  // ReturnIfAbrupt(len).
  var len = ToInteger(argument);
  // If len ≤ +0, return +0.
  if (len <= 0) {
    return 0;
  }
  // If len is +∞, return 2^53-1.
  if (len === Infinity) {
    return Math.pow(2, 53) - 1;
  }
  // Return min(len, 2^53-1).
  return min(len, Math.pow(2, 53) - 1);
};

// 7.2.2
global.IsCallable = function IsCallable(argument) {
  return typeof argument === 'function';
};

// 7.3.5
global.CreateMethodProperty = function CreateMethodProperty(O, P, V) {
  return Object.defineProperty(O, P, {
    value: V,
    writable: true,
    enumerable: false,
    configurable: true
  });
};

// 7.3.10
global.HasProperty = function HasProperty(O, P) {
  if (O.hasOwnProperty(P) === true) {
    return true;
  }
  var parent = Object.getPrototypeOf(O);
  if (parent) {
    return HasProperty(parent, P);
  }
  return false;
};

// 19.4.1
if (typeof Symbol !== 'function') {
  global.Symbol = function Symbol(k) {
    return k;
  };
}
