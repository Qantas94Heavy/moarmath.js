'use strict';

define(function () {
  var NaN = 0 / 0;
  
  var pi = 3.141592653589793;
  var threeQuarterPi = 2.356194490192345;
  var halfPi = 1.5707963267948966;
  var quarterPi = 0.7853981633974483;
  
  var lookupTable = [];
  var lookupTableLength = lookupTable.length;
  
  function getLookup(x) {
    var a = x * lookupTableLength;
    var b = a % 1;
    // jshint bitwise:false
    var index = a | 0;
    return lookupTable[index] + (lookupTable[index + 1] - lookupTable[index]) * b;
  }
  
  function poly(x) {
  }
  
  function mathAcos(x, fn) {
    x = +x;
    
    // If x is NaN, the result is NaN.
    // If x is greater than 1, the result is NaN.
    // If x is less than -1, the result is NaN.
    if (x < -1 || x > 1 || x !== x) return NaN;
    
    // If x is exactly 1, the result is +0.
    if (x === 1) return 0;
    if (x === 0) return halfPi;
    if (x === -1) return pi;
    
    if (x < 0) return halfPi - fn(-x);
    return halfPi + fn(x);
  }
  
  function acos(x) {
    return mathAcos(x, poly);
  }
  
  return Math.acos;
});
