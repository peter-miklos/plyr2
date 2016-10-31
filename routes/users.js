var express = require('express');
var router = express.Router();
var models = require("../models");
var session = require('express-session');
var user;

router.get('/signup', function(req, res, next) {
  res.render('users/signup', {title: "User signup", flash: req.flash('uniqueMail')});
});

router.post('/signup', function(req, res, next) {
  models.User.find({ where: { email: req.body.email }}).then(function(user) {
    if (user) {
      req.flash("uniqueMail", "This mail is already registered");
      res.redirect('/users/signup');
    } else {
      user = models.User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        password_confirmation: req.body.password_confirmation})
      .then(function (user) {
        req.session.user = user;
        res.redirect('/');
      });
    }
  });
});


module.exports = router;
