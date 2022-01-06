var express = require('express');
var router = express.Router();
const User = require('../models/users')
const {authUser} = require('./helpers/auth')

/* GET users listing. */
router.get('/', authUser.requireLogin,  async(req, res, next) => {
  try{
    const users = await User.find();
  
    let list_of_users = users.map(user => user.username)
    res.render('users/index', {allUsers : list_of_users} )
    
    }
  catch(err){
    res.send(err)
  }

});

// Users new
router.get('/new', (req, res, next) => {
  res.render('users/new');
})


router.post('/', (req, res, next) => {
  const user = User(req.body)

  user.save()
  .then(user => {
    return res.redirect('/users')
  })
  .catch(err => {
    res.send(err)
  })
})

module.exports = router;
