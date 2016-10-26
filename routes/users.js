var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/signup', function(req, res, next) {
  res.render('users/signup', {title: "User signup"});
});

router.post('/signup', function(req, res, next) {
  sess = req.session;
  if(req.body.password && req.body.password === req.body.pwd_confirm) {
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
      console.log("Error: " + error.code + " - " + error.message);
    }).then(function() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          sess.current_user = user;
        } else {
          console.log("User is not assigned to the session variable");
        }
      });
    });
    res.redirect('/');
  } else {
    console.log("Password confirmation does not match");
    res.redirect("/users/signup");
  }


});

router.post('/login', function(req, res, next) {
  res.redirect('/users/login');
});

router.get('/login', function(req, res, next) {
  res.render('sessions/login', {
    title: "User login"
  });
});

module.exports = router;