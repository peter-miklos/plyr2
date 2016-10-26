process.env.NODE_ENV = 'test';

var app = require('../../app');
var Browser = require('zombie');
var http = require('http');
// var firebase = require("firebase");
var test_SFF = new Firebase("https://playwithme-" + process.env.NODE_ENV + ".firebaseio.com/");

// var config_TEST = {
//     apiKey: process.env.FIREBASE_TEST,
//     authDomain: "playwithme-" + process.env.NODE_ENV + ".firebaseapp.com",
//     databaseURL: "https://playwithme-" + process.env.NODE_ENV + ".firebaseio.com/",
//     messagingSenderId: process.env.FIREBASE_MESSAGING_TEST
// };
// firebase.initializeApp(config_TEST);


describe('log in', function() {

  before(function(done){
    server = http.createServer(app).listen(3000);
    browser = new Browser({ site: 'http://localhost:3000'});
    // firebase.auth().createUserWithEmailAndPassword(("test@testtest.com", "peterpeter"), done);
  });


  before(function(done) {
    browser.visit('/');
  });

  before(function(done) {
    browser.clickLink('Log in', done);
  });

  it('should allow you to log in', function() {
    browser.assert.url({pathname: '/users/login'});
  });

  describe('user log in', function() {

    before(function(done) {
      browser.visit('/users/login', done);
    });

    before(function(done) {
      browser.fill('email', "sff.makers@gmail.com", done);
      browser.fill('password', "AUGUST+2016", done);
      browser.clickLink('Log in', done);
    });

    it("should redirect to homepage if sign up is successful", function(){
      browser.assert.url({pathname: '/'});
    });

  });


  after(function(done) {
    server.close(done);
    test_SFF.remove();
  });

});
