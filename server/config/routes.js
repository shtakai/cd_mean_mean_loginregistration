console.log('router')

const mongoose = require('mongoose')


const userController = require('./../controllers/users.js')

module.exports = (app) => {
  app.get('/', userController.test)
  }
