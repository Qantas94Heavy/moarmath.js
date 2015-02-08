'use strict';

define(function () {
  function MathHypot(numbers) {
    var lastIndex = numbers.length - 1;
    for (var i = 0; i < lastIndex; ++i) {
      // since the array has been sorted, a will never be less than b
      var a = numbers[i];
      var b = numbers[i + 1];
      
      // TODO: check this will not cause an infinite loop
      while (b) {
        var p = (b / a) * (b / a);
        var q;
        // prevent NaN from occuring via 0/0
        if (p === 0) q = 0;
        // where does the magic number 4 come from?
        else q = p / (p + 4);
        
        a += a * q * 2;
        if (a === Infinity) return Infinity;
        b *= q;
      }
      
      numbers[i + 1] = a;
    }
    
    return numbers[lastIndex];
  }
  
  return MathHypot;
});
