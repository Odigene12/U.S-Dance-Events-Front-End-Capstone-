app.factory("EventStorage", function($q, $http, firebaseURL, AuthFactory){

	// This function links to Firebase and gets the user's data of events that he or she created.
	var getUserEvents = function (){
		var userevents = [];
		let user = AuthFactory.getUser();
		return $q(function (resolve, reject){
			$http.get(`${firebaseURL}events.json?orderBy="uid"&equalTo="${user.uid}"`)
			.success(function (eventObject){
				var eventsList = eventObject;
					// this is looping through array of objects that it got from firebase through the events json and so on and extracting each object.
					Object.keys(eventsList).forEach(function(key){
								// here, it is giving an "id" property to each item in that array and setting its key "event1 and so on" equal to the id.
								eventsList[key].id=key;
								// pushing it into the empty array at the top "var userevents = []"
								userevents.push(eventsList[key]);
							});
					resolve(userevents);
				})
			.error(function(error){
				reject(error);
			});
		})
	}


	// this function links to the firebase account and targets the specific event that the user wants to delete and deletes it. 
	var deleteEvent = function(eventId) {
		return $q(function(resolve, reject){
			$http
			.delete(firebaseURL + "events/" + eventId + ".json")
			.success(function(objectFromFirebase){
				resolve(objectFromFirebase);
			});
		});
	};

	var postNewEvent = function(newEvent) {
		let user = AuthFactory.getUser();
		return $q(function(resolve, reject){
			$http.post("https://usdancemap.firebaseio.com/events.json",
				JSON.stringify({
					Name: newEvent.Name,
					EventLocation: newEvent.EventLocation,
					Address: newEvent.Address,
					PromoterEmail: newEvent.PromoterEmail, 
					FullPassCost: newEvent.FullPassCost,
					HotelCost: newEvent.HotelCost,
					EventURL: newEvent.EventURL,
					uid: user.uid
				})
				)
			.success(function(objectFromFirebase) {
							// this is telling you that the promise is completed and ready to use the data
							resolve(objectFromFirebase);
						}
						);
		});
	};

	var getEvent = function (eventId){
		return $q(function(resolve, reject){
			$http.get(firebaseURL + "events/" + eventId + ".json")
				.success(function(itemObject){
					resolve(itemObject);
				})
			.error(function(error){
				reject(error);
				});
		});
	
	};

	var updateEvent = function(eventId, newEvent){
        let user = AuthFactory.getUser();
        return $q(function(resolve, reject) {
            $http.put(
            	firebaseURL + "events/" + eventId + ".json",
                JSON.stringify({
                    Name: newEvent.Name,
					EventLocation: newEvent.EventLocation,
					Address: newEvent.Address,
					PromoterEmail: newEvent.PromoterEmail, 
					FullPassCost: newEvent.FullPassCost,
					HotelCost: newEvent.HotelCost,
					EventURL: newEvent.EventURL,
					uid: user.uid
                })
            )
            .success(
                function(objectFromFirebase) {
                    resolve(objectFromFirebase);
                }
            );
        });
    };

var getGoogleMapKey = function () {
		return $q(function (resolve, reject){
			$http.get("map.json")
			.success(function (mapKeyObject){
				var mapKey = mapKeyObject.googlemaps.key
				console.log("parse", mapKey);
				resolve(mapKey) 
			})
			.error(function(error){
				reject(error)
			})
		})
	}



	return {getUserEvents:getUserEvents, deleteEvent:deleteEvent, postNewEvent:postNewEvent, getEvent:getEvent, updateEvent:updateEvent, getGoogleMapKey:getGoogleMapKey}
})