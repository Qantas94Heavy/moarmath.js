'use strict';

define(function () {
  // TODO: decide whether to accept any integer double or int values only for arguments n
  function compound(x, n) {
    x = +x;
    n = +n;
    
    // x < −1: invalid operation
    // not specified but Infinity cannot really be turned into an integer
    if (x < -1 || n === 1 / 0 || n === -1 / 0 || n !== n) return 0 / 0;
    
    // compound(x, 0) is 1 for x ≥ −1, +∞, or quiet NaN
    if (n === 0) return 1;
    
    if (x === -1) {
      // compound(−1, n) is +∞ and signals the divideByZero exception for integral n < 0
      if (n < 0) return 1 / 0;
      // compound(−1, n) is +0 for integral n > 0
      return 0;
    }
    
    
    if (n === 1) return x + 1;
    
    

    
    if (n < 0) return 1 / MathCompound(x, -n);
    return MathCompound(x, n);
  }
  
  function MathCompound(x, n) {
    // naive function, will fix later
    return Math.pow(x + 1, n);
  }
    /*
    Polynomial expansion (coefficients match Pascal's triangle):
    (x + 1)^0 = 1
    (x + 1)^1 = x + 1
    (x + 1)^2 = x^2 + 2x + 1
    (x + 1)^3 = x^3 + 3x^2 + 3x + 1
    (x + 1)^4 = x^4 + 4x^3 + 6x^2 + 4x + 1
    */
  function MathCompound(x, n) {
    // this is the most accurate form we have already
    if (n === 1) return x + 1;
    
    var a = [];
    for (var i = 0; i < n; ++i) {
      a.unshift(x);
      x *= x;
    }
    var total = 0;
    for (var i = 0; i < n; ++i) {
      total += a[i] * pascal(n, i);
    }
  }
  
  // n is the row (first row is 0), k is the column (full left is 0)
  // TODO: check whether this is the fastest way and find some way to avoid stack overflow
  function pascal(n, k) {
    if (k === 0 || k === n) return 1;
    return pascal(n - 1, k - 1) + pascal(n - 1, k);
  }
  
  return compound;
});
