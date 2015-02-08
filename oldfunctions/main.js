'use strict';

(function () {
  var deps = 'abs,acos,asin,atan,atan2,ceil,cos,exp,floor,log,max,min,pow,random,round,sin,sqrt,tan'.split(',');
  
  define(deps.map(function (val) {
    return './' + val;
  }), function () {
    for (var i = 0; i < deps.length; ++i) {
      Math[deps[i]] = arguments[i];
    }
  });
})();
