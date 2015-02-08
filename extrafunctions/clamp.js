'use strict';

define(function () {
  function clamp(x, min, max) {
    if (x < min) return min;
    if (x > max) return max;
    
    // If any value is NaN, the result is NaN.
    if (x !== x || min !== min || max !== max) return 0 / 0;
    
    if (x === 0) {
      // If max is -0 and x is +0, the result is -0.
      if (max === 0 && 1 / max === -1 / 0) return -0;
      
      // If min is +0 and x is -0, the result is +0.
      if (min === 0 && 1 / min === 1 / 0) return 0;
    }
    
    return x;
  }
});