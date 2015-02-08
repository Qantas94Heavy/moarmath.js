'use strict';

define(function () {
  /* Simply using a bitwise operator will provide incorrect results outside the 2^31 range.
   * Using Math.floor gives incorrect results when the number is less than zero, and Math.ceil gives
   * incorrect results when the number is more than zero.
   * @param {Number} x - The number to be truncated.
   * @return {Number} The whole number part of a decimal.
   */
  function trunc(x) {
    x = +x;

    // handle edge case where number between -1 and -0 would return 0 instead
    if (x > -1 && x < 0) return -0;
    
    // without the check, +/-Infinity and -0 would provide incorrect results
    return x % 1 ? x - (x % 1) : x;
  }
  
  return trunc;
});