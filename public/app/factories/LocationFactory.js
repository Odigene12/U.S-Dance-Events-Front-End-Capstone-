app.factory("LocationFactory", function($q, $http, mapKey){
			console.log(mapKey);  
	var getUserLocation = function (userCity, userState) {
			var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+userCity+',+'+userState+'&key='+mapKey
			return $q(function (resolve, reject){
			$http.get(url)
			.success(function (locationObject){
				// console.log(locationObject);
				var userLocation = locationObject.results[0].geometry.location;
				resolve(userLocation)

				})
			.error(function(error){
				reject(error);
			});
		})
	}

	return {getUserLocation:getUserLocation}
})