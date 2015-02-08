'use strict';

define(function () {
  // 2^-1022
  var minNormalValue = 2.2250738585072014e-308;
  
  function initializeLookupTable() {
    var x = minNormalValue;
    lookupTable[0] = 0;
    
    for (var i = 1; i < 2048; ++i) {
      lookupTable[i] = x;
      x *= 2;
    }
    
    hasInitializedTable = true;
  }
  
  var hasInitializedTable = false;
  var lookupTable = [];
  lookupTable.length = 2048;
  
  // test for typed array support (using typed arrays is much faster than doing a binary search)
  // jshint -W054
  var global = new Function('return this')();
  var supportsTypedArrays = false;
  var Uint32Array = global.Uint32Array;
  var Float64Array = global.Float64Array;
  try {
    supportsTypedArrays = new Uint32Array(new Float64Array([3.141592653589793]).buffer)[1] === 1074340347;
  } catch (e) {}
  
  function getExponent(x) {
    if (!hasInitializedTable) initializeLookupTable();

    if (x < 0) x = -x;
    // All NaN values and both infinities have an exponent of 2047
    if (x !== x || x === 1 / 0) return 2047;

    var exponent = 1023;
  }
  /*  if (ex < 0) {
    if (ex > -31) {
      a /= 1 << -(1 + ex);
      ex = 0;
    } else {
      a /= 1 << 30;
      ex += 31;
      do {
        a /= 2;
      } while (++ex);
    }
  } else if (ex < 31) {
    if (ex !== 0) a *= 1 << (ex - 1);
    ex = 0;
  } else {
    a *= 1 << 30;
    ex -= 31;
    do {
      a *= 2;
    } while (--ex);
  }*/
  function frexp(x) {
    if (supportsTypedArrays) {
      var numHigh = new Uint32Array(new Float64Array([x]).buffer)[1];
      var exponent = (numHigh >>> 20) & 0x7FF;
      if (exponent < minNormalValue) return [0, x * minNormalValue];
      return [exponent, mantissa];
    }
  }
  

});