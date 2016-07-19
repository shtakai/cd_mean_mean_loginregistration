require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

// port number
const port = process.env.PORT || 8000

// render json
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// static
app.use(express.static(path.join(__dirname, './static')))
app.use(express.static(path.join(__dirname, './bower_components')))


//app.get('/', (req, res) => {res.json({test:'test'})})


// start server
const server = app.listen(port,  ()=>{
  console.log('server start on #', port )
})
