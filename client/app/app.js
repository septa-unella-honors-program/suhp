angular.module('suhp', [
  'suhp.dashboard',
  'suhp.auth',
  'suhp.services',
  'ngRoute'])

  .config(function($routeProvider) {
    $routeProvider
      .when('/signin', {
        templateUrl: 'app/auth/signin.html',
        controller: 'AuthController as ctrl'
      })
      .when('/signup', {
        templateUrl: 'app/auth/signup.html',
        controller: 'AuthController as ctrl'
      })
      .when('/goal', {
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashController as ctrl'
      })
      .otherwise({
        redirectTo: '/signin'
      })
  })
