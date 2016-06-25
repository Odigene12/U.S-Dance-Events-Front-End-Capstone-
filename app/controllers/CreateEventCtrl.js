app.controller("CreateEventCtrl", function($scope, $location, EventStorage){
	
		// Create object for new event created by user to save in firebase
		$scope.newTask = {
			Name:"",
			EventLocation:"",
			Address: "",
			PromoterEmail:"", 
			FullPassCost:"",
			HotelCost:"",
			EventURL:""
		};

		// Create a function that gets the values of all the input fields and saves them in firebase to be populated on the user's events and the cooresponding city, state on the map.
		$scope.createEvent = function() {
			EventStorage.postNewEvent($scope.newTask)
			.then(function successCallback(response) {
				$location.url("/event/search")
			})
		} 
	})