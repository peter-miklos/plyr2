var express = require('express');
var router = express.Router();
var models = require("../models")
var session = require('express-session');

/* GET users listing. */

router.get('/signup', function(req, res, next) {
  res.render('users/signup', {title: "User signup"});
});

router.post('/signup', function(req, res, next) {
  if(req.body.password && req.body.password === req.body.pwd_confirm) {
    req.session.user_name = req.body.name;
    console.log(req.session.user_name);
    models.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }).then(function(){
      res.redirect('/');
    });
  } else {
    console.log("Password confirmation does not match");
    res.redirect("/users/signup");
  }
});

module.exports = router;
