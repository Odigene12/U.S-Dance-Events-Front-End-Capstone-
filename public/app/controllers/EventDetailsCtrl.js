app.controller("EventDetailsCtrl", function($scope, $routeParams, EventStorage){

$scope.danceEvents = [];
$scope.selectedEvent = {};



//this is where the contactStorage factory is called since it has a function that gets the contacts from Firebase ("getContacts") then I want to set the empty array ("$scope.contacts") equal to the object array that was just received from Firebase ("contactList").
	EventStorage.getUserEvents().then(function(eventList){
		$scope.danceEvents = eventList;


				// Remember .filter is an array method that returns an array.
			$scope.selectedEvent = $scope.danceEvents.filter(function(danceEvent){
				// here the filter is comparing the id of the item to the id of the url to see if they equal or match.
				return danceEvent.id === $routeParams.eventId;
			})[0];
		});	
	});