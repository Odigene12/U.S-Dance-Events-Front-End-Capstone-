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
		templateUrl: 'partials/Login.html',
		controller: 'LoginCtrl'
	}).
	when('/event/search', {
		templateUrl: 'partials/EventSearch.html',
		controller: 'EventSearchCtrl',

	}).
	when('/event/details', {
		templateUrl: 'partials/Event-Details.html',
		controller: 'EventDetailsCtrl',
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



// this function is assigning the link to my Firebase url to a variable that will be used to decide whether or not the user is authorized on the Firebase account to make changes.
app.run(($rootScope, $location, FIREBASE_CONFIG, AuthFactory) => {
	firebase.initializeApp(FIREBASE_CONFIG);

//watch method that fires on change of a route.  3 inputs. 
    //event is a change event
    //currRoute is information about your current route
    //prevRoute is information about the route you came from

// This says that when authentication takes place, if the data that is entered in does not match the data within firebase that is authorized, then send the user back to the login screen to try again.
$rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
        // checks to see if there is a current user
        var logged = AuthFactory.isAuthenticated();
        
        var appTo;
        
        // to keep error from being thrown on page refresh
        if(currRoute.originalPath){
          // check if the user is going to the auth page = currRoute.originalPath
          // if user is on auth page then appTo is true
          // if it finds something other than /auth it return a -1 and -1!==-1 so resolves to false
          appTo = currRoute.originalPath.indexOf('/login') !== -1; 
      } 

        //if not on /auth page AND not logged in redirect to /auth
        if(!appTo && !logged) {
        	event.preventDefault();
        	$location.path('/login');
        } 
    })
})

