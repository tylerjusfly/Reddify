var express = require('express');
var router = express.Router();
const User = require('../models/users')
const {loginController} = require('../controllers/login')

/* GET home page. */
router.get('/', function(req, res, next) {
  const currentUserId = req.session.userId;
  res.render('index', { title: 'MakeReddit', currentUserId: currentUserId });
});

router.get('/login', (req, res, next) => {
  res.render('login')
})
router.get('/logout', (req, res) => {
  res.redirect('/login')
})

router.post('/login', loginController.loginUser)

module.exports = router;
