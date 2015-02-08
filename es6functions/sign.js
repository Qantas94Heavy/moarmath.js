'use strict';

define(function () {
  function sign(x) {
    x = +x;
    
    if (x < 0) return -1;
    if (x > 0) return 1;
    
    // can only be 0, -0 or NaN
    return x;
  }
  
  return sign;
});