app.controller("EventSearchCtrl", function($scope, EventStorage) {	

	$scope.searchEvent = function () {
		console.log("clicked search ");
	}
	
	 $scope.map = {
            center: {
              latitude: 38.6579531,
              longitude: -110.3788686
            },
            zoom: 4,
            options: {                    
                streetViewControl: false,
                mapTypeControl: false,
                scaleControl: false,
                rotateControl: false,
                zoomControl: false
            }
        };


	})	