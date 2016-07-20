console.log('app module')

angular.module('app',['ngRoute','ngMessages','ngCookies', 'angular-jwt'])


angular.module('app').factory(
  'AuthInterceptor', function($q, $cookies) {
    return{
      'request': function(config){
        console.log('------')
        console.log('--', $cookies.get('x-access-token'))
        if($cookies.get('x-access-token')){
          config.headers['x-access-token'] = $cookies.get('x-access-token')
        }
        return config || $q.when(config)
      }
    }
  }
).config(($routeProvider, $httpProvider) => {
  $httpProvider.interceptors.push('AuthInterceptor')


  $routeProvider
    .when('/login', {
      templateUrl: '../partials/login.html',
      controller: 'LoginController',
      controllerAs: 'c',
    })
    .when('/dashboard', {
      templateUrl: '../partials/index.html',
      controller: 'LoginController',
      constollerAs: 'c',
    })
    .when('/logout', {
      templateUrl: '../partials/login.html',
      controller: 'LoginController',
      constollerAs: 'c',
    })
    .otherwise({
      redirectTo: '/'
    })


})
