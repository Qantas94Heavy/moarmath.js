'use strict';

define(function () {
  // jshint -W024
  var Infinity = 1 / 0;
  var NaN = 0 / 0;
  
  // based on IEEE-754-2008
  // pown should work with negative values of x
  // TODO: decide whether to allow any double integer or only int values for the argument n
  function pown(x, n) {
    x = +x;
    n = n - n % 1;
    
    // pown(x, n) is NaN if x is NaN or n is +/-Infinity or NaN
    if (x !== x || n !== n) return 0 / 0;
    
    // pown(x, 0) is 1 for any x (even a zero, quiet NaN, or infinity)
    if (n === 0) return 1;
    if (x === 0) {
      if (n < 0) {
        // pown(+/-0, n) is +/-Infinity and signals the divideByZero exception for odd integral n < 0
        // 1 / -0 === -Infinity, 1 / 0 === Infinity
        if (n % 2) return 1 / x;
        // pown(+/-0, n) is +Infinity and signals the divideByZero exception for even integral n < 0
        return Infinity;
      }
      
      // pown(+/-0, n) is +/-0 for odd integral n > 0
      if (n % 2) return x;
      // pown(+/-0, n) is +0 for even integral n > 0
      return 0;
    }
    
    if (n < 0) return 1 / MathPown(x, -n);
    return MathPown(x, n);
  }
  
  function MathPown(x, n) {
    // I'm not sure if this is naive but it probably is
    // this is less naive than just multiplying in a for loop
    if (n === 1) return x;
    if (n % 2) return x * MathPown(x * x, (n - 1) / 2);
    return MathPown(x * x, n / 2);
  }
  
  //MathPown(1.0000000000000002, 2999999999999999999) = 1.987182747488793e+289
  //Math.pow(1.0000000000000002, 2999999999999999999) = 1.98719262165461e+289
  //exact result pow(1.0000000000000002, 2999999999999999999) = 1.987192621654610176e+289
  return pown;
});
