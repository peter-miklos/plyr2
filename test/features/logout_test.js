process.env.NODE_ENV="test"

var app = require('../../app');
var Browser = require('zombie');
var http = require('http');
var models = require("../../models");

describe('user log out', function() {

  before(function(){
    server = http.createServer(app).listen(3000);
    browser = new Browser({ site: 'http://localhost:3000'});
  });

    before(function(done) {
      models.sequelize.sync({force:true});
      browser.visit('/users/signup', done);
    });

    before(function(done) {
        browser.fill('name', 'Erce', done);
        browser.fill('email', 'test1@test.com', done);
        browser.fill('password', 'Password', done);
        browser.fill('password_confirmation', 'Password', done);
        browser.pressButton('Create Account', done);
    });

    before(function(done) {
        browser.clickLink('Log out', done);
    });

    it("should redirect to homepage if log out is successful", function(){
      browser.assert.url({pathname: '/'});
    });

    it('shows the sign up button', function() {
      browser.assert.text("nav", /Sign up/);
    });

    it('shows the log in button', function() {
      browser.assert.text("nav", /Log in/);
    });

  after(function(done) {
    server.close(done);
  });

});
