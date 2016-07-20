console.log('LoginController')

angular.module('app').controller(
  'LoginController', function(LoginFactory, $location, $routeParams, $cookies, $http, $rootScope) {
    console.log('C start')

    this.logged_in = false

    this.loggedIn = () => {
       console.log('C logged in:?')

    }

    this.login = () => {
      this.email = this.email || ''
      this.password = this.password || ''
      console.log('C login', 'email', this.email,'password', this.password)

      LoginFactory.login(this.email, this.password, (data) => {
         console.log('returned data', data)
         if(data.user_id){
            this.logged_in = true
            console.log('login ok', data.user_id)
            $rootScope.user_id = data.user_id
            $location.url('/dashboard')
         } else {
           console.log('login failed', data.error)
           $rootScope.user_id = null
           $location.url('/login')
         }
      })
      console.log('C login end')
    }

  }
)
