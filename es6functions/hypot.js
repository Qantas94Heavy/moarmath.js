'use strict';

define(['internal/hypot'], function (MathHypot) {
  // jshint -W024
  var Infinity = 1 / 0;
  
  /**
   * Calculates the formula sqrt(a^2 + b^2 + c^2 ...) accurately.
   * 
   * Naive programs would just use Math.sqrt, but this has sneaky issues with precision which
   * require the use of a different algorithm which is better-conditioned, though slower.
   */
  function hypot(value1, value2) {
    var len = arguments.length;
    if (!len) return 0;
    
    // converts number to absolute value and makes sure no argument is non-finite
    var numbers = [];
    var containsNaN = false;
    
    for (var i = 0; i < len; ++i) {
      // ensure ToNumber is not called more than once per argument
      var x = +arguments[i];
      if (x < 0) x = -x;
      if (x === Infinity) return Infinity;

      // we don't return immediately as we must return +Infinity if an
      // argument is +/-Infinity, even if another argument is NaN
      if (!containsNaN) {
        if (x !== x) containsNaN = true;
        else numbers.push(x);
      }
    }
    
    // If no argument is +Infinity or -Infinity, and any argument is NaN, the result is NaN.
    if (containsNaN) return 0 / 0;
    
    // sort by descending magnitude
    // from memory it reduces roundoff errors, but don't remember the source for it
    // insertion sort is typically faster than O(n log n) algorithms for small arrays
    for (var i = 1; i < len; ++i) {
      var num = numbers[i];
      var j = i;
      while (j && num > numbers[j - 1]) numbers[j] = numbers[--j];
      numbers[j] = num;
    }
    
    return MathHypot(numbers);
  }
  
  return hypot;
});