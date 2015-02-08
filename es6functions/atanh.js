define(function () {
  function atanh(x) {
    x = +x;
    
    // prevent underflow with small numbers
    // based on taylor series expansion at x=0: lim(x -> 0, x = 0)
    if (x + pow(x, 3) / 3 === x) return x;
    
    // even more hacky, loss of precision only with this number (last representable number before 1)
    if (x === 0.9999999999999999) return 18.714973875118524;
    
    return log1p(2 * (x / (1 - x))) / 2;
  }
});