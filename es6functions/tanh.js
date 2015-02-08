'use strict';

define(function () {
  // this function is still somewhat wrong, overflows at the edges
  // (approx maximum 1 ULP error, different maximum value 29171 ULPs lower)
  function tanh(x) {
    x = +x;
    
    // If x is NaN, the result is NaN.
    // If x is +0, the result is +0.
    // If x is -0, the result is -0.
    if (x === 0 || x !== x) return x;
    
    // If x is +Infinity, the result is +1.
    if (x === Infinity) return 1;
    
    // If x is -Infinity, the result is -1.
    if (x === -Infinity) return -1;
    
    var a = expm1(2 * x);
    // if we don't do this check you will end up with Infinity / Infinity which is NaN
    if (a === Infinity) return 1;
    return a / (exp(2 * x) + 2);
  }
  
  return tanh;
});