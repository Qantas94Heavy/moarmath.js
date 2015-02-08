'use strict';

define(function () {
  function cbrt(x) {
    // ensure ToNumber is not called more than once on the argument
    x = +x;
    
    // make sure sign of zero is left unchanged and
    // don't bother processing values that are not finite
    if (x === 0 || x % 1 !== x % 1) return x;
    
    // 
    if (x > 0) return mathCbrt(x);
    return -mathCbrt(-x);
  }
  
  function mathCbrt(x) {
    var a = x;
    var ex = 0;

    // should we switch to a binary search?
    // multiply/divide a until it is in the range 0.125 <= a <= 1
    // we only add the exponent once for every 8 so the exponent is
    // one third of what it is supposed to be, because of log laws:
    // log2((2 ^ x) ^ (1 / 3)) = x / 3
    while (a < 0.125) { a *= 8; --ex; }
    while (a > 1.0) { a /= 8; ++ex; }
    
    // cubic polynomial should give at least 7 bits of precision (including implicit leading bit)
    // we use a polynomial as JavaScript has no direct access to the mantissa/exponent of a number
    // this polynomial generated using Sollya 4.1 (http://sollya.gforge.inria.fr) using this:
    // fpminimax(x^(1/3), 2, [| double... |], [1/8, 1], absolute);
    a = 0.5286543121372652 * a * a * a - 1.2824623166998397 * a * a
      + 1.411202352934323 * a + 0.3461532526717326;
    
    // multiply back the number to its exponent
    while (ex < 0) { a /= 2; ++ex; }
    while (ex > 0) { a *= 2; --ex; }
    
    function newtonIterationCbrt(a) {
      return (1.0 / 3.0) * (x / (a * a) + 2 * a);
    }
    
    // three iterations of Newton-Raphson method should be enough
    a = newtonIterationCbrt(a);
    a = newtonIterationCbrt(a);
    return newtonIterationCbrt(a);
  }
  
  /*
  // Alternative using two iterations of Halley's method (seems to be slightly off):
  function MathCbrt(x) {
    var a = x;
    var ex = 0;

    // should we switch to a binary search?
    while (a < 0.125) { a *= 8; --ex; }
    while (a > 1.0) { a /= 8; ++ex; }
    
    // cubic approximation should give at least 7 bits of precision (including implicit leading bit)
    a = 0.5286543121372652 * a * a * a - 1.2824623166998397 * a * a + 1.411202352934323 * a + 0.3461532526717326;
    
    while (ex < 0) { a /= 2; ++ex; }
    while (ex > 0) { a *= 2; --ex; }
    
    function HalleyIterationCbrt(a) {
      var a3 = a * a * a;
      var a3px = a3 + x;
      return a * ((a3px + x) / (a3 + a3px));
    }
    
    // Two iterations of Halley's method should yield 63 bits of precision
    a = HalleyIterationCbrt(a);
    return HalleyIterationCbrt(a);
  }

  // Alternative using three iterations of Halley's method and linear approximation:
  function MathCbrt(x) {
    var a = x;
    var ex = 0;

    // should we switch to a binary search?
    while (a < 0.125) { a *= 8; ++ex; }
    while (a > 1.0) { a /= 8; --ex; }
    
    // linear approximation gives us about 3 bits of precision (2 bits near worst case at x=0.5625)
    a = 0.5216139604522716 * x + 0.5005458799556718;

    while (ex < 0) { a /= 2; ++ex; }
    while (ex > 0) { a *= 2; --ex; }
    
    function HalleyIterationCbrt(a) {
      var a3 = a * a * a;
      var a3px = a3 + x;
      return a * ((a3px + x) / (a3 + a3px));
    }

    // Three iterations of Halley's method should yield 54 bits of precision
    a = HalleyIterationCbrt(a);
    a = HalleyIterationCbrt(a);
    a = HalleyIterationCbrt(a);
    return a;
  }
  */
  
  return cbrt;
});

/*
V8 uses a bit hack combined with 4 iterations of Newton-Raphson method:

function MathCbrt(x) {
  if (!IS_NUMBER(x)) x = NonNumberToNumber(x);
  if (x == 0 || !NUMBER_IS_FINITE(x)) return x;
  return x >= 0 ? CubeRoot(x) : -CubeRoot(-x);
}

macro NEWTON_ITERATION_CBRT(x, approx)
  (1.0 / 3.0) * (x / (approx * approx) + 2 * approx);
endmacro

function CubeRoot(x) {
  var approx_hi = MathFloor(%_DoubleHi(x) / 3) + 0x2A9F7893;
  var approx = %_ConstructDouble(approx_hi, 0);
  approx = NEWTON_ITERATION_CBRT(x, approx);
  approx = NEWTON_ITERATION_CBRT(x, approx);
  approx = NEWTON_ITERATION_CBRT(x, approx);
  return NEWTON_ITERATION_CBRT(x, approx);
}

Here's an explanation for the bit hack from the FreeBSD sources[1]:

Rough cbrt to 5 bits:

   cbrt(2**e*(1+m)) ~= 2**(e/3)*(1+(e%3+m)/3)
   
where e is integral and >= 0, m is real and in [0, 1], and "/" and
"%" are integer division and modulus with rounding towards minus
infinity.  The RHS is always >= the LHS and has a maximum relative
error of about 1 in 16.  Adding a bias of -0.03306235651 to the
(e%3+m)/3 term reduces the error to about 1 in 32. With the IEEE
floating point representation, for finite positive normal values,
ordinary integer divison of the value in bits magically gives
almost exactly the RHS of the above provided we first subtract the
exponent bias (1023 for doubles) and later add it back.  We do the
subtraction virtually to keep e >= 0 so that ordinary integer
division rounds towards minus infinity; this is also efficient.

Since we don't have direct access to the bit hack, it's probably better to use a polynomial for the
initial approximation and either use tNewton-Raphson or Halley's Method to converge on a more
accurate figure.

A few random notes:

Math.pow(2, e / 3) * (1 + (e % 3) / 3 + m / 3)
    
1023 + ((e - 1023) / 3) === e / 3 + (1023 - 1023 / 3)
    
(1023 - 1023 / 3) << 20;

0x2aa00000 = 715128832 = (1023 - 1023 / 3) * 2**20;
0x2A9F7893 = 715094163 = (1023 - 1023 / 3 - 0.03306235651) * 2**20 

[1]: https://svnweb.freebsd.org/base/stable/10/lib/msun/src/s_cbrt.c?revision=256281&view=markup
*/