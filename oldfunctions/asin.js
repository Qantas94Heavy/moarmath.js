'use strict';

define(function () {
  var halfPi = 1.5707963267948966;
  var oldAsin = Math.asin;

  function asin(x) {
    if (x === 1) return halfPi;
    if (x === 0.5) return halfPi / 3;
    if (x === -1) return -halfPi;
    if (x === -0.5) return -halfPi / 3;
    if (x === 0) return x;
    if (x < -1 || x > 1 || x !== x) return 0 / 0;
    
    return oldAsin(x);
  }

  return asin;
});
