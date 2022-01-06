const User = require('../models/users')
const bcrypt = require('bcrypt')

exports.loginController = {
  loginUser: (req, res) => {
    let {username, password} = req.body

    User.findOne({username})
    .then(user => {
      // if user record does not exist
      if(user){

        const isValidPass = bcrypt.compareSync(password, user.password)
        if(isValidPass){

          req.session.userId = user._id
          req.session.username = user.username
          return res.redirect('/')
         
        }else{
          res.render('error', {message : "password is not correct"})
        }
      }else{
        res.render('error', {message : "user does not exist"})
      }

    })


  }
}