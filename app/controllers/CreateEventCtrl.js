"use strict"
app.controller("CreateEventCtrl", function($scope, $location, EventStorage, LocationFactory){

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

				if (!$scope.newTask.EventURL.startsWith("http://" || "https://" || "www."))
				{
					$scope.newTask.EventURL = "http://www." + $scope.newTask.EventURL
				}

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
		});
	