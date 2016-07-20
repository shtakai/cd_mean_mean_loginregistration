console.log('UsersController')

const mongoose = require('mongoose')
const User = mongoose.model('User')

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
      req.body.email = faker.internet.email()
      req.body.password = 'testtest'
      console.log('req', req.body)
      let user = new User(req.body)
      user.save( (err, _user) => {
        if(err) {
          console.log('error', err)
          res.json()
        }else{
          console.log('=----')
          res.json({
            data: faker.hacker.noun()
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
            res.json(err)
            return
          } else if(!user){
            console.log('user not found')
            res.json({error: 'user not found'})
            return
          }
          user.comparePassword(req.body.password,(err, isMatch) => {
            console.log(`err:${err}  isMatch: ${isMatch}`)
            if(!session.user_id){
              console.log('set user id')
              session.user_id = user._id
            } else {
               console.log('user_id already set')
            }
            console.log(user)
            console.log('session:user_id:', session.user_id)
            res.json({user_id: user._id})
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
