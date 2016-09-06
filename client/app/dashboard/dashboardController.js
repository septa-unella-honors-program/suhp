angular.module('suhp.dashboard', ['ngStorage'])


.controller("DashController", function (Dashboard, User, $location, $localStorage){

  //vm/this is angular 1.5 convention. replaces $scope obj
  var vm = this;
  var username = User.currentUser;
  vm.data = {};
  //Initialize array to store goals in memory
  vm.data.goals = [] || null;
  vm.goal = {};
  //If goals exist in local storage, set to goals. Else, set to null
  vm.storedGoals = $localStorage.goals || null;

  //Username is saved to localStorage to persist data
  vm.goal.username = $localStorage.user;

  //will render list of user goals upon initialization
  vm.initializeGoals = function() {
    Dashboard.getUserGoals(username)
    .then(function(goals){
      goals.forEach(function(goal){
        goal.deadline=((new Date(goal.deadline))+'').slice(0,25);
      });
      vm.data.goals = goals;
      //Set local storage goals to array of goals
      $localStorage.goals = vm.data.goals;
      vm.storedGoals = $localStorage.goals;
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

    if(vm.goal.deadline){
      Dashboard.storeUserGoals(vm.goal)
      .then(function(goalId){
        vm.goal.id=goalId.data;

        var newGoal={
          id:goalId.data,
          description:vm.goal.description,
          deadline:((new Date(vm.goal.deadline))+'').slice(0,25),
          hasExpired:false,
          hasCompleted:false
        };
        vm.data.goals.push(newGoal);
        //reinitialize local storage to store new goal
        $localStorage.goals = vm.data.goals;
        vm.initializeGoals();
      })
      .catch(function(err){
        console.log("error posting goal");
      });

    }
  }

  vm.goalCompletion = function(goal){
    goal.hasCompleted=true;
    Dashboard.updateCompletion(goal.id);
  };

  vm.signOut = function() {

    $localStorage.$reset({
      token: null
    });

    User.currentUser = null;
    $location.path('/signin');
  };


})
