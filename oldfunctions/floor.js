'use strict';

define(function () {
  function floor(x) {
    x = +x;
    
    if (x < 0xFFFFFFFF && x > 0) return x >>> 0;
    if (x % 1) {
      if (x > 0) return x - x % 1;
      if (x > -1) return -0;
      return x - x % 1 + 1;
    }
    return x;
  }
  
  return floor;
});