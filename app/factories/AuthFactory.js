"use strict";

app.factory("AuthFactory", function(firebaseURL, $http) {
  // need to use the ref again here because you are talking to firebase again. This needs to be done in any instance in which firebase is talking too.
  // this line below allows the use of firebase methods.
  let ref = new Firebase(firebaseURL); 
  let currentUserData = null;

  return {
    /*
      Determine if the client is authenticated
     */
    isAuthenticated () {
      // ".getAuth" is a firebase method
      let authData = ref.getAuth();
      // if the authentication is real then "true", if not "false"
      return (authData) ? true : false;
    },

    getUser () {
     // this is important and fills the 
      return currentUserData;
    },

    /*
      Authenticate the client via Firebase
     */
     // this is a promise for logging in.
    authenticate (credentials) {
      return new Promise((resolve, reject) => {
        // this is also a firebase method.
        ref.authWithPassword({
          // this is the object that is being passed in.
          "email": credentials.email,
          "password": credentials.password
        }, (error, authData) => {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            console.log("authWithPassword method completed successfully");
            // so authData is what is returned and "currentUserData" is overwritten.
            currentUserData = authData;
            resolve(authData);
          }
        });
      });
    },

    /*
      Store each Firebase user's id in the `users` collection
     */
    storeUser (authData) {
      let stringifiedUser = JSON.stringify({ uid: authData.uid });

      return new Promise((resolve, reject) => {
        $http
          .post(`${firebaseURL}/users.json`, stringifiedUser)
          .then(
            res => resolve(res),
            err => reject(err)
          );
      });
    }

  };
});