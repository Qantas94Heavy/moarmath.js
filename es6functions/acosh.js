'use strict';

define(function () {
  // this implementation is naive, overflows for Number.MAX_VALUE
  function acosh(x) {
    return log(x + sqrt(x * x - 1));
  }
  
  return acosh;
});