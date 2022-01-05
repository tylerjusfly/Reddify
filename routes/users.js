var express = require('express');
var router = express.Router();
const User = require('../models/users')

/* GET users listing. */
router.get('/', async(req, res, next) => {
  try{
    const users = await User.find();
    return res.render('users/index', {allUsers : users})
    
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
  const user = new User(req.body)

  user.save()
  .then(user => {
    return res.redirect('/users')
  })
  .catch(err => {
    res.send(err)
  })
})

module.exports = router;
