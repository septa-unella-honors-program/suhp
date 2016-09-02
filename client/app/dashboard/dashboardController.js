angular.module('suhp.dashboard', [])

<<<<<<< HEAD
.controller("DashController", function (this, Dashboard){
=======
.controller("DashController", function (Dashboard){
  //angular 1.5 convention. use this keyword in place of $scope 
>>>>>>> userdash
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
<<<<<<< HEAD
=======
      //need to figure out has expired and has completed checkbox
>>>>>>> userdash
  }

})
