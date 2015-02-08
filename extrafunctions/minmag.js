'use strict';

define(function () {
  // jshint -W024
  var NaN = 0 / 0;
  var Infinity = 1 / 0;
  
  /**
   * Based on the IEEE-754-2008 maxNumMag operation.
   * @return {Number} The number with the highest absolute value.
   */
  function maxMag(x, y) {
    // jshint unused:false
    var maxMagValue = 0;
    var ret = -0;
    
    for (var i = 0, l = arguments.length; i < l; ++i) {
      var value = +arguments[i];
      if (value !== value) return NaN;
      
      var absValue = value < 0 ? -value : value;
      if (absValue > maxMagValue) {
        maxMagValue = absValue;
        ret = value;
      } else if (absValue === maxMagValue && (value > ret || value === 0 && 1 / value === Infinity && 1 / ret === -Infinity)) {
        maxMagValue = absValue;
        ret = value;
      }
    }
    
    return ret;
  }
});
