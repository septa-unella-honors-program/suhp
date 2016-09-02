angular.module('suhp.dashboard', [])

.controller("DashController", function (this, Dashboard){
  var vm = this;
  vm.data = {};
  vm.goal = {};
  //will render list of user goals upon initialization
  var initializeGoals = function() {
    Dashboard.getUserGoals()
    .then(function(goals){
      vm.data.goals = goals;
    })
    .catch(function(error){
      console.error(error)
    })
  }
  initializeGoals();



  //attached to ng-submit
  vm.addGoal = function(){
    Dashboard.storeUserGoals(vm.goal)
  }

})
