var express = require('express');
var router = express.Router();
var models = require("../models");
var session = require('express-session');
var user;

router.get('/new', function(req, res, next) {
  res.render('users/new', {title: "User signup", flash: req.flash('signupError')});
});

router.post('/new', function(req, res, next) {
  models.User.find({ where: { email: req.body.email }}).then(function(user) {
    if (user) {
      req.flash("signupError", "This mail was used previously");
      res.redirect('/users/new');
    } else {
      user = models.User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        password_confirmation: req.body.password_confirmation})
      .then(function (user) {
        req.session.user = user;
        res.redirect('/');
      })
      .catch(function(error) {
        req.flash("signupError", "You need to enter a name, email and matching passwords");
        res.redirect('/users/new');
      });
    }
  });
});


module.exports = router;
