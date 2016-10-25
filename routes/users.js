process.env.NODE_ENV ? process.env.NODE_ENV : process.env.NODE_ENV = 'development';

var express = require('express');
var router = express.Router();
var firebase = require("firebase");

var config = {
    apiKey: "",
    authDomain: "playwithme-" + process.env.NODE_ENV + "development.firebaseapp.com",
    authDomain: "playwithme-development.firebaseapp.com",
    databaseURL: "https://playwithme-development.firebaseio.com",
    storageBucket: "playwithme-development.appspot.com",
    messagingSenderId: "524685348783"
  };
firebase.initializeApp(config);

firebase.initializeApp({
  serviceAccount: "./keys/serviceAccount-" + process.env.NODE_ENV + ".json",
  databaseURL: "https://playwithme-" + process.env.NODE_ENV + ".firebaseio.com/"
});

/* GET users listing. */

router.get('/signup', function(req, res, next) {
  res.render('signup', {
    title: "User signup"
  });
});

router.post('/signup', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password.toString();
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    console.log("Error: " + error.code + " - " + error.message)
    // var errorCode = error.code;
    // var errorMessage = error.message;
    // ...
  });
  res.redirect('/');
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
