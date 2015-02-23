"use strict";

require('./polyfill-spec');

(function () {
  // Reduce works as before
  var reduced = [10, 20, 30, 40, 50, 60, 70, 80, 90].reduce(function (a, v) {
    return a + v;
  });
  console.log(reduced);
})();

(function () {
  // Reduce can be short-circuited
  var reduced = [10, 20, 30, 40, 50, 60, 70, 80, 90].reduce(function (a, v) {
    if (a + v < 100) {
      return a + v;
    } else {
      var obj = {};
      obj[Symbol.reduced] = "99+";
      return obj;
    }
  });
  console.log(reduced);
})();
