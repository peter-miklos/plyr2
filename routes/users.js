var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/signup', function(req, res, next) {
  res.render('users/signup', {title: "User signup"});
});

router.post('/signup', function(req, res, next) {
  if(req.body.password && req.body.password === req.body.pwd_confirm) {
    // TBD
    res.redirect('/');
  } else {
    console.log("Password confirmation does not match");
    res.redirect("/users/signup");
  }
});

module.exports = router;
