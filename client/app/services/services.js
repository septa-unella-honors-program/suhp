//contains all client-side services for signup, signin, and dashboard

angular.module('suhp.services', [])

.factory('User', function(){
  var currentUser=null;
  return{
    currentUser:currentUser
  }

})

.factory('Auth', function($http){
  //factory to post username to database upon signup
  var signup = function(user){
    console.log('user', user);
    return $http({
      method: 'POST',
      url: '/signup',
      data: user
    })
    .then(function(response){
      console.log('success', response.query);
      return response.data;
    })
    .catch(function(error){
      return console.error('+++line17 services.js: Error in services.factory.signup');
    });
  };

  //factory to post email friend list to designated table within db
  var storeFriendEmailList = function(userName,friendEmailList){
    return $http({
      method: 'POST',
      url: '/email',
      data: {
        username: userName,
        emails: friendEmailList
      }
    })
    .then(function(response){
      return response.data;
    })
    .catch(function(error){
      console.error('+++line 32 services.js: Error in storeFriendEmailList');
    });
  };

  var userFound = false;

  var signin = function(userobj){
    console.log("+++line 38 services.js user object", userobj);
    return $http({
      method: 'GET',
      url: '/signin',
      params: userobj
    }).then(function(response){

      if(response.status == 200){
          return response;
        } 
    }).catch(function(error){
      console.error('+++line 52 services.js: There was a problem in services/sign in function');
    });
  };

  return {
    signup : signup,
    signin: signin,
    storeFriendEmailList : storeFriendEmailList
  }

})




//factory function for user dashboard, will handle post requests for
.factory('Dashboard', function($http){
  var getUserGoals = function(username){
    return $http({
      method: 'GET',
      url: '/goals',
      params: {
        username: username
      }
    })
    .then(function(response){
      return response.data
    })
    .catch(function(error){
      console.error('+++line79 services.js: There was an error retrieving your data')
    });
  };

  var storeUserGoals = function(userGoal){
      return $http({
        method: 'POST',
        url: '/goals',
        data: userGoal
            // should data be {
            //   "username": username,
            //   "description": description,
            //   "deadline": deadline,
            //   "hasExpired": false,
            //   "hasCompleted": false
            // }
      });
  };


  var updateCompletion = function(params) {
    console.log(" in update completion in Factory" +params);
    return $http({
      method: 'PUT',
      url: '/goals',
      params: {
        goalId: params}
    })
    .then(function(){
      console.log("successful put request")
    })
    .catch(function(error){
      console.error("There was an error with your request: ", error)

    })
  }

  return {
    getUserGoals : getUserGoals,
    storeUserGoals: storeUserGoals,
    updateCompletion: updateCompletion
  }


}); //for line 5
