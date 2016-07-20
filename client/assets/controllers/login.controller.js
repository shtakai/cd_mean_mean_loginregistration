console.log('LoginController')

angular.module('app').controller(
  'LoginController', function(LoginFactory, $location, $routeParams, $cookies) {
    console.log('C start')

    console.log('cookie.userid', $cookies.get('user_id'))

    this.loggedIn = () => {
       console.log('C logged in:?')
       this.userid = 1000
    }

    this.login = () => {
      this.email = this.email || ''
      this.password = this.password || ''
      console.log('C login', 'email', this.email,'password', this.password)

      LoginFactory.login(this.email, this.password, (data) => {
         console.log('returned data', data)
         if(data.user_id){
            console.log('login ok', data.user_id)
            $cookies.put('user_id', data.user_id)
            $location.url('/dashboard')
         } else {
           console.log('login failed', data.error)
           $location.url('/login')
         }
      })
      console.log('C login end')
    }

  }
)
