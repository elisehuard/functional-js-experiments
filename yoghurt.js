// make a monadic value

var makeMonadicValue = function(value) {
  return function(state) {
    return {value: value, state: state};
  }
}

// bind to a function

var bindToFunction = function(mv, f) {
  return function(state) {
    var executedMonad = mv(state),
        value = executedMonad.value,
        newState = executedMonad.state;
    return (f(value))(newState);
  }
}

// you can act on the value
var addPerson = function(value, name) {
  return value + " and " + name;
}

// but here's the monadic way to do it
var mAddPerson = function(mv, name) {
  return bindToFunction(mv, function(value) {
    return makeMonadicValue(value + " and " + name);
  })
}

var mv = makeMonadicValue("Joe");

console.log(mv(10));
(mAddPerson(mv, "Tom"))(10); // => "Joe and Tom"

// so far nobody's taken a yoghurt
// but, wait ...
// you can act on state

var takeYoghurt = function(state) {
  return state - 1;
}

var mTakeYoghurt = function(mv) {
  return bindToFunction(mv, function(value) {
    return function(state) {
      return {value: value, state: state-1};
    }
  })
}

console.log((mTakeYoghurt(mv))(10)); // => {value: "Joe", state: 9 }

// plug and play
console.log(
(mTakeYoghurt(
  (mAddPerson(
    (mTakeYoghurt(
      (mAddPerson
        (mv,"Tom")
      ))),
    "Shelley"))))
(10)); // => { value: 'Joe and Tom and Shelley', state: 8 }

