var validate = function(validationFunction) {
	return function(field) {
		var isError, errorMessage = validationFunction(field);
		return (isError,errorMessage);
	}
}

var required = validate(function(field) {
	var errorMessage = null;
	if (!field) {
		errorMessage = "should have a field"
	}
	return [!field, errorMessage];
})
