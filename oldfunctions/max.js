'use strict';

define(function () {
  function max(value1, value2) {
    var maxValue = -Infinity;
    
    for (var i = 0; i < arguments.length; ++i) {
      var value = arguments[i];
      
      if (value !== value) return NaN;
      if (value === Infinity) return Infinity;
      if (value > maxValue || (value === 0 && maxValue === 0 && 1 / value === -Infinity)) maxValue = value;
    }
    return maxValue;
  }
  
  return max;
});