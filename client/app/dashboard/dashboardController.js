angular.module('suhp.dashboard', [])


.controller("DashController", function (Dashboard, User){
  console.log("dash controller start");

  var vm = this;
  // var username = User.currentUser;
  var username = User.currentUser;
  vm.data = {};
  vm.goal = {};
  vm.goal.username = username;

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
    console.log(vm.goal.deadline);
    if(vm.goal.deadline){
      Dashboard.storeUserGoals(vm.goal)
      .then(function(goalId){
        console.log("DB goal ID");
        console.log(goalId);
        vm.goal.id=goalId.data;
        vm.data.goals.push(vm.goal);
      })
      .catch(function(err){
        console.log("error posting goal");
      });
      
    }
  }

  vm.goalCompletion = function(goal){
    console.log("updating goal completion")
    console.log(goal.id);
    goal.hasCompleted=true;
    Dashboard.updateCompletion(goal.id);
  };


})
