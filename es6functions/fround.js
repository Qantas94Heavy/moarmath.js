'use strict';

define(function () {
    /* Converts a number into its equivalent in IEEE754 single-precision floating-point format.
   * @return {Number}
   */
  function fround(x) {
    // jshint bitwise:false
    function pow2(exponent) {
      var result = 1;
      
      if (exponent < 0) {
        exponent = -exponent;
        for (var i = 0; i < exponent; ++i) result /= 2;
      }
      else if (exponent < 32) return 1 << (exponent - 1);
      for (var i = 0; i < exponent; ++i) result *= 2;
      
      return result;
    }
    
    x = +x;
    
    // check for zero or non-finite cases
    if (x === 0 || x % 1 !== x % 1) return x;

    var xSign = sign(x);
    if (x < 0) x = -x;
    
    // return Infinity of the same sign if outside float boundaries
    if (x > pow(2, 128) - pow(2, 104)) return xSign / 0;
    
    var exponent = 0;
    var minExponent = -126;
    var maxExponent = 127;
    
    var isSubnormal = false;
    

    
    // account for subnormal values, they need to be treated differently
    if (x < pow2(-126)) {
      exponent = -126;
      isSubnormal = true;
    } else for (;;) {
      var absValue = pow2(exponent) * x;
      
      if (absValue < 1) minExponent = exponent + 1;
      else if (absValue >= 2) maxExponent = exponent - 1;
      else break;
      
      exponent = (minExponent + maxExponent) >> 1;
    }
    
    // find mantissa and cutoff
    var mantissa = floor((absValue - 1) * pow(2, 52));
    
    // even though mantissa > 2^32, bitwise ops only discard the first bits,
    // not the last few that are important
    var guard = (mantissa >>> 28) & 1;
    var round = (mantissa >>> 27) & 1;
    
    // bit flag for whether there are any set bits after round bit
    var sticky = +!!(mantissa & 0x7FFFFFF);
    
    // TODO: roundTiesToEven
    
    // we cannot bit shift, so we have to use division
    var bitsAfter = mantissa & 0x1FFFFFFF;
    mantissa = (mantissa - bitsAfter) / 0x20000000;
    
    return sign * (1 + pow(2, exponent - 23) * mantissa);
  }
});