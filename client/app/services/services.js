//contains all client-side services for signup, signin, and dashboard

angular.module('suhp.services', ['ngStorage'])

//user factory to keep track of user
.factory('User', function(){
  var currentUser=null;
  return{
    currentUser:currentUser
  }

})

.factory('Auth', function($http, $localStorage){
  //factory to post username to database upon signup
  var signup = function(user){
    console.log('user', user);
    return $http({
      method: 'POST',
      url: '/signup',
      data: user
    })
    .then(function(response){
      $localStorage.token = response.data.token;
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
      $localStorage.user = userName;
      return response.data;
    })
    .catch(function(error){
      console.error('+++line 32 services.js: Error in storeFriendEmailList');
    });
  };

  var signin = function(userobj){

    return $http({
      method: 'GET',
      url: '/signin',
      params: userobj
    }).then(function(response){
      console.log('response', response);
      $localStorage.token = response.data.token;
      $localStorage.user = response.data.user;
      if(response.status == 200){
          return response;
        }
    }).catch(function(error){
      console.error('+++line 52 services.js: There was a problem in services/sign in function');
    });
  };

  var hasToken = function() {
    return !!$localStorage.token;
  };

  return {
    signup : signup,
    signin: signin,
    storeFriendEmailList : storeFriendEmailList,
    hasToken: hasToken
  }

})




//factory function for user dashboard
.factory('Dashboard', function($http){
  //retrieves usergoals from database based on username
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
    });
  };

  //posts usergoals to db
  var storeUserGoals = function(userGoal){
      return $http({
        method: 'POST',
        url: '/goals',
        data: userGoal
      });
  };

  //updates completion status in db
  var updateCompletion = function(params) {
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


}); 
