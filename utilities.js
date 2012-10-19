[1,3,5].map(function(x) {return x+1 });
_.map([1,2,3], function(x) {return x+1});
map('x*x', [1,2,3,4])

for (var i = 0; i < array.length; i++)
    doSomething(array[i]);             // => map

for (var i = 0; i < array.length; i++) {
	if (array[i]%2 == 0)
	  doSomething(array[i]);
}  // => filter

var sum = 0;
for (var i = 0; i < array.length; i++) {
	sum += array[i];
} // => reduce/foldl