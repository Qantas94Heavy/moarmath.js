'use strict';

define(function () {
  function abs(x) {
    x = +x;

    // If x is -0, the result is +0.
    if (x === 0) return 0;
    // If x is -Infinity, the result is +Infinity.
    if (x < 0) return -x;
    // If x is NaN, the result is NaN.
    return x;
  }
  
  return abs;
});