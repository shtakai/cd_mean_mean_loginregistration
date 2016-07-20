console.log('UsersController')


const mongoose = require('mongoose')
const User = mongoose.model('User')
const morgan = require('morgan')

// used to create, sign, and verify tokens
const jwt    = require('jsonwebtoken')


const faker = require('faker')


module.exports = (function() {
  return {

    test: (req, res) => {
      let session = req.session
      if(!session.test){
        session.test = 'test'
        console.log('session created')
      }
      console.log('session test', session.test)
      res.json({
        data: faker.hacker.noun()
      })
    },

    create: (req, res) => {
      console.log('UsersController#create')
      //req.body.email = faker.internet.email()
      //req.body.password = 'testtest'
      console.log('req', req.body)
      if(!req.body.password){
        console.log('password is mandatory')
        res.json({success:false, error:'password is mandatory'})
        return
      }else if(req.body.password !== req.body.password_confirm){
        console.log('passwords not match')
        res.json({success:false, error:'password not match'})
        return
      }
      let user = new User(req.body)
      user.save( (err, _user) => {
        if(err) {
          console.log('error', err)
          res.json({success:false, error:'validation error'})
        }else{
          console.log('=----')
          console.log('userid', _user._id)
          res.json({
            success: true
          })
        }
      }
      )
    },// end:create

    login: (req, res) => {
      console.log('C login')
      console.log('body', req.body)
      let session = req.session
      console.log('session;', session)
      User.findOne(
        {email: req.body.email},
        (err, user) => {
          if(err){
            console.log('err',err)
            res.json({success:false, error:err})
          } else if(!user){
            console.log('user not found')
            res.json({success:false, error: 'user not found'})
            return
          }
          user.comparePassword(req.body.password,(err, isMatch) => {
            console.log(`err:${err}  isMatch: ${isMatch}`)
            if(err){
              console.log('err', err)
              res.json({success:false, error:err})
            }else if(!isMatch){
              console.log('password not match')
              res.json({success:false})
            }else {
              let token = jwt.sign({_id: user._id, first_name: user.first_name, last_name: user.last_name}, req.app.get('jwtSecret'),{
                expiresIn: 1440 // expires in 24 hours
              })
              console.log(user)
              //console.log('token', token)
              //console.log('session:user_id:', session.user_id)
              res.json({
                success: true,
                user_id: user._id,
                token: token
              })
            }
          })

        }
      )


    }, // end login
    logout: (req, res) => {
      req.session.destroy((err)=>{
        if(err){
          console.log('error', err)
        } else{
          console.log('session destroy')
        }
      })
      res.json({message:'logout'})

    }, // end logout
  }
})()
