console.log('LoginFactory')

angular.module('app').factory(
  'LoginFactory',
  function($http) {
    console.log('F start')

    let factory = {}

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
        if(data.data.user_id){
          callback(data.data)
        } else {
          callback({error: 'login failed'})
        }
      })
    }



    return factory

  }
)
