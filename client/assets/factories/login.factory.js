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

    factory.dashboard = (callback) =>{
       console.log('F dashboard')
       $http.get('/dashboard')
         .then(data => {
            console.log('data', data)
         })
       callback({success: true})
    }

    factory.register = (
      email,
      first_name,
      last_name,
      password,
      password_confirm,
      callback) => {
        console.log('F register')
        $http.post('/users',{
          email: email,
          first_name: first_name,
          last_name: last_name,
          password: password,
          password_confirm:password_confirm
        }).then( data => {
           console.log(data)
           if(data.data.success){
            console.log('success')
           }else {
            console.log('failed')
           }
           callback(data.data)
        } )
      }


    return factory

  }
)
