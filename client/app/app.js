angular.module('suhp', [
  'suhp.dashboard',
  'suhp.auth',
  'suhp.services',
  'ngRoute'])

  .config(function($routeProvider) {
    $routeProvider
      .when('/signin', {
        templateUrl: 'app/auth/signin.html',
        controller: 'AuthController'
      })
      .when('/signup', {
        templateUrl: 'app/auth/signup.html',
        controller: 'AuthController'
      })
      .when('/goal', {
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashController'
      })
      .otherwise({
        redirectTo: '/signin'
      })
  })
  
