angular.module('suhp.auth', [])

.controller('AuthController', function(Auth, User, $location) {

  var vm = this;
  vm.user = {};
  vm.user.emails =[];
  vm.usernameTaken;
  vm.hideSignup = false;
  vm.showFriendForm = false;
  vm.errorMsg = '';
  vm.addFriend = function(){
    vm.user.emails.push(vm.user.friendEmail);
  }

//Sign up should check username availability
 vm.signup = function() {

   Auth.signup(vm.user)

     .then(function(response){
       console.log('this is the res error',response);
     if(response.message){
       vm.errorMsg = response.errors[0].message;
     } else {
       User.currentUser = vm.user.username;
       vm.showFriendForm = true;
       vm.hideSignup = true;
       console.log('vm user', vm.user);
     }

     })
     .catch(function(error){
       usernameTaken = true;
       console.log(error);
     });

 };

  vm.storeFriendEmailList = function(){
    Auth.storeFriendEmailList(vm.user.username, vm.user.emails)
    .then(function(response){
      console.log('response', response);
      $location.path('/goal');
    })
    .catch(function(error){
      console.log('there was an error', error);
    });
  };

  // Triggers the auth function so it posts user information and directs them to dashboard

  vm.signin = function(){
    Auth.signin(vm.user)
      .then(function(response){

        if(response){          
          User.currentUser = vm.user.username;
          console.log('vm user', response.data);
          console.log('currentUser', User.currentUser);
          $location.path('/goal');
        } else {
          vm.errorMsg = 'Username / Password Incorrect';
        }
      })
      .catch(function(error){
        console.log(error);
        alert('There was an error signing you in. Please refresh the page and try again.');
      });
  };

});
