'use strict';

(function () {
  var deps = 'acosh,asinh,atanh,cbrt,clz32,cosh,expm1,fround,hypot,imul,log1p,log2,log10,sign,sinh,tanh'.split(',');
  
  define(deps.map(function (val) {
    return './' + val;
  }), function () {
    for (var i = 0; i < deps.length; ++i) {
      Math[deps[i]] = arguments[i];
    }
  });
})();
