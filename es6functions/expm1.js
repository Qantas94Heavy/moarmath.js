'use strict';

define(function () {
  // underflow is horrible
  function expm1(x) {
    var u = exp(x);
    if (u === 1) return x;
    if (u - 1 === -1) return -1;
    return (u - 1) * x / log(u);
  }
});