'use strict';

define(function () {
  function ceil(x) {
    x = +x;
    
    if (x % 1) {
      if (x > 0) return x - x % 1 + 1;
      if (x > -1) return -0;
      return x - x % 1;
    }
    return x;
  }
  
  return ceil;
});