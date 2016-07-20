require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const faker = require('faker')
const session = require('express-session')
const secret = process.env.SESS_SECRET || faker.random.uuid()
const jwt_secret = process.env.JWT_SECRET || faker.random.uuid()
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const app = express()

// port number
const port = process.env.PORT || 8000

// render json
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// static
app.use(express.static(path.join(__dirname, './client')))
app.use(express.static(path.join(__dirname, './bower_components')))

// session
//
let sess = {
  secret: secret,
  cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))
app.set('jwtSecret', jwt_secret)

// load mongoose connector
require('./server/config/connection.js')


// get an instance of the router for api routes
var apiRoutes = express.Router();

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {
  console.log('middleware')

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log('token', token)

  // decode token
  if (token) {
    console.log('token exist')
    // verifies secret and checks exp
    jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});

//app.use('/sessions', apiRoutes);
//app.use('/users', apiRoutes);
app.use('/dashboard', apiRoutes);


// load router
require('./server/config/routes.js')(app)




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
