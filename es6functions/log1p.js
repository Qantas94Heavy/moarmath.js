'use strict';

define(function () {
  // much less naive than log(x + 1) but still not accurate to 1 ULP
  function log1p(x) {
    x = +x;
    
    var u = 1 + x;
    if (u === 0) return -Infinity;
    if (u === 1) return x * 0;
    return log(u) * x / (u - 1);
  }
  
  return log1p;
});