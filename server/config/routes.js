console.log('router')

const mongoose = require('mongoose')


const usersController = require('./../controllers/users.js')

module.exports = (app) => {
  //usersController.setApp(app)
  app.get('/test', usersController.test)

  app.post('/users', usersController.create)
  app.post('/sessions', usersController.login)
  app.delete('/sessions', usersController.logout)
}
