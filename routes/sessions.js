var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var models = require('../models');
var session = require('express-session');

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('sessions/login', { title: 'User Login' });
});

router.post('/login', function(req, res, next) {
    models.User.findOne({
    where: { email: req.body.email }
  })
    .then(function(user){
      if (bcrypt.compareSync(req.body.password, user.dataValues.password_digest)) {
        req.session.user = user;
        res.redirect('/');
      } else {
        res.redirect('/sessionslogin');
      }
    })
    .catch(function(error) {
      res.redirect('/users/signup');
    });
});

router.get('/logout', function(req, res) {
  req.session.user = null;
  res.redirect('/');
});

module.exports = router;
