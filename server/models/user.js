console.log('user model load')

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const SALT_WORK_FACTOR = 10;

let UserSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      minlength: 5,
    },
    last_name: {
      type: String,
      required: true,
      minlength: 5,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)
        }
      },
      index: {
        unique: true
      },
    },
    password: {
      type: String,
      //required: true,
    }
  },{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)

UserSchema.pre('save', function(done) {
  console.log('pre save')
  let user = this;

  if (!user.isModified('password')) return next();
  //if(!user.isModified('password_hash')) return done();
  bcrypt.genSalt(SALT_WORK_FACTOR, (err,salt) => {
    console.log('salt', salt)
    console.log('user', user)
    if(err){
      console.log(err)
      done(err)
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if(err){
        console.log(err)
        done(err)
      }
      user.password = hash
      console.log('---', hash)
      done()

    })
  })
})


// register
const User = mongoose.model('User', UserSchema)

