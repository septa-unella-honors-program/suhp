angular.module('suhp', [
  'suhp.dashboard',
  'suhp.auth',
  'suhp.services',
  'ngRoute',
  'ngStorage'])

  .config(function($routeProvider, $httpProvider) {
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
      });

      $httpProvider.interceptors.push('AttachTokens');
  })

.factory('AttachTokens', function ($localStorage) {

  var attach = {
    request: function (object) {
      var jwt = $localStorage.token;
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})

  .run(function ($rootScope, $location, Auth) {

    $rootScope.$on('$routeChangeStart', function (evt, next, current) {
      if(next.$$route.originalPath !== '/signup' && !Auth.hasToken()) {
        $location.path('/signin');
      }
    });


});
