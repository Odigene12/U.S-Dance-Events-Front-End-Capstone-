app.controller("EventSearchCtrl", function($scope, $http, $routeParams, EventStorage, LocationFactory, NgMap, mapKey){

	EventStorage.getUserEvents().then(function (response){
		$scope.danceEvents = response[0];
		console.log($scope.danceEvents);
	})

NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });


})	