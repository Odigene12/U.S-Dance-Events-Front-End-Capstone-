app.factory("EventStorage", function($q, $http, firebaseURL, AuthFactory){

	// This function links to Firebase and gets the user's data of events that he or she created.
	var getUserContacts = function (){
		var userevents = [];
		let user = AuthFactory.getUser();
		return $q(function (resolve, reject){
			$http.get(`${firebaseURL}events.json?orderBy="uid"&equalTo="${user.uid}"`)
			.success(function (eventObject){
				var eventsList = eventObject;
					// this is looping through array of objects that it got from firebase through the contact0 and so on and extracting each object.
					Object.keys(eventsList).forEach(function(key){
								// here, it is giving an "id" property to each item in that array and setting its key "contact0 and so on" equal to the id.
								eventsList[key].id=key;
								// pushing it into the empty array at the top "var contacts = []"
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
			$http.post("https://oj-addressbook.firebaseio.com/events.json",
				JSON.stringify({
					Name: newEvent.Name,
					EventLocation: newEvent.EventLocation,
					PromoterInfo: newEvent.PromoterInfo,
					PassCost: newEvent.PassCost,
					HotelCost: newEvent.HotelCost,
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

})