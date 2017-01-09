"use strict"

app.controller("LoginCtrl", function($scope, $rootScope, $location, AuthFactory){


	$scope.account = {
		email: "",
		password: ""
	};

	// this is checking to see if the path that was chosen is equal to logout and if it is, then it unauthorizes you.
	if($location.path() === "/logout") {
		AuthFactory.logout()
		$rootScope.isActive = false;
		$location.url('/login');
	}

	$scope.register = () => {
		console.log("you clicked register")
		AuthFactory.registerWithEmail($scope.account).then(function(){
			$scope.login();
			$location.path("/event/search")
		});
	}
	// This is where the loging function is defined (in E6 format) that console logs the fact that you clicked the login button. It then calls the AuthFactory...factory. 
	$scope.login = () => {
		console.log("you clicked login");
		AuthFactory.authenticate($scope.account)
			.then(() => {
				$rootScope.isActive = true;
				$location.path("/event/search");
			})
	};

})