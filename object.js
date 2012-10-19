function Person(gender) {
  this.gender = gender;
}
 
Person.prototype.sayGender = function()
{
  console.log(this.gender);
};
 
var person1 = new Person('Male');
var genderTeller = person1.sayGender;


var addClient = function(client) {
  client.save(function(err,success) {
    changeCounter += 1;
  })
}

var addClient = function(changeCounter) {
	return changeCounter+1;
}

