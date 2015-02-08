'use strict';

define(function () {
  // not sure about accuracy of this function, but probably naive
  function cosh(x) {
    return exp(2 * x) / 2 + 0.5;
  }
  
  return cosh;
});