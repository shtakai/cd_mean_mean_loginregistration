console.log('LoginController')

angular.module('app').controller(
  'LoginController', function(LoginFactory, $location, $routeParams, $cookies, $http, $rootScope, jwtHelper) {
    console.log('C start')
    let token = $cookies.get('x-access-token')
    this.token = () => {
      if(token){
        console.log('token', jwtHelper.decodeToken(token))
        $rootScope.user_id = jwtHelper.decodeToken(token)._id || null
        this.user_id = jwtHelper.decodeToken(token)._id || null
      }else{
        console.log('no token')
      }
    }

    this.loggedIn = () => {
      this.token()
      return jwtHelper.decodeToken(token).id ? 'logged in' : 'not login'
    }

    this.root = () => {
      console.log('C root')
      this.token()
      $location.path('/')
    }

    this.register = () => {
      console.log('C register')
      this.register_email = this.register_email || ''
      this.register_first_name = this.register_first_name || ''
      this.register_last_name = this.register_last_name || ''
      this.register_password = this.register_password || ''
      this.register_password_confirm = this.register_password_confirm || ''
      LoginFactory.register(
        this.register_email,
        this.register_first_name,
        this.register_last_name,
        this.register_password,
        this.register_password_confirm,
        (data) => {
           console.log('returned data', data)
           if(data.success){
             console.log('C register ok')
             this.register_email = ''
             this.register_first_name = ''
             this.register_last_name = ''
             this.register_password = ''
             this.register_password_confirm = ''
             this.message = 'user registered pls login'

           } else {
              console.log('C register ng')
              this.message = 'registration failed'
           }
        }
      )
    }

    this.login = () => {
      this.email = this.email || ''
      this.password = this.password || ''
      console.log('C login', 'email', this.email,'password', this.password)

      LoginFactory.login(this.email, this.password, (data) => {
         console.log('returned data', data)
         if(data.user_id){
            this.logged_in = true
            console.log('login ok', data)
            $cookies.put('x-access-token', data.token)
            console.log('token', $cookies.get('x-access-token'))
            $rootScope.user_id = data.user_id
            this.message = 'login ok'
            this.isloggedin = 'login as ' + data.user_id
         } else {
           console.log('login failed', data.error)
           $rootScope.user_id = null
           this.message = 'login failed'
           this.isloggedin = 'not logged in'
         }
      console.log('C login end')
      this.token()
      })
    }

    this.logout = () => {
      console.log('C logout')
      $cookies.remove('x-access-token')
      console.log('token', $cookies.get('x-access-token'))
      this.message = 'logged out'
      this.isloggedin = 'not log in'
      this.token()
      console.log('---------')
    }

    this.dashboard = () => {
       console.log('C dashboard')
       LoginFactory.dashboard((data) => {
          console.log('returned data', data)
       })
      this.token()
      this.message = $cookies.get('x-access-token') ? 'you can watch this dashboard' : 'can not show'
      $location.url('/login')
    }

  }
)
