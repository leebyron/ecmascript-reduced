"use strict";

require('./es6');

//////////////////////////////////////////////////////////////////////////////
//                                                                          //
//     -- The following are proposed additions to a future ECMA spec. --    //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////


// -- This property is new, added after 19.4.2.5
// # Symbol.reduced
Symbol.reduced = Symbol('@@reduced');


// -- This existing method property is altered
// # Array.prototype.reduce ( )
CreateMethodProperty(Array.prototype, 'reduce', function (callbackfn/*, initialValue*/) {
  // 1. Let O be ToObject(this value).
  // 2. ReturnIfAbrupt(O).
  var O = Object(this);
  // 3. Let len be ToLength(Get(O, "length")).
  // 4. ReturnIfAbrupt(len).
  var len = O.length;
  // 5. If IsCallable(callbackfn) is false, throw a TypeError exception.
  if (IsCallable(callbackfn) === false) {
    throw new TypeError();
  }
  // 6. If len is 0 and initialValue is not present, throw a TypeError exception.
  if (len === 0 && arguments.length < 2) {
    throw new TypeError();
  }
  // 7. Let k be 0.
  var k = 0;
  var accumulator;
  // 8. If initialValue is present, then
  if (arguments.length > 1) {
    // a. Set accumulator to initialValue.
    accumulator = initialValue;
  // 9. Else initialValue is not present,
  } else {
    // a. Let kPresent be false.
    var kPresent = false;
    // b. Repeat, while kPresent is false and k < len
    while (kPresent === false && k < len) {
      // i. Let Pk be ToString(k).
      var Pk = ToString(k);
      // ii. Let kPresent be HasProperty(O, Pk).
      // iii. ReturnIfAbrupt(kPresent).
      var kPresent = HasProperty(O, Pk);
      // iv. If kPresent is true, then
      if (kPresent === true) {
        // 1. Let accumulator be Get(O, Pk).
        // 2. ReturnIfAbrupt(accumulator).
        accumulator = O[Pk];
      }
      // v. Increase k by 1.
      k++;
    }
    // c. If kPresent is false, throw a TypeError exception.
    if (kPresent === false) {
      throw new TypeError();
    }
  }
  // 10. Repeat, while k < len
  while (k < len) {
    // a. Let Pk be ToString(k).
    var Pk = ToString(k);
    // b. Let kPresent be HasProperty(O, Pk).
    // c. ReturnIfAbrupt(kPresent).
    var kPresent = HasProperty(O, Pk);
    // d. If kPresent is true, then
    if (kPresent === true) {
      // i. Let kValue be Get(O, Pk).
      // ii. ReturnIfAbrupt(kValue).
      var kValue = O[Pk];
      // iii. Let accumulator be Call(callbackfn, undefined, «accumulator, kValue, k, O»).
      // iv. ReturnIfAbrupt(accumulator).
      accumulator = callbackfn.call(undefined, accumulator, kValue, k, O);
      // v. <ins>Let A be ToObject(accumulator).</ins>
      var A = ToObject(accumulator);
      // vi. <ins>Let reducedPresent be HasProperty(A, @@reduced).</ins>
      var reducedPresent = HasProperty(A, Symbol.reduced);
      // vii. <ins>If reducedPresent is true, then</ins>
      if (reducedPresent === true) {
        // 1. <ins>Let reduced be Get(A, @@reduced).</ins>
        // 2. <ins>ReturnIfAbrupt(reduced).</ins>
        var reduced = A[Symbol.reduced];
        // 3. <ins>Return reduced.</ins>
        return reduced;
      }
    }
    // e. Increase k by 1.
    k++;
  }
  // 11. Return accumulator.
  return accumulator;
});
