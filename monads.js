var add10 = function(x) {
  return x+10;
}

var triple = function(x) {
  return x*3;
}

var compose = function(f,g) {
  return function(x) {
    return f(g(x));
  }
}

// Identity monad

var unitId = function(x) { return x }

var bindId = function(f) {
  return function(x) {
    return f(x);
  }
}

var liftId = function(f) {
  return function(x) {
   return unitId(f(x));
  }
} 

console.log((compose(add10, triple))(10));

console.log((compose(bindId(add10), bindId(triple)))(unitId(10)));



// State monad
// lift bind unit

var unitState = function(x, state) { return [x, state] }



// I/O monad
    /*
function unit(x) {
  return x;
}

function bind(f) {
  return function () {
  };
}

*/

// Maybe


// Carin Meyer
// monadic value
var returnCM1 = function(v) {
  return function() { return v }
}

console.log(returnCM1("jelly"));
console.log(returnCM1("jelly")());

var bindCM1 = function(mv, f) {
  return f(mv());
}

var withToast = function(s) {
  return returnCM1((function() { return "toast & " + s; })());
}

console.log(withToast);

console.log((bindCM1(returnCM1("jelly"), withToast))())

var grow = function(p) {
  return returnCM1((function() { return p + p.charAt(p.length-1) })()); 
}

var mgrow = function(mv) {
  return bindCM1(mv, grow);
}

console.log(grow("me"));
console.log((grow("me"))());
console.log(mgrow);
console.log((mgrow(returnCM1("me")))())
console.log((mgrow(mgrow(mgrow(returnCM1("me")))))())


var directions = function(start) {
  var randomStep = function() {
    var rand = Math.random();
    if (rand > 0.5) {
      return start + ":left";
    } else {
      return start + ":right";
    }
  }
  return returnCM1(randomStep());
}

var mDirections = function(mv) {
  return bindCM1(mv, directions);
}

// Maybe monad

var bindCM2 = function(mv, f) {
  if (mv()) {
    return f(mv());
  } else {
    return returnCM1(null);
  }
}

var mDirections2 = function(mv) {
  return bindCM2(mv, directions);
}


console.log(bindCM1(returnCM1("startPos"),directions));
console.log((bindCM1(returnCM1("startPos"),directions))());
console.log((bindCM1(returnCM1("startPos"),directions))());
console.log(mDirections(mDirections(mDirections(returnCM1("startPos"))))());
console.log(mDirections(mDirections(mDirections(returnCM1(null))))());
console.log(mDirections2(mDirections2(mDirections2(returnCM1(null))))());

var mTea = function(mv, name) {
  return bindCM2(mv, function(v) {
    return returnCM1(v + " and " + name);
  })
}

console.log((mTea(returnCM1("me"), "you"))());

var returnState = function(v) {
  return function(s) { return [v,s] }
}

var bindState = function(mv, f) {
  return function(s) {
    var y = mv(s),
        v = y[0],
        sn = y[1];
    return (f(v))(sn);
  }
}

var mTeaState = function(mv, name) {
  return bindState(mv, function(v) {
    return returnState(v + " and " + name);
  })
}

console.log((returnState("me"))(10));
console.log(mTeaState(returnState("me"), "you"));

console.log((mTeaState(returnState("me"), "you"))(10));

// monadic laws
bindState(mv,returnState)

var takeSugar = function(mv) {
  return bindState(mv, function(v) {
    return function(s) {
      return [v,s-1];
    }
  });
}

console.log((returnState("me"))(10));
console.log((takeSugar(returnState("me")))(10));
console.log((mTeaState(takeSugar(returnState("me")), "you"))(10));
