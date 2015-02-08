'use strict';

define(function () {
  // naive
  // multiplying by LOG2E is more accurate than dividing by Math.LN2 (same for log10)
  function log2(x) {
    return log(x) * Math.LOG2E;
  }
  
  return log2;
});