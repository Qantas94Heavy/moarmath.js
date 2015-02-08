'use strict';

define(function () {
  /* Allows exact multiplication of two 32-bit signed integers. Simply doing `a * b` is not accurate
   * if the result is larger than 2^53 - 1, so this function splits the 32-bit integers into two
   * 16-bit integers which are multiplied separately.
   * @return {Number} The result as a 32-bit signed integer.
   */
  function imul(x, y) {
    // jshint bitwise:false
    
    var ah = x >>> 16;
    var al = x >>> 0;
    
    var bh = y >>> 16;
    var bl = y >>> 0;
    
    var high = (ah * bl + al * bh) & 0xFFFF;
    
    // unsigned result
    var product = ((high << 16) >>> 0) + al * bl;
    
    return product >>> 0;
  }
});