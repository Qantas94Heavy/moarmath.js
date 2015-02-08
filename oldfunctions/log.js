'use strict';


/*
Integer log2 function taken from this source:

  Anderson, S. E. (2011, February 4). Bit Twiddling Hacks. Retrieved from
  http://graphics.stanford.edu/~seander/bithacks.html#IntegerLog
  
Notice on website:

  Individually, the code snippets here are in the public domain (unless otherwise noted) - feel
  free to use them however you please. The aggregate collection and descriptions are © 1997-2005
  Sean Eron Anderson. The code and descriptions are distributed in the hope that they will be
  useful, but WITHOUT ANY WARRANTY and without even the implied warranty of merchantability or
  fitness for a particular purpose.
  
function log2int(x) {
  var result, shift;

  result = (x > 0xFFFF) << 4;
  x = x >> result;

  shift = (x > 0xFF) << 3;
  x = x >> shift;
  result |= shift;

  shift = (x > 0xF) << 2;
  x = x >> shift;
  result |= shift;

  shift = (x > 0x3) << 1;
  x = x >> shift;
  result |= shift;

  return result | (x >> 1);
}
*/

define(['internal/hypot'], function (MathHypot) {
  // jshint -W024
  var Infinity = 1 / 0;
  var halfPi = 1.5707963267948966;
  var ln2 = 0.6931471805599453;
  
  /*
    x * Math.pow(2, m) > Math.pow(2, p / 2)
    Math.pow(2, m) > Math.pow(2, 27) / x
    
    m > 27 - Math.log2(x)
    
   */
  
  // TODO: use the arithmetic-geometric mean to solve ln(x)
  function log(x) {
    x = +x;
    
    // If x is NaN, the result is NaN.
    // If x is less than 0, the result is NaN.
    if (x < 0 || x !== x) return 0 / 0;
    // If x is +0 or -0, the result is -Infinity.
    if (x === 0) return -Infinity;
    // If x is 1, the result is +0.
    if (x === 1) return 0;
    // If x is +Infinity, the result is +Infinity.
    if (x === Infinity) return Infinity;
    
    return MathLog(x);
  }
  
  function MathLog(x) {
    return halfPi / agm(1, Math.pow(2, 2 - m) / x) - m * ln2;
  }
  
  function agm(a, g) {
    while (a !== g) {
      a = (a + g) / 2;
      g = MathHypot(a, g);
    }
    
    return a;
  }
  
  function log2int(x) {
    // jshint bitwise:false
    // convert to unsigned 32-bit integer
    var n = x >>> 0;
    
    var p = !!(n >>> 16) << 4;
    p += !!(n >>> (p + 8)) << 3;
    p += !!(n >>> (p + 4)) << 2;
    p += !!(n >>> (p + 2)) << 1;
    p += !!(n >>> (p + 1));
    
    return p;
  }
  
  return log;
});
