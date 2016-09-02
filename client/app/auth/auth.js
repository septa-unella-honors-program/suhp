angular.module('suhp.auth', [])

.controller('AuthController', [function(Auth){
  var vm = this;
  vm.user = {};
  vm.user.emails =[];
  vm.userFound = Auth.userFound;
  vm.showSigninError = function(){
    return vm.userFound;
  };
  vm.usernameTaken;
  vm.hideSignup;
  vm.showFriendForm = false;
  vm.addFriend = function(){
    vm.user.emails.push(vm.user.friendEmail);
  }

//Sign up should check username availability

  vm.signup = function(){

    Auth.signup(vm.user)

      .then(function(response){

        vm.hideSignup = true;
        vm.showFriendForm = true;

      })
      .catch(function(error){
        usernameTaken = true;
        console.log(error);
      });

  };

  vm.storeFriendEmailList = function(){
    Auth.storeFriendEmailList(vm.user.username, vm.user.emails)
    .then(function(response){
      $location.path('/dashboard');
    }).catch(function(error){
      alert("Oops, the friend list didn't survive, please try again");
    });
  };

  // Triggers the auth function so it posts user information and directs them to dashboard

  vm.signin = function(){
    Auth.signin(vm.user)
      .then(function(){
        if(vm.userFound){
          $location.path('/dashboard');
        } else {
          showSigninError();
        }
      })
      .catch(function(error){
        console.log(error);
        alert('There was an error signing you in. Please refresh the page and try again.');
      });
  };

}]);
