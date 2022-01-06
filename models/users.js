const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  username : {type : String, required : true},
  password : {type : String, required : true}
})

UserSchema.pre('save', function(next){
  const user = this
  bcrypt.hash(user.password, 10, function(hasherr, hash){
    if(hasherr){ return next(hasherr) }
    user.password = hash
    next()
  })
})


const User = mongoose.model('Users', UserSchema)

module.exports = User;