var app = angular.module("USDance", ["ngRoute", "uiGmapgoogle-maps", "google.places"])
.constant("firebaseURL", "https://usdancemap.firebaseio.com/")

let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
	if(AuthFactory.isAuthenticated()){
		console.log("User is authenticated, resolve route promise");
		resolve();
	} else {
		console.log("User is not authenticated, reject route promise");
		reject();
	}
})

app.config (function($routeProvider){
	$routeProvider.
	when('/', {
		templateUrl: 'partials/EventSearch.html',
		controller: 'EventSearchCtrl'
	}).
	when('/event/search', {
		templateUrl: 'partials/EventSearch.html',
		controller: 'EventSearchCtrl',

	}).
	when('/event/details', {
		templateUrl: 'partials/Event-Details.html',
		controller: 'EventDetailsCtrl'
	}).
	when('/event/user', {
		templateUrl: 'partials/Events-User.html',
		controller: 'UserEventsCtrl',
		resolve: {isAuth}
	}).
	when('/event/create', {
		templateUrl: 'partials/Events-Create.html',
		controller: 'CreateEventCtrl',
		resolve: {isAuth}
	}).
	when('/event/:eventId/', {
		templateUrl: 'partials/Event-Details.html',
		controller: 'EventDetailsCtrl',
		resolve: {isAuth}
	}).
	when('/event/:eventId/edit', {
		templateUrl: 'partials/Events-Create.html',
		controller: 'EditEventCtrl',
		resolve: {isAuth}
	}).
	when('/login', {
		templateUrl: 'partials/Login.html',
		controller: 'LoginCtrl'
	}).
	when('/logout', {
		templateUrl: 'partials/Login.html',
		controller: 'LoginCtrl'
	}).
	otherwise('event/search')

});

// let getGoogleMapKey = function () {
// 		return $q(function (resolve, reject){
// 			$http.get("map.json")
// 			.success(function (mapKeyObject){
// 				var mapKey = mapKeyObject.googlemaps.key
// 				console.log("parse", mapKey);
// 				resolve(mapKey) 
// 			})
// 			.error(function(error){
// 				reject(error)
// 			})
// 		})
// 	}

app.config(function(uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
           key: '',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
    console.log(uiGmapGoogleMapApiProvider);
})

// this function is assigning the link to my Firebase url to a variable that will be used to decide whether or not the user is authorized on the Firebase account to make changes.
app.run(($location) => {
	let eventRef = new Firebase("https://usdancemap.firebaseio.com/");

// This says that when authentication takes place, if the data that is entered in does not match the data within firebase that is authorized, then send the user back to the login screen to try again.
eventRef.onAuth(authData => {
	if(!authData){
		$location.path("/login")
	}
})
})