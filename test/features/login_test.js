process.env.NODE_ENV="test";

var app = require('../../app');
var Browser = require('zombie');
var http = require('http');
var models = require("../../models");

describe('log in', function() {

  before(function(){
    server = http.createServer(app).listen(3000);
    browser = new Browser({ site: 'http://localhost:3000'});
    models.sequelize.sync({force:true});
  });

  before(function(done) {
    browser.visit('/users/signup', done);
 });

  before(function(done) {
    browser.fill('name', 'Ewan', done);
    browser.fill('email', 'ewan@hotmail.com', done);
    browser.fill('password', 'Password', done);
    browser.fill('password_confirmation', 'Password', done);
    browser.pressButton('Create Account', done);
  });

  before(function(done){
    browser.visit('/addsportsstatuses', done);
  });


    before(function(done) {
      browser.visit('/sessions/login', done);
    });

    before(function(done) {
        browser.fill('email', 'ewan@hotmail.com', done);
        browser.fill('password', 'Password', done);
        browser.pressButton('Log in', done);
    });

    it("should redirect to homepage if login is successful", function(){
      browser.assert.url({pathname: '/'});
    });

    it("should show the user's name in the navbar", function(){
      browser.assert.text("nav", /Ewan/);
    });

  after(function(done) {
    server.close(done);
  });

});
