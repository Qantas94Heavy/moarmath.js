/* Some functions/algorithms used are from others -- they are cited here.
 * 
 * hypot:
 * Moler, C., Morrison, D. (1983). Replacing Square Roots by Pythagorean Sums. IBM Journal of
 * Research and Development, 27(6), 577-581.
 * 
 * expm1 (Willam Kahan's code, original URL http://www.cs.berkeley.edu/~wkahan/Math128/Sumnfp.pdf),
 * sinh, tanh, asinh, atanh:
 * Hatch, D. (2003, July 4). The Right Way to Calculate Stuff. Retrieved April 27, 2014, from Plunk:
 * http://www.plunk.org/~hatch/rightway.php
 * 
 * log1p: 
 * Goldberg, D. (1991, March) What Every Computer Scientist Should Know About Floating-Point
 * Arithmetic. ACM Computing Surveys, 23(1), 5-48. doi:10.1145/103162.103163
 * 
 * clz32:
 * Chudov, G. S. (2010, November 20). Inefficient clz implementation. Retrieved May 1, 2014, from
 * Intel Developer Zone: https://software.intel.com/en-us/forums/topic/286525#comment-1513252
 */

'use strict';

// ES6 draft, rev 28
define(['es6math/util'], function (util) {
  function addProp(obj, propDescriptor, props) {
    if (typeof Object === 'function') {
      var defineProp = Object.defineProperty;
      if (typeof defineProp === 'function') for (var i in props) {
        if (props.hasOwnProperty(i)) {
          var prop = props[i];
          propDescriptor.value = prop;
          defineProp(obj, i, propDescriptor);
        }
      }
    }
    else throw new Error('screw IE');
  }
  
  util.addProp(Math, { writable: false, enumerable: false, configurable: false },
    { E: 2.718281828459045
    , LN10: 2.302585092994046
    , LOG10E: 0.4342944819032518
    , LN2: 0.6931471805599453
    , LOG2E: 1.4426950408889634
    , PI: 3.141592653589793
    , SQRT1_2: 0.7071067811865476
    , SQRT2: 1.4142135623730951
    }
  );
  
  return Math;
});