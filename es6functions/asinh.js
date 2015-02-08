'use strict';

define(function () {
  function asinh(x) {
    return log1p(x * (1 + x / (sqrt(x * x + 1) + 1)));
  }
  
  return asinh;
});