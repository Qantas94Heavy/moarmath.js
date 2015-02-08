'use strict';

define(function () {
  function ldexp(exponent, mantissa) {
    var a = Math.pow(2, exponent - 1023) * (1 + mantissa);
  }
});
