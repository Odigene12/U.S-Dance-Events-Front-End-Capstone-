"use strict"
app.controller("CreateEventCtrl", function($scope, $location, EventStorage, LocationFactory){


	// var getLastId = function () {
	// 	EventStorage.getUserEvents().then(function (data){
	// 		let idArray = []
	// 		for (var i=0; i<data.length; i++){
	// 			idArray.push(data[i].EventLocation.id)
	// 		}
	// 	// sorts array by numbers
	// 		idArray.sort(function(a, b){
	// 		return a-b
	// 	})
	// 	// get last number
	// 	console.log("idArray", idArray );
	// 	counter = idArray.pop()
	// 	console.log("counter", counter);
	// })
	// 	return counter
	// }()
		// Create object for new event created by user to save in firebase
		$scope.newTask = {
			Name:"",
			EventCity:"",
			EventState: "",
			id:"",
			latitude: "",
			longitude: "",	
			Address: "",
			PromoterEmail:"", 
			FullPassCost:"",
			HotelCost:"",
			EventURL:""
		};

		// Create a function that gets the values of all the input fields and saves them in firebase to be populated on the user's events and the cooresponding city, state on the map.
		$scope.createEvent = function() {
			EventStorage.getUserEvents().then(function (data){
				$scope.newTask.id = data.length+1

				
			
			
			LocationFactory.getUserLocation($scope.newTask.EventCity, $scope.newTask.EventState).then(function (response){
				$scope.newTask.latitude=response.lat				
				$scope.newTask.longitude=response.lng

				EventStorage.postNewEvent($scope.newTask)
				.then(function successCallback(response) {
					$location.url("/event/search")
				})
			})
		})
	}
	})