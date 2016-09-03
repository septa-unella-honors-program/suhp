angular.module('suhp.dashboard', [])


.controller("DashController", function (Dashboard, User){


  //angular 1.5 convention. use this keyword in place of $scope
  var username = User.currentUser;
  var vm = this;
  vm.data = {};
  vm.goal = {};
  vm.goal.user = username;
  //will render list of user goals upon initialization
  var initializeGoals = function() {
    //need to inject user factory
    Dashboard.getUserGoals(username)
    .then(function(goals){
      vm.data.goals = goals;
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
  vm.addGoal = function(){
    Dashboard.storeUserGoals(vm.goal)
  }

  var goalCompletion = function(){
    Dashboard.updateCompletion(vm.goal.goalId)
  };

})
