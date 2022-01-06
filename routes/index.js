var express = require('express');
var router = express.Router();
const User = require('../models/users')
const {loginController} = require('../controllers/login')

// set layout variables
router.use(function(req, res, next) {
  res.locals.title = "Reddify";
  res.locals.currentUserId = req.session.userId;
  res.locals.currentUserName = req.session.username

  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', (req, res, next) => {
  res.render('login')
})

router.get('/logout', (req, res) => {
  if(req.session){
      req.session.destroy(err => {
        if(err) return err
      })
  }
  return res.redirect('/login')
})

router.post('/login', loginController.loginUser)

module.exports = router;
