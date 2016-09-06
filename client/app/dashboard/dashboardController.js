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

        //format each goal text to be more user friendly
        goal.deadline=((new Date(goal.deadline))+'').slice(0,25);
      });
      vm.data.goals = goals;
      //Set local storage goals to array of goals
      $localStorage.goals = vm.data.goals;
      vm.storedGoals = $localStorage.goals;
    })
    .catch(function(error){
      console.error(error);
    });
  };
  vm.initializeGoals();


  


  //attached to ng-submit

  vm.addGoal = function(){

    //check to see if the deadline was passed properly, then post to DB
    if(vm.goal.deadline){
      Dashboard.storeUserGoals(vm.goal)
      .then(function(goalId){
        //the response of a successful post is the new goal's ID in the DB
        vm.goal.id=goalId.data;
        var newGoal={
          id:goalId.data,
          description:vm.goal.description,
          deadline:((new Date(vm.goal.deadline))+'').slice(0,25),
          hasExpired:false,
          hasCompleted:false
        };

        //add this newly created goal to the UI
        vm.data.goals.push(newGoal);
        //reinitialize local storage to store new goal
        $localStorage.goals = vm.data.goals;
        vm.initializeGoals();
      })
      .catch(function(err){
        console.log("error posting goal", err);
      });

    }
  };

//a function to send a PUT request to the database to update the goals
  vm.goalCompletion = function(goal){
    goal.hasCompleted=true;
    Dashboard.updateCompletion(goal.id);
  };

  vm.signOut = function() {
    //Resets the JWT token to null on sign out
    $localStorage.$reset({
      token: null
    });
    User.currentUser = null;
    $location.path('/signin');
  };
});
