console.log('connection module')
require('dotenv').config()

const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

const db_url = process.env.DB_URL || ''

//  /.js$/i
const regex = new RegExp('.js$', 'i')

const modelsPath = path.join(__dirname, './../models')

// mongoose connection event
mongoose.connect(db_url)

mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection opened to ${db_url}`)
})

mongoose.connection.on('error', (err) => {
   console.log(`Mongoose default connection error ${err}`)
})

mongoose.connection.on('disconnected', () => {
  console.log(`Mongoose default connection disconnected`)
})

// when node process get 'SIGINT', close the mongoose connection
process.on('SIGINT', () => {
   console.log('process got SIGINT')
   mongoose.connection.close( () => {
     console.log('Mongoose default connection disconnect because of SIGINT')
   } )
})


// load models' schema
fs.readdirSync(modelsPath).forEach( (file) => {
  if(regex.test(file)){
    require(`${modelsPath}/${file}`)
  }
})



