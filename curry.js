var max = function(a,b) {
  return a > b ? a : b;
}

max(18,15);
max(18);   // => undefined

// arbitrary number of arguments
function partial(f) {
  var args =  Array.prototype.slice.call(arguments),
      givenArgs =  args.slice(1);
  return function() {
    var remainingArgs = Array.prototype.slice.call(arguments);
    return f.apply(this, givenArgs.concat(remainingArgs));
  }
}

var isOfAge = partial(max,18);
isOfAge(15); // => false
