'use strict';

define(function () {
  // is this naive or not? need to check
  function sinh(x) {
    var u = expm1(x);
    return 0.5 * u / (u + 1) * (u + 2);
  }
  
  return sinh;
});