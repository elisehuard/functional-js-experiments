(function (x) { x * 10 })

console.log((function (x) {return(x*1000)})(10))

// recursion
console.log((function(n){ if(n <= 1){return 1;}else{return n*arguments.callee(n-1);}})(10))
