angular.module('suhp.dashboard', [])


.controller("DashController", function (Dashboard, User){
  console.log("dash controller start");

  var vm = this;
  // var username = User.currentUser;
  var username = "jim";
  vm.data = {};
  vm.goal = {};
  vm.goal.user = username;


  //will render list of user goals upon initialization
  vm.initializeGoals = function() {
    //need to inject user factory
    Dashboard.getUserGoals(username)
    .then(function(goals){
      vm.data.goals = goals;
    })
    .catch(function(error){
      console.error(error)
    })
  }
  vm.initializeGoals();

  vm.goalCompletion = function(goalId){
    Dashboard.updateCompletion(goalId)
  };


  //attached to ng-submit

  vm.addGoal = function(){
    console.log("adding goal");
    console.log(vm.goal);
    Dashboard.storeUserGoals(vm.goal)
  }

  vm.goalCompletion = function(goalId){
    console.log("updating goal completion")
    console.log(goalId);
    Dashboard.updateCompletion(goalId)
  };


})
