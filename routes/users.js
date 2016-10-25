var express = require('express');
var router = express.Router();

/* GET users listing. */


router.post('/signup', function(req, res, next) {
  res.redirect('/users/signup');
});

router.get('/signup', function(req, res, next) {
  res.render('signup', {
    title: "User signup"
  });
});

router.post('/login', function(req, res, next) {
  res.redirect('/users/login');
});

router.get('/login', function(req, res, next) {
  res.render('login', {
    title: "User login"
  });
});

module.exports = router;
