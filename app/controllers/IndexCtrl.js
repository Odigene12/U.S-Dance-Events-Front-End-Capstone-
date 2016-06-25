app.controller("IndexCtrl", function($scope, $sce, EventStorage){
EventStorage.getGoogleMapKey().then(function (key){
    $scope.mapKey = key;
    console.log("",$scope.mapKey);
})
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
            // console.log($scope.map); 
            // $scope.isOffline = false;

})