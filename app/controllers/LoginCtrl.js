"use strict"

app.controller("LoginCtrl", function($scope, $rootScope, $location, firebaseURL, AuthFactory){

	let ref = new Firebase(firebaseURL);

	$scope.account = {
		email: "",
		password: ""
	};

	// this is checking to see if the path that was chosen is equal to logout and if it is, then it unauthorizes you.
	if($location.path() === "/logout") {
		ref.unauth();
		$rootScope.isActive = false;
	}

	$scope.register = () => {
		console.log("you clicked on register");
		ref.createUser({
			email: $scope.account.email,
			password: $scope.account.password
		}, (error, userData) => {
			if(error){
				// This takes the error that firebase sends back and gives it to you. The phrase "Error creating user" is your message that is attached to the firebase message so you know what it is.
				console.log(`Error creating user: ${error}`);
			} else{
				console.log(`Created user account with uid: ${userData.uid}` );
				$scope.login();
			}
		});
	}
	// This is where the loging function is defined (in E6 format) that console logs the fact that you clicked the login button. It then calls the AuthFactory...factory. 
	$scope.login = () => {
		console.log("you clicked login");
		AuthFactory
		// authenticates the account object and tells the app that this user is authenticated and authorized to view things on the application. 
			.authenticate($scope.account)
			.then(() => {
				// This is where it tells the application the user is authorized
				$rootScope.isActive = true;
				// this takes you back to the base or home page right after authentication.
				$location.path("/");
				$scope.$apply();
			})
	};

})