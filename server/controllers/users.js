console.log('UsersController')

const mongoose = require('mongoose')
const User = mongoose.model('User')

const faker = require('faker')


function UsersController () {

  this.test = (req, res) => {
    res.json({
      data: faker.hacker.noun()
    })
  }
}

module.exports = new UsersController()
