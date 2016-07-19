console.log('LoginController')

angular.module('app').controller(
  'LoginController', function(LoginFactory, $location, $routeParams) {
    console.log('C start')

    this.login = () => {
      this.email = this.email || ''
      this.password = this.password || ''
      console.log('C login', 'email', this.email,'password', this.password)

      LoginFactory.login(this.email, this.password, (data) => {
         console.log('returned data', data)
      })
      consnole.log('C login end')
    }
  }
)
