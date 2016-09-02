angular.module('suhp.dashboard', [])


.controller("DashController", function ($scope, Dashboard, User){
  console.log("dash controller start");

  //angular 1.5 convention. use this keyword in place of $scope
  //var username = User.currentUser;
  var username = "lucas";
  // var vm = this;
  $scope.data = {};
  $scope.goal = {};
  $scope.goal.user = username;
  //will render list of user goals upon initialization
  var initializeGoals = function() {
    //need to inject user factory
    Dashboard.getUserGoals(username)
    .then(function(goals){
      $scope.data.goals = goals;
    })
    .catch(function(error){
      console.error(error)
    })
  }
  initializeGoals();

  var goalCompletion = function(goalId){
    Dashboard.updateCompletion(goalId)
  };


  //attached to ng-submit
  $scope.addGoal = function(){
    console.log("adding goal");
    console.log($scope.goal);
    Dashboard.storeUserGoals($scope.goal)
  }

  $scope.goalCompletion = function(goalId){
    console.log("updating goal completion")
    console.log(goalId);
    Dashboard.updateCompletion(goalId)
  };

})
