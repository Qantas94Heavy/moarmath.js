'use strict';

define(function () {
  // naive
  function log10(x) {
    return log(x) * Math.LOG10E;
  }
  
  return log10;
});