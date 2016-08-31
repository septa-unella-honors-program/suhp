angular.module('suhp.dashboard', [])

.controller("DashController", function ($scope, Dashboard){
  $scope.data = {};
  $scope.goal = {};
  //will render list of user goals upon initialization
  var initializeGoals = function() {
    Dashboard.getUserGoals()
    .then(function(goals){
      $scope.data.goals = goals;
    })
    .catch(function(error){
      console.error(error)
    }
  }
  initializeGoals();



  //attached to ng-submit
  $scope.addGoal = function(){
    Dashboard.storeUserGoals($scope.goal)
  }

})
