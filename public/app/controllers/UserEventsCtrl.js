app.controller("UserEventsCtrl", function($scope, $http, $location, EventStorage, LocationFactory){
	$scope.events = [];
	$scope.data = [];
	//this is where the Eventstorage factory is called since it has a function that gets the Events from Firebase ("getUserEvents") then I want to set the empty array ("$scope.Events") equal to the object array that was just received from Firebase ("eventList").
	EventStorage.getUserEvents().then(function(eventList){
		$scope.events = eventList;	
	});

	// this function makes it to where you can delete the specified item off of the DOM by using the delete function that was created in the factory.
	$scope.deleteEvent = function(eventId) {
		console.log("delete button clicked");
		console.log(eventId);
		// this is where the factory is called then the function that does what is needed (which is deleting in this case).
		EventStorage.deleteEvent(eventId).then(function(response){
			// here the Events are extracted again from firebase and updated with the new list that does not include the contact that was deleted.
			EventStorage.getUserEvents().then(function(eventList){
				console.log(eventList);

				$scope.data.push(eventList)
				
				$scope.events = eventList;
			});
		});
			};
});