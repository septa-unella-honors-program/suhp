//contains all client-side services for signup, signin, and dashboard

angular.module('suhp.services', [])
.factory('User', function){
  var currentUser=null;

  return{
    currentUser:currentUser
  }
}
.factory('Auth', function($http){
  //factory to post username to database upon signup
  var signup = function(user){
    return $http({
      method: 'POST',
      url: '/signup',
      data: user
    })
    .then(function(response){
      return response.data;
    })
    .catch(function(error){
      console.error('Error in services.factory.signup');
    });
  }

  //factory to post email friend list to designated table within db
  var storeFriendEmailList = function(friendEmailList) {
    return $http({
      method: 'POST',
      url: '/email',
      data: friendEmailList
    })
    .then(function(response){
      return response.data;
    })
    .catch(function(error){
      console.error('Error in services.factory.signup');
    });
  }

  return {
    signup : signup,
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
      console.error('There was an error retrieving your data')
    })
  }

  var storeUserGoals = function(userGoal){
      return $http({
        method: 'POST',
        url: '/goals',
        data: userGoal
      })
  }

  var updateCompletion = function(goalId) {
    return $http({
      method: 'PUT'
    })
  }
  return {
    getUserGoals : getUserGoals,
    storeUserGoals: storeUserGoals
  }

})
