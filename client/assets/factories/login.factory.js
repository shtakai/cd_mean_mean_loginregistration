console.log('LoginFactory')

angular.module('app').factory(
  'LoginFactory',
  function($http) {
    console.log('F start')

    let factory = {}

    factory.loggedIn = (callback) => {
      console.log('F loggedIn')

    }

    factory.login = (email, password, callback) => {
      console.log('F login')
      console.log('email', email, 'password', password)
      $http.post('/sessions',
        {
          email: email,
          password: password
        }
      ).then(data => {
        console.log('response data', data)
        callback(data.data)
      })
    }



    return factory

  }
)
