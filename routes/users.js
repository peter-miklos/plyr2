var express = require('express');
var router = express.Router();
var models = require("../models")
var session = require('express-session');
var user;
// var currentUser;

/* GET users listing. */

router.get('/signup', function(req, res, next) {
  res.render('users/signup', {title: "User signup"});
});

router.post('/signup', function(req, res, next) {
  user = models.User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    password_confirmation: req.body.password_confirmation})
  .then(function () {
    // req.session.currentUser = user._bountTo.dataValues.id;
    res.redirect('/');
  })
  .catch(function(error) {
    res.redirect('/users/signup');
  });
});


module.exports = router;
