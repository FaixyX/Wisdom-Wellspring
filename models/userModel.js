const mongoose = require('mongoose')
const { Timestamp } = require('mongodb')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }
  },
  {
  timestamps: true,
  });

// static signup method
userSchema.statics.signup = async function(email, password, username) {

    // Validation
    if (!email || !password || !username){
        throw Error('All Fields are Mandatory')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password should be strong')
    }

  const email_exists = await this.findOne({ email })

  if (email_exists) {
    throw Error('Email already in use')
  }

  const uname_exists = await this.findOne({ username })
  if (uname_exists) {
    throw Error('Username already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, username, password: hash })

  return user
}

// static login method
userSchema.statics.login = async function (email,password) {
    if (!email || !password){
        throw Error('All Fields are Mandatory')
    }

    const user = await this.findOne({ email })
    if (!user) {
      throw Error('No user on this email')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error("Incorrect Password")
    }
    return user
}

module.exports = mongoose.model('User', userSchema)