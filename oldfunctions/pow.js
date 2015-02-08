'use strict';

define(function () {
  var oldPow = Math.pow;
  /*
 If abs(x)<1 and y is +, the result is +0.
 If abs(x)<1 and y is , the result is +.
 If x is + and y>0, the result is +.
 If x is + and y<0, the result is +0.
 If x is  and y>0 and y is an odd integer, the result is .
 If x is  and y>0 and y is not an odd integer, the result is +.
 If x is  and y<0 and y is an odd integer, the result is 0.
 If x is  and y<0 and y is not an odd integer, the result is +0.
 If x is +0 and y>0, the result is +0.
 If x is +0 and y<0, the result is +.
 If x is 0 and y>0 and y is an odd integer, the result is 0.
 If x is 0 and y>0 and y is not an odd integer, the result is +0.
 If x is 0 and y<0 and y is an odd integer, the result is .
 If x is 0 and y<0 and y is not an odd integer, the result is +.
 If x<0 and x is finite and y is finite and y is not an integer, the result is NaN.
*/
  
  
  function pow(x, y) {
    var absX = x < 0 ? -x : x;
    
    // If y is NaN, the result is NaN.
    if (y !== y) return NaN;
    
    // If y is +0, the result is 1, even if x is NaN.
    // If y is -0, the result is 1, even if x is NaN.
    if (y === 0) return 1;
    
    // If x is NaN and y is nonzero, the result is NaN.
    if (x !== x) return NaN;
    
    if (absX > 1) {
      // If abs(x)>1 and y is +Infinity, the result is +Infinity.
      if (y === Infinity) return Infinity;
      // If abs(x)>1 and y is -Infinity, the result is +0.
      if (y === -Infinity) return 0;
    }
    else if (absX === 1) {
      // If abs(x) is 1 and y is +Infinity, the result is NaN.
      // If abs(x) is 1 and y is -Infinity, the result is NaN.
      if (y === Infinity || y === -Infinity) return NaN;
    }
    else if (absX > 1) {
      if (y === Infinity) return 0;
      if (y === -Infinity) return Infinity;
    }
    else if (x === Infinity) {
      if (y > 0) return Infinity;
      return 0;
    }
    if (x === -Infinity) {
      if (y > 0) {
        if (y % 2 === 1) return -Infinity;
        return Infinity;
      }
      if (y % 2 === 1) return -0;
      return 0;
    }
    if (x === 0) {
      if (1 / x === Infinity) {
        if (y > 0) return 0;
        return Infinity;
      }
      
      if (y > 0) {
        if (y % 2 === 1) return -0;
        return 0;
      }
      if (y % 2 === 1) return -Infinity;
      return Infinity;
    }
    if (x < 0 && y % 1 !== 0) return NaN;
    
    return oldPow();
    // pow code
  }
  
  return pow;
});
