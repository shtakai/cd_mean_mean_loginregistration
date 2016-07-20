console.log('app module')

angular.module('app',['ngRoute','ngMessages','ngCookies'])

angular.module('app').config(($routeProvider) => {
  $routeProvider
    .when('/login', {
      templateUrl: '../partials/login.html',
      controller: 'LoginController',
      controllerAs: 'c',
    })
    .when('/dashboard', {
      templateUrl: '../partials/dashboard.html',
      controller: 'LoginController',
      constollerAs: 'c',
    })
    .otherwise({
      redirectTo: '/'
    })


})
