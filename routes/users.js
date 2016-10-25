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

module.exports = router;
