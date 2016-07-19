require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const faker = require('faker')

const app = express()

// port number
const port = process.env.PORT || 8000

// render json
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// static
app.use(express.static(path.join(__dirname, './static')))
app.use(express.static(path.join(__dirname, './bower_components')))

// load mongoose connector
require('./server/config/connection.js')

// load router





//const mongoose = require('mongoose')
//app.get('/', (req, res) => {
  //const User = mongoose.model('User')
  //let user = new User()
  //user.first_name = faker.commerce.productName()
  //user.last_name = faker.commerce.productName()
  //user.email = faker.internet.email()
  //user.password = 'testtest'

  //console.log('user', user)
  //user.save((err, _user) => {
    //if(err){ res.json(err) }
    //else{
      //console.log('saved', _user)
      //console.log('check password')
      //_user.comparePassword('testtest', (data) => {
      //})
      //res.json({test:'test'})

    //}
  //})
//})


// start server
const server = app.listen(port,  ()=>{
  console.log('server start on #', port )
})
