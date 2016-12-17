app.controller("EditEventCtrl", function($scope, $location, $routeParams, EventStorage){
	$scope.newTask = {};
	// Here I am using the contactStorage facotry in order to access the getSingleContact method that gets the id of the specified item in order to edit it. 
	EventStorage.getEvent($routeParams.eventId)
	.then(function successCallback(response){
		$scope.newTask = response;
	});

	// This function is the same one that lets you edit the contact that was clicked. The function is using the factory to get the id of the item that was clicked and lets the user edit the contact however.
	$scope.createEvent = function() {
			EventStorage.updateEvent($routeParams.eventId, $scope.newTask)
				.then(function successCallback(response){
					console.log(response);
					$location.url("/events/user");
				});
		};
});