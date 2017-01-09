app.controller("EventSearchCtrl", function($scope, EventStorage){
	$scope.dataArray = []
	$scope.eventsHere = []

	$scope.map = { 
		center: { 
			latitude: 37.4419, 
			longitude: -95.712891 
		}, 
		zoom: 4,
		bounds: {}
	}
$scope.$watch(function() {
      return $scope.map.bounds;
    })
	
		EventStorage.getUserEvents().then(function (data){
			for (var i=0; i<data.length; i++){
				var dataObject = data[i].EventLocation
				$scope.dataArray.push(dataObject)
				
				
			}

			console.log($scope.dataArray);
		})


		
EventStorage.getUserEvents().then(function(eventList){
		$scope.eventsHere = eventList;	
	});

}); 