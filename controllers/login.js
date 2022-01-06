const User = require('../models/users')
const bcrypt = require('bcrypt')

exports.loginController = {
  loginUser: (req, res) => {
    let {username, password} = req.body

    User.findOne({username})
    .then(user => {
      // if user record does not exist
      if(!user){
        res.status(404).send("user does not exist")
      }
      const isValidPass = bcrypt.compareSync(password, user.password)

      // Checking if user password is correct
      if(!isValidPass){
        res.status(401).send("password is not correct")
      }
      // res.status(200).send("you are logged in")
      req.session.userId = user._id
      return res.redirect('/')
    })


  }
}